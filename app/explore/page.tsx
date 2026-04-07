"use client"

import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"

/* =========================
   HOOKS
========================= */

function useInView() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

/* =========================
   WORD REVEAL
========================= */

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ")
  const { ref, visible } = useInView()

  return (
    <p ref={ref} className="leading-relaxed text-lg">
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block mr-2 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          {word}
        </span>
      ))}
    </p>
  )
}

/* =========================
   FADE SECTION
========================= */

function Fade({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  )
}

/* =========================
   MAIN PAGE
========================= */

export default function ExplorePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const sunriseOpacity = Math.min(scrollY / 800, 1)

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* 🌌 NIGHT BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-slate-950" />

      {/* 🌅 SUNRISE GRADIENT */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-900 via-purple-800 to-orange-300 transition-opacity duration-700"
        style={{ opacity: sunriseOpacity }}
      />

      {/* ✨ STARS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-1 h-1 bg-white/40 top-20 left-20 animate-pulse" />
        <div className="absolute w-1 h-1 bg-white/30 top-40 right-40 animate-pulse" />
        <div className="absolute w-1 h-1 bg-white/20 bottom-20 left-1/2 animate-pulse" />
      </div>

      {/* HEADER */}
      <header className="py-8 border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-slate-300 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            Back
          </a>
          <div className="w-px h-6 bg-white/10" />
          <img src="/images/lumora-logo.png" className="h-14" />
        </div>
      </header>

      <main className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 max-w-6xl">

          {/* LEFT TEXT */}
          <div className="space-y-10">

            <Fade>
              <h1 className="text-5xl font-semibold">The Pivot</h1>
              <p className="text-slate-300/70">
                Why Lumora changed direction and what we are building instead
              </p>
            </Fade>

            <WordReveal text="When we first started Lumora, the idea was simple." />
            <WordReveal text="We wanted to build a better sleep mask." />

            <Fade>
              <p className="text-slate-300">
                But we realized something deeper.
              </p>
            </Fade>

            <WordReveal text="Sleep is not one problem. It is a system." />

            <Fade>
              <p className="text-slate-300">
                Over 80 percent of people struggle with sleep. Most take 45 to 90 minutes to fall asleep.
              </p>
            </Fade>

            <WordReveal text="We stopped building a product and started building a system." />

            <Fade>
              <p className="text-slate-300">
                Lumora is designed around falling asleep, staying asleep, and waking naturally.
              </p>
            </Fade>

            <WordReveal text="It does not track sleep. It improves it." />

            <Fade>
              <p className="text-slate-300">
                Over time, Lumora adapts. It learns your patterns and improves automatically.
              </p>
            </Fade>

          </div>

          {/* RIGHT VISUAL SYSTEM */}
          <div className="flex items-center justify-center">

            <Fade>
              <div className="relative w-[300px] h-[300px]">

                {/* CIRCLE */}
                <div className="absolute inset-0 rounded-full border border-white/10" />

                {/* NODES */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur">
                    Sleep
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    Fall
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    Wake
                  </div>
                </div>

                {/* LINES */}
                <svg className="absolute inset-0 w-full h-full">
                  <line x1="150" y1="40" x2="50" y2="250" stroke="white" strokeOpacity="0.2" />
                  <line x1="150" y1="40" x2="250" y2="250" stroke="white" strokeOpacity="0.2" />
                </svg>

              </div>
            </Fade>

          </div>

        </div>
      </main>
    </div>
  )
}
