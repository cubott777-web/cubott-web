"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { EASE, DUR, VIEW } from "./tokens"

interface RowRuleProps {
  className?: string
  delay?: number
  /** Where the line sits inside a `relative` parent. */
  position?: "top" | "bottom"
  tone?: "light" | "dark"
}

/** A divider that draws itself in from the left as its row arrives. */
export default function RowRule({ className, delay = 0, position = "bottom", tone = "light" }: RowRuleProps) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEW}
      transition={{ duration: DUR.slow, delay, ease: EASE }}
      className={cn(
        "absolute inset-x-0 h-px origin-left",
        position === "bottom" ? "bottom-0" : "top-0",
        tone === "dark" ? "bg-white/10" : "bg-navy/10",
        className
      )}
    />
  )
}
