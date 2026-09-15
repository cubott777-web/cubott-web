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
  "w-full rounded-lg border border-navy/20 bg-white px-4 py-3 text-[15px] text-navy placeholder:text-navy/35 transition-[border-color,box-shadow] duration-300 hover:border-navy/35 focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/15"

export default function ContactForm() {
  const reduce = useReducedMotion()
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string>("")
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "", website: "" })

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
        className="rounded-2xl border border-navy/10 bg-surface p-8"
      >
        <p className="text-2xl font-semibold tracking-tight text-navy">Thanks — we&apos;ve got it.</p>
        <p className="mt-3 text-slate">We read every message and reply personally. Expect to hear from us soon.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="contact-help">
      <p id="contact-help" className="sr-only">
        Name, email and a message are required.
      </p>
      <Stagger as="div" gap={0.08} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <StaggerItem>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
              Name
            </label>
            <input id="name" name="name" autoComplete="name" required minLength={2} className={field} value={values.name} onChange={update("name")} />
          </StaggerItem>
          <StaggerItem>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="email" required className={field} value={values.email} onChange={update("email")} />
          </StaggerItem>
        </div>
        <StaggerItem>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-navy">
            Company <span className="font-normal text-slate">(optional)</span>
          </label>
          <input id="company" name="company" autoComplete="organization" className={field} value={values.company} onChange={update("company")} />
        </StaggerItem>
        <StaggerItem>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
            How does your business work — and what isn&apos;t working?
          </label>
          <textarea id="message" name="message" required minLength={10} rows={6} className={cn(field, "resize-y")} value={values.message} onChange={update("message")} />
        </StaggerItem>
        {/* Honeypot — hidden from people, tempting for bots */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
        </div>
  
        {status === "error" && (
          <p role="alert" className="text-sm text-red-700">
            {error}{" "}
            <a className="font-medium underline underline-offset-4" href={mailto}>
              Email us instead
            </a>
            .
          </p>
        )}
        {status === "fallback" && (
          <p role="status" className="rounded-lg border border-blue/20 bg-blue-50 p-4 text-sm text-navy">
            The form isn&apos;t connected to a mailbox yet.{" "}
            <a className="font-semibold text-blue underline underline-offset-4" href={mailto}>
              Send this message by email
            </a>{" "}
            — it&apos;s already written for you.
          </p>
        )}
  
        <StaggerItem className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" arrow disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send"}
          </Button>
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-sm text-slate underline-offset-4 hover:text-navy hover:underline">
            or email {siteConfig.contactEmail}
          </a>
        </StaggerItem>
      </Stagger>
    </form>
  )
}
