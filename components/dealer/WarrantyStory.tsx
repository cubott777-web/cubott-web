"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Warranty runs alongside service execution. From the job card, two paths progress at the same time
 * and meet at service completion. Service does not wait for the manufacturer's decision.
 */
const service = ["JOB CARD", "PARTS SENT TO STORE", "ISSUED BY STORE", "USED DURING SERVICE", "SERVICE COMPLETE"]
const warranty = ["SENT FOR APPROVAL", "APPROVED / REJECTED", "WAREHOUSE ISSUE", "DEALER ACKNOWLEDGMENT"]

export default function WarrantyStory({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const reduce = useReducedMotion()
  const dark = tone === "dark"
  const W = 1000
  const yS = 60
  const yW = 180
  const xs = (i: number, n: number) => 80 + (i * (W - 160)) / (n - 1)
  const line = dark ? "rgba(255,255,255,0.18)" : "rgba(11,31,59,0.12)"
  const chipBg = dark ? "#0B1F3B" : "#FFFFFF"
  const chipStroke = dark ? "rgba(255,255,255,0.18)" : "rgba(11,31,59,0.15)"
  const text = dark ? "#FFFFFF" : "#0B1F3B"

  const drawProps = (delay: number, duration = 1.6) => ({
    initial: reduce ? { pathLength: 1 } : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: "-15% 0px" },
    transition: { duration, delay, ease: "linear" as const },
  })

  const chip = (label: string, x: number, y: number, delay: number) => {
    const w = label.length * 7.4 + 28
    return (
      <motion.g
        key={label}
        initial={reduce ? false : { opacity: 0.35 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ delay, duration: 0.3 }}
      >
        <rect x={x - w / 2} y={y - 14} width={w} height={28} rx={14} fill={chipBg} stroke={chipStroke} />
        <circle cx={x - w / 2 + 14} cy={y} r={3} fill="#2563EB" />
        <text x={x - w / 2 + 24} y={y + 4} fontSize={11} fontWeight={600} letterSpacing={1.2} fill={text} fontFamily="Inter, system-ui, sans-serif">
          {label}
        </text>
      </motion.g>
    )
  }

  return (
    <div className={cn("w-full overflow-x-auto no-scrollbar", className)}>
      <svg viewBox={`0 0 ${W} 240`} className="min-w-[760px] w-full" role="img" aria-label="Service path and warranty path progressing in parallel from the job card to service completion">
        {/* Service path */}
        <path d={`M ${xs(0, 5)} ${yS} H ${xs(4, 5)}`} stroke={line} strokeWidth={1.5} fill="none" />
        <motion.path d={`M ${xs(0, 5)} ${yS} H ${xs(4, 5)}`} stroke="#2563EB" strokeWidth={1.5} fill="none" {...drawProps(0.2, 2.4)} />

        {/* Branch down from job card */}
        <path d={`M ${xs(0, 5)} ${yS} C ${xs(0, 5)} 130, ${xs(0, 4)} 110, ${xs(0, 4)} ${yW}`} stroke={line} strokeWidth={1.5} fill="none" />
        <motion.path d={`M ${xs(0, 5)} ${yS} C ${xs(0, 5)} 130, ${xs(0, 4)} 110, ${xs(0, 4)} ${yW}`} stroke="#60A5FA" strokeWidth={1.5} fill="none" {...drawProps(0.2, 0.5)} />

        {/* Warranty path */}
        <path d={`M ${xs(0, 4)} ${yW} H ${xs(3, 4)}`} stroke={line} strokeWidth={1.5} fill="none" />
        <motion.path d={`M ${xs(0, 4)} ${yW} H ${xs(3, 4)}`} stroke="#60A5FA" strokeWidth={1.5} fill="none" {...drawProps(0.7, 2.4)} />

        {/* Rejoin: acknowledgment back to completion */}
        <path d={`M ${xs(3, 4)} ${yW} C ${xs(3, 4)} 110, ${xs(4, 5)} 130, ${xs(4, 5)} ${yS}`} stroke={line} strokeWidth={1.5} fill="none" strokeDasharray="3 4" />

        {service.map((s, i) => chip(s, xs(i, 5), yS, 0.2 + i * 0.6))}
        {warranty.map((s, i) => chip(s, xs(i, 4), yW, 0.7 + i * 0.8))}

        <text x={xs(0, 5) - 40} y={yS - 28} fontSize={10} fontWeight={600} letterSpacing={2} fill={dark ? "#93C5FD" : "#64748B"} fontFamily="Inter, system-ui, sans-serif">
          SERVICE PATH
        </text>
        <text x={xs(0, 4) - 40} y={yW + 36} fontSize={10} fontWeight={600} letterSpacing={2} fill={dark ? "#93C5FD" : "#64748B"} fontFamily="Inter, system-ui, sans-serif">
          WARRANTY PATH — IN PARALLEL
        </text>
      </svg>
    </div>
  )
}
