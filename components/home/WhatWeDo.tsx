"use client"

import { motion, useReducedMotion } from "framer-motion"
import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"

const ROWS = [
  {
    title: "Business Systems",
    text: "We connect people, processes, data and operations into one system built around how your business works.",
  },
  {
    title: "Digital Products",
    text: "We design and build complete software products for specific industries and real-world problems.",
  },
  {
    title: "Custom Software",
    text: "When existing software doesn't fit, we build what does.",
  },
]

const EASE = [0.22, 1, 0.36, 1] as const
const view = { once: true, margin: "-20% 0px -20% 0px" } as const

/**
 * What we do. The heading is a composition, not a line: an outlined italic WHAT that drifts in from
 * the left, WE that drops in over it, DO that slides in from the right — staggered as the section
 * arrives. Directly beneath it, in plain language, is Cubott's actual proposition. Then three areas.
 */
export default function WhatWeDo() {
  const reduce = useReducedMotion()
  const enter = (from: { x?: number; y?: number }, delay: number) => ({
    initial: reduce ? false : { opacity: 0, ...from },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: view,
    transition: { duration: 1, delay, ease: EASE },
  })

  return (
    <section className="relative overflow-hidden bg-[#F6F8FB] py-20 md:py-24 lg:py-28" aria-labelledby="what-title">
      <Container>
        <h2 id="what-title" className="stack-title relative" aria-label="What we do">
          <motion.span aria-hidden="true" {...enter({ x: -80 }, 0)} className="stack-outline block">
            What
          </motion.span>
          <motion.span aria-hidden="true" {...enter({ y: -60 }, 0.12)} className="stack-solid block">
            we
          </motion.span>
          <motion.span aria-hidden="true" {...enter({ x: 80 }, 0.24)} className="stack-do block">
            <span className="ink-blue">do.</span>
          </motion.span>
        </h2>

        <motion.p {...enter({ y: 14 }, 0.5)} className="mt-8 max-w-2xl text-xl font-medium leading-snug text-navy md:mt-10 md:text-2xl">
          We turn complex business problems into working technology.
        </motion.p>

        <ol className="mt-12 border-t border-navy/10 md:mt-16">
          {ROWS.map((r, k) => (
            <Reveal as="li" key={r.title} delay={0.08 * k} className="grid gap-4 border-b border-navy/10 py-7 md:grid-cols-12 md:gap-8 md:py-8">
              <h3 className="text-2xl font-semibold tracking-tight text-navy md:col-span-5 md:text-[2rem] md:leading-tight">{r.title}</h3>
              <p className="max-w-lg text-[15px] leading-relaxed text-slate md:col-span-6 md:col-start-7 md:pt-1.5 md:text-base">{r.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
