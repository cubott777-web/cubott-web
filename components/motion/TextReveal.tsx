"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { EASE, DUR, STAGGER, VIEW } from "./tokens"

type Tag = "h1" | "h2" | "h3" | "p" | "span"

interface TextRevealProps {
  children: string
  as?: Tag
  className?: string
  id?: string
  delay?: number
  /** Play on mount instead of on scroll (page heroes). */
  immediate?: boolean
}

/**
 * Masked word reveal: each word rises out of its own clip box. Same treatment as the landing
 * headline, so every heading on the site arrives the same way.
 */
export default function TextReveal({ children, as = "h2", className, id, delay = 0, immediate = false }: TextRevealProps) {
  const reduce = useReducedMotion()
  const Tag = as
  const words = children.split(" ")

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    )
  }

  const trigger = immediate ? { animate: "show" as const } : { whileInView: "show" as const, viewport: VIEW }
  const parent = { hidden: {}, show: { transition: { staggerChildren: STAGGER.word, delayChildren: delay } } }

  return (
    <Tag id={id} className={className} aria-label={children}>
      <motion.span aria-hidden="true" initial="hidden" {...trigger} variants={parent} className="inline">
        {words.map((word, i) => (
          <span key={i} className={cn("inline-block overflow-hidden align-top", "pb-[0.14em] -mb-[0.14em] pt-[0.06em] -mt-[0.06em]", i < words.length - 1 && "mr-[0.26em]")}>
            <motion.span
              variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
              transition={{ duration: DUR.base, ease: EASE }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
