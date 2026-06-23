"use client"

import { ReactLenis } from "lenis/react"
import { useEffect, useState } from "react"

/**
 * App-wide buttery smooth scrolling.
 * Disabled automatically for visitors who prefer reduced motion, so the
 * page falls back to the browser's native, instant scroll for them.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.15,
        smoothWheel: !reduced,
        syncTouch: false,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  )
}
