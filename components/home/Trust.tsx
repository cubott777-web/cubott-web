"use client"

import { motion, useReducedMotion } from "framer-motion"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import { trust } from "@/content/dealer"
import { cn } from "@/lib/utils"

/** Control, shown as a chain: identity → permissions → workflow → audit → accountability. */
export default function Trust({ tone = "light" }: { tone?: "light" | "dark" }) {
  const reduce = useReducedMotion()
  const dark = tone === "dark"
  return (
    <section className={cn(dark ? "bg-navy-900 text-white" : "bg-white", "py-14 md:py-20")} aria-labelledby="trust-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="08"
              eyebrow="Trust"
              tone={tone}
              id="trust-title"
              title="Systems people can rely on."
              lede="Not a promise about security — a chain of controls you can follow."
            />
          </div>
          <div className="lg:col-span-7">
            <ol className="relative border-l border-blue/30 pl-8 md:pl-10" aria-label="Chain of controls">
              {trust.map((t, i) => (
                <motion.li
                  key={t.key}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pb-9 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-[41px] top-1.5 grid h-5 w-5 place-items-center rounded-full border md:-left-[49px]",
                      dark ? "border-blue-400 bg-navy-900" : "border-blue bg-white"
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                  </span>
                  <h3 className={cn("eyebrow", dark ? "text-white" : "text-navy")}>{t.key}</h3>
                  <p className={cn("mt-2 max-w-lg text-[15px] leading-relaxed md:text-base", dark ? "text-blue-100/75" : "text-slate")}>{t.note}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
