"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import CubottCube from "./CubottCube"

/**
 * Fixed, full-viewport WebGL layer that sits behind the homepage copy.
 * Transparent background so the page's own scene colours show through.
 */
export default function CubeScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 6.2], fov: 32, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
        style={{ background: "transparent" }}
        fallback={null}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.75} />
          <hemisphereLight args={["#ffffff", "#0B1F3B", 0.5]} />
          <directionalLight position={[4, 6, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-5, -2, -4]} intensity={0.35} color="#93C5FD" />
          {/* Fill from the front-left so the navy face keeps its form on the navy ground */}
          <directionalLight position={[-4, 1.5, 5]} intensity={1.1} color="#DBEAFE" />
          <CubottCube />
        </Suspense>
      </Canvas>
    </div>
  )
}
