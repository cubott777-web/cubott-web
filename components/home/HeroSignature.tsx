"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import { heroClock, DURATION, replay } from "@/components/three/hero-clock"
import CubottMark from "@/components/brand/CubottMark"
import { cn } from "@/lib/utils"

const CubeScene = dynamic(() => import("@/components/three/CubeScene"), { ssr: false })

/**
 * The hero signature: full-bleed, the set the hero happens in rather than an illustration beside the
 * text. Opens on a macro shot of a single seam, unrecognizable — then one cinematic pull-back reveals
 * the whole object as its plates lock. No icon metaphors, no caption dots, no box: the headline
 * arrives with the reveal, this proves the craft.
 */
export default function HeroSignature({ className }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const glow = useRef<HTMLDivElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION)
  const [inView, setInView] = useState(false)
  // Only run WebGL once mounted and while the hero is on screen; coming back replays the signature.
  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "200px 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = box.current
    if (!el || !inView) return
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const W = el.clientWidth
      const H = el.clientHeight
      const cube = heroClock.cube
      const cx = cube.x * W
      const cy = cube.y * H
      const cr = cube.r * H

      // Ground light: dim while loose, floods on the lock, settles to a steady glow.
      if (glow.current) {
        const t = heroClock.t
        const strength = t < 2.0 ? 0.1 : t < 3.1 ? 0.1 + ((t - 2.0) / 1.1) * 0.55 : 0.42
        glow.current.style.transform = `translate(${cx}px, ${cy + cr * 0.2}px) translate(-50%, -50%)`
        glow.current.style.width = `${cr * 6.5}px`
        glow.current.style.height = `${cr * 6.5}px`
        glow.current.style.opacity = String(strength)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  const onMove = (e: React.PointerEvent) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    heroClock.pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2
    heroClock.pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2
  }
  const onLeave = () => {
    heroClock.pointer.tx = 0
    heroClock.pointer.ty = 0
  }
  const onEnter = () => {
    // Replay only once the story has finished, so a passing cursor never interrupts it.
    if (!reduced && heroClock.t > DURATION + 0.8) replay()
  }

  const live = !reduced && inView
  const fallback = (
    <div className="absolute inset-0 grid place-items-center">
      <CubottMark className="h-56 w-auto md:h-72" priority />
    </div>
  )

  return (
    <div
      ref={box}
      className={cn("absolute inset-0 select-none", className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerEnter={onEnter}
      role="img"
      aria-label="The Cubott cube: a macro shot of a single seam pulls back to reveal the whole object as its plates lock into place."
    >
      {/* ground light */}
      <div
        ref={glow}
        className="pointer-events-none absolute left-0 top-0 rounded-full will-change-transform"
        style={{ opacity: 0, background: "radial-gradient(closest-side, rgba(96,165,250,0.42), rgba(37,99,235,0.14) 45%, transparent 72%)" }}
      />

      {live ? <CubeScene reduced={reduced} fallback={fallback} /> : reduced ? fallback : null}
    </div>
  )
}
