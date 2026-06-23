"use client"

import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Environment, Lightformer } from "@react-three/drei"
import * as THREE from "three"
import type { MotionValue } from "framer-motion"
import SceneCanvas from "@/components/three/SceneCanvas"
import { DustField } from "@/components/three/parts"
import MaskModel, { ESSENCE_URL } from "@/components/three/mask-model"
import { IRIS, makeGlowTexture } from "@/lib/three/palette"

type Station = {
  r: number
  theta: number
  phi: number
  ty: number
  focus: [number, number, number]
  glow: number
}

// one camera setup per callout: orbit + zoom to a region, with a focus glow
const STATIONS: Station[] = [
  { r: 7.8, theta: 0.35, phi: 1.46, ty: 0, focus: [0, 0, 0.4], glow: 0.15 },
  { r: 5.7, theta: 0.05, phi: 1.82, ty: -0.25, focus: [0, -0.8, 0.5], glow: 0.95 },
  { r: 5.9, theta: -1.0, phi: 1.42, ty: 0, focus: [-1.3, 0, 0.4], glow: 0.7 },
  { r: 5.1, theta: 0.18, phi: 1.5, ty: 0, focus: [0, 0, 0.9], glow: 0.6 },
  { r: 4.9, theta: 0.62, phi: 1.44, ty: 0.05, focus: [1.0, -0.2, 0.6], glow: 0.55 },
]

const lerp = THREE.MathUtils.lerp

function CameraTour({ progress }: { progress: MotionValue<number> }) {
  const { camera, pointer } = useThree()
  const focusRef = useRef<THREE.Sprite>(null)
  const focusMat = useRef<THREE.SpriteMaterial>(null)
  const tex = useMemo(() => makeGlowTexture("#b6a8ff", "#5b3fb0"), [])
  const desiredPos = useRef(new THREE.Vector3(0, 0, 7.8))
  const lookTarget = useRef(new THREE.Vector3())
  const desiredLook = useRef(new THREE.Vector3())
  const fpos = useRef(new THREE.Vector3())

  useFrame(() => {
    const p = THREE.MathUtils.clamp(progress.get(), 0, 1)
    const n = STATIONS.length - 1
    const f = p * n
    const i = Math.min(Math.floor(f), n - 1)
    const t = f - i
    const a = STATIONS[i]
    const b = STATIONS[i + 1]

    const r = lerp(a.r, b.r, t)
    const theta = lerp(a.theta, b.theta, t) + pointer.x * 0.1
    const phi = lerp(a.phi, b.phi, t) - pointer.y * 0.05
    const ty = lerp(a.ty, b.ty, t)

    // damp the camera toward the target so fast scrolls (and nav jumps) ease
    // in smoothly instead of racing through the tour
    desiredPos.current.set(
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.cos(theta),
    )
    camera.position.lerp(desiredPos.current, 0.09)
    desiredLook.current.set(0, ty, 0)
    lookTarget.current.lerp(desiredLook.current, 0.09)
    camera.lookAt(lookTarget.current)

    if (focusRef.current && focusMat.current) {
      fpos.current.set(
        lerp(a.focus[0], b.focus[0], t),
        lerp(a.focus[1], b.focus[1], t),
        lerp(a.focus[2], b.focus[2], t),
      )
      focusRef.current.position.lerp(fpos.current, 0.1)
      focusMat.current.opacity = lerp(focusMat.current.opacity, lerp(a.glow, b.glow, t), 0.1)
    }
  })

  if (!tex) return null
  return (
    <sprite ref={focusRef} scale={[3, 3, 1]}>
      <spriteMaterial
        ref={focusMat}
        map={tex}
        transparent
        opacity={0.2}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  )
}

export default function EssenceScene({
  progress,
  frameloop = "always",
}: {
  progress: MotionValue<number>
  frameloop?: "always" | "never"
}) {
  return (
    <SceneCanvas frameloop={frameloop} camera={{ position: [0, 0, 7.8], fov: 34 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 6]} intensity={2.2} color="#ece9ff" />
      <pointLight position={[-5, -1, 3]} intensity={2} color={IRIS} />

      <Environment resolution={192}>
        <Lightformer intensity={2.4} color="#a99aff" position={[-4, 2, 4]} scale={[8, 8, 1]} />
        <Lightformer intensity={1.6} color="#ffffff" position={[4, 1, 3]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.2} color="#5b3fb0" position={[0, -4, -4]} scale={[10, 6, 1]} />
      </Environment>

      <DustField count={700} radius={9} />
      <MaskModel url={ESSENCE_URL} spin="none" />
      <CameraTour progress={progress} />
    </SceneCanvas>
  )
}
