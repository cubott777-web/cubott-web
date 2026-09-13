"use client"

import { useEffect, useState } from "react"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import { cn } from "@/lib/utils"

interface SceneVideoProps {
  src: string
  poster?: string
  className?: string
  /** Rendered instead when the file is missing, so scenes work before the clips exist. */
  children?: React.ReactNode
}

/**
 * Optional cinematic clip (generated in Higgsfield, dropped into /public/video).
 * Muted, looped, autoplay. The file is probed first so a missing clip costs one HEAD request,
 * not a failed media load; hidden entirely under reduced motion.
 */
export default function SceneVideo({ src, poster, className, children }: SceneVideoProps) {
  const reduced = useMediaQuery(REDUCED_MOTION)
  const [available, setAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(src, { method: "HEAD" })
      .then((r) => !cancelled && setAvailable(r.ok && (r.headers.get("content-type") ?? "").startsWith("video/")))
      .catch(() => !cancelled && setAvailable(false))
    return () => {
      cancelled = true
    }
  }, [src])

  if (reduced || !available) return <>{children ?? null}</>
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
      onError={() => setAvailable(false)}
      aria-hidden="true"
    />
  )
}
