"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { ScrollTrigger, useGSAP } from "@/components/motion/gsap"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import { scrollStore, sceneAt, SCENES } from "@/components/three/scroll-store"
import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"
import CubottMark from "@/components/brand/CubottMark"
import ContactForm from "@/components/contact/ContactForm"
import SceneVideo from "@/components/home/SceneVideo"
import StoryOverlay from "@/components/home/StoryOverlay"
import { cn } from "@/lib/utils"

const CubeScene = dynamic(() => import("@/components/three/CubeScene"), { ssr: false })

/** Dark scenes bookend the story: the chaos, the moment it becomes one system, and the close. */
const DARK = new Set([0, 1, 6])

const RAIL = ["Moving things", "One system", "It does the work", "Your pain first", "Built around you", "We stay", "A call away"]

/**
 * Homepage = the Cubott story, product-neutral:
 * moving things → one system → it does the work → we start with your pain → built around you →
 * we stay until it works → help is a call away.
 */
export default function BrandStory() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION)
  const [scene, setScene] = useState(0)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  // Reduced motion gets the static mark; a device without WebGL falls back inside the Canvas itself.
  const live = mounted && !reduced

  useGSAP(
    () => {
      if (!root.current) return
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollStore.progress = self.progress
          const { i } = sceneAt(self.progress)
          setScene((prev) => (prev === i ? prev : i))
        },
      })
      return () => st.kill()
    },
    { scope: root }
  )

  const dark = DARK.has(scene)

  // Dev aid: jump the story to a scene from the console without scrolling.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return
    ;(window as unknown as { __cubottScene: (n: number, t?: number) => void }).__cubottScene = (n, t = 0.7) => {
      scrollStore.progress = (n + t) / SCENES
      setScene(n)
    }
  }, [])

  const jump = (n: number) => {
    const el = root.current?.querySelectorAll("section")[n]
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })
  }

  return (
    <div ref={root} className={cn("relative", dark && "dark-scene")}>
      {/* Ground: colour, isometric grid, grain, vignette — one continuous surface under every scene */}
      <div aria-hidden="true" className={cn("fixed inset-0 -z-10 transition-colors duration-1000", dark ? "bg-navy-900" : "bg-[#F4F7FB]")}>
        <div className={cn("absolute inset-0 iso-grid transition-opacity duration-1000", dark ? "opacity-100" : "iso-grid-light opacity-100")} style={{ maskImage: "radial-gradient(ellipse at 50% 45%, black 30%, transparent 78%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, black 30%, transparent 78%)" }} />
        <div className={cn("absolute inset-0 transition-opacity duration-1000", dark ? "opacity-100" : "opacity-0")} style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(37,99,235,0.18), transparent 60%)" }} />
        <div className="grain absolute inset-0 opacity-70 mix-blend-overlay" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-screen opacity-50 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" aria-hidden="true">
        <SceneVideo src="/video/brand.mp4" />
      </div>
      {live && <CubeScene />}
      {live && <StoryOverlay />}

      {/* Progress rail */}
      <nav aria-label="Story progress" className="fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block xl:right-10">
        <ol className="flex flex-col gap-3">
          {RAIL.map((label, n) => {
            const on = n === scene
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => jump(n)}
                  aria-current={on ? "step" : undefined}
                  className={cn("group flex items-center justify-end gap-3 text-right transition-colors", dark ? "text-white" : "text-navy")}
                >
                  <span className={cn("font-mono text-[10px] tracking-[0.2em] transition-opacity", on ? "opacity-100" : "opacity-0 group-hover:opacity-60")}>{label}</span>
                  <span className={cn("block h-px transition-all duration-500", on ? "w-8 bg-blue" : cn("w-4", dark ? "bg-white/25" : "bg-navy/20"))} />
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className={cn("relative z-10 transition-colors duration-700", dark ? "text-white" : "text-navy")}>
        {/* 1 — the chaos */}
        <section aria-label="Scene 1 of 7" data-scene="dark" className="relative flex min-h-screen items-center justify-center py-28">
          <Container className="relative w-full text-center">
            <Reveal>
              <p className="eyebrow text-blue-300/80">Cubott · Systems for complex businesses</p>
              <h1 className="display-2xl mx-auto mt-8 max-w-[11ch]">
                Every business runs on <span className="ink-sky">moving things.</span>
              </h1>
              <p className="mx-auto mt-8 max-w-xl text-lg text-blue-100/70 md:text-2xl">Spread across phones, spreadsheets, emails and memory.</p>
            </Reveal>
          </Container>
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-blue-200/60" aria-hidden="true">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <span className="scroll-cue block h-8 w-px bg-blue-300/60" />
          </div>
        </section>

        {/* 2 — one system */}
        <Scene index={1} dark live={live} layout="top">
          <Number n="02" dark />
          <h2 className="display-xl mx-auto max-w-[12ch]">
            Cubott brings it into <span className="ink-sky">one system.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-blue-100/70 md:text-2xl">One place. One record. One version of the truth.</p>
        </Scene>

        {/* 3 — it does the work */}
        <Scene index={2} live={live} layout="left">
          <Number n="03" />
          <p className="eyebrow text-blue">Then</p>
          <h2 className="display-xl mt-6">
            The system does the <span className="ink-blue">routine work</span> for you.
          </h2>
          <p className="mt-6 max-w-md text-lg text-slate md:text-xl">Tasks move themselves. The right person is told. Nothing waits on memory.</p>
        </Scene>

        {/* 4 — your pain first: a pull-quote, not a headline */}
        <Scene index={3} live={live} layout="right">
          <Number n="04" align="right" />
          <span aria-hidden="true" className="mb-8 block h-3 w-3 rotate-45 bg-blue" />
          <p className="display-lg">
            It starts with <span className="ink-blue">your pain,</span> not our software.
          </p>
          <p className="mt-6 max-w-md text-lg text-slate md:text-xl">We sit with your team and map how the work really happens — exceptions included.</p>
          <span aria-hidden="true" className="mt-10 block h-px w-24 bg-navy/20" />
        </Scene>

        {/* 5 — built around you */}
        <Scene index={4} live={live} layout="left" narrow>
          <Number n="05" />
          <h2 className="display-xl">
            Then we build <span className="ink-blue">around you.</span>
          </h2>
          <p className="mt-6 max-w-sm text-lg text-slate md:text-xl">Your roles, your rules, your language. No template.</p>
        </Scene>

        {/* 6 — we stay */}
        <Scene index={5} live={live} layout="left">
          <Number n="06" />
          <h2 className="display-xl">
            We stay <span className="ink-blue">until it works.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-slate md:text-xl">Rollout, training, the first messy weeks — we&apos;re in the room.</p>
        </Scene>

        {/* 7 — a call away: the dark bookend. Copy left, the cube settles beneath it, the form on the right. */}
        <section id="start" data-scene="dark" aria-label="Scene 7 of 7" className="relative flex min-h-screen items-center pb-24 pt-32 lg:py-28">
          <Container className="w-full">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="relative lg:col-span-5">
                <Number n="07" dark />
                <h2 className="display-xl">
                  After that, help is <span className="ink-sky">a call away.</span>
                </h2>
                <p className="mt-6 max-w-sm text-lg text-blue-100/70 md:text-xl">Support is the people who built it.</p>
                <p className="mt-8 text-sm text-blue-100/60">
                  Prefer to see the work first?{" "}
                  <a href="/products" className="font-semibold text-white underline-offset-4 hover:underline">
                    See what we&apos;ve built →
                  </a>
                </p>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
                <div className="rounded-2xl border border-white/10 bg-white p-6 text-navy shadow-[0_40px_100px_rgba(0,0,0,0.5)] md:p-8">
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      </div>
    </div>
  )
}

