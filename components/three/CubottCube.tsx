"use client"

import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { scrollStore, sectionAt, lerp, smooth, clamp01, ramp } from "./scroll-store"

/**
 * The Cubott robot cube as a real object: six plates (navy body, blue top and front), two eyes on the
 * front face and an antenna on top — the same character as the logo.
 *
 * One object, one journey down the page: awake beside the hero copy, the centre of the story, parked
 * small in the corner while the page talks, back at full size to close.
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
  at: number // page phase this key sits at (section index + progress)
  x: number // horizontal, as a fraction of half the viewport width (−1 left edge … 1 right edge)
  y: number // vertical, as a fraction of half the viewport height
  z: number
  rx: number
  ry: number
  scale: number
  fade: number // 1 = solid, 0 = ghost
  explode: number // plates separate along their normals
  open: number // front face swings open on its left hinge
  glow: number // core light
  signal: number // antenna light
}

const BASE: Omit<Pose, "at"> = { x: 0.5, y: -0.02, z: 0, rx: 0.38, ry: 0.45, scale: 1.05, fade: 1, explode: 0, open: 0, glow: 0.5, signal: 0 }
const K = (at: number, o: Partial<Pose>): Pose => ({ ...BASE, at, ...o })

/** Keys are placed at page phases; the spline is continuous through every one. Rotation only accumulates. */
const POSES: Pose[] = [
  // 0 — hero: awake, solid, beside the copy
  K(0, { scale: 0.98, x: 0.48 }),
  K(0.8, { ry: 0.95, scale: 0.98, x: 0.48 }),
  // 1 — story, beat 1 (complexity): loosens and dims among the moving things
  K(1.0, { ry: 1.6, scale: 0.95, fade: 0.5, explode: 0.3, glow: 0.25 }),
  K(1.28, { ry: 2.1, scale: 0.95, fade: 0.55, explode: 0.4, glow: 0.3 }),
  // beat 2 (connection): pulls together and lights
  K(1.5, { ry: 3.1, scale: 1.02, fade: 1, explode: 0, glow: 1 }),
  // beat 3 (clarity): opens and works
  K(1.7, { ry: 3.9, rx: 0.3, scale: 1.02, open: 1, glow: 0.85 }),
  K(1.95, { ry: 4.15, rx: 0.3, scale: 1.02, open: 1, glow: 0.85 }),
  // 2–4 — what · how · proof: parks small in the top-right corner
  K(2.3, { x: 0.87, y: 0.56, ry: 5.6, rx: 0.42, scale: 0.34, glow: 0.2, fade: 0.92 }),
  K(3.0, { x: 0.87, y: 0.56, ry: 6.4, rx: 0.42, scale: 0.34, glow: 0.2, fade: 0.92 }),
  K(4.0, { x: 0.87, y: 0.56, ry: 7.3, rx: 0.42, scale: 0.34, glow: 0.2, fade: 0.92 }),
  K(4.8, { x: 0.87, y: 0.56, ry: 8.0, rx: 0.42, scale: 0.34, glow: 0.2, fade: 0.92 }),
  // 5 — cta: returns to full size beside the closing copy and signals
  K(5.35, { x: 0.45, y: 0.05, ry: 9.8, rx: 0.42, scale: 0.95, glow: 0.4, signal: 1 }),
  K(5.7, { x: 0.45, y: 0.05, ry: 10.0, rx: 0.42, scale: 0.95, glow: 0.4, signal: 1 }),
  // …and leaves before the footer: rises and fades
  K(6, { x: 0.45, y: 0.35, ry: 10.3, rx: 0.42, scale: 0.9, glow: 0, signal: 0, fade: 0 }),
]
const KEYS = (Object.keys(BASE) as (keyof Omit<Pose, "at">)[])
const SPATIAL = new Set<keyof Pose>(["x", "y", "z", "rx", "ry", "scale"])

/** Catmull-Rom across the keys at page phase p. Keys are non-uniform in phase; each segment is parameterised 0..1. */
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
      // State channels (assembly, opening, light, opacity) must never overshoot their keys
      out[k] = p1[k] + (p2[k] - p1[k]) * st
    }
  }
}

const _v = new THREE.Vector3()
const _w = new THREE.Vector3()

