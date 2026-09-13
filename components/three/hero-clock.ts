"use client"

/**
 * Clock for the hero signature. The cube (WebGL) writes back where it is on screen so the ground
 * glow can stay glued to it. No React state — nothing re-renders while it plays.
 */
export const heroClock = {
  /** Seconds since the signature started. Runs past DURATION into the idle loop. */
  t: 0,
  /** Set to restart the story from the top. */
  restartAt: 0,
  /** Cube centre and half-height, as fractions of the signature's own box. */
  cube: { x: 0.5, y: 0.5, r: 0.2 },
  /** Pointer inside the signature, −1..1, eased. */
  pointer: { x: 0, y: 0, tx: 0, ty: 0 },
  /** 0→1 once per lock, set the instant the plates seat — for a one-frame specular flash. */
  lockFlash: 0,
}

/**
 * The story: open on a macro shot — press up against a single seam, unrecognizable — then one
 * cinematic pull-back reveals the whole object as its plates lock, and the headline arrives with it.
 */
export const BEATS = { reveal: 2.0, snap: 3.0, rest: 4.0 } as const
export const DURATION = BEATS.rest

export function replay() {
  heroClock.restartAt = performance.now()
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const smooth = (t: number) => t * t * (3 - 2 * t)
export const clamp01 = (t: number) => Math.min(1, Math.max(0, t))
/** 0→1 over [a,b], clamped. */
export const ramp = (t: number, a: number, b: number) => clamp01((t - a) / (b - a))