/** Large editorial scene number set behind the headline. */
function Number({ n, dark, align = "left" }: { n: string; dark?: boolean; align?: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "scene-number absolute -top-[0.55em] font-mono",
        align === "right" ? "-right-4" : "-left-4",
        dark ? "text-white/[0.045]" : "text-navy/[0.05]"
      )}
    >
      {n}
    </span>
  )
}

function Scene({
  children,
  index,
  dark,
  live,
  layout,
  narrow,
  id,
}: {
  children: React.ReactNode
  index: number
  dark?: boolean
  live: boolean
  layout: "top" | "left" | "right"
  narrow?: boolean
  id?: string
}) {
  const centred = layout === "top"
  return (
    <section
      id={id}
      data-scene={dark ? "dark" : undefined}
      aria-label={`Scene ${index + 1} of ${SCENES}`}
      className={cn("relative flex min-h-screen", centred ? "items-start pt-36 md:pt-44" : "items-center pb-20 pt-56 lg:py-24")}
    >
      <Container className="w-full">
        <div className={cn("grid gap-10", !centred && "lg:grid-cols-12")}>
          <Reveal
            className={cn(
              "relative",
              centred && "mx-auto max-w-3xl text-center",
              layout === "left" && (narrow ? "lg:col-span-5" : "lg:col-span-6"),
              layout === "right" && "lg:col-span-6 lg:col-start-7"
            )}
          >
            {children}
          </Reveal>
          {!live && !centred && (
            <div className={cn("hidden lg:flex lg:justify-center", layout === "right" ? "lg:col-span-6 lg:col-start-1 lg:row-start-1" : "lg:col-span-6")}>
              <CubottMark className="h-64 w-auto" />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
