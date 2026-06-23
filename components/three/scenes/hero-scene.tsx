"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { Environment, Lightformer } from "@react-three/drei"
import * as THREE from "three"
import SceneCanvas from "@/components/three/SceneCanvas"
import { DustField, GlowDisc } from "@/components/three/parts"
import MaskModel, { MAX_URL } from "@/components/three/mask-model"
import { IRIS, IRIS_SOFT } from "@/lib/three/palette"

function CameraParallax({ strength = 0.45, ease = 0.045 }: { strength?: number; ease?: number }) {
  const { camera, pointer } = useThree()
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * strength, ease)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * strength, ease)
    camera.lookAt(0, 0, 0)
  })
  return null
}

/** Hero: the live 3D mask slowly turning in violet atmosphere. */
export default function HeroScene({ frameloop = "always" }: { frameloop?: "always" | "never" }) {
  return (
    <SceneCanvas frameloop={frameloop} camera={{ position: [0, 0, 8], fov: 34 }}>
      <CameraParallax />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 6]} intensity={2} color="#ece9ff" />
      <pointLight position={[-5, -1, 3]} intensity={2.2} color={IRIS} />

      <Environment resolution={256}>
        <Lightformer intensity={2.2} color="#a99aff" position={[-4, 2, 4]} scale={[8, 8, 1]} />
        <Lightformer intensity={1.5} color="#ffffff" position={[4, 1, 3]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.2} color="#5b3fb0" position={[0, -4, -4]} scale={[10, 6, 1]} />
      </Environment>

      <GlowDisc scale={11} z={-4} opacity={0.45} />
      <DustField count={1100} radius={9} />
      <MaskModel url={MAX_URL} spin="idle" />
    </SceneCanvas>
  )
}
