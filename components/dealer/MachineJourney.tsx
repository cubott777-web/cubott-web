"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import Container from "@/components/ui/Container"
import Eyebrow from "@/components/ui/Eyebrow"
import BrowserFrame from "@/components/ui/BrowserFrame"
import MachineGlyph from "@/components/core/MachineGlyph"
import { journey } from "@/content/dealer"
import { screens } from "@/content/screens"
import { cn } from "@/lib/utils"

/**
 * One machine's journey through Dealer Management.
 * Desktop: the section pins; scrolling moves the machine down the rail and swaps the stage.
 * Mobile / reduced motion: the same stations as a vertical, readable sequence.
 */

function Stage({ index, tone }: { index: number; tone: "light" | "dark" }) {
  const s = journey[index]
  const shot = screens[s.key]
  const dark = tone === "dark"
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className={cn("eyebrow", dark ? "text-blue-300" : "text-blue")}>
          {String(index + 1).padStart(2, "0")} / {journey.length}
        </span>
        {"status" in s && s.status && (
          <span className="rounded-full border border-blue/30 bg-blue/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-[0.06em] text-blue">
            {s.status}
          </span>
        )}
      </div>
      <h3 className={cn("display-md mt-3", dark ? "text-white" : "text-navy")}>{s.label}</h3>
      <p className={cn("mt-1 text-sm font-medium", dark ? "text-blue-200/70" : "text-navy/50")}>{s.role}</p>
      <p className={cn("mt-4 max-w-md text-[15px] leading-relaxed md:text-base", dark ? "text-blue-100/80" : "text-slate")}>
        {s.detail}
      </p>
      <BrowserFrame
        className="mt-6"
        src={shot?.src}
        alt={shot?.alt ?? `Dealer Management — ${s.label}`}
        tone={tone}
        ratio="16 / 9"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    </div>
  )
}

export default function MachineJourney({ tone = "light" }: { tone?: "light" | "dark" }) {
  const section = useRef<HTMLElement>(null)
  const rail = useRef<HTMLOListElement>(null)
  const marker = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const large = useMediaQuery("(min-width: 1024px) and (min-height: 760px)")
  const reduced = useMediaQuery(REDUCED_MOTION)
  const pinned = large && !reduced
  const dark = tone === "dark"

  useGSAP(
    () => {
      if (!pinned || !section.current) return
      const st = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(journey.length - 1, Math.floor(self.progress * journey.length))
          setActive((prev) => (prev === i ? prev : i))
        },
      })
      return () => st.kill()
    },
    { scope: section, dependencies: [pinned], revertOnUpdate: true }
  )

  // Move the machine marker to the active row.
  useEffect(() => {
    if (!pinned || !rail.current || !marker.current) return
    const row = rail.current.children[active] as HTMLElement | undefined
    if (!row) return
    gsap.to(marker.current, { y: row.offsetTop + row.offsetHeight / 2, duration: 0.5, ease: "power3.out" })
  }, [active, pinned])

  if (!pinned) {
    return (
      <section ref={section} className={cn(dark ? "bg-navy text-white" : "bg-surface", "py-20 md:py-28")} aria-labelledby="journey-title">
        <Container>
          <Eyebrow tone={tone} index="04">One machine&apos;s journey</Eyebrow>
          <h2 id="journey-title" className={cn("display-lg mt-5", dark ? "text-white" : "text-navy")}>
            Follow one machine through the whole system.
          </h2>
          <ol className="relative mt-12 flex flex-col gap-14 border-l border-navy/15 pl-8 md:pl-10">
            {journey.map((s, i) => (
              <li key={s.key} className="relative">
                <span
                  aria-hidden="true"
                  className={cn("absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border bg-white md:-left-[49px]", dark ? "border-blue-400" : "border-blue")}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                </span>
                <Stage index={i} tone={tone} />
              </li>
            ))}
          </ol>
        </Container>
      </section>
    )
  }

  return (
    <section
      ref={section}
      className={cn("relative", dark ? "bg-navy text-white" : "bg-surface")}
      style={{ height: `${journey.length * 60 + 100}vh` }}
      aria-labelledby="journey-title"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-[72px]">
        <Container className="w-full">
          <div className="grid grid-cols-12 gap-10">
            {/* Rail */}
            <div className="col-span-5">
              <Eyebrow tone={tone} index="04">One machine&apos;s journey</Eyebrow>
              <h2 id="journey-title" className={cn("display-md mt-4 max-w-md", dark ? "text-white" : "text-navy")}>
                Follow one machine through the whole system.
              </h2>
              <div className="relative mt-8">
                <div
                  ref={marker}
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-1 top-0 -translate-y-1/2"
                >
                  <MachineGlyph className="h-7 w-11" tone={tone} />
                </div>
                <ol ref={rail} className="ml-14 border-l border-navy/15 pl-6" aria-label="Stations">
                  {journey.map((s, i) => {
                    const on = i === active
                    const done = i < active
                    return (
                      <li key={s.key} className="relative flex items-center gap-3 py-[5px]">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute -left-[29px] h-2.5 w-2.5 rounded-full border-2 transition-colors duration-300",
                            on ? "border-blue bg-blue" : done ? "border-blue/60 bg-blue/60" : dark ? "border-white/30 bg-navy" : "border-navy/25 bg-surface"
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const top = section.current!.offsetTop + ((i + 0.5) / journey.length) * (section.current!.offsetHeight - window.innerHeight)
                            window.scrollTo({ top, behavior: "smooth" })
                          }}
                          aria-current={on ? "step" : undefined}
                          className={cn(
                            "text-left text-[15px] font-medium tracking-tight transition-all duration-300",
                            on ? (dark ? "text-white" : "text-navy") + " text-lg" : dark ? "text-white/45 hover:text-white/80" : "text-navy/40 hover:text-navy/70"
                          )}
                        >
                          {s.label}
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>

            {/* Stage */}
            <div className="col-span-7">
              <div className="relative min-h-[520px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Stage index={active} tone={tone} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
