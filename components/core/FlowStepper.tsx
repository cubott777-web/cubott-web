"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FlowStepperProps {
  steps: readonly string[]
  label?: string
  tone?: "light" | "dark"
  className?: string
  /** Delay before the first step lights up, in seconds. */
  delay?: number
  /** Monospace-ish status codes (e.g. IN_PROGRESS) vs. natural labels. */
  code?: boolean
}

/**
 * Animated status progression. Steps light up in order as the stepper enters view,
 * with a connecting line filling between them. Exact documented terminology only.
 */
export default function FlowStepper({ steps, label, tone = "light", className, delay = 0, code = false }: FlowStepperProps) {
  const reduce = useReducedMotion()
  const dark = tone === "dark"
  const step = 0.28

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <p className={cn("eyebrow mb-4", dark ? "text-blue-300" : "text-navy/50")}>{label}</p>
      )}
      <ol className="relative flex flex-col gap-3 md:flex-row md:items-center md:gap-0" aria-label={label}>
        {steps.map((s, i) => (
          <li key={s} className="flex items-center md:flex-1 md:last:flex-none">
            <motion.span
              initial={reduce ? false : { opacity: 0.45 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.35, delay: delay + i * step }}
              className={cn(
                "relative z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] md:text-xs",
                code && "font-mono tracking-[0.08em]",
                dark ? "border-white/15 bg-navy-800 text-white" : "border-navy/15 bg-white text-navy shadow-card"
              )}
            >
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { backgroundColor: dark ? "rgba(255,255,255,0.25)" : "rgba(11,31,59,0.2)" }}
                whileInView={{ backgroundColor: "#2563EB" }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.3, delay: delay + i * step }}
                className="h-1.5 w-1.5 rounded-full"
              />
              {s}
            </motion.span>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "relative hidden h-px flex-1 overflow-hidden md:block",
                  dark ? "bg-white/15" : "bg-navy/10"
                )}
              >
                <motion.span
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: step, delay: delay + i * step + 0.1, ease: "linear" }}
                  className="absolute inset-0 origin-left bg-blue"
                />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
