"use client"

import { useEffect, useRef } from "react"
import { scrollStore, sceneAt, lerp, smooth, ramp } from "@/components/three/scroll-store"

/**
 * HTML/SVG layer that plays with the 3D cube. Everything here is positioned from the cube's projected
 * screen position each frame, so it stays glued to the object at any viewport size.
 *
 * Scene 1  the nine "moving things", each wired to the ghost cube by a thin constellation line
 * Scene 2  lines retract and the things are pulled into the cube
 * Scene 3  automation ring orbits the cube
 * Scene 4  the things reappear, sorted, inside the open cube
 * Scene 5  the four faces are named
 * Scene 6  a ring completes around the settled cube
 * Scene 7  the antenna signals — rings ripple outward
 */

// Generic line icons (no third-party brand marks).
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

/** Scatter positions (viewport fractions) for scene 1 — a loose ring around the centred headline. */
const THINGS: { icon: keyof typeof ICONS; label: string; x: number; y: number; d: number }[] = [
  { icon: "chat", label: "Chats", x: 0.14, y: 0.24, d: 0.0 },
  { icon: "mail", label: "Emails", x: 0.85, y: 0.22, d: 0.6 },
  { icon: "phone", label: "Calls", x: 0.09, y: 0.6, d: 1.2 },
  { icon: "sheet", label: "Spreadsheets", x: 0.9, y: 0.6, d: 0.3 },
  { icon: "doc", label: "Documents", x: 0.22, y: 0.86, d: 0.9 },
  { icon: "calendar", label: "Schedules", x: 0.77, y: 0.86, d: 1.5 },
  { icon: "bell", label: "Reminders", x: 0.32, y: 0.12, d: 0.4 },
  { icon: "folder", label: "Files", x: 0.66, y: 0.11, d: 1.1 },
  { icon: "check", label: "Tasks", x: 0.4, y: 0.94, d: 0.7 },
]

const RING = ["Assign", "Notify", "Approve", "Record"]
const FACES = ["People", "Workflow", "Data", "Rules"]
const FACE_OFFSETS = [
  [0, -1.45],
  [1.5, 0],
  [0, 1.45],
  [-1.5, 0],
]

