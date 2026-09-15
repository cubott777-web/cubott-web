"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import Eyebrow from "./Eyebrow"
import TextReveal from "@/components/motion/TextReveal"
import { EASE, DUR, VIEW } from "@/components/motion/tokens"

interface SectionHeadingProps {
  eyebrow?: string
  index?: string
  title: React.ReactNode
  lede?: React.ReactNode
  tone?: "light" | "dark"
  align?: "left" | "center"
  size?: "lg" | "md"
  className?: string
  as?: "h1" | "h2" | "h3"
  id?: string
}

/**
 * Section opener with its own choreography: eyebrow fades, the title rises word by word out of a
 * mask, the lede follows. Pass a string title (with `id`) to get the word reveal; a node title gets
 * a single masked line instead.
 */
export default function SectionHeading({
  eyebrow,
  index,
  title,
  lede,
  tone = "light",
  align = "left",
  size = "lg",
  className,
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  const reduce = useReducedMotion()
  const dark = tone === "dark"
  const titleClass = cn(size === "lg" ? "display-lg" : "display-md", dark ? "text-white" : "text-navy")
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEW,
    transition: { duration: DUR.base, delay, ease: EASE },
  })

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <motion.div {...fade(0)}>
          <Eyebrow tone={tone} index={index} className={cn("mb-5", align === "center" && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        </motion.div>
      )}
      {typeof title === "string" ? (
        <TextReveal as={Tag} id={id} className={titleClass} delay={0.1}>
          {title}
        </TextReveal>
      ) : (
        <Tag id={id} className={cn(titleClass, "overflow-hidden pb-[0.12em] -mb-[0.12em]")}>
          <motion.span
            initial={reduce ? false : { y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: DUR.base, delay: 0.1, ease: EASE }}
            className="block"
          >
            {title}
          </motion.span>
        </Tag>
      )}
      {lede && (
        <motion.p {...fade(0.3)} className={cn("lede mt-5 max-w-2xl", dark && "text-blue-100/70", align === "center" && "mx-auto")}>
          {lede}
        </motion.p>
      )}
    </div>
  )
}
