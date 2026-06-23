"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"
import { IRIS_SOFT, makeSoftCircleTexture, makeGlowTexture } from "@/lib/three/palette"

/** Slowly drifting violet dust field. No custom GLSL, just a rotating point cloud. */
export function DustField({ count = 2400, radius = 9 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null)
  const tex = useMemo(() => makeSoftCircleTexture("#b9acff"), [])

  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // distribute in a flattened sphere shell for depth
      const r = radius * (0.35 + Math.random() * 0.65)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      a[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      a[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7
      a[i * 3 + 2] = r * Math.cos(phi) * 0.6 - 2
    }
    return a
  }, [count, radius])

  useEffect(() => () => tex?.dispose(), [tex])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.018
    ref.current.rotation.x += dt * 0.004
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex ?? undefined}
        color={IRIS_SOFT}
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Soft volumetric glow behind the product. */
export function GlowDisc({
  scale = 7,
  z = -2.5,
  opacity = 0.6,
}: {
  scale?: number
  z?: number
  opacity?: number
}) {
  const tex = useMemo(() => makeGlowTexture(), [])
  useEffect(() => () => tex?.dispose(), [tex])
  if (!tex) return null
  return (
    <sprite position={[0, 0, z]} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={tex}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  )
}

/**
 * The product mask rendered as a glowing plane. Additive blending turns the
 * near-black render background transparent and lets the violet rim glow,
 * so the mask reads as a luminous form floating in the dark.
 */
export function ProductPlane({
  src,
  scale = 3,
  parallax = true,
  spin = 0,
}: {
  src: string
  scale?: number
  parallax?: boolean
  spin?: number
}) {
  const group = useRef<THREE.Group>(null)
  const tex = useTexture(src)
  const { pointer } = useThree()

  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace
  }, [tex])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.position.y = Math.sin(t * 0.6) * 0.08
    if (parallax) {
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.x * 0.22 + spin, 0.05)
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.16, 0.05)
    }
  })

  const w = scale * 1.5
  const h = scale
  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          map={tex}
          transparent
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
