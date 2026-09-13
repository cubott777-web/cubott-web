"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowRight } from "lucide-react"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import { scrollStore, sectionAt, ramp, smooth } from "@/components/three/scroll-store"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import Eyebrow from "@/components/ui/Eyebrow"
import BrowserFrame from "@/components/ui/BrowserFrame"
import Reveal from "@/components/motion/Reveal"
import CubottMark from "@/components/brand/CubottMark"
import SceneVideo from "@/components/home/SceneVideo"
import StoryOverlay from "@/components/home/StoryOverlay"
import { dealer } from "@/content/dealer"
import { screens } from "@/content/screens"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

const CubeScene = dynamic(() => import("@/components/three/CubeScene"), { ssr: false })

/** Dark bookends: the hero and story open the page, the close ends it. Everything between is light. */
const DARK = new Set([0, 1, 5])

/** The story's three beats. One blue phrase on the whole page — it lives here, in beat two. */
const BEATS = [
  {
    key: "complexity",
    label: "Complexity",
    title: "Work lives in phones, spreadsheets, emails and memory.",
    text: "Every business runs on moving things. Most of them are held together by people remembering.",
  },
  {
    key: "connection",
    label: "Connection",
    title: (
      <>
        Cubott brings it into <span className="ink-sky">one system.</span>
      </>
    ),
    text: "One place. One record. One version of the truth.",
  },
  {
    key: "clarity",
    label: "Clarity",
    title: "The system does the routine work.",
    text: "Tasks move themselves. The right person is told. Nothing waits on memory.",
  },
]

const BUILDS = [
  {
    n: "01",
    title: "Products",
    text: "Software we design, build and run for a whole sector — multi-tenant, role-based, supported by the team that made it.",
    href: "/products",
    cta: "Our products",
  },
  {
    n: "02",
    title: "Business systems",
    text: "Platforms that bring people, process and data into one place, with real gates: what can happen next, and who can make it happen.",
    href: "/solutions",
    cta: "Solutions",
  },
  {
    n: "03",
    title: "Custom software",
    text: "Applications shaped by your roles, your rules and your exceptions. No template to fit inside.",
    href: "/solutions",
    cta: "How we approach it",
  },
]

const STEPS = [
  { n: "01", title: "Start with your pain", text: "We sit with your team and map how the work really happens — exceptions included." },
  { n: "02", title: "Build around you", text: "Your roles, your rules, your language. Structure first, screens second." },
  { n: "03", title: "Stay until it works", text: "Rollout, training, the first messy weeks. Then the years after." },
]

const PROOF_FACTS = [
  "Nine roles across dealer, manufacturer and platform",
  "Multi-tenant from the first release",
  "Every parts movement on an immutable audit log",
]

/**
 * Homepage: hero → story (pinned, three beats) → what we build → how we work → proof → close.
 * One cube, one journey; sections just tell it where to be.
 */
