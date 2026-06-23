"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useLenis } from "lenis/react"
import { ChevronDown } from "lucide-react"
import Magnetic from "@/components/site/magnetic"
import HeroBackground from "@/components/site/hero-bg"
import { SITE } from "@/lib/site-content"

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const lenis = useLenis()
  const reduce = useReducedMotion()

  const goTo = (href: string) => {
    const el = document.querySelector(href)
    if (!el) return
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 })
    else el.scrollIntoView({ behavior: "smooth" })
  }

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: EASE, delay },
        }

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-28 text-center"
    >
      <HeroBackground />

      {/* legibility scrim + bottom fade, keeps text crisp over the glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(8,7,12,0.55), transparent 62%), linear-gradient(to bottom, rgba(8,7,12,0.4), transparent 25%, transparent 70%, rgba(8,7,12,0.95))",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.p {...fade(0)} className="eyebrow mb-7">
          The Lumora sleep system
        </motion.p>

        <motion.h1
          {...fade(0.08)}
          className="font-display text-balance text-[clamp(3.4rem,12vw,9.5rem)] font-light leading-[0.88] tracking-[-0.02em] text-ink"
          style={{ textShadow: "0 2px 40px rgba(8,7,12,0.6)" }}
        >
          Redefine
          <br />
          <span className="italic text-iris-soft">Rest.</span>
        </motion.h1>

        <motion.p
          {...fade(0.16)}
          className="mt-8 max-w-xl text-balance text-[1.05rem] leading-relaxed text-ink/90 sm:text-lg"
        >
          One mask that tunes light, sound, and temperature to your night. Falling
          asleep. Staying asleep. Waking naturally.
        </motion.p>

        <motion.div {...fade(0.24)} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Magnetic>
            <button
              onClick={() => goTo("#waitlist")}
              className="glow-iris rounded-full bg-iris px-8 py-3.5 text-sm font-semibold text-[#0a0913] transition-colors duration-300 hover:bg-iris-soft"
            >
              Join the waitlist
            </button>
          </Magnetic>
          <button
            onClick={() => goTo("#system")}
            className="rounded-full border border-ink/20 bg-base/30 px-8 py-3.5 text-sm font-medium text-ink backdrop-blur-sm transition-all duration-300 hover:border-ink/40 hover:bg-ink/5"
          >
            Explore the system
          </button>
        </motion.div>

        <motion.p {...fade(0.34)} className="mt-10 text-sm text-mist">
          Follow the journey on{" "}
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet font-medium text-ink hover:text-iris-soft"
          >
            Instagram
          </a>
          .
        </motion.p>
      </div>

      <motion.button
        onClick={() => goTo("#problem")}
        {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1, duration: 1 } })}
        aria-label="Scroll to learn more"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-faint transition-colors hover:text-ink"
      >
        <ChevronDown className="h-6 w-6" style={{ animation: "lumora-scrollcue 2.4s ease-in-out infinite" }} />
      </motion.button>
    </section>
  )
}
