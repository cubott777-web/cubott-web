"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import Reveal from "@/components/motion/Reveal"
import { process } from "@/content/company"
import { cn } from "@/lib/utils"

/**
 * Inside Cubott — seven stages, each opening onto real evidence from the work.
 * A list you can move through, not a timeline graphic.
 */
export default function HowWeBuild() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const stage = process[i]

  return (
    <section className="bg-white py-24 md:py-36" aria-labelledby="how-title">
      <Container>
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Inside Cubott"
            title={<span id="how-title">How we build.</span>}
            lede="Seven stages, each leaving something real behind."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ol className="border-t border-navy/10" role="tablist" aria-label="Stages">
              {process.map((p, idx) => {
                const on = idx === i
                return (
                  <li key={p.key} className="border-b border-navy/10">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-controls={`stage-${p.key}`}
                      id={`tab-${p.key}`}
                      onClick={() => setI(idx)}
                      onFocus={() => setI(idx)}
                      className={cn(
                        "flex w-full items-baseline gap-5 py-4 text-left transition-colors",
                        on ? "text-navy" : "text-navy/45 hover:text-navy/80"
                      )}
                    >
                      <span className={cn("font-mono text-xs", on ? "text-blue" : "text-navy/40")}>{p.n}</span>
                      <span className={cn("text-xl font-semibold tracking-tight md:text-2xl", on && "text-navy")}>{p.title}</span>
                      <span className="ml-auto hidden text-sm text-slate sm:block">{p.summary}</span>
                    </button>
                    {/* Mobile: inline panel under the active tab */}
                    <div className="lg:hidden">
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <StagePanel index={idx} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-28 rounded-2xl border border-navy/10 bg-surface p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={stage.key}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <StagePanel index={i} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function StagePanel({ index }: { index: number }) {
  const p = process[index]
  return (
    <div id={`stage-${p.key}`} role="tabpanel" aria-labelledby={`tab-${p.key}`} className="pb-6 lg:pb-0">
      <p className="text-base leading-relaxed text-navy/80 md:text-lg">{p.text}</p>
      <div className="mt-6 rounded-xl border border-navy/10 bg-white p-5">
        <p className="eyebrow text-blue">{p.evidence.label}</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {p.evidence.items.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-sm text-navy">
              <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
              <span className={/[a-z]_[a-z]/.test(it) ? "font-mono text-[13px]" : ""}>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
