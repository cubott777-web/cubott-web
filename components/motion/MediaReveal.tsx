"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { EASE, DUR, VIEW } from "./tokens"

interface MediaRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/** Screens and clips open like a shutter and settle from a slight zoom — the image is being placed, not switched on. */
export default function MediaReveal({ children, className, delay = 0 }: MediaRevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { clipPath: "inset(10% 4% 10% 4% round 16px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 }}
      viewport={VIEW}
      transition={{ duration: DUR.slow, delay, ease: EASE }}
      className={cn("will-change-[clip-path]", className)}
    >
      <motion.div
        initial={reduce ? false : { scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={VIEW}
        transition={{ duration: DUR.slow + 0.2, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
