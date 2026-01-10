"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"



type ComponentId = "thermal" | "leds" | "audio" | "battery" | "comfort" | "exterior"

type MaskComponent = {
  id: ComponentId
  title: string
  short: string
  details: string
  position: { x: number; y: number }
  tag: string
}

const COMPONENTS: MaskComponent[] = [
  {
    id: "thermal",
    title: "Adaptive Thermal Control",
    short: "Phase change regulation to stabilize skin temperature.",
    details:
      "Phase Change Materials (PCM) absorb and release heat to reduce temperature swings that interrupt deeper sleep. The result is a steadier microclimate against the skin, cool when you run warm, balanced when you do not.",
    position: { x: 52, y: 56 },
    tag: "PCM Layer",
  },
  {
    id: "leds",
    title: "Wake Light System",
    short: "A gentle sunrise simulation for a calmer wake.",
    details:
      "A calibrated light curve brightens gradually over your selected window, helping reduce abrupt wake ups. It is designed to feel like dawn, not a flashlight.",
    position: { x: 36, y: 42 },
    tag: "Sunrise Ramp",
  },
  {
    id: "audio",
    title: "Bone Conduction Audio",
    short: "Immersive soundscapes without sealed ears.",
    details:
      "Bone conduction transducers deliver audio through gentle vibration while leaving your ears unobstructed. This supports a natural sleep environment while preserving situational awareness.",
    position: { x: 84, y: 48 },
    tag: "Transducers",
  },
  {
    id: "battery",
    title: "Battery and Charging",
    short: "All night power with refined wired charging.",
    details:
      "A compact lithium system is tuned for overnight use. Wired charging via gold plated contacts keeps the exterior clean and reduces visual clutter.",
    position: { x: 24, y: 63 },
    tag: "8+ Hours",
  },
  {
    id: "comfort",
    title: "Memory Foam Contour",
    short: "Medical grade pressure distribution.",
    details:
      "Biocompatible memory foam conforms to facial contours to reduce pressure points while maintaining effective light blocking. The contour is engineered to feel weightless, not tight.",
    position: { x: 52, y: 66 },
    tag: "Pressure Relief",
  },
  {
    id: "exterior",
    title: "Mulberry Silk Cover",
    short: "A breathable, moisture managing exterior.",
    details:
      "Premium mulberry silk provides a soft hand feel with natural breathability and moisture management. It is chosen for comfort, durability, and a subtle luxury finish.",
    position: { x: 70, y: 72 },
    tag: "Mulberry Silk",
  },
]

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0
  if (i < 0) return len - 1
  if (i >= len) return 0
  return i
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(!!mq.matches)
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])
  return reduced
}

function SectionShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_55%,rgba(56,189,248,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_55%,rgba(167,139,250,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0),rgba(2,6,23,0.78))]" />
      </div>

      <div className="text-center mb-10 md:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] tracking-[0.24em] uppercase text-slate-200/75">
          Lumora Mask
        </div>
        <h1 className="mt-5 text-4xl md:text-6xl font-semibold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-300/70 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {children}
    </section>
  )
}

function FocusCrosshair({
  x,
  y,
  visible,
  reducedMotion,
}: {
  x: number
  y: number
  visible: boolean
  reducedMotion: boolean
}) {
  return (
    <div
      aria-hidden
      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transitionDuration: reducedMotion ? "0ms" : "450ms",
      }}
    >
      <div className="relative">
        <div className="w-9 h-9 rounded-full border border-white/35 bg-white/5 backdrop-blur-md shadow-[0_0_0_10px_rgba(255,255,255,0.03)]" />
        <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-white/40" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-9 bg-gradient-to-b from-white/35 to-transparent" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-px h-9 bg-gradient-to-t from-white/35 to-transparent" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-9 bg-gradient-to-r from-white/35 to-transparent" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-px w-9 bg-gradient-to-l from-white/35 to-transparent" />
      </div>
    </div>
  )
}

