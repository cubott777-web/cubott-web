"use client"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import { cn } from "@/lib/utils"

interface Props {
  video?: string
  poster?: string
  label: string
  className?: string
}

/** One probe per clip per page, however many times the media mounts. */
const probes = new Map<string, Promise<boolean>>()
function probe(src: string) {
  let p = probes.get(src)
  if (!p) {
    p = fetch(src, { method: "HEAD" })
      .then((r) => r.ok && (r.headers.get("content-type") ?? "").startsWith("video/"))
      .catch(() => false)
    probes.set(src, p)
  }
  return p
}

/**
 * The clip if it exists, else the poster, else a labelled frame. Never a mock.
 * Autoplay is native (muted + playsInline); reduced motion pauses on the first frame.
 */
export default function ProductMedia({ video: src, poster: posterSrc, label, className }: Props) {
  const [video, setVideo] = useState<boolean | null>(src ? null : false)
  const [poster, setPoster] = useState(true)
  const el = useRef<HTMLVideoElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION)

  useEffect(() => {
    if (!src) return
    let cancelled = false
    probe(src).then((ok) => !cancelled && setVideo(ok))
    return () => {
      cancelled = true
    }
  }, [src])

  useEffect(() => {
    const v = el.current
    if (!v) return
    if (reduced) v.pause()
    else v.play().catch(() => {})
  }, [reduced, video])

  const cls = cn("h-full w-full object-cover object-top", className)
  if (video) return <video ref={el} src={src} poster={posterSrc} autoPlay muted loop playsInline preload="auto" className={cls} />
  // eslint-disable-next-line @next/next/no-img-element
  if (posterSrc && poster) return <img src={posterSrc} alt="" onError={() => setPoster(false)} className={cls} />
  return (
    <div className={cn("grid h-full w-full place-items-center grid-fine text-blue-200/60", className)}>
      <span className="eyebrow">{label}</span>
    </div>
  )
}
