"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { SITE } from "@/lib/site-content"
import { useInView } from "@/lib/use-in-view"

const HeroScene = dynamic(() => import("@/components/three/scenes/hero-scene"), {
  ssr: false,
  loading: () => null,
})

/**
 * Hero backdrop. Normal visitors get the live 3D mask turning in violet
 * atmosphere, with no product photo. Reduced motion shows a still product
 * image instead. The canvas pauses when the hero scrolls out of view.
 */
export default function HeroBackground() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>("200px")

  useEffect(() => setMounted(true), [])

  if (reduce) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src={SITE.heroImage}
          alt=""
          className="absolute left-1/2 top-1/2 w-[min(74vw,760px)] -translate-x-1/2 -translate-y-1/2 opacity-85"
          style={{ filter: "saturate(1.1) drop-shadow(0 40px 110px rgba(139,124,255,0.45))" }}
        />
      </div>
    )
  }

  return (
    <div ref={ref} aria-hidden className="absolute inset-0">
      {mounted && <HeroScene frameloop={inView ? "always" : "never"} />}
    </div>
  )
}
