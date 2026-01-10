"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight} from "lucide-react"

/**
 * Lumora Sleep, Explore Page
 * Apple-like, cinematic interaction:
 * - No visible "dots" or emojis
 * - Scroll-driven storytelling on the right, sticky product stage on the left
 * - Subtle 3D tilt + specular sheen on pointer movement
 * - Animated focus crosshair that glides to the active component
 * - Keyboard controls (←/→, Esc)
 */

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
      "Phase Change Materials (PCM) absorb and release heat to reduce temperature swings that interrupt deeper sleep. The goal is a steadier microclimate against the skin, cool when you run warm, balanced when you do not.",
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
      "Bone conduction transducers deliver audio through gentle vibration while leaving your ears unobstructed. This supports a more natural sleep environment while preserving situational awareness.",
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

      <div className="text-center mb-12">
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
  // Premium crosshair: thin ring + subtle cross lines.
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

function ChapterNav({
  components,
  activeId,
  onSelect,
}: {
  components: MaskComponent[]
  activeId: ComponentId
  onSelect: (id: ComponentId) => void
}) {
  const activeIndex = components.findIndex((c) => c.id === activeId)

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
      <div className="p-5 border-b border-white/10">
        <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/65">Chapters</div>
        <div className="mt-1 text-sm text-slate-200/85">Jump to any feature.</div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {components.map((c, i) => {
            const active = c.id === activeId
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelect(c.id)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  active
                    ? "bg-white/10 border-white/20"
                    : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15"
                }`}
                aria-pressed={active}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] tracking-[0.20em] uppercase text-slate-200/70">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-100 truncate">{c.title}</div>
                    <div className="mt-1 text-[11px] text-slate-300/65 truncate">{c.tag}</div>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${active ? "bg-white/65" : "bg-white/25"}`}
                    aria-hidden
                  />
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-4 text-xs text-slate-300/60 tracking-wide">
          {activeIndex + 1} / {components.length}
        </div>
      </div>
    </div>
  )
}

