"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, type ReactNode } from "react"
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei"

/**
 * Shared client-only Canvas wrapper. Transparent (the CSS near-black shows
 * through), DPR capped for retina/mobile, GPU-friendly defaults.
 */
export default function SceneCanvas({
  children,
  frameloop = "always",
  camera = { position: [0, 0, 6] as [number, number, number], fov: 35 },
  className,
}: {
  children: ReactNode
  frameloop?: "always" | "demand" | "never"
  camera?: { position: [number, number, number]; fov: number }
  className?: string
}) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      frameloop={frameloop}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={camera}
      resize={{ scroll: false }}
    >
      <Suspense fallback={null}>{children}</Suspense>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  )
}
