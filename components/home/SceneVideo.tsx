"use client"

import { useState } from "react"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import { cn } from "@/lib/utils"

interface SceneVideoProps {
  src: string
  poster?: string
  className?: string
  /** Renders nothing at all when the file is missing, so scenes work before the clips exist. */
  children?: React.ReactNode
}

/**
 * Optional cinematic clip (generated in Higgsfield, dropped into /public/video).
 * Muted, looped, autoplay; hidden entirely if the file is absent or the visitor prefers reduced motion.
 */
export default function SceneVideo({ src, poster, className, children }: SceneVideoProps) {
  const reduced = useMediaQuery(REDUCED_MOTION)
  const [missing, setMissing] = useState(false)
  if (reduced || missing) return <>{children ?? null}</>
  return (
    <video
      className={cn("h-full w-full object-cover", className)}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setMissing(true)}
      aria-hidden="true"
    />
  )
}
