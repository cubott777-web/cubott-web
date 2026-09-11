"use client"

import { motion, useReducedMotion } from "framer-motion"
import MachineGlyph from "@/components/core/MachineGlyph"
import { physicalFlow } from "@/content/dealer"
import { cn } from "@/lib/utils"

/**
 * Physical workshop tracking: the machine moves Parking → Service bay → Parking → Exit,
 * and its digital record moves with it. Two lanes, one timeline.
 */
export default function WorkshopStory({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const reduce = useReducedMotion()
  const dark = tone === "dark"
  const n = physicalFlow.length
  const stops = physicalFlow.map((_, i) => `${(i / (n - 1)) * 100}%`)
  const times = physicalFlow.map((_, i) => i / (n - 1))
  const digital = ["UNASSIGNED", "IN_PROGRESS", "AWAITING_BILLING", "COMPLETED"]

  return (
    <div className={cn("w-full", className)}>
      {/* Physical lane */}
      <div className="relative">
        <p className={cn("eyebrow mb-3", dark ? "text-blue-300" : "text-navy/50")}>Physical</p>
        <div className="relative h-14">
          <div className={cn("absolute inset-x-0 top-1/2 h-px", dark ? "bg-white/15" : "bg-navy/10")} aria-hidden="true" />
          <div className="absolute inset-x-6 top-0 h-full">
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={reduce ? { left: "100%" } : { left: "0%" }}
              whileInView={{ left: stops }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 4.5, times, ease: "easeInOut", delay: 0.3 }}
            >
              <MachineGlyph className="h-9 w-14" tone={tone} />
            </motion.div>
          </div>
        </div>
        <ol className="relative mt-1 grid grid-cols-4 text-center">
          {physicalFlow.map((s, i) => (
            <li key={i} className="px-1">
              <motion.span
                initial={reduce ? false : { opacity: 0.4 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ delay: 0.3 + times[i] * 4.5, duration: 0.3 }}
                className={cn("block text-[11px] font-semibold uppercase tracking-[0.14em] md:text-xs", dark ? "text-white" : "text-navy")}
              >
                {s.key}
              </motion.span>
              <span className={cn("mt-1 hidden text-xs leading-snug md:block", dark ? "text-blue-100/60" : "text-slate")}>{s.note}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Digital lane */}
      <div className="relative mt-10">
        <p className={cn("eyebrow mb-3", dark ? "text-blue-300" : "text-navy/50")}>Digital record</p>
        <div className="relative h-10">
          <div className={cn("absolute inset-x-0 top-1/2 h-px", dark ? "bg-white/15" : "bg-navy/10")} aria-hidden="true" />
          <div className="absolute inset-x-6 top-0 h-full">
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={reduce ? { left: "100%" } : { left: "0%" }}
              whileInView={{ left: stops }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 4.5, times, ease: "easeInOut", delay: 0.3 }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-md border border-blue bg-white shadow-card" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-sm bg-blue" />
              </span>
            </motion.div>
          </div>
        </div>
        <ol className="mt-1 grid grid-cols-4 text-center">
          {digital.map((d, i) => (
            <li key={d} className="px-1">
              <motion.span
                initial={reduce ? false : { opacity: 0.4 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ delay: 0.3 + times[i] * 4.5, duration: 0.3 }}
                className="inline-block rounded-full border border-blue/30 bg-blue/10 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.04em] text-blue md:text-[11px]"
              >
                {d}
              </motion.span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
