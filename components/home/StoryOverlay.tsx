"use client"

import { useEffect, useRef } from "react"
import { scrollStore, sceneAt, lerp, smooth, ramp } from "@/components/three/scroll-store"

/**
 * HTML layer that plays alongside the 3D cube: the familiar "moving things" icons, the automation ring,
 * the four face labels and the settle ring. Everything is positioned from the cube's projected screen
 * position each frame, so it stays glued to the object however the viewport is sized.
 */

// Generic line icons (no third-party brand marks): chat, mail, phone, sheet, document, calendar, bell, folder, checklist.
const ICONS: Record<string, React.ReactNode> = {
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M6 3h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />,
  sheet: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 4v16M15 4v16" /></>,
  doc: <><path d="M6 3h8l5 5v13H6z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  bell: <><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4z" /><path d="M10 21h4" /></>,
  folder: <path d="M3 6h6l2 2h10v12H3z" />,
  check: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 12 3 3 7-7" /></>,
}

/** Scatter positions (viewport fractions) for scene 1, chosen to avoid the centred headline. */
const SCATTER: { icon: keyof typeof ICONS; x: number; y: number; d: number }[] = [
  { icon: "chat", x: 0.12, y: 0.22, d: 0.0 },
  { icon: "mail", x: 0.86, y: 0.2, d: 0.6 },
  { icon: "phone", x: 0.08, y: 0.62, d: 1.2 },
  { icon: "sheet", x: 0.9, y: 0.58, d: 0.3 },
  { icon: "doc", x: 0.2, y: 0.84, d: 0.9 },
  { icon: "calendar", x: 0.78, y: 0.84, d: 1.5 },
  { icon: "bell", x: 0.3, y: 0.12, d: 0.4 },
  { icon: "folder", x: 0.68, y: 0.1, d: 1.1 },
  { icon: "check", x: 0.5, y: 0.9, d: 0.7 },
]

const RING = ["Assign", "Notify", "Approve", "Record"]
const FACES = ["People", "Workflow", "Data", "Rules"]

export default function StoryOverlay() {
  const root = useRef<HTMLDivElement>(null)
  const iconEls = useRef<(HTMLDivElement | null)[]>([])
  const ringEls = useRef<(HTMLDivElement | null)[]>([])
  const faceEls = useRef<(HTMLDivElement | null)[]>([])
  const arc = useRef<SVGCircleElement>(null)
  const arcWrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const W = window.innerWidth
      const H = window.innerHeight
      const narrow = W < 768
      const { i, t } = sceneAt(scrollStore.progress)
      const cube = scrollStore.cube
      const cx = cube.x * W
      const cy = cube.y * H
      const cr = cube.r * H
      const time = now / 1000

      // Icons: drift (scene 1) → pulled into the cube (scene 2) → sorted inside the open cube (scene 4)
      SCATTER.forEach((s, j) => {
        const el = iconEls.current[j]
        if (!el) return
        if (narrow && j > 4) {
          el.style.opacity = "0"
          return
        }
        let x = s.x * W
        let y = s.y * H
        let op = 0
        let sc = 1
        let rot = Math.sin(time * 0.6 + s.d) * 8
        if (i === 0) {
          const dx = Math.sin(time * 0.5 + s.d * 2) * 14
          const dy = Math.cos(time * 0.4 + s.d) * 12
          x += dx
          y += dy
          op = 1
        } else if (i === 1) {
          const k = smooth(ramp(t, 0.05 + s.d * 0.12, 0.55 + s.d * 0.12))
          x = lerp(x, cx, k)
          y = lerp(y, cy, k)
          sc = lerp(1, 0.25, k)
          op = 1 - ramp(k, 0.8, 1)
          rot = lerp(rot, 0, k)
        } else if (i === 3) {
          // Sorted rows inside the open cube: 3 × 3 grid centred on the cube
          const col = j % 3
          const row = Math.floor(j / 3)
          const cell = cr * 0.55
          x = cx + (col - 1) * cell + cr * 0.15
          y = cy + (row - 1) * cell
          sc = 0.75
          rot = 0
          op = ramp(t, 0.5 + j * 0.03, 0.65 + j * 0.03) * (1 - ramp(t, 0.92, 1))
        }
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rot}deg) scale(${sc})`
        el.style.opacity = String(op)
      })

      // Automation ring (scene 3): labels orbit the cube
      RING.forEach((_, j) => {
        const el = ringEls.current[j]
        if (!el) return
        const on = i === 2 ? ramp(t, 0.45, 0.65) * (1 - ramp(t, 0.92, 1)) : 0
        const ang = time * 0.5 + (j / RING.length) * Math.PI * 2
        const rx = cr * 1.35
        const ry = cr * 0.45
        const x = cx + Math.cos(ang) * rx
        const y = cy + Math.sin(ang) * ry + cr * 0.05
        const depth = (Math.sin(ang) + 1) / 2 // front of the orbit is larger and fully opaque
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.85 + depth * 0.25})`
        el.style.opacity = String(on * (0.45 + depth * 0.55))
      })

      // Face labels (scene 5): around the exploded cube
      const offsets = [
        [0, -1.35],
        [1.4, 0],
        [0, 1.35],
        [-1.4, 0],
      ]
      FACES.forEach((_, j) => {
        const el = faceEls.current[j]
        if (!el) return
        const on = i === 4 ? ramp(t, 0.5 + j * 0.05, 0.65 + j * 0.05) * (1 - ramp(t, 0.92, 1)) : 0
        const x = cx + offsets[j][0] * cr * (narrow ? 0.9 : 1)
        const y = cy + offsets[j][1] * cr
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
        el.style.opacity = String(on)
      })

      // Settle ring (scene 6): completes as the scene plays
      if (arc.current && arcWrap.current) {
        const on = i === 5 ? ramp(t, 0.45, 0.6) * (1 - ramp(t, 0.92, 1)) : 0
        const size = cr * 3.1
        arcWrap.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
        arcWrap.current.style.width = `${size}px`
        arcWrap.current.style.height = `${size}px`
        arcWrap.current.style.opacity = String(on)
        const k = i === 5 ? smooth(ramp(t, 0.5, 0.9)) : 0
        arc.current.style.strokeDashoffset = String(1 - k)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-[5]" aria-hidden="true">
      {SCATTER.map((s, j) => (
        <div
          key={s.icon}
          ref={(el) => {
            iconEls.current[j] = el
          }}
          className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/[0.06] text-blue-200 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm will-change-transform md:h-16 md:w-16"
          style={{ opacity: 0 }}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            {ICONS[s.icon]}
          </svg>
        </div>
      ))}

      {RING.map((label, j) => (
        <div
          key={label}
          ref={(el) => {
            ringEls.current[j] = el
          }}
          className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy shadow-card will-change-transform md:text-xs"
          style={{ opacity: 0 }}
        >
          {label}
        </div>
      ))}

      {FACES.map((label, j) => (
        <div
          key={label}
          ref={(el) => {
            faceEls.current[j] = el
          }}
          className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy shadow-card will-change-transform md:text-xs"
          style={{ opacity: 0 }}
        >
          {label}
        </div>
      ))}

      <div ref={arcWrap} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#0B1F3B" strokeOpacity="0.08" strokeWidth="1" />
          <circle ref={arc} cx="50" cy="50" r="48" fill="none" stroke="#2563EB" strokeWidth="1.5" pathLength={1} strokeDasharray={1} strokeDashoffset={1} strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
