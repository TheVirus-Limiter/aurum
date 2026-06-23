"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState, type ReactNode } from "react"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Fade + lift an element as it enters the viewport.
 * Bulletproof: a failsafe timer always reveals the content, so text can
 * never get stuck invisible if the viewport trigger does not fire.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const [failsafe, setFailsafe] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFailsafe(true), 1100)
    return () => clearTimeout(t)
  }, [])

  const show = reduce || inView || failsafe

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Cascade a set of <StaggerItem> in on viewport entry, with the same failsafe. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const [failsafe, setFailsafe] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFailsafe(true), 1300)
    return () => clearTimeout(t)
  }, [])

  const show = reduce || inView || failsafe

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}
