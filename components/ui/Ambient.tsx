"use client"

import { useEffect, useRef } from "react"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import { cn } from "@/lib/utils"

/**
 * A silent looping clip used as atmosphere behind a stage. Screen-blended so its black background
 * dissolves into the navy and only the light survives. Decorative: hidden from assistive tech,
 * paused on its poster frame under reduced motion.
 */
export default function Ambient({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const el = useRef<HTMLVideoElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION)

  useEffect(() => {
    const v = el.current
    if (!v) return
    if (reduced) v.pause()
    else v.play().catch(() => {})
  }, [reduced])

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <video ref={el} src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover mix-blend-screen" />
    </div>
  )
}
