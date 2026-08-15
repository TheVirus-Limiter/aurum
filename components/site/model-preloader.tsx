"use client"

import { useEffect } from "react"
import { useReducedMotion } from "framer-motion"
import { useGLTF } from "@react-three/drei"
import { ESSENCE_URL } from "@/components/three/mask-model"

/**
 * Warms the GLB cache on page load so the product viewer renders instantly
 * when scrolled to, instead of fetching on first sight.
 */
export default function ModelPreloader() {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    useGLTF.preload(ESSENCE_URL)
  }, [reduce])
  return null
}
