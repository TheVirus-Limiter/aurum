"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

/** Counts up to `value` once it scrolls into view. Honors reduced motion. */
export default function CountUp({
  value,
  duration = 1.4,
  className,
}: {
  value: number
  duration?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    let raf = 0
    let start: number | null = null
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / (duration * 1000), 1)
      setDisplay(Math.round(ease(p) * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, value, duration])

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
    </span>
  )
}
