"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Lightformer } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { Suspense } from "react"
import * as THREE from "three"
import CubottCube from "./CubottCube"
import { heroClock, BEATS, smooth, ramp } from "./hero-clock"

// Macro open: pressed right up against the front plate's surface, filling the frame with material
// detail — not floating in empty space. Reveal: the full object, framed.
const CAM_START = new THREE.Vector3(0.18, 0.06, 1.55)
const CAM_END = new THREE.Vector3(0, 0.35, 6.2)
const LOOK_START = new THREE.Vector3(0.08, 0.02, 0.95)
const LOOK_END = new THREE.Vector3(0, 0.05, 0)

/** Dollies the camera from a macro seam shot out to the full framing over BEATS.reveal seconds. */
function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree()
  const pos = useRef(CAM_START.clone())
  const look = useRef(LOOK_START.clone())
  useFrame(() => {
    const k = reduced ? 1 : smooth(ramp(heroClock.t, 0, BEATS.reveal))
    pos.current.lerpVectors(CAM_START, CAM_END, k)
    look.current.lerpVectors(LOOK_START, LOOK_END, k)
    camera.position.copy(pos.current)
    camera.lookAt(look.current)
  })
  return null
}

/**
 * WebGL layer for the hero. Full-bleed, transparent so the hero's ground shows through. The
 * environment is built from light panels (no network fetch): a broad soft key from above, a cool
 * rim from the left and a warm-white fill from the right, so the lacquer has something to reflect.
 * A light post-process pass (bloom off the core light, a soft vignette) is what turns a lit 3D
 * model into something that reads like it was shot on a camera.
 */
export default function CubeScene({ reduced, fallback }: { reduced: boolean; fallback?: React.ReactNode }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: CAM_START, fov: 32, near: 0.05, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent", position: "absolute", inset: 0 }}
      fallback={fallback ?? null}
    >
      <Suspense fallback={null}>
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 5, 2]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 6, 1]} />
          <Lightformer form="rect" intensity={1.1} color="#BFDBFE" position={[-6, 1, 1]} rotation={[0, Math.PI / 2, 0]} scale={[6, 3, 1]} />
          <Lightformer form="rect" intensity={0.9} color="#F8FAFC" position={[6, -1, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[5, 3, 1]} />
          <Lightformer form="circle" intensity={0.4} color="#2563EB" position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[6, 6, 1]} />
        </Environment>
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.3} />
        <directionalLight position={[-4, 1.5, 5]} intensity={0.8} color="#DBEAFE" />
        <CameraRig reduced={reduced} />
        <CubottCube reduced={reduced} />
        {!reduced && (
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.55} luminanceSmoothing={0.3} radius={0.5} />
            <Vignette eskil={false} offset={0.25} darkness={0.55} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  )
}