function ChapterList({
  components,
  activeId,
  onSelect,
}: {
  components: MaskComponent[]
  activeId: ComponentId
  onSelect: (id: ComponentId) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {components.map((c, i) => {
        const active = c.id === activeId
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm border transition ${
              active
                ? "bg-white/10 border-white/20 text-slate-100"
                : "bg-white/5 border-white/10 text-slate-200/80 hover:bg-white/8 hover:border-white/15"
            }`}
            aria-pressed={active}
          >
            <span className="text-[11px] tracking-[0.18em] uppercase text-slate-200/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-medium">{c.title}</span>
          </button>
        )
      })}
    </div>
  )
}

function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  disabled,
}: {
  onSwipeLeft: () => void
  onSwipeRight: () => void
  disabled?: boolean
}) {
  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)
  const active = useRef(false)

  const onTouchStart = (e: React.TouchEvent) => {
    if (disabled) return
    const t = e.touches[0]
    startX.current = t.clientX
    startY.current = t.clientY
    active.current = true
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!active.current || disabled) return
    // prevent accidental vertical scroll blocking; we only decide on end
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!active.current || disabled) return
    const x0 = startX.current
    const y0 = startY.current
    if (x0 == null || y0 == null) return

    const t = e.changedTouches[0]
    const dx = t.clientX - x0
    const dy = t.clientY - y0

    // require mostly horizontal intent
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) onSwipeLeft()
      else onSwipeRight()
    }

    active.current = false
    startX.current = null
    startY.current = null
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}

function InteractiveProductHero() {
  const reducedMotion = usePrefersReducedMotion()
  const components = useMemo(() => COMPONENTS, [])

  const [activeId, setActiveId] = useState<ComponentId>(components[0]?.id ?? "thermal")
  const [autoPlay, setAutoPlay] = useState(false)

  const maskWrapRef = useRef<HTMLDivElement | null>(null)

  const activeIndex = useMemo(
    () => components.findIndex((c) => c.id === activeId),
    [components, activeId]
  )

  const activeComponent = useMemo(
    () => components.find((c) => c.id === activeId) ?? components[0],
    [components, activeId]
  )

  const setActiveByIndex = (idx: number) => {
    const next = components[clampIndex(idx, components.length)]
    setActiveId(next.id)
  }

  const next = () => {
    setAutoPlay(false)
    setActiveByIndex(activeIndex + 1)
  }

  const prev = () => {
    setAutoPlay(false)
    setActiveByIndex(activeIndex - 1)
  }

  // Keyboard support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        next()
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        prev()
      }
      if (e.key === "Escape") {
        e.preventDefault()
        setAutoPlay(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  // Autoplay
  useEffect(() => {
    if (!autoPlay) return
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setActiveByIndex(activeIndex + 1)
    }, 5200)
    return () => window.clearInterval(id)
  }, [autoPlay, activeIndex, reducedMotion])

  // Cinematic tilt + sheen
  useEffect(() => {
    if (reducedMotion) return
    const el = maskWrapRef.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height

      const rx = (0.5 - py) * 6
      const ry = (px - 0.5) * 10

      el.style.setProperty("--rx", `${rx}deg`)
      el.style.setProperty("--ry", `${ry}deg`)
      el.style.setProperty("--sx", `${px * 100}%`)
      el.style.setProperty("--sy", `${py * 100}%`)
    }

    const onLeave = () => {
      el.style.setProperty("--rx", `0deg`)
      el.style.setProperty("--ry", `0deg`)
      el.style.setProperty("--sx", `50%`)
      el.style.setProperty("--sy", `35%`)
    }

    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [reducedMotion])

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => next(),
    onSwipeRight: () => prev(),
    disabled: reducedMotion,
  })

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-6 lg:gap-10 items-start">
        {/* Left: Mask Stage */}
        <div
          className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
          {...swipeHandlers}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_15%,rgba(255,255,255,0.06),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0),rgba(2,6,23,0.8))]" />
          </div>

          {/* Controls */}
          <div className="relative z-10 flex items-center justify-between gap-4 p-5 border-b border-white/10">
            <div className="min-w-0">
              <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/65">
                Explore
              </div>
              <div className="mt-1 text-sm text-slate-200/85">
                Tap a chapter. Use arrows. Swipe on mobile.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAutoPlay((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition border ${
                  autoPlay
                    ? "bg-white/12 border-white/20 text-slate-100"
                    : "bg-white/5 border-white/10 text-slate-200/80 hover:bg-white/8 hover:border-white/15"
                }`}
                aria-pressed={autoPlay}
              >
                {autoPlay ? "Auto" : "Play"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setAutoPlay(false)
                  setActiveId(components[0].id)
                }}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-white/5 border border-white/10 text-slate-200/80 hover:bg-white/8 hover:border-white/15 transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Cinematic stage */}
          <div className="relative p-6 md:p-10">
            <div
              ref={maskWrapRef}
              className="relative mx-auto w-[320px] sm:w-[420px] md:w-[540px]"
              style={{
                transformStyle: "preserve-3d",
                transform: reducedMotion
                  ? undefined
                  : "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                transition: reducedMotion ? undefined : "transform 250ms ease",
              }}
            >
              {!reducedMotion && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[28px]"
                  style={{
                    background:
                      "radial-gradient(520px 280px at var(--sx, 50%) var(--sy, 35%), rgba(255,255,255,0.10), transparent 55%)",
                    mixBlendMode: "screen",
                  }}
                />
              )}

              <img
                src="/images/sleep-mask-2.png"
                alt="Lumora Sleep Mask"
                className="w-full h-auto object-contain"
                style={{ filter: "drop-shadow(0 18px 60px rgba(0,0,0,0.50))" }}
              />

              <FocusCrosshair
                x={activeComponent.position.x}
                y={activeComponent.position.y}
                visible={!!activeComponent}
                reducedMotion={reducedMotion}
              />
            </div>

            <div className="mt-8">
              <ChapterList
                components={components}
                activeId={activeId}
                onSelect={(id) => {
                  setAutoPlay(false)
                  setActiveId(id)
                }}
              />
            </div>

            <div className="mt-4 text-[11px] text-slate-300/55">
              Tip: Left and right arrows work on desktop.
            </div>
          </div>
        </div>

        {/* Right: Chapter Detail (sticky on desktop) */}
        <div className="lg:sticky lg:top-8 space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/65">
                  Chapter
                </div>
                <div className="mt-1 text-sm text-slate-200/85">
                  {activeIndex + 1} / {components.length}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/85 hover:bg-white/10 transition"
                  aria-label="Previous chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/85 hover:bg-white/10 transition"
                  aria-label="Next chapter"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-7">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] tracking-[0.18em] uppercase text-slate-200/70">
                {activeComponent.tag}
              </div>

              <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-100">
                {activeComponent.title}
              </h3>

              <p className="mt-3 text-base text-slate-300/75 leading-relaxed">
                {activeComponent.short}
              </p>

              <p className="mt-5 text-sm text-slate-200/80 leading-relaxed">
                {activeComponent.details}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/60">
                    Focus
                  </div>
                  <div className="mt-1 text-sm text-slate-100/90">
                    {activeComponent.title}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/60">
                    Mode
                  </div>
                  <div className="mt-1 text-sm text-slate-100/90">
                    {autoPlay ? "Auto" : "Manual"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/60">
                    Control
                  </div>
                  <div className="mt-1 text-sm text-slate-100/90">Chapters</div>
                </div>
              </div>

              <div className="mt-6 text-[11px] text-slate-300/55">
                On mobile: swipe the mask left or right to change chapters.
              </div>
            </div>
          </div>

          {/* Optional: keep this small system statement (not bottom chapters) */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7">
            <h4 className="text-lg font-semibold text-slate-100">Engineered as a system</h4>
            <p className="mt-2 text-sm text-slate-300/75 leading-relaxed">
              Each element is designed to work together. Thermal stability supports deeper sleep, gentle light reduces harsh awakenings,
              and refined materials keep comfort consistent throughout the night.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="relative py-8 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="flex items-center gap-2 text-slate-300/85 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </a>
              <div className="w-px h-6 bg-white/10" />
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-16 w-auto" />
            </div>
          </div>
        </div>
      </header>

      <main className="py-14 md:py-16">
        <div className="container mx-auto px-6">
          <SectionShell
            title="Explore the Mask"
            subtitle="A cinematic, interactive walkthrough of the components behind Lumora Sleep. Tap chapters to see each system come to life."
          >
            <InteractiveProductHero />
          </SectionShell>
        </div>
      </main>
    </div>
  )
}