export default function StoryOverlay() {
  const thingEls = useRef<(HTMLDivElement | null)[]>([])
  const lineEls = useRef<(SVGLineElement | null)[]>([])
  const ringEls = useRef<(HTMLDivElement | null)[]>([])
  const faceEls = useRef<(HTMLDivElement | null)[]>([])
  const faceLineEls = useRef<(SVGLineElement | null)[]>([])
  const arc = useRef<SVGCircleElement>(null)
  const arcWrap = useRef<HTMLDivElement>(null)
  const glow = useRef<HTMLDivElement>(null)
  const signal = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)

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
      if (svg.current) svg.current.setAttribute("viewBox", `0 0 ${W} ${H}`)

      // Light that follows the cube — ties the scenes together and gives the ground depth.
      if (glow.current) {
        const dark = i <= 1 || i === 6
        const strength = i === 0 ? 0.35 : i === 1 ? 0.5 + smooth(ramp(t, 0.3, 0.6)) * 0.6 : i === 6 ? 0.75 : 0.45
        glow.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
        glow.current.style.width = `${cr * 7}px`
        glow.current.style.height = `${cr * 7}px`
        glow.current.style.opacity = String(strength * (dark ? 1 : 0.5))
      }

      // The moving things
      THINGS.forEach((s, j) => {
        const el = thingEls.current[j]
        const ln = lineEls.current[j]
        if (!el || !ln) return
        if (narrow && j > 4) {
          el.style.opacity = "0"
          ln.style.opacity = "0"
          return
        }
        let x = s.x * W
        let y = s.y * H
        let op = 0
        let sc = 1
        let rot = Math.sin(time * 0.6 + s.d) * 6
        let lineOp = 0
        if (i === 0) {
          x += Math.sin(time * 0.5 + s.d * 2) * 12
          y += Math.cos(time * 0.4 + s.d) * 10
          op = 1
          lineOp = 0.35 + Math.sin(time * 1.2 + s.d * 3) * 0.15
        } else if (i === 1) {
          const k = smooth(ramp(t, 0.02 + s.d * 0.1, 0.5 + s.d * 0.1))
          x = lerp(x, cx, k)
          y = lerp(y, cy, k)
          sc = lerp(1, 0.2, k)
          op = 1 - ramp(k, 0.75, 1)
          rot = lerp(rot, 0, k)
          lineOp = (1 - k) * 0.5
        } else if (i === 3) {
          const col = j % 3
          const row = Math.floor(j / 3)
          const cell = cr * 0.44
          x = cx + (col - 1) * cell + cr * 0.1
          y = cy + (row - 1) * cell - cr * 0.05
          sc = 0.62
          rot = 0
          op = ramp(t, 0.5 + j * 0.03, 0.62 + j * 0.03) * (1 - ramp(t, 0.92, 1))
        }
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rot}deg) scale(${sc})`
        el.style.opacity = String(op)
        el.style.setProperty("--label", i === 3 ? "0" : "1")
        ln.setAttribute("x1", String(x))
        ln.setAttribute("y1", String(y))
        ln.setAttribute("x2", String(cx))
        ln.setAttribute("y2", String(cy))
        ln.style.opacity = String(lineOp)
      })

      // Automation ring
      RING.forEach((_, j) => {
        const el = ringEls.current[j]
        if (!el) return
        const on = i === 2 ? ramp(t, 0.45, 0.62) * (1 - ramp(t, 0.92, 1)) : 0
        const ang = time * 0.45 + (j / RING.length) * Math.PI * 2
        const x = cx + Math.cos(ang) * cr * 1.45
        const y = cy + Math.sin(ang) * cr * 0.5 + cr * 0.1
        const depth = (Math.sin(ang) + 1) / 2
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.8 + depth * 0.3})`
        el.style.opacity = String(on * (0.4 + depth * 0.6))
        el.style.zIndex = depth > 0.5 ? "2" : "0"
      })

      // Face labels with connectors
      FACES.forEach((_, j) => {
        const el = faceEls.current[j]
        const ln = faceLineEls.current[j]
        if (!el || !ln) return
        const on = i === 4 ? ramp(t, 0.5 + j * 0.05, 0.62 + j * 0.05) * (1 - ramp(t, 0.92, 1)) : 0
        const x = cx + FACE_OFFSETS[j][0] * cr * (narrow ? 0.85 : 1)
        const y = cy + FACE_OFFSETS[j][1] * cr
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
        el.style.opacity = String(on)
        ln.setAttribute("x1", String(x))
        ln.setAttribute("y1", String(y))
        ln.setAttribute("x2", String(cx + FACE_OFFSETS[j][0] * cr * 0.55))
        ln.setAttribute("y2", String(cy + FACE_OFFSETS[j][1] * cr * 0.55))
        ln.style.opacity = String(on * 0.6)
      })

      // Settle ring
      if (arc.current && arcWrap.current) {
        const on = i === 5 ? ramp(t, 0.45, 0.6) * (1 - ramp(t, 0.92, 1)) : 0
        const size = cr * 3.2
        arcWrap.current.style.transform = `translate(${cx}px, ${cy + cr * 0.1}px) translate(-50%, -50%)`
        arcWrap.current.style.width = `${size}px`
        arcWrap.current.style.height = `${size}px`
        arcWrap.current.style.opacity = String(on)
        const k = i === 5 ? smooth(ramp(t, 0.5, 0.92)) : 0
        arc.current.style.strokeDashoffset = String(1 - k)
      }

      // Signal ripples from the antenna
      if (signal.current) {
        const on = i === 6 ? ramp(t, 0.5, 0.65) : 0
        const size = cr * 2.6
        signal.current.style.transform = `translate(${cx}px, ${cy - cr * 1.15}px)`
        signal.current.style.setProperty("--size", `${size}px`)
        signal.current.style.opacity = String(on)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden="true">
      {/* Cube light */}
      <div
        ref={glow}
        className="absolute left-0 top-0 rounded-full will-change-transform"
        style={{
          opacity: 0,
          background: "radial-gradient(closest-side, rgba(96,165,250,0.38), rgba(37,99,235,0.12) 45%, transparent 72%)",
        }}
      />

      {/* Constellation + connector lines */}
      <svg ref={svg} className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {THINGS.map((s, j) => (
          <line
            key={s.icon}
            ref={(el) => {
              lineEls.current[j] = el
            }}
            stroke="#60A5FA"
            strokeWidth={1}
            strokeDasharray="2 6"
            strokeLinecap="round"
            style={{ opacity: 0 }}
          />
        ))}
        {FACES.map((f, j) => (
          <line
            key={f}
            ref={(el) => {
              faceLineEls.current[j] = el
            }}
            stroke="#2563EB"
            strokeWidth={1}
            style={{ opacity: 0 }}
          />
        ))}
      </svg>

      {THINGS.map((s, j) => (
        <div
          key={s.icon}
          ref={(el) => {
            thingEls.current[j] = el
          }}
          className="absolute left-0 top-0 flex flex-col items-center gap-2 will-change-transform"
          style={{ opacity: 0 }}
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-navy-800/70 text-blue-200 shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:h-[68px] md:w-[68px]">
            <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              {ICONS[s.icon]}
            </svg>
          </span>
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-blue-200/70" style={{ opacity: "var(--label, 1)" }}>{s.label}</span>
        </div>
      ))}

      {RING.map((label, j) => (
        <div
          key={label}
          ref={(el) => {
            ringEls.current[j] = el
          }}
          className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-navy/10 bg-white/90 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-navy shadow-[0_10px_30px_rgba(11,31,59,0.12)] backdrop-blur will-change-transform"
          style={{ opacity: 0 }}
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-blue align-middle" />
          {label}
        </div>
      ))}

      {FACES.map((label, j) => (
        <div
          key={label}
          ref={(el) => {
            faceEls.current[j] = el
          }}
          className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-navy/10 bg-white/90 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-navy shadow-[0_10px_30px_rgba(11,31,59,0.12)] backdrop-blur will-change-transform"
          style={{ opacity: 0 }}
        >
          {label}
        </div>
      ))}

      <div ref={arcWrap} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#0B1F3B" strokeOpacity="0.08" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#0B1F3B" strokeOpacity="0.05" strokeWidth="0.4" strokeDasharray="0.5 2" />
          <circle ref={arc} cx="50" cy="50" r="48" fill="none" stroke="#2563EB" strokeWidth="1.2" pathLength={1} strokeDasharray={1} strokeDashoffset={1} strokeLinecap="round" />
        </svg>
      </div>

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