function MobileChapterCarousel({
  components,
  activeId,
  onPrev,
  onNext,
  onSelect,
}: {
  components: MaskComponent[]
  activeId: ComponentId
  onPrev: () => void
  onNext: () => void
  onSelect: (id: ComponentId) => void
}) {
  const active = components.find((c) => c.id === activeId) ?? components[0]
  const idx = components.findIndex((c) => c.id === activeId)

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/65">Feature</div>
          <div className="mt-1 text-sm text-slate-200/85">Swipe or tap to explore.</div>
        </div>
        <div className="text-xs text-slate-300/60 tracking-wide">{idx + 1} / {components.length}</div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] tracking-[0.18em] uppercase text-slate-200/70">
              {active.tag}
            </div>
            <div className="mt-3 text-xl font-semibold text-slate-100">{active.title}</div>
            <div className="mt-2 text-sm text-slate-300/75 leading-relaxed">{active.short}</div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/85 hover:bg-white/10 transition"
              aria-label="Previous feature"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/85 hover:bg-white/10 transition"
              aria-label="Next feature"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-200/80 leading-relaxed">
          {active.details}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {components.map((c, i) => {
            const isActive = c.id === activeId
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelect(c.id)}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm border transition ${
                  isActive
                    ? "bg-white/10 border-white/20 text-slate-100"
                    : "bg-white/5 border-white/10 text-slate-200/80 hover:bg-white/8 hover:border-white/15"
                }`}
                aria-pressed={isActive}
              >
                <span className="text-[11px] tracking-[0.18em] uppercase text-slate-200/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{c.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function InteractiveProductHero() {
  const reducedMotion = usePrefersReducedMotion()
  const components = useMemo(() => COMPONENTS, [])

  const [activeId, setActiveId] = useState<ComponentId>(components[0]?.id ?? "thermal")
  const [autoPlay, setAutoPlay] = useState(false)

  const maskWrapRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const isProgrammaticScroll = useRef(false)
  const scrollEndTimer = useRef<number | null>(null)

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
    jumpTo(components[clampIndex(activeIndex + 1, components.length)].id)
  }

  const prev = () => {
    setAutoPlay(false)
    jumpTo(components[clampIndex(activeIndex - 1, components.length)].id)
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

  // Auto play (tour)
  useEffect(() => {
    if (!autoPlay) return
    if (reducedMotion) return
    const id = window.setInterval(() => {
      const idNext = components[clampIndex(activeIndex + 1, components.length)].id
      jumpTo(idNext)
    }, 5200)
    return () => window.clearInterval(id)
  }, [autoPlay, activeIndex, reducedMotion, components])

  // Cinematic tilt and sheen
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

  const jumpTo = (id: ComponentId) => {
    const el = sectionRefs.current[id]
    if (!el) {
      setActiveId(id)
      return
    }

    isProgrammaticScroll.current = true
    setActiveId(id)

    if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current)

    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })

    // Release the programmatic lock after the scroll has likely finished
    scrollEndTimer.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false
    }, reducedMotion ? 0 : 650)
  }

  // Chapter activation based on page scroll
  useEffect(() => {
    const sections = components
      .map((c) => sectionRefs.current[c.id])
      .filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return

        // Choose the most visible section
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (best?.target) {
          const id = (best.target as HTMLElement).dataset.id as ComponentId
          if (id) setActiveId(id)
        }
      },
      {
        root: null,
        threshold: [0.25, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -60% 0px",
      }
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [components])

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-6 lg:gap-10 items-start">
        {/* Left: Product Stage (sticky) */}
        <div className="lg:sticky lg:top-8">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_15%,rgba(255,255,255,0.06),transparent_55%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0),rgba(2,6,23,0.8))]" />
            </div>

            {/* Controls */}
            <div className="relative z-10 flex items-center justify-between gap-4 p-5 border-b border-white/10">
              <div className="min-w-0">
                <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/65">Explore</div>
                <div className="mt-1 text-sm text-slate-200/85">Scroll the page through chapters.</div>
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
                    jumpTo(components[0].id)
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
                {/* Sheen */}
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

                {/* Focus crosshair */}
                <FocusCrosshair
                  x={activeComponent.position.x}
                  y={activeComponent.position.y}
                  visible={!!activeComponent}
                  reducedMotion={reducedMotion}
                />
              </div>

              {/* Minimal quick nav */}
              <div className="mt-8 flex flex-wrap gap-2">
                {components.map((c, i) => {
                  const active = c.id === activeId
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => jumpTo(c.id)}
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

              <div className="mt-4 text-[11px] text-slate-300/55">Tip: Use arrow keys to change chapters.</div>
            </div>
          </div>

          {/* Bottom copy */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10">
            <h3 className="text-2xl font-semibold text-slate-100">Engineered as a system</h3>
            <p className="mt-3 text-slate-300/75 leading-relaxed max-w-3xl">
              Each element is designed to work together. Thermal stability supports deeper sleep, gentle light reduces harsh awakenings,
              and refined materials keep comfort consistent throughout the night.
            </p>
          </div>
        </div>

        {/* Right: Desktop chapter navigation (sticky) */}
        <div className="space-y-4">
          <div className="hidden lg:block lg:sticky lg:top-8">
            <ChapterNav components={components} activeId={activeId} onSelect={jumpTo} />

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/60">Focus</div>
                  <div className="mt-1 text-sm text-slate-100/90">{activeComponent.title}</div>
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/60">Mode</div>
                  <div className="mt-1 text-sm text-slate-100/90">{autoPlay ? "Auto" : "Scroll"}</div>
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/60">Control</div>
                  <div className="mt-1 text-sm text-slate-100/90">Chapters</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: no inner scroll, no visible scrollbars */}
          <div className="lg:hidden">
            <MobileChapterCarousel
              components={components}
              activeId={activeId}
              onPrev={() => jumpTo(components[clampIndex(activeIndex - 1, components.length)].id)}
              onNext={() => jumpTo(components[clampIndex(activeIndex + 1, components.length)].id)}
              onSelect={jumpTo}
            />
          </div>
        </div>
      </div>

      {/* Page chapters (these drive the active feature via scroll) */}
      <div className="mt-10 space-y-6">
        {components.map((c, i) => {
          const active = c.id === activeId
          return (
            <section
              key={c.id}
              ref={(el) => {
                sectionRefs.current[c.id] = el
              }}
              data-id={c.id}
              className="scroll-mt-28"
            >
              <div
                className={`rounded-3xl border backdrop-blur-xl p-8 md:p-10 transition ${
                  active
                    ? "border-white/18 bg-white/8"
                    : "border-white/10 bg-white/5 hover:bg-white/6"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="text-[11px] tracking-[0.20em] uppercase text-slate-200/70">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] tracking-[0.18em] uppercase text-slate-200/70">
                        {c.tag}
                      </div>
                    </div>

                    <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-100">{c.title}</h3>
                    <p className="mt-3 text-base text-slate-300/75 leading-relaxed max-w-3xl">{c.short}</p>
                    <p className="mt-4 text-sm text-slate-200/80 leading-relaxed max-w-3xl">{c.details}</p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => prev()}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/85 hover:bg-white/10 transition"
                      aria-label="Previous chapter"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => next()}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/85 hover:bg-white/10 transition"
                      aria-label="Next chapter"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
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
            subtitle="A cinematic, interactive walkthrough of the components behind Lumora Sleep. Scroll the story to watch the mask come alive."
          >
            <InteractiveProductHero />
          </SectionShell>
        </div>
      </main>
    </div>
  )
}
