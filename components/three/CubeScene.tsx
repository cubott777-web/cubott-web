"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Lightformer } from "@react-three/drei"
import { Suspense } from "react"
import CubottCube from "./CubottCube"

/**
 * Fixed, full-viewport WebGL layer that sits behind the homepage copy.
 * Transparent background so the page's own scene colours show through.
 * The environment is built from light panels (no network fetch): a broad soft key from above,
 * a cool rim from the left and a warm-white fill from the right, so the lacquer has something to reflect.
 */
export default function CubeScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 6.2], fov: 32, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        fallback={null}
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
          <CubottCube />
        </Suspense>
      </Canvas>
    </div>
  )
}
