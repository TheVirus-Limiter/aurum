"use client"

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { useRef } from "react"

/**
 * Subtle magnetic pull toward the cursor. Kept small and well-damped so it
 * reads as physical, not gimmicky. Falls back to a plain element when the
 * visitor prefers reduced motion.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 170, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 170, damping: 15, mass: 0.4 })

  if (reduce) return <div className={className}>{children}</div>

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = e.clientX - (rect.left + rect.width / 2)
    const my = e.clientY - (rect.top + rect.height / 2)
    x.set(mx * strength)
    y.set(my * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}
