"use client"

import { useMemo } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

/** Load a GLB, center it at the origin and scale it to a target size so any
 *  export (any scale/offset) frames consistently. */
export function useFittedModel(url: string, target = 3.6) {
  const { scene } = useGLTF(url)
  return useMemo(() => {
    const root = scene.clone(true)
    const box = new THREE.Box3().setFromObject(root)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    root.position.sub(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    root.scale.setScalar(target / maxDim)
    root.traverse((o) => {
      const m = o as THREE.Mesh
      if (m.isMesh) {
        m.castShadow = true
        m.receiveShadow = true
      }
    })
    return root
  }, [scene, target])
}

export function FittedModel({ url, target = 2.2 }: { url: string; target?: number }) {
  const model = useFittedModel(url, target)
  return <primitive object={model} />
}
