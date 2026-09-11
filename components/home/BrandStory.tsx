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

/** Dark scenes: the chaos and the moment it becomes one system. */
const DARK = new Set([0, 1])

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
  useEffect(() => setMounted(true), [])
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

  return (
    <div ref={root} className="relative">
      <div aria-hidden="true" className={cn("fixed inset-0 -z-10 transition-colors duration-700", dark ? "bg-navy-900" : "bg-white")} />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-screen opacity-50 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" aria-hidden="true">
        <SceneVideo src="/video/brand.mp4" />
      </div>
      {live && <CubeScene />}
      {live && <StoryOverlay />}

      <div className={cn("relative z-10 transition-colors duration-700", dark ? "text-white" : "text-navy")}>
        {/* 1 — the chaos */}
        <Scene index={0} dark live={live} layout="center">
          <p className="eyebrow text-blue-300">Cubott</p>
          <h1 className="display-xl mt-6">Every business runs on moving things.</h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-blue-100/80 md:text-2xl">Spread across phones, spreadsheets, emails and memory.</p>
        </Scene>

        {/* 2 — one system */}
        <Scene index={1} dark live={live} layout="top">
          <h2 className="display-lg">Cubott brings it into one system.</h2>
          <p className="mx-auto mt-4 max-w-lg text-xl text-blue-100/75 md:text-2xl">One place. One record. One version of the truth.</p>
        </Scene>

        {/* 3 — it does the work */}
        <Scene index={2} live={live} layout="left">
          <p className="eyebrow text-blue">Then</p>
          <h2 className="display-lg mt-6">The system does the routine work for you.</h2>
          <p className="mt-4 text-xl text-slate">Tasks move themselves. The right person is told. Nothing waits on memory.</p>
        </Scene>

        {/* 4 — your pain first */}
        <Scene index={3} live={live} layout="right">
          <p className="eyebrow text-blue">How we work</p>
          <h2 className="display-lg mt-6">It starts with your pain, not our software.</h2>
          <p className="mt-4 text-xl text-slate">We sit with your team and map how the work really happens — exceptions included.</p>
        </Scene>

        {/* 5 — built around you */}
        <Scene index={4} live={live} layout="left" narrow>
          <h2 className="display-lg">Then we build around you.</h2>
          <p className="mt-4 text-xl text-slate">Your roles, your rules, your language. No template.</p>
        </Scene>

        {/* 6 — we stay */}
        <Scene index={5} live={live} layout="left">
          <h2 className="display-lg">We stay until it works.</h2>
          <p className="mt-4 text-xl text-slate">Rollout, training, the first messy weeks — we&apos;re in the room.</p>
        </Scene>

        {/* 7 — a call away */}
        <Scene index={6} live={live} layout="left" id="start">
          <h2 className="display-lg">After that, help is a call away.</h2>
          <p className="mt-4 text-xl text-slate">Support is the people who built it.</p>
          <div className="mt-8">
            <ContactForm />
          </div>
          <p className="mt-6 text-sm text-slate">
            Prefer to see the work first?{" "}
            <a href="/products" className="font-semibold text-blue underline-offset-4 hover:underline">
              See what we&apos;ve built →
            </a>
          </p>
        </Scene>
      </div>
    </div>
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
  layout: "center" | "top" | "left" | "right"
  narrow?: boolean
  id?: string
}) {
  const centred = layout === "center" || layout === "top"
  return (
    <section
      id={id}
      data-scene={dark ? "dark" : undefined}
      aria-label={`Scene ${index + 1} of ${SCENES}`}
      className={cn(
        "relative flex min-h-screen",
        layout === "top" ? "items-start pt-36 md:pt-40" : centred ? "items-center py-24" : "items-center pb-20 pt-56 lg:py-24"
      )}
    >
      <Container className="w-full">
        <div className={cn("grid gap-10", !centred && "lg:grid-cols-12")}>
          <Reveal
            className={cn(
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