export default function BrandStory() {
  const root = useRef<HTMLDivElement>(null)
  const beatEls = useRef<(HTMLDivElement | null)[]>([])
  const barEls = useRef<(HTMLSpanElement | null)[]>([])
  const barsEl = useRef<HTMLOListElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION)
  const [section, setSection] = useState(0)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  // Reduced motion gets the static mark; a device without WebGL falls back inside the Canvas itself.
  const live = mounted && !reduced

  // Page phase = section index + progress; the pinned story's progress spans the whole pin.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const sections = Array.from(el.querySelectorAll<HTMLElement>("[data-section]"))
    let current = -1
    const update = () => {
      const vh = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - vh
      let phase = 0
      for (let k = 0; k < sections.length; k++) {
        const r = sections[k].getBoundingClientRect()
        if (r.top > 0 && k > 0) break
        const pinned = sections[k].dataset.section === "story"
        const last = k === sections.length - 1
        // The pinned story's progress spans the pin; the last section's spans whatever scroll is left, so the
        // cube can take its leave before the footer arrives.
        const span = pinned ? r.height - vh : last ? Math.min(r.height, maxScroll - (r.top + window.scrollY)) : r.height
        phase = k + Math.min(0.9999, Math.max(0, -r.top / Math.max(1, span)))
      }
      scrollStore.phase = phase
      const { i, t } = sectionAt(phase)
      // Palette follows whichever section sits under the middle of the viewport, so a dark section
      // turns the ground dark as it arrives rather than once it reaches the top.
      let mid = i
      for (let k = 0; k < sections.length; k++) {
        const r = sections[k].getBoundingClientRect()
        if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) mid = k
      }
      if (mid !== current) {
        current = mid
        setSection(mid)
      }
      // Story beats crossfade in place, driven straight from scroll.
      if (i === 1 || beatEls.current.some(Boolean)) {
        BEATS.forEach((_, b) => {
          const beat = beatEls.current[b]
          const bar = barEls.current[b]
          const start = b / BEATS.length
          const end = (b + 1) / BEATS.length
          const leave = b === BEATS.length - 1 ? 1 - ramp(t, 0.93, 0.99) : 1 - ramp(t, end - 0.06, end - 0.01)
          const on = i === 1 ? ramp(t, start, start + 0.05) * leave : b === 0 && i < 1 ? 1 : 0
          const leaving = i === 1 && t > end - 0.06
          if (beat) {
            beat.style.opacity = String(on)
            beat.style.transform = reduced ? "" : `translateY(${(1 - smooth(on)) * (leaving ? -10 : 14)}px)`
            beat.style.visibility = on > 0.01 ? "visible" : "hidden"
          }
          if (bar) bar.style.transform = `scaleX(${i === 1 ? ramp(t, start, end) : i > 1 ? 1 : 0})`
          if (barsEl.current) barsEl.current.style.opacity = String(i === 1 ? 1 - ramp(t, 0.93, 0.99) : i < 1 ? 1 : 0)
        })
      }
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [reduced])

  const dark = DARK.has(section)
  const proofScreen = screens.dashboard ?? screens.supervisor ?? Object.values(screens)[0]

  return (
    <div ref={root} className={cn("relative", dark && "dark-scene")}>
      {/* Ground: one continuous surface under every section; colour follows the section, texture only in the dark */}
      <div aria-hidden="true" className={cn("fixed inset-0 -z-10 transition-colors duration-700", dark ? "bg-navy-900" : "bg-[#F6F8FB]")}>
        <div
          className={cn("absolute inset-0 iso-grid transition-opacity duration-700", dark ? "opacity-100" : "opacity-0")}
          style={{ maskImage: "radial-gradient(ellipse at 50% 45%, black 30%, transparent 78%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, black 30%, transparent 78%)" }}
        />
        <div className={cn("absolute inset-0 transition-opacity duration-700", dark ? "opacity-100" : "opacity-0")} style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(37,99,235,0.18), transparent 60%)" }} />
        <div className={cn("grain absolute inset-0 mix-blend-overlay transition-opacity duration-700", dark ? "opacity-60" : "opacity-0")} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-screen opacity-50 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" aria-hidden="true">
        <SceneVideo src="/video/brand.mp4" />
      </div>
      {live && <CubeScene />}
      {live && <StoryOverlay />}

      <div className={cn("relative z-10 transition-colors duration-500", dark ? "text-white" : "text-navy")}>
        {/* 0 — Hero. Copy left, cube right; nothing waits for a reveal. */}
        <section data-section="hero" data-scene="dark" className="relative flex min-h-screen items-center pb-16 pt-[calc(var(--header-h)+3rem)] lg:pb-24 lg:pt-[calc(var(--header-h)+2rem)]" aria-labelledby="hero-title">
          <Container className="w-full">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Eyebrow tone="dark">Cubott · Technology for complex businesses</Eyebrow>
                <h1 id="hero-title" className="display-2xl mt-7 max-w-[13ch]">
                  Systems for businesses that don&apos;t fit a template.
                </h1>
                <p className="mt-7 max-w-xl text-lg text-blue-100/75 md:text-xl md:leading-relaxed">
                  We build the software products, business systems and custom applications that run complex operations — around the way
                  your business actually works.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button href="/contact" size="lg" variant="primary-dark" arrow>
                    Start a conversation
                  </Button>
                  <Button href="/work" size="lg" variant="ghost-dark" arrow>
                    See our work
                  </Button>
                </div>
                <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-sm text-blue-100/60" aria-label="What to expect">
                  <li>Multi-tenant platforms in production</li>
                  <li>Designed around real workflows</li>
                  <li>Built and supported by the same team</li>
                </ul>
              </div>
            </div>
          </Container>
          {!live && <StaticMark side="right" />}
          {/* Phones: reserve the bottom of the hero for the cube */}
          <div aria-hidden="true" className="h-[38vh] w-full lg:hidden" />
        </section>

        {/* 1 — Story. Pinned for 3 beats; copy swaps in place, the cube and the overlay do the rest. */}
        <section data-section="story" data-scene="dark" className="relative h-[290vh]" aria-label="Complexity, connection, clarity">
          <div className="sticky top-0 flex h-screen items-start pt-[calc(var(--header-h)+1.5rem)] lg:items-center lg:pt-[var(--header-h)]">
            <Container className="w-full">
              <div className="grid lg:grid-cols-12">
                <div className="relative min-h-[17rem] lg:col-span-6 lg:min-h-[19rem]">
                  {BEATS.map((b, k) => (
                    <div
                      key={b.key}
                      ref={(el) => {
                        beatEls.current[k] = el
                      }}
                      className="absolute inset-x-0 top-0 will-change-transform"
                      style={{ opacity: k === 0 ? 1 : 0, visibility: k === 0 ? "visible" : "hidden" }}
                    >
                      <Eyebrow tone="dark">{b.label}</Eyebrow>
                      <h2 className="display-lg mt-6 max-w-[15ch]">{b.title}</h2>
                      <p className="mt-6 max-w-md text-lg text-blue-100/70 md:text-xl">{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Beat progress: three rules, filled by scroll */}
              <ol ref={barsEl} className="mt-8 flex max-w-xs gap-2" aria-hidden="true">
                {BEATS.map((b, k) => (
                  <li key={b.key} className="h-px flex-1 overflow-hidden bg-white/15">
                    <span
                      ref={(el) => {
                        barEls.current[k] = el
                      }}
                      className="block h-full w-full origin-left bg-blue-300"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </li>
                ))}
              </ol>
            </Container>
            {!live && <StaticMark side="right" />}
          </div>
        </section>

        {/* 2 — What Cubott builds */}
        <section data-section="what" className="relative py-24 md:py-32 lg:py-40" aria-labelledby="what-title">
          <Container>
            <Reveal>
              <Eyebrow index="01">What Cubott builds</Eyebrow>
              <h2 id="what-title" className="display-lg mt-5 max-w-[16ch]">
                Three kinds of work. One way of building.
              </h2>
              <p className="lede mt-5 max-w-2xl">
                Whether it&apos;s a product for a whole sector or an application for one team, we start with how the work actually happens.
              </p>
            </Reveal>
            <ul className="mt-16 grid gap-10 border-t border-navy/10 pt-10 md:grid-cols-3 md:gap-8">
              {BUILDS.map((b, k) => (
                <Reveal as="li" key={b.n} delay={0.08 * k} className="flex flex-col">
                  <span className="font-mono text-xs text-blue">{b.n}</span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{b.title}</h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate md:text-base">{b.text}</p>
                  <Link href={b.href} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-blue">
                    {b.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        {/* 3 — How we work */}
        <section data-section="how" className="relative py-24 md:py-32" aria-labelledby="how-title">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <Eyebrow index="02">How we work</Eyebrow>
                <h2 id="how-title" className="display-md mt-5">
                  Your pain first. Our software second.
                </h2>
                <Link href="/solutions" className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-blue">
                  The full process
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Reveal>
              <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6 lg:col-span-8">
                <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-navy/15 md:block" />
                {STEPS.map((s, k) => (
                  <Reveal as="li" key={s.n} delay={0.1 * k} className="relative md:pt-8">
                    <span aria-hidden="true" className="absolute left-0 top-0 hidden h-[15px] w-[15px] rounded-full border-2 border-blue bg-[#F6F8FB] md:block" />
                    <span className="font-mono text-xs text-blue">{s.n}</span>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.text}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* 4 — Proof: one real system, shown as it is */}
        <section data-section="proof" className="relative py-24 md:py-32 lg:py-40" aria-labelledby="proof-title">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <Eyebrow index="03">Proof</Eyebrow>
                <h2 id="proof-title" className="display-md mt-5">
                  {dealer.name}, in production.
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-slate md:text-base">{dealer.summary}</p>
                <ul className="mt-6 space-y-2.5 text-[15px] text-navy/80">
                  {PROOF_FACTS.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/products/dealer-management" variant="secondary" arrow>
                    See the product
                  </Button>
                  <Button href="/work" variant="ghost" arrow>
                    Our work
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-8">
                <BrowserFrame
                  src={proofScreen?.src}
                  alt={proofScreen?.alt ?? "Dealer Management supervisor dashboard"}
                  caption={proofScreen?.caption ?? "Captured from the running application. No redesign for the website."}
                  ratio="16 / 10"
                />
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 5 — Close. Copy left, cube right, one action. */}
        <section id="start" data-section="cta" data-scene="dark" className="relative flex min-h-[85vh] items-center py-24 pt-[calc(var(--header-h)+4rem)] lg:py-32" aria-labelledby="cta-title">
          <Container className="w-full">
            <div className="grid lg:grid-cols-12">
              <Reveal className="lg:col-span-6">
                <Eyebrow tone="dark">After launch</Eyebrow>
                <h2 id="cta-title" className="display-xl mt-6 max-w-[12ch]">
                  Help is a call away.
                </h2>
                <p className="mt-6 max-w-md text-lg text-blue-100/70 md:text-xl">Support is the people who built it. Tell us what isn&apos;t working, and we&apos;ll tell you what we&apos;d build.</p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button href="/contact" size="lg" variant="primary-dark" arrow>
                    Start a conversation
                  </Button>
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-sm font-medium text-blue-100/70 underline-offset-4 hover:text-white hover:underline">
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </Reveal>
            </div>
          </Container>
          {!live && <StaticMark side="right" />}
          <div aria-hidden="true" className="h-[34vh] w-full lg:hidden" />
        </section>
      </div>
    </div>
  )
}

/** Reduced-motion / pre-mount stand-in for the 3D object. */
function StaticMark({ side }: { side: "right" }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-y-0 hidden w-5/12 items-center justify-center lg:flex", side === "right" && "right-0")}>
      <CubottMark className="h-56 w-auto" />
    </div>
  )
}
