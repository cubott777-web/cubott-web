"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Button from "@/components/ui/Button"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
import { EASE, DUR } from "@/components/motion/tokens"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

type Status = "idle" | "sending" | "sent" | "error" | "fallback"

const field =
  "w-full rounded-xl border border-line bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-white/35 transition-[border-color,box-shadow,background-color] duration-300 hover:border-line-strong focus:border-blue-400 focus:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-blue/20"
const label = "mb-1.5 block text-sm font-medium text-white/80"

export default function ContactForm({ initialMessage = "" }: { initialMessage?: string }) {
  const reduce = useReducedMotion()
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string>("")
  const [values, setValues] = useState({ name: "", email: "", company: "", message: initialMessage, website: "" })

  const update = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }))

  const mailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`Website enquiry from ${values.name || ""}`)}&body=${encodeURIComponent(
    `${values.message}\n\n— ${values.name}${values.company ? `, ${values.company}` : ""}\n${values.email}`
  )}`

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = (await res.json()) as { ok: boolean; error?: string; fallback?: string }
      if (data.ok) setStatus("sent")
      else if (data.fallback === "mailto") setStatus("fallback")
      else {
        setStatus("error")
        setError(data.error ?? "Something went wrong.")
      }
    } catch {
      setStatus("error")
      setError("We couldn't reach the server. Please try again or email us directly.")
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        role="status"
        initial={reduce ? false : { opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: DUR.base, ease: EASE }}
        className="card p-8"
      >
        <p className="text-2xl font-semibold tracking-tight">Thanks — we&apos;ve got it.</p>
        <p className="mt-3 text-white/60">We read every message and reply ourselves. Expect to hear from us soon.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="contact-help" className="card p-6 md:p-8">
      <p id="contact-help" className="sr-only">
        Name, email and a message are required.
      </p>
      <Stagger as="div" gap={0.08} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <StaggerItem>
            <label htmlFor="name" className={label}>
              Name
            </label>
            <input id="name" name="name" autoComplete="name" required minLength={2} className={field} value={values.name} onChange={update("name")} />
          </StaggerItem>
          <StaggerItem>
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="email" required className={field} value={values.email} onChange={update("email")} />
          </StaggerItem>
        </div>
        <StaggerItem>
          <label htmlFor="company" className={label}>
            Company <span className="font-normal text-white/45">(optional)</span>
          </label>
          <input id="company" name="company" autoComplete="organization" className={field} value={values.company} onChange={update("company")} />
        </StaggerItem>
        <StaggerItem>
          <label htmlFor="message" className={label}>
            What are you building — and what isn&apos;t working today?
          </label>
          <textarea id="message" name="message" required minLength={10} rows={6} className={cn(field, "resize-y")} value={values.message} onChange={update("message")} />
        </StaggerItem>
        {/* Honeypot — hidden from people, tempting for bots */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
        </div>

        {status === "error" && (
          <p role="alert" className="text-sm text-red-300">
            {error}{" "}
            <a className="font-medium underline underline-offset-4" href={mailto}>
              Email us instead
            </a>
            .
          </p>
        )}
        {status === "fallback" && (
          <p role="status" className="rounded-xl border border-blue-400/30 bg-blue/10 p-4 text-sm text-white/85">
            The form isn&apos;t connected to a mailbox yet.{" "}
            <a className="font-semibold text-blue-300 underline underline-offset-4" href={mailto}>
              Send this message by email
            </a>{" "}
            — it&apos;s already written for you.
          </p>
        )}

        <StaggerItem className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" variant="primary-dark" arrow disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send"}
          </Button>
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-sm text-white/50 underline-offset-4 hover:text-white hover:underline">
            or email {siteConfig.contactEmail}
          </a>
        </StaggerItem>
      </Stagger>
    </form>
  )
}
