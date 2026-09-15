"use client"

import { motion, useReducedMotion } from "framer-motion"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import Reveal from "@/components/motion/Reveal"
import { architecture } from "@/content/dealer"
import { cn } from "@/lib/utils"

/**
 * Beautiful software needs strong foundations.
 * An exploded stack: the experience on top, connected down to the infrastructure beneath it.
 */
export default function Engineering({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const reduce = useReducedMotion()
  const dark = tone === "dark"
  const layers = architecture.layers

  return (
    <section
      data-scene={dark ? "dark" : undefined}
      className={cn(dark ? "bg-navy text-white" : "bg-surface", "py-14 md:py-20")}
      aria-labelledby="eng-title"
    >
      <Container>
        <SectionHeading
          index="07"
          eyebrow="Engineering"
          tone={tone}
          id="eng-title"
          title="Beautiful software needs strong foundations."
          lede="What a user sees is the top layer. Underneath: APIs, rules, data and infrastructure."
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ol className="relative" aria-label="System layers">
              {layers.map((l, i) => (
                <motion.li
                  key={l.key}
                  initial={reduce ? false : { opacity: 0, y: -18 * (layers.length - i) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div
                    className={cn(
                      "grid grid-cols-[120px_1fr] items-center gap-4 rounded-lg border px-5 py-4 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 md:grid-cols-[160px_1fr] md:px-6",
                      dark ? "hover:border-blue-400/50" : "hover:border-blue/40 hover:shadow-frame",
                      dark ? "border-white/10 bg-navy-800/80" : "border-navy/10 bg-white shadow-card",
                      i === 0 && (dark ? "border-blue-400/40" : "border-blue/40")
                    )}
                  >
                    <span className={cn("eyebrow", i === 0 ? (dark ? "text-blue-300" : "text-blue") : dark ? "text-white/80" : "text-navy")}>{l.key}</span>
                    <span className={cn("text-sm leading-snug md:text-[15px]", dark ? "text-blue-100/70" : "text-slate")}>{l.note}</span>
                  </div>
                  {i < layers.length - 1 && (
                    <span aria-hidden="true" className={cn("mx-auto block h-4 w-px", dark ? "bg-blue-400/50" : "bg-blue/40")} />
                  )}
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <p className={cn("eyebrow", dark ? "text-blue-300" : "text-blue")}>Dealer Management — as documented</p>
              <ul className="mt-5 divide-y" aria-label="Documented technical characteristics">
                {architecture.characteristics.map((c) => (
                  <li key={c} className={cn("py-3 text-[15px]", dark ? "divide-white/10 border-white/10 text-blue-50" : "border-navy/10 text-navy")}>
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