export default function CubottCube() {
  const outer = useRef<THREE.Group>(null)
  const group = useRef<THREE.Group>(null)
  const top = useRef<THREE.Mesh>(null)
  const bottom = useRef<THREE.Mesh>(null)
  const left = useRef<THREE.Mesh>(null)
  const right = useRef<THREE.Mesh>(null)
  const back = useRef<THREE.Mesh>(null)
  const frontPivot = useRef<THREE.Group>(null)
  const core = useRef<THREE.PointLight>(null)
  const ball = useRef<THREE.Mesh>(null)
  const shadow = useRef<THREE.Group>(null)
  const { viewport, camera } = useThree()

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

  useFrame((state, dt) => {
    poseAt(scrollStore.phase, target.current)
    const { i } = sectionAt(scrollStore.phase)
    const tg = target.current

    // Phones: the copy owns the top of the screen, the cube the bottom; parked sections keep it tiny in the corner.
    const narrow = viewport.width < 5
    if (narrow) {
      const p = scrollStore.phase
      if (i <= 1 || i === 5) {
        tg.x = 0
        tg.y = -0.55
        tg.scale = 0.55
      } else {
        tg.x = 0.7
        tg.y = 0.62
        tg.scale = 0.28
      }
      // Sections stack vertically here, so the cube steps out while copy passes through its spot
      tg.fade *= (1 - ramp(p, 0.45, 0.8)) + ramp(p, 1.02, 1.14)
      tg.fade *= 1 - ramp(p, 4.55, 4.85) * (1 - ramp(p, 5.05, 5.3))
      tg.fade = Math.min(1, tg.fade)
    }

    const c = cur.current
    const e = 1 - Math.pow(0.002, Math.min(dt, 0.1)) // ease toward the spline so scroll feels weighty
    for (const key of KEYS) c[key] = lerp(c[key], tg[key], e)

    const o = outer.current!
    o.position.set(c.x * (viewport.width / 2), c.y * (viewport.height / 2), c.z)
    o.scale.setScalar(c.scale)
    const g = group.current!
    // A slow perpetual turn on top of the spline: the object is never frozen.
    g.rotation.set(c.rx + Math.sin(state.clock.elapsedTime * 0.35) * 0.015, c.ry + state.clock.elapsedTime * 0.04, 0)

    // Where the cube is on screen (viewport fractions), for the HTML overlay.
    _v.copy(o.position).project(camera)
    _w.set(o.position.x, o.position.y + 0.8 * c.scale, o.position.z).project(camera)
    scrollStore.cube.x = (_v.x + 1) / 2
    scrollStore.cube.y = (1 - _v.y) / 2
    scrollStore.cube.r = Math.abs(_w.y - _v.y) / 2

    const ex = c.explode * 0.55
    top.current!.position.set(0, 0.5 + ex, 0)
    bottom.current!.position.set(0, -0.5 - ex, 0)
    left.current!.position.set(-0.5 - ex, 0, 0)
    right.current!.position.set(0.5 + ex, 0, 0)
    back.current!.position.set(0, 0, -0.5 - ex)
    const fp = frontPivot.current!
    fp.position.set(-L / 2, 0, 0.5 + ex)
    fp.rotation.y = -smooth(clamp01(c.open)) * 1.9

    if (core.current) core.current.intensity = 0.4 + c.glow * 3.2
    if (ball.current) {
      ;(ball.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity = c.signal * (1.6 + Math.sin(state.clock.elapsedTime * 4) * 0.6)
    }
    if (shadow.current) shadow.current.visible = c.fade > 0.85 && c.explode < 0.2

    // Solid ↔ ghost. Materials are created transparent (three bakes an OPAQUE define into a shader that
    // starts opaque, so toggling later would need a recompile); walked every frame rather than cached
    // because fast refresh and StrictMode remount them.
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
        {/* Front face on a hinge at its left edge */}
        <group ref={frontPivot}>
          <mesh geometry={geos.face} position={[L / 2, 0, 0]}>
            {mat(COLORS.blue)}
            <mesh geometry={geos.eye} position={[-0.17, -0.06, T / 2 + 0.01]} scale={[1, 1.25, 1]}>
              {mat(COLORS.navy)}
            </mesh>
            <mesh geometry={geos.eye} position={[0.17, -0.06, T / 2 + 0.01]} scale={[1, 1.25, 1]}>
              {mat(COLORS.navy)}
            </mesh>
          </mesh>
        </group>
        <pointLight ref={core} color="#93C5FD" intensity={1} distance={2.4} decay={2} position={[0, 0, 0]} />
      </group>
      {/* Grounding: a soft contact shadow that travels with the object */}
      <group ref={shadow} position={[0, -0.78, 0]}>
        <ContactShadows opacity={0.32} scale={3.2} blur={2.6} far={1.6} resolution={256} color="#071427" />
      </group>
    </group>
  )
}
