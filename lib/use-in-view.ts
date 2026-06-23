"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Tracks whether an element is near the viewport, so WebGL canvases can pause
 * (frameloop "never") when scrolled away. Defaults to true so content renders
 * even before the observer reports.
 */
export function useInView<T extends HTMLElement>(rootMargin = "300px") {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])
  return { ref, inView }
}
