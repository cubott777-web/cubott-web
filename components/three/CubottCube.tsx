"use client"

import { useMemo, useRef, type RefObject } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { heroClock, BEATS, DURATION, lerp, smooth, clamp01 } from "./hero-clock"

/**
 * The Cubott robot cube as a real object: six plates (navy body, blue top and front), two eyes on the
 * front face and an antenna on top — the same character as the logo.
 *
 * No scripted "things flying in" — the object itself is the whole story. Loose, independent plates
 * drift with their own mass, then seat with one decisive mechanical lock (spring physics, not an
 * eased tween, so each plate arrives slightly out of sync and overshoots before settling — that
 * desync is what reads as physical rather than animated). After that it idles, powered on: a slow
 * breathing core light, a highlight that tracks the cursor from frame one.
 */

const T = 0.09 // plate thickness
const L = 0.94 // plate length (fine gaps between faces, as in the mark)
const COLORS = { navy: "#17466C", blue: "#3B8ED2" } // logo colours, navy lifted slightly for lit 3D

function plateGeometry(w: number, h: number, d: number) {
  const s = new THREE.Shape()
  const r = 0.03
  s.moveTo(-w / 2 + r, -h / 2)
  s.lineTo(w / 2 - r, -h / 2)
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
  s.lineTo(w / 2, h / 2 - r)
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
  s.lineTo(-w / 2 + r, h / 2)
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
  s.lineTo(-w / 2, -h / 2 + r)
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
  const g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelThickness: 0.014, bevelSize: 0.014, bevelSegments: 3 })
  g.translate(0, 0, -d / 2)
  return g
}

interface Pose {
  at: number // seconds
  y: number
  rx: number
  ry: number
  scale: number
  fade: number // 1 = solid, 0 = ghost
  explode: number // plates separate along their normals (target for the per-plate springs)
  glow: number // core light baseline
  signal: number // antenna baseline light
}

const BASE: Omit<Pose, "at"> = { y: 0, rx: 0.4, ry: 0.35, scale: 1.3, fade: 1, explode: 0, glow: 0.35, signal: 0.3 }
const K = (at: number, o: Partial<Pose>): Pose => ({ ...BASE, at, ...o })

/** Time keys; the spline is continuous through every one. Rotation only accumulates. */
const FRONT = 0.46 // ry that faces the eyes toward camera, logo's isometric 3/4 view

const POSES: Pose[] = [
  // loose: dim, apart, drifting — no rush
  K(0, { ry: FRONT - 0.35, rx: 0.55, y: 0.04, fade: 0.88, explode: 1, glow: 0.15, scale: 1.2, signal: 0.18 }),
  // the lock: one decisive beat, handled by the per-plate springs below
  K(BEATS.snap, { ry: FRONT + 0.3, rx: 0.4, y: 0, fade: 1, explode: 0, glow: 0.5, scale: 1.3, signal: 0.45 }),
  // idle: settled facing front, powered on
  K(BEATS.rest, { ry: FRONT, rx: 0.4, y: 0, glow: 0.35, signal: 0.3 }),
  K(BEATS.rest + 1, { ry: FRONT, rx: 0.4, y: 0, glow: 0.35, signal: 0.3 }),
]
const KEYS = Object.keys(BASE) as (keyof Omit<Pose, "at">)[]
const SPATIAL = new Set<keyof Pose>(["y", "rx", "ry", "scale"])

/** Catmull-Rom across the keys at time p; each segment parameterised 0..1. */
function poseAt(p: number, out: Omit<Pose, "at">) {
  const last = POSES.length - 1
  let i = 0
  while (i < last - 1 && p >= POSES[i + 1].at) i++
  const p1 = POSES[i]
  const p2 = POSES[Math.min(last, i + 1)]
  const p0 = POSES[Math.max(0, i - 1)]
  const p3 = POSES[Math.min(last, i + 2)]
  const t = clamp01((p - p1.at) / Math.max(1e-6, p2.at - p1.at))
  const t2 = t * t
  const t3 = t2 * t
  const st = t2 * (3 - 2 * t)
  for (const k of KEYS) {
    if (SPATIAL.has(k)) {
      out[k] = 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)
    } else {
      // State channels (assembly, light, opacity) must never overshoot their keys
      out[k] = p1[k] + (p2[k] - p1[k]) * st
    }
  }
}

