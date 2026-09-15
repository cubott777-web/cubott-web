"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

/**
 * Depth for the dark page heroes: a soft blue pool that drifts up as you scroll away and the
 * isometric ground the cube lives on, so interior pages share the landing page's atmosphere.
 */
export default function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 iso-grid [mask-image:radial-gradient(ellipse_at_80%_40%,black_10%,transparent_70%)]" />
      <motion.div
        style={{ y, opacity }}
        className="absolute -right-[10%] top-[-20%] h-[120%] w-[70%]"
      >
        <div className="h-full w-full" style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.28), rgba(37,99,235,0.08) 45%, transparent 68%)" }} />
      </motion.div>
      <div className="grain absolute inset-0 opacity-50 mix-blend-overlay" />
    </div>
  )
}
