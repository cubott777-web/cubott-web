"use client"

import { useSyncExternalStore } from "react"

/** Subscribe to a media query. Server snapshot is `false`, so scroll scenes render their static state first. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
