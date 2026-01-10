"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react"

/**
 * Lumora Sleep — Explore the Technology (Luxury Interactive Mask)
 *
 * Goals vs prior version:
 * - Premium/luxury interaction model (minimal, calm motion, no noisy ping dots)
 * - One focal interaction: hotspots + elegant info rail/drawer
 * - Guided tour mode + keyboard support
 * - Clear hierarchy, accessible focus states, mobile-friendly layout
 *
 * Notes:
 * - Requires Tailwind CSS.
 * - Image paths kept the same as your original component.
 */

type ComponentId =
  | "thermal"
  | "leds"
  | "audio"
  | "battery"
  | "comfort"
  | "exterior"

type MaskComponent = {
  id: ComponentId
  title: string
  short: string
  details: string
  position: { x: number; y: number }
  tone: "cool" | "warm" | "royal" | "fresh" | "neutral" | "silk"
  icon: string
  spec?: string
}

const COMPONENTS: MaskComponent[] = [
  {
    id: "thermal",
    title: "Adaptive Thermal Control",
    short: "Phase-change regulation to stabilize skin temperature.",
    details:
      "Phase Change Materials (PCM) dynamically absorb and release heat to help reduce temperature swings that fragment deep sleep. The result is a steadier microclimate against the skin—cool when you run warm, balanced when you don’t.",
    position: { x: 52, y: 56 },
    tone: "cool",
    icon: "🌡️",
    spec: "PCM Layer",
  },
  {
    id: "leds",
    title: "Wake Light System",
    short: "A gentle sunrise simulation to ease waking.",
    details:
      "A calibrated light curve gradually brightens over your chosen window, helping reduce abrupt wake-ups. It’s designed to feel like dawn—not a flashlight—so you wake up with less grogginess and less stress.",
    position: { x: 36, y: 42 },
    tone: "warm",
    icon: "☀️",
    spec: "Sunrise Ramp",
  },
  {
    id: "audio",
    title: "Bone-Conduction Audio",
    short: "Immersive soundscapes without sealed ears.",
    details:
      "Bone-conduction transducers deliver audio through gentle vibration, keeping your ears unobstructed. This supports a more natural sleep environment and preserves situational awareness while you listen.",
    position: { x: 84, y: 48 },
    tone: "royal",
    icon: "🎵",
    spec: "Transducer Pair",
  },
  {
    id: "battery",
    title: "Battery & Charging",
    short: "All-night power, refined wired charging.",
    details:
      "A compact lithium system is tuned for overnight use. Wired charging via gold-plated contacts keeps the exterior clean and reduces visual clutter—luxury is as much about simplicity as it is about capability.",
    position: { x: 24, y: 63 },
    tone: "fresh",
    icon: "🔋",
    spec: "8+ hrs",
  },
  {
    id: "comfort",
    title: "Memory Foam Contour",
    short: "Medical-grade pressure distribution.",
    details:
      "Biocompatible memory foam conforms to facial contours, reducing pressure points while maintaining effective light blocking. The contour is engineered to feel weightless, not tight.",
    position: { x: 52, y: 66 },
    tone: "neutral",
    icon: "☁️",
    spec: "Pressure Relief",
  },
  {
    id: "exterior",
    title: "Mulberry Silk Cover",
    short: "A temperature-regulating, moisture-wicking exterior.",
    details:
      "Premium mulberry silk offers a soft hand-feel with natural breathability and moisture management. It’s chosen for comfort, durability, and the subtle visual finish expected from a luxury product.",
    position: { x: 70, y: 72 },
    tone: "silk",
    icon: "✨",
    spec: "Mulberry Silk",
  },
]

