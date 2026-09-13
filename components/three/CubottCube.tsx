"use client"

import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { scrollStore, sceneAt, lerp, smooth, clamp01, SCENES } from "./scroll-store"

/**
 * The Cubott robot cube as a real object: six plates (navy body, blue top and front), two eyes on the
 * front face and an antenna on top — the same character as the logo.
 *
 * The homepage story drives it through poses: faint behind the chaos, assembling from it, turning like
 * an engine, opening its front, splitting into faces, settling, and finally signalling.
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
  const g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2 })
  g.translate(0, 0, -d / 2)
  return g
}

interface Pose {
  x: number // horizontal home, in sevenths of the viewport width from centre
  y: number
  rx: number
  ry: number
  scale: number
  fade: number // 1 = solid, 0 = ghost
  explode: number // plates separate along their normals
  open: number // front face swings open on its left hinge
  glow: number // core light
  signal: number // antenna light
}

/** One pose per scene boundary; the cube interpolates across each scene. */
const POSES: Pose[] = [
  { x: 0, y: -0.1, rx: 0.42, ry: 0.6, scale: 0.9, fade: 0.22, explode: 0, open: 0, glow: 0, signal: 0 }, // 1 moving things: ghost behind the chaos
  { x: 0, y: -0.45, rx: 0.42, ry: 1.6, scale: 0.95, fade: 0.35, explode: 0.6, open: 0, glow: 0, signal: 0 }, // 2 start: still loose
  { x: 0, y: -0.45, rx: 0.42, ry: 2.9, scale: 0.95, fade: 1, explode: 0, open: 0, glow: 1, signal: 0 }, // 2 end: one system
  { x: 1.55, y: 0, rx: 0.42, ry: 9.2, scale: 1.0, fade: 1, explode: 0, open: 0, glow: 0.6, signal: 0 }, // 3 engine: full turns
  { x: -1.55, y: 0, rx: 0.3, ry: 12.9, scale: 1.0, fade: 1, explode: 0, open: 1, glow: 0.8, signal: 0 }, // 4 pain: opens up
  { x: 0.9, y: -0.1, rx: 0.5, ry: 14.4, scale: 0.9, fade: 1, explode: 0.9, open: 0, glow: 0.2, signal: 0 }, // 5 built around you: faces
  { x: 1.55, y: -0.2, rx: 0.42, ry: 19.45, scale: 1.0, fade: 1, explode: 0, open: 0, glow: 0.4, signal: 0 }, // 6 stay: settled
  { x: -1.7, y: -1.05, rx: 0.42, ry: 19.45, scale: 0.6, fade: 1, explode: 0, open: 0, glow: 0.3, signal: 1 }, // 7 call away: signal
]

const _v = new THREE.Vector3()
const _w = new THREE.Vector3()

export default function CubottCube() {
  const group = useRef<THREE.Group>(null)
  const top = useRef<THREE.Mesh>(null)
  const bottom = useRef<THREE.Mesh>(null)
  const left = useRef<THREE.Mesh>(null)
  const right = useRef<THREE.Mesh>(null)
  const back = useRef<THREE.Mesh>(null)
  const frontPivot = useRef<THREE.Group>(null)
  const core = useRef<THREE.PointLight>(null)
  const ball = useRef<THREE.Mesh>(null)
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

  const cur = useRef<Pose>({ ...POSES[0] })
  const mats = useRef<THREE.MeshStandardMaterial[]>([])

  useFrame((state, dt) => {
    const { i, t } = sceneAt(scrollStore.progress)
    const a = POSES[i]
    const b = POSES[Math.min(i + 1, SCENES)]
    // Reach the scene's pose by its midpoint, then hold, so each scene has a settled second half.
    const k = smooth(clamp01(t / 0.55))
    const c = cur.current
    const e = 1 - Math.pow(0.001, dt) // ease toward the target so scroll feels weighty
    for (const key of Object.keys(c) as (keyof Pose)[]) c[key] = lerp(c[key], lerp(a[key], b[key], k), e)

    const narrow = viewport.width < 5
    const s = c.scale * (narrow ? 0.55 : 1)
    const gx = narrow ? 0 : c.x * (viewport.width / 7)
    const gy = narrow ? c.y + 1.15 : c.y

    const g = group.current!
    g.position.set(gx, gy, 0)
    g.rotation.set(c.rx, c.ry + Math.sin(state.clock.elapsedTime * 0.3) * 0.03, 0)
    g.scale.setScalar(s)

    // Where the cube is on screen (viewport fractions), for the HTML overlays.
    _v.copy(g.position).project(camera)
    _w.set(g.position.x, g.position.y + 0.8 * s, 0).project(camera)
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
      ;(ball.current.material as THREE.MeshStandardMaterial).emissiveIntensity = c.signal * (1.6 + Math.sin(state.clock.elapsedTime * 4) * 0.6)
    }

    // Solid ↔ ghost
    if (mats.current.length === 0) {
      g.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.isMesh) mats.current.push(mesh.material as THREE.MeshStandardMaterial)
      })
    }
    for (const m of mats.current) {
      m.transparent = c.fade < 0.999
      m.opacity = c.fade
    }

  })

  const mat = (color: string) => <meshStandardMaterial color={color} roughness={0.38} metalness={0.08} />

  return (
    <group ref={group}>
      <mesh ref={top} geometry={geos.top} castShadow receiveShadow>
        {mat(COLORS.blue)}
        <mesh geometry={geos.stem} position={[0, 0.2, 0]}>
          {mat(COLORS.navy)}
        </mesh>
        <mesh ref={ball} geometry={geos.ball} position={[0, 0.42, 0]}>
          <meshStandardMaterial color={COLORS.navy} roughness={0.38} metalness={0.08} emissive="#5FA8E6" emissiveIntensity={0} />
        </mesh>
      </mesh>
      <mesh ref={bottom} geometry={geos.top} castShadow receiveShadow>
        {mat(COLORS.navy)}
      </mesh>
      <mesh ref={left} geometry={geos.side} castShadow receiveShadow>
        {mat(COLORS.navy)}
      </mesh>
      <mesh ref={right} geometry={geos.side} castShadow receiveShadow>
        {mat(COLORS.navy)}
      </mesh>
      <mesh ref={back} geometry={geos.face} castShadow receiveShadow>
        {mat(COLORS.navy)}
      </mesh>
      {/* Front face on a hinge at its left edge */}
      <group ref={frontPivot}>
        <mesh geometry={geos.face} position={[L / 2, 0, 0]} castShadow receiveShadow>
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
  )
}
