"use client"

/**
 * Shared store for the homepage story — written by ScrollTrigger (progress) and by the 3D scene
 * (where the cube is on screen), read every frame by the cube and the HTML overlays. No React re-renders.
 */
export const scrollStore = {
  progress: 0,
  /** Cube centre on screen, as fractions of the viewport. */
  cube: { x: 0.5, y: 0.5, r: 0.12 },
}

export const SCENES = 7

/** Scene index and progress within it (0..1). */
export function sceneAt(p: number) {
  const raw = Math.min(SCENES - 1e-6, Math.max(0, p * SCENES))
  const i = Math.floor(raw)
  return { i, t: raw - i }
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const smooth = (t: number) => t * t * (3 - 2 * t)
export const clamp01 = (t: number) => Math.min(1, Math.max(0, t))
/** 0→1 over [a,b], clamped. */
export const ramp = (t: number, a: number, b: number) => clamp01((t - a) / (b - a))

// Dev aid: inspect poses from the console without scrolling.
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  ;(window as unknown as { __cubott: typeof scrollStore }).__cubott = scrollStore
}
