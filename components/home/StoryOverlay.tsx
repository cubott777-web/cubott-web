"use client"

import { useEffect, useRef } from "react"
import { scrollStore, sectionAt, lerp, smooth, ramp } from "@/components/three/scroll-store"

/**
 * HTML layer that plays with the 3D cube. Everything is positioned from the cube's projected screen
 * position each frame, so it stays glued to the object at any viewport size.
 *
 * Story beat 1  six "moving things" hang around the loosened cube
 * Story beat 2  they are drawn into it
 * Story beat 3  three work chips orbit the open cube
 * Close         the antenna signals — rings ripple outward
 * Always        a soft light under the cube that ties it to the ground
 */

// Generic line icons (no third-party brand marks).
const ICONS: Record<string, React.ReactNode> = {
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M6 3h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />,
  sheet: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 4v16M15 4v16" /></>,
  doc: <><path d="M6 3h8l5 5v13H6z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></>,
  check: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 12 3 3 7-7" /></>,
}

/** Offsets from the cube centre in cube half-heights; z is depth (1 nearest), d a phase offset for the drift. */
const THINGS: { icon: keyof typeof ICONS; label: string; x: number; y: number; z: number; d: number }[] = [
  { icon: "chat", label: "Chats", x: -1.15, y: -1.35, z: 1, d: 0.0 },
  { icon: "mail", label: "Emails", x: 1.45, y: -1.15, z: 0.6, d: 0.6 },
  { icon: "phone", label: "Calls", x: -1.4, y: 0.15, z: 0.3, d: 1.2 },
  { icon: "sheet", label: "Spreadsheets", x: 1.6, y: 0.35, z: 1, d: 0.3 },
  { icon: "doc", label: "Documents", x: -0.95, y: 1.6, z: 0.5, d: 0.9 },
  { icon: "check", label: "Tasks", x: 1.25, y: 1.65, z: 0.8, d: 0.7 },
]

const CHIPS = ["Assign", "Notify", "Record"]

export default function StoryOverlay() {
  const thingEls = useRef<(HTMLDivElement | null)[]>([])
  const chipEls = useRef<(HTMLDivElement | null)[]>([])
  const glow = useRef<HTMLDivElement>(null)
  const signal = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.current.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    let raf = 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const W = window.innerWidth
      const H = window.innerHeight
      const narrow = W < 768
      const { i, t } = sectionAt(scrollStore.phase)
      const cube = scrollStore.cube
      const cx = cube.x * W
      const cy = cube.y * H
      const cr = cube.r * H
      const time = now / 1000

      // Light that follows the cube — ties the sections together and gives the ground depth.
      if (glow.current) {
        const dark = i <= 1 || i === 5
        const strength = i === 0 ? 0.4 : i === 1 ? 0.35 + smooth(ramp(t, 0.36, 0.6)) * 0.6 : i === 5 ? 0.7 : 0.25
        glow.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
        glow.current.style.width = `${cr * 7}px`
        glow.current.style.height = `${cr * 7}px`
        glow.current.style.opacity = String(strength * (dark ? 1 : 0.35))
      }

      // Pointer parallax eases in; the nearer a thing, the more it moves.
      const pt = pointer.current
      pt.x += (pt.tx - pt.x) * 0.04
      pt.y += (pt.ty - pt.y) * 0.04

      THINGS.forEach((s, j) => {
        const el = thingEls.current[j]
        if (!el) return
        const depth = 0.7 + s.z * 0.45
        // Phones: the cube sits low under the copy, so the things gather tighter and a little lower
        const spread = narrow ? 0.62 : 1
        let x = cx + s.x * cr * spread + pt.x * (10 + s.z * 24)
        let y = cy + (s.y * spread + (narrow ? 0.35 : 0)) * cr + pt.y * (6 + s.z * 16)
        let op = 0
        let sc = depth
        let rot = Math.sin(time * 0.6 + s.d) * (3 + s.z * 3)
        if (i === 1) {
          x += Math.sin(time * 0.5 + s.d * 2) * (6 + s.z * 6)
          y += Math.cos(time * 0.4 + s.d) * (5 + s.z * 6)
          const enter = ramp(t, 0.02 + j * 0.02, 0.1 + j * 0.02)
          // Nearest things go first; the pull is a gentle spiral, not a straight collapse.
          const k = smooth(ramp(t, 0.36 + (1 - s.z) * 0.08 + s.d * 0.04, 0.6 + (1 - s.z) * 0.08 + s.d * 0.04))
          const swirl = Math.sin(k * Math.PI) * cr * 0.7
          x = lerp(x, cx, k) + Math.cos(s.d * 4 + k * 3) * swirl
          y = lerp(y, cy, k) + Math.sin(s.d * 4 + k * 3) * swirl * 0.5
          sc = lerp(depth, 0.15, k)
          op = enter * (1 - ramp(k, 0.8, 1))
          rot = lerp(rot, 0, k) + k * 90 * (j % 2 ? 1 : -1)
        }
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rot}deg) scale(${sc})`
        el.style.opacity = String(op)
      })

      CHIPS.forEach((_, j) => {
        const el = chipEls.current[j]
        if (!el) return
        const on = i === 1 ? ramp(t, 0.72, 0.82) : 0
        const ang = time * 0.5 + (j / CHIPS.length) * Math.PI * 2
        const x = cx + Math.cos(ang) * cr * 1.5
        const y = cy + Math.sin(ang) * cr * 0.45 + cr * 0.15
        const depth = (Math.sin(ang) + 1) / 2
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.85 + depth * 0.25})`
        el.style.opacity = String(on * (0.45 + depth * 0.55))
        el.style.zIndex = depth > 0.5 ? "2" : "0"
      })

      if (signal.current) {
        const on = i === 5 ? ramp(t, 0.25, 0.45) : 0
        const size = cr * 2.6
        signal.current.style.transform = `translate(${cx}px, ${cy - cr * 1.15}px)`
        signal.current.style.setProperty("--size", `${size}px`)
        signal.current.style.opacity = String(on)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden="true">
      <div
        ref={glow}
        className="absolute left-0 top-0 rounded-full will-change-transform"
        style={{
          opacity: 0,
          background: "radial-gradient(closest-side, rgba(96,165,250,0.38), rgba(37,99,235,0.12) 45%, transparent 72%)",
        }}
      />

      {THINGS.map((s, j) => (
        <div
          key={s.icon}
          ref={(el) => {
            thingEls.current[j] = el
          }}
          className="absolute left-0 top-0 flex flex-col items-center gap-2.5 will-change-transform"
          style={{ opacity: 0 }}
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-navy-800/70 text-blue-100 shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:h-[76px] md:w-[76px]">
            <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              {ICONS[s.icon]}
            </svg>
          </span>
          <span className="whitespace-nowrap text-xs font-medium text-blue-100/80">{s.label}</span>
        </div>
      ))}

      {CHIPS.map((label, j) => (
        <div
          key={label}
          ref={(el) => {
            chipEls.current[j] = el
          }}
          className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-white/15 bg-white px-4 py-2 text-[13px] font-semibold text-navy shadow-[0_10px_30px_rgba(0,0,0,0.35)] will-change-transform"
          style={{ opacity: 0 }}
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-blue align-middle" />
          {label}
        </div>
      ))}

      <div ref={signal} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
        {[0, 0.8, 1.6].map((delay) => (
          <span
            key={delay}
            className="ripple absolute left-0 top-0 rounded-full border border-blue-300/60"
            style={{ width: "var(--size)", height: "var(--size)", animationDelay: `${delay}s` }}
          />
        ))}
      </div>
    </div>
  )
}
