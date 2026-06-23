"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"

/**
 * Slim, tasteful persistent waitlist CTA for mobile, where the header's Join
 * button is hidden. Appears after the hero, hides near the waitlist section or
 * once the visitor has already joined.
 */
export default function StickyCta() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem("lumora_waitlist_joined") === "true") setJoined(true)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const waitlist = document.getElementById("waitlist")
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9
      let nearWaitlist = false
      if (waitlist) {
        const r = waitlist.getBoundingClientRect()
        nearWaitlist = r.top < window.innerHeight && r.bottom > 0
      }
      setShow(pastHero && !nearWaitlist)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const go = () => {
    const el = document.getElementById("waitlist")
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
    else window.location.href = "/waitlist"
  }

  if (joined) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[70] sm:hidden"
        >
          <div className="flex items-center justify-between gap-3 rounded-full border border-iris/25 bg-base/85 px-4 py-2.5 backdrop-blur-xl">
            <span className="text-sm text-mist">Founding pricing closes soon.</span>
            <button
              onClick={go}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-iris px-4 py-2 text-xs font-semibold text-[#0a0913]"
            >
              Join
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