function toneClasses(tone: MaskComponent["tone"]) {
  // Subtle, premium tones—no neon.
  switch (tone) {
    case "cool":
      return {
        ring: "ring-sky-200/30",
        dot: "bg-sky-200/80",
        glow: "shadow-[0_0_0_8px_rgba(186,230,253,0.07)]",
        chip: "bg-sky-200/10 text-sky-100 border-sky-200/15",
      }
    case "warm":
      return {
        ring: "ring-amber-200/30",
        dot: "bg-amber-200/80",
        glow: "shadow-[0_0_0_8px_rgba(253,230,138,0.07)]",
        chip: "bg-amber-200/10 text-amber-100 border-amber-200/15",
      }
    case "royal":
      return {
        ring: "ring-violet-200/30",
        dot: "bg-violet-200/80",
        glow: "shadow-[0_0_0_8px_rgba(221,214,254,0.07)]",
        chip: "bg-violet-200/10 text-violet-100 border-violet-200/15",
      }
    case "fresh":
      return {
        ring: "ring-emerald-200/30",
        dot: "bg-emerald-200/80",
        glow: "shadow-[0_0_0_8px_rgba(167,243,208,0.07)]",
        chip: "bg-emerald-200/10 text-emerald-100 border-emerald-200/15",
      }
    case "neutral":
      return {
        ring: "ring-slate-200/25",
        dot: "bg-slate-200/70",
        glow: "shadow-[0_0_0_8px_rgba(226,232,240,0.06)]",
        chip: "bg-slate-200/10 text-slate-100 border-slate-200/15",
      }
    case "silk":
      return {
        ring: "ring-slate-100/25",
        dot: "bg-slate-100/70",
        glow: "shadow-[0_0_0_8px_rgba(241,245,249,0.06)]",
        chip: "bg-white/8 text-slate-100 border-white/10",
      }
  }
}

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
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className="relative">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(255,255,255,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_20%_60%,rgba(56,189,248,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_80%_55%,rgba(167,139,250,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0),rgba(2,6,23,0.75))]" />
      </div>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs tracking-[0.24em] uppercase text-slate-200/80">
          <Sparkles className="w-3.5 h-3.5" />
          {eyebrow}
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

function Hotspot({
  component,
  active,
  onActivate,
  reducedMotion,
}: {
  component: MaskComponent
  active: boolean
  onActivate: () => void
  reducedMotion: boolean
}) {
  const t = toneClasses(component.tone)

  return (
    <button
      type="button"
      aria-label={`Open details: ${component.title}`}
      onClick={onActivate}
      className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
      style={{ left: `${component.position.x}%`, top: `${component.position.y}%` }}
    >
      {/* Outer ring */}
      <span
        className={`relative block w-5 h-5 md:w-6 md:h-6 rounded-full ring-1 ${t.ring} bg-white/5 backdrop-blur transition-transform duration-300 ${
          active ? "scale-110" : "group-hover:scale-110"
        } ${t.glow}`}
      >
        {/* Inner dot */}
        <span
          className={`absolute inset-0 m-auto w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${t.dot} shadow-sm`}
        />

        {/* Subtle pulse */}
        {!reducedMotion && (
          <span
            className={`absolute inset-0 rounded-full ring-1 ${t.ring} opacity-0 group-hover:opacity-100 ${
              active ? "opacity-100" : ""
            } transition-opacity duration-300`}
          />
        )}
      </span>

      {/* Tooltip label */}
      <span
        className={`pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 text-[11px] tracking-wide text-slate-200/85 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200`}
      >
        {component.title}
      </span>
    </button>
  )
}

function InfoRail({
  component,
  onClose,
  onPrev,
  onNext,
  index,
  total,
  reducedMotion,
}: {
  component: MaskComponent
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  index: number
  total: number
  reducedMotion: boolean
}) {
  const t = toneClasses(component.tone)

  return (
    <aside
      className={`relative w-full lg:w-[420px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden`}
      aria-label="Component details"
    >
      {/* Top gradient hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden>
                {component.icon}
              </span>
              <span
                className={`inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border ${t.chip}`}
              >
                {component.spec ?? "Component"}
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-slate-100 truncate">
              {component.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300/75 leading-relaxed">
              {component.short}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-slate-300/70 hover:text-slate-100 hover:bg-white/5 transition"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5">
          <p className="text-sm text-slate-200/85 leading-relaxed">
            {component.details}
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-xs text-slate-300/60 tracking-wide">
            {index + 1} / {total}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/85 hover:bg-white/10 transition"
              aria-label="Previous component"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/85 hover:bg-white/10 transition"
              aria-label="Next component"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hint */}
        {!reducedMotion && (
          <div className="mt-5 text-[11px] text-slate-300/55">
            Tip: Use ←/→ to navigate, Esc to close.
          </div>
        )}
      </div>
    </aside>
  )
}

function ComponentChips({
  components,
  activeId,
  onSelect,
}: {
  components: MaskComponent[]
  activeId: ComponentId | null
  onSelect: (id: ComponentId) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {components.map((c) => {
        const active = activeId === c.id
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className={`group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm border transition-all ${
              active
                ? "bg-white/10 border-white/20 text-slate-100"
                : "bg-white/5 border-white/10 text-slate-200/80 hover:bg-white/8 hover:border-white/15"
            }`}
            aria-pressed={active}
          >
            <span className="text-base" aria-hidden>
              {c.icon}
            </span>
            <span className="text-sm font-medium">{c.title}</span>
          </button>
        )
      })}
    </div>
  )
}

