import { NextResponse } from "next/server"
import { siteConfig } from "@/lib/site"

export const runtime = "nodejs"

interface ContactPayload {
  name: string
  email: string
  company?: string
  message: string
  website?: string // honeypot
}

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : ""
}

/**
 * Contact form handler.
 * Delivery is configured by environment:
 *  - RESEND_API_KEY (+ optional CONTACT_FROM): sends an email via Resend to siteConfig.contactEmail
 *  - CONTACT_WEBHOOK_URL: POSTs the JSON payload to any webhook (Slack, Make, Zapier, your own API)
 * With neither configured the route returns 503 and the client offers a prefilled mailto fallback.
 */
export async function POST(req: Request) {
  let body: Partial<ContactPayload>
  try {
    body = (await req.json()) as Partial<ContactPayload>
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 })
  }

  // Honeypot: bots fill hidden fields; humans don't.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true })

  const payload: ContactPayload = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    company: clean(body.company, 160),
    message: clean(body.message, 4000),
  }

  if (payload.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please check the required fields." }, { status: 422 })
  }

  const resendKey = process.env.RESEND_API_KEY
  const webhook = process.env.CONTACT_WEBHOOK_URL

  try {
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? `Cubott website <no-reply@${new URL(siteConfig.url).hostname}>`,
          to: [siteConfig.contactEmail],
          reply_to: payload.email,
          subject: `Website enquiry from ${payload.name}${payload.company ? ` (${payload.company})` : ""}`,
          text: `Name: ${payload.name}\nEmail: ${payload.email}\nCompany: ${payload.company || "—"}\n\n${payload.message}`,
        }),
      })
      if (!res.ok) throw new Error(`Resend responded ${res.status}`)
      return NextResponse.json({ ok: true })
    }

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "cubott.com/contact", receivedAt: new Date().toISOString(), ...payload }),
      })
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
      return NextResponse.json({ ok: true })
    }
  } catch (err) {
    console.error("[contact] delivery failed:", err)
    return NextResponse.json({ ok: false, error: "We couldn't send your message just now." }, { status: 502 })
  }

  return NextResponse.json({ ok: false, error: "Contact delivery is not configured.", fallback: "mailto" }, { status: 503 })
}
