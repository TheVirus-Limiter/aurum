"use client"

import { useEffect, useRef, useState } from "react"
import { useLenis } from "lenis/react"
import { Instagram, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { navLinks, SITE } from "@/lib/site-content"
import Magnetic from "@/components/site/magnetic"

export default function SiteHeader() {
  const lenis = useLenis()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (y < 80) {
        setHidden(false)
      } else {
        setHidden(y > lastY.current)
      }
      lastY.current = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goTo = (href: string) => {
    setMenuOpen(false)
    if (href === "#top") {
      lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    const el = document.querySelector(href)
    if (!el) return
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -90 })
    else el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-500 ${
          scrolled || menuOpen
            ? "border-b border-ink/10 bg-base/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
          <button
            onClick={() => goTo("#top")}
            aria-label="Lumora Sleep, back to top"
            className="flex items-center"
          >
            <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-24 w-auto sm:h-[7.5rem]" />
          </button>

          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => goTo(l.href)}
                className="link-quiet text-[0.8rem] font-medium tracking-wide text-mist hover:text-ink"
              >
                {l.label}
              </button>
            ))}
            <a
              href="/blog"
              className="link-quiet text-[0.8rem] font-medium tracking-wide text-mist hover:text-ink"
            >
              Journal
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lumora on Instagram"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-mist transition-colors hover:border-ink/35 hover:text-ink sm:flex"
            >
              <Instagram className="h-4 w-4" />
            </a>

            <Magnetic className="hidden sm:block">
              <button
                onClick={() => goTo("#waitlist")}
                className="rounded-full bg-ink px-5 py-2.5 text-[0.8rem] font-semibold text-[#0a0913] transition-all duration-300 hover:bg-iris-soft"
              >
                Join the waitlist
              </button>
            </Magnetic>

            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-base/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-2 px-8">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => goTo(l.href)}
                  className="font-display text-left text-4xl font-light text-ink"
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.a
                href="/blog"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + navLinks.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setMenuOpen(false)}
                className="font-display text-left text-4xl font-light text-ink"
              >
                Journal
              </motion.a>
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + (navLinks.length + 1) * 0.06 }}
                onClick={() => goTo("#waitlist")}
                className="mt-6 w-full rounded-full bg-ink px-6 py-4 text-center text-sm font-semibold text-[#0a0913]"
              >
                Join the waitlist
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
