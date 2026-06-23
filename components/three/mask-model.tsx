"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import type { MotionValue } from "framer-motion"
import { useFittedModel } from "@/components/three/fitted-model"

export const ESSENCE_URL = "/models/LumoraEssence.glb"
export const MAX_URL = "/models/LumoraMax.glb"

export default function MaskModel({
  progress,
  url = ESSENCE_URL,
  spin = "idle",
  target = 3.6,
}: {
  progress?: MotionValue<number>
  url?: string
  spin?: "scroll" | "idle" | "none"
  target?: number
}) {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  const model = useFittedModel(url, target)

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    if (spin !== "none") g.position.y = Math.sin(t * 0.7) * 0.05

    if (spin === "scroll") {
      const p = progress ? progress.get() : 0
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.5 + p * 1.4 + pointer.x * 0.16, 0.08)
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.06 - pointer.y * 0.1, 0.08)
    } else if (spin === "idle") {
      g.rotation.y += dt * 0.22
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.06 - pointer.y * 0.1, 0.08)
    }
    // spin === "none": rotation is handled by OrbitControls
  })

  return (
    <group ref={group} rotation={[-0.06, 0, 0]}>
      <primitive object={model} />
    </group>
  )
}