function InteractiveProductHero() {
  const reducedMotion = usePrefersReducedMotion()

  const components = useMemo(() => COMPONENTS, [])
  const [activeId, setActiveId] = useState<ComponentId | null>(components[0]?.id ?? null)
  const [tourOn, setTourOn] = useState(false)
  const [hoverId, setHoverId] = useState<ComponentId | null>(null)

  const activeIndex = useMemo(() => components.findIndex((c) => c.id === activeId), [components, activeId])
  const activeComponent = useMemo(
    () => components.find((c) => c.id === activeId) ?? components[0],
    [components, activeId]
  )

  const heroRef = useRef<HTMLDivElement | null>(null)

  const setActiveByIndex = (idx: number) => {
    const next = components[clampIndex(idx, components.length)]
    setActiveId(next.id)
  }

  const next = () => setActiveByIndex(activeIndex + 1)
  const prev = () => setActiveByIndex(activeIndex - 1)

  // Keyboard support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!activeId) return
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
        setActiveId(null)
        setTourOn(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, activeIndex])

  // Guided tour (auto-advances while on)
  useEffect(() => {
    if (!tourOn) return
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setActiveByIndex(activeIndex + 1)
    }, 5200)
    return () => window.clearInterval(id)
  }, [tourOn, activeIndex, reducedMotion])

  const open = (id: ComponentId) => {
    setActiveId(id)
    setTourOn(false)
  }

  const t = activeComponent ? toneClasses(activeComponent.tone) : toneClasses("neutral")

  return (
    <div ref={heroRef} className="relative w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 lg:gap-10 items-start">
        {/* Visual stage */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_50%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_70%,rgba(56,189,248,0.06),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_75%_65%,rgba(167,139,250,0.06),transparent_60%)]" />
          </div>

          {/* Top bar controls */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-white/10">
            <div className="min-w-0">
              <div className="text-xs tracking-[0.22em] uppercase text-slate-200/70">Lumora Mask</div>
              <div className="mt-1 text-sm text-slate-200/85">
                Tap a hotspot to explore. Use the guided tour for a curated walkthrough.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTourOn((v) => !v)
                  if (!activeId) setActiveId(components[0]?.id ?? null)
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition border ${
                  tourOn
                    ? "bg-white/12 border-white/20 text-slate-100"
                    : "bg-white/5 border-white/10 text-slate-200/80 hover:bg-white/8 hover:border-white/15"
                }`}
                aria-pressed={tourOn}
              >
                <Sparkles className="w-4 h-4" />
                {tourOn ? "Tour On" : "Start Tour"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveId(null)
                  setTourOn(false)
                }}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-white/5 border border-white/10 text-slate-200/80 hover:bg-white/8 hover:border-white/15 transition"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Mask visual */}
          <div className="relative p-6 md:p-10">
            {/* Spotlight (tracks active component subtly) */}
            {activeComponent && (
              <div
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full blur-3xl opacity-60 pointer-events-none transition-all duration-700 ${
                  reducedMotion ? "" : "" // keep minimal; avoid flashy motion
                }`}
                style={{
                  left: `${activeComponent.position.x}%`,
                  top: `${activeComponent.position.y}%`,
                  background:
                    activeComponent.tone === "warm"
                      ? "radial-gradient(circle, rgba(251,191,36,0.12), transparent 60%)"
                      : activeComponent.tone === "cool"
                      ? "radial-gradient(circle, rgba(56,189,248,0.12), transparent 60%)"
                      : activeComponent.tone === "royal"
                      ? "radial-gradient(circle, rgba(167,139,250,0.12), transparent 60%)"
                      : activeComponent.tone === "fresh"
                      ? "radial-gradient(circle, rgba(52,211,153,0.10), transparent 60%)"
                      : "radial-gradient(circle, rgba(226,232,240,0.08), transparent 60%)",
                }}
              />
            )}

            <div className="relative mx-auto w-[320px] sm:w-[420px] md:w-[520px]">
              <img
                src="/images/sleep-mask-2.png"
                alt="Lumora Sleep Mask"
                className="w-full h-auto object-contain"
                style={{ filter: "drop-shadow(0 14px 48px rgba(0,0,0,0.45))" }}
              />

              {/* Hotspots */}
              <div
                className="absolute inset-0"
                onMouseLeave={() => setHoverId(null)}
              >
                {components.map((c) => {
                  const active = activeId === c.id
                  const hovered = hoverId === c.id
                  const tc = toneClasses(c.tone)
                  return (
                    <div
                      key={c.id}
                      onMouseEnter={() => setHoverId(c.id)}
                      className="absolute"
                      style={{ left: `${c.position.x}%`, top: `${c.position.y}%` }}
                    >
                      {/* Position wrapper to keep hover detection comfortable */}
                      <div className="relative -translate-x-1/2 -translate-y-1/2">
                        <button
                          type="button"
                          onClick={() => open(c.id)}
                          className={`relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-transform duration-300 ${
                            active ? "scale-110" : hovered ? "scale-110" : ""
                          }`}
                          aria-label={`Open details: ${c.title}`}
                        >
                          <span
                            className={`block w-5 h-5 md:w-6 md:h-6 rounded-full ring-1 ${tc.ring} bg-white/6 backdrop-blur ${tc.glow}`}
                          >
                            <span
                              className={`absolute inset-0 m-auto w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${tc.dot}`}
                            />
                          </span>
                        </button>

                        {/* Minimal label */}
                        <div
                          className={`pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 text-[11px] tracking-wide text-slate-200/85 transition-all duration-200 ${
                            hovered || active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                          }`}
                        >
                          {c.title}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom chip row */}
            <div className="mt-8">
              <div className="text-xs tracking-[0.22em] uppercase text-slate-200/65 mb-3">
                Components
              </div>
              <ComponentChips
                components={components}
                activeId={activeId}
                onSelect={(id) => open(id)}
              />
            </div>
          </div>
        </div>

        {/* Info rail */}
        <div className="lg:sticky lg:top-8">
          {activeComponent ? (
            <div
              className={`transition-all duration-500 ${
                reducedMotion ? "" : ""
              }`}
            >
              <InfoRail
                component={activeComponent}
                onClose={() => {
                  setActiveId(null)
                  setTourOn(false)
                }}
                onPrev={() => {
                  setTourOn(false)
                  prev()
                }}
                onNext={() => {
                  setTourOn(false)
                  next()
                }}
                index={Math.max(0, activeIndex)}
                total={components.length}
                reducedMotion={reducedMotion}
              />
            </div>
          ) : (
            <aside className="w-full lg:w-[420px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 p-6">
              <div className="text-xs tracking-[0.22em] uppercase text-slate-200/65">Explore</div>
              <h3 className="mt-2 text-2xl font-semibold text-slate-100">Select a hotspot</h3>
              <p className="mt-2 text-sm text-slate-300/75 leading-relaxed">
                Click the markers on the mask to reveal details. Use the tour for a guided walkthrough.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveId(components[0]?.id ?? null)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200/85 hover:bg-white/10 transition"
                >
                  Start
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTourOn(true)
                    setActiveId(components[0]?.id ?? null)
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200/85 hover:bg-white/10 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  Tour
                </button>
              </div>
            </aside>
          )}

          {/* Small “spec strip” beneath rail for luxury feel */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/60">Focus</div>
                <div className="mt-1 text-sm text-slate-100/90">
                  {activeComponent ? activeComponent.title : "—"}
                </div>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/60">Mode</div>
                <div className="mt-1 text-sm text-slate-100/90">{tourOn ? "Guided" : "Manual"}</div>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-slate-200/60">Controls</div>
                <div className="mt-1 text-sm text-slate-100/90">
                  {activeComponent ? "Hotspots, ←/→" : "Hotspots"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional information */}
      <div className="mt-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10">
          <h3 className="text-2xl font-semibold text-slate-100">Engineered as a system</h3>
          <p className="mt-3 text-slate-300/75 leading-relaxed max-w-3xl">
            Each element is designed to work in harmony: thermal stability supports deeper sleep, gentle light reduces harsh awakenings,
            and refined materials keep comfort consistent throughout the night. This is sleep technology with a luxury standard—intentional,
            minimal, and precise.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
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

      {/* Main */}
      <main className="py-14 md:py-16">
        <div className="container mx-auto px-6">
          <SectionShell
            eyebrow="Technology"
            title="Explore the Mask"
            subtitle="A curated, interactive breakdown of the components behind Lumora Sleep’s sleep mask—designed with restraint, comfort, and precision."
          >
            <InteractiveProductHero />
          </SectionShell>
        </div>
      </main>
    </div>
  )
}