/** Per-plate spring tuning — different stiffness/damping per plate so the lock desyncs and overshoots. */
const PLATE_SPRINGS = [
  { k: 130, d: 13 }, // top
  { k: 95, d: 11 }, // bottom
  { k: 150, d: 15 }, // left
  { k: 105, d: 12 }, // right
  { k: 120, d: 12.5 }, // back
  { k: 138, d: 14 }, // front
]

const _v = new THREE.Vector3()
const _w = new THREE.Vector3()

export default function CubottCube({ reduced }: { reduced: boolean }) {
  const outer = useRef<THREE.Group>(null)
  const group = useRef<THREE.Group>(null)
  const plateRefs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)]
  const [top, bottom, left, right, back, front] = plateRefs
  const core = useRef<THREE.PointLight>(null)
  const ball = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  const geos = useMemo(
    () => ({
      top: plateGeometry(L, L, T).rotateX(Math.PI / 2),
      side: plateGeometry(L, L, T).rotateY(Math.PI / 2),
      face: plateGeometry(L, L, T),
      eye: new THREE.CylinderGeometry(0.075, 0.075, 0.03, 24).rotateX(Math.PI / 2),
      stem: new THREE.CylinderGeometry(0.035, 0.035, 0.34, 16),
      ball: new THREE.SphereGeometry(0.1, 24, 16),
    }),
    []
  )

  const cur = useRef<Omit<Pose, "at">>({ ...BASE })
  const target = useRef<Omit<Pose, "at">>({ ...BASE })
  const seenRestart = useRef<number>(-1)
  const springs = useRef(PLATE_SPRINGS.map(() => ({ x: 1, v: 0 })))
  const lockedAt = useRef<number>(-1)
  const flash = useRef(0)

  useFrame((state, dt) => {
    // The clock accumulates by (clamped) frame delta, not wall time — a slow first frame (environment
    // baking, shader compile) must never eat into the macro-reveal story before it's ever painted.
    if (seenRestart.current !== heroClock.restartAt) {
      seenRestart.current = heroClock.restartAt
      heroClock.t = 0
      springs.current.forEach((s) => {
        s.x = 1
        s.v = 0
      })
      lockedAt.current = -1
    }
    if (!reduced) heroClock.t += Math.min(dt, 0.05)
    else heroClock.t = DURATION + 1
    const t = heroClock.t
    poseAt(t, target.current)

    const c = cur.current
    const e = 1 - Math.pow(0.001, Math.min(dt, 0.1)) // ease toward the spline: weight, not lag
    for (const key of KEYS) c[key] = lerp(c[key], target.current[key], e)

    // One decisive lock, once per run: a hard specular flash instead of a soft glow ramp.
    if (t >= BEATS.snap && lockedAt.current !== heroClock.restartAt) {
      lockedAt.current = heroClock.restartAt
      flash.current = 1
    }
    flash.current = Math.max(0, flash.current - dt / 0.16)

    // Pointer parallax — live from frame one, not gated on the story finishing. That's what makes the
    // highlight feel like it belongs to the viewer rather than to a script.
    const pt = heroClock.pointer
    pt.x += (pt.tx - pt.x) * 0.05
    pt.y += (pt.ty - pt.y) * 0.05

    const o = outer.current!
    o.position.set(0, c.y, 0)
    o.scale.setScalar(c.scale * (1 + flash.current * 0.012))
    const g = group.current!
    // Idle: a slow sway around the logo pose so the object is never frozen but never turns away.
    const idle = Math.max(0, t - DURATION)
    g.rotation.set(
      c.rx + Math.sin(state.clock.elapsedTime * 0.35) * 0.015 + pt.y * 0.1,
      c.ry + Math.sin(idle * 0.3) * 0.22 * smooth(clamp01(idle)) + pt.x * 0.18,
      0
    )

    // Where the cube is in the canvas (fractions), for the ground-glow overlay.
    _v.copy(o.position).project(camera)
    _w.set(o.position.x, o.position.y + 0.8 * c.scale, o.position.z).project(camera)
    heroClock.cube.x = (_v.x + 1) / 2
    heroClock.cube.y = (1 - _v.y) / 2
    heroClock.cube.r = Math.abs(_w.y - _v.y) / 2

    // Each plate is its own spring toward the shared explode target, with its own stiffness and
    // damping — that desync (and the slight overshoot as an underdamped spring settles) is what
    // separates a physical object from six meshes on one eased tween.
    const s = state.clock.elapsedTime
    const dtc = Math.min(dt, 1 / 30)
    const dirs: [RefObject<THREE.Mesh | null>, [number, number, number], number][] = [
      [top, [0, 1, 0], 0],
      [bottom, [0, -1, 0], 1],
      [left, [-1, 0, 0], 2],
      [right, [1, 0, 0], 3],
      [back, [0, 0, -1], 4],
      [front, [0, 0, 1], 5],
    ]
    for (const [ref, dir, i] of dirs) {
      const cfg = PLATE_SPRINGS[i]
      const sp = springs.current[i]
      sp.v += (c.explode - sp.x) * cfg.k * dtc - sp.v * cfg.d * dtc
      sp.x += sp.v * dtc
      const ex = sp.x * 0.5
      const b = Math.max(0, sp.x) * 0.06
      const jitter = Math.sin(s * (0.6 + i * 0.12) + i) * b
      const mesh = ref.current
      if (mesh) mesh.position.set(dir[0] * (0.5 + ex) + (dir[0] === 0 ? jitter : 0), dir[1] * (0.5 + ex) + (dir[1] === 0 ? jitter : 0), dir[2] * (0.5 + ex) + (dir[2] === 0 ? jitter : 0))
    }

    // Powered-on breathing, always present — the object never reads as switched off after the intro.
    const breathe = Math.sin(s * 1.15) * 0.5 + 0.5
    if (core.current) core.current.intensity = 0.3 + c.glow * 3.4 + breathe * 0.18 + flash.current * 4.2
    if (ball.current) {
      ;(ball.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity = c.signal * (0.7 + breathe * 0.5) + flash.current * 1.6
    }
    // Solid ↔ ghost. Materials are created transparent (three bakes an OPAQUE define into a shader that
    // starts opaque); walked every frame because fast refresh and StrictMode remount them.
    g.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (mesh.isMesh) (mesh.material as THREE.MeshPhysicalMaterial).opacity = c.fade
    })
  })

  // Painted, lightly lacquered plastic: soft roughness, a clearcoat for the highlights, reflections from the environment.
  const mat = (color: string) => <meshPhysicalMaterial color={color} roughness={0.42} metalness={0.05} clearcoat={0.55} clearcoatRoughness={0.3} envMapIntensity={0.9} transparent />

  return (
    <group ref={outer}>
      <group ref={group}>
        <mesh ref={top} geometry={geos.top}>
          {mat(COLORS.blue)}
          <mesh geometry={geos.stem} position={[0, 0.2, 0]}>
            {mat(COLORS.navy)}
          </mesh>
          <mesh ref={ball} geometry={geos.ball} position={[0, 0.42, 0]}>
            <meshPhysicalMaterial color={COLORS.navy} roughness={0.42} metalness={0.05} clearcoat={0.55} clearcoatRoughness={0.3} emissive="#5FA8E6" emissiveIntensity={0} transparent />
          </mesh>
        </mesh>
        <mesh ref={bottom} geometry={geos.top}>
          {mat(COLORS.navy)}
        </mesh>
        <mesh ref={left} geometry={geos.side}>
          {mat(COLORS.navy)}
        </mesh>
        <mesh ref={right} geometry={geos.side}>
          {mat(COLORS.navy)}
        </mesh>
        <mesh ref={back} geometry={geos.face}>
          {mat(COLORS.navy)}
        </mesh>
        <mesh ref={front} geometry={geos.face}>
          {mat(COLORS.blue)}
          <mesh geometry={geos.eye} position={[-0.17, -0.06, T / 2 + 0.01]} scale={[1, 1.25, 1]}>
            {mat(COLORS.navy)}
          </mesh>
          <mesh geometry={geos.eye} position={[0.17, -0.06, T / 2 + 0.01]} scale={[1, 1.25, 1]}>
            {mat(COLORS.navy)}
          </mesh>
        </mesh>
        <pointLight ref={core} color="#93C5FD" intensity={1} distance={2.4} decay={2} position={[0, 0, 0]} />
      </group>
    </group>
  )
}
