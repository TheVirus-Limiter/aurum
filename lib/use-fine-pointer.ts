"use client"

import { useEffect, useState } from "react"

/**
 * True only on devices with a precise pointer (mouse/trackpad). Used to enable
 * drag-to-rotate on desktop while leaving touch devices to scroll freely, so a
 * 3D canvas never traps the page scroll on mobile.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])
  return fine
}
