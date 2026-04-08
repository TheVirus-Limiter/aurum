"use client"

import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Brain,
  ChevronRight,
  Clock3,
  Cpu,
  Moon,
  MoveRight,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Thermometer,
  Zap,
  Briefcase,
  Volume2,
  BedDouble,
  Gem,
} from "lucide-react"

/* =====================================================================================
   LUMORA SLEEP — THE PIVOT
   Updated:
   - combined "Sleep is not one problem..." + problem section
   - filled empty space under "Why this is better"
   - real logo image
   - fixed bullet alignment
   - adaptive layer moved below the map so no overlap
   - replaced dumb hero stat boxes with better ecosystem panel
   - beautified ecosystem graphic
===================================================================================== */

type SectionProps = {
  id?: string
  eyebrow?: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

type Product = {
  name: string
  tag: string
  price: string
  description: string
  bullets: string[]
  phase: "Fall Asleep" | "Stay Asleep" | "Wake Naturally" | "System"
  icon: ReactNode
  accent: string
}

type TableRow = {
  category: string
  before: string
  after: string
  note: string
}

/* =====================================================================================
   UTILS
===================================================================================== */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const next = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      setProgress(next)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return progress
}

/* =====================================================================================
   BACKGROUND
===================================================================================== */

function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        size: i % 11 === 0 ? 3 : i % 5 === 0 ? 2 : 1,
        top: `${(i * 13.7) % 100}%`,
        left: `${(i * 9.9 + 17) % 100}%`,
        delay: `${(i % 7) * 0.8}s`,
        duration: `${7 + (i % 6)}s`,
        opacity: 0.16 + ((i * 17) % 30) / 100,
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.45)] animate-[lumoraFloat_linear_infinite]"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  )
}

function NightToSunriseBackground({ progress }: { progress: number }) {
  const sunriseOpacity = Math.min(progress * 1.2, 1)
  const dawnLift = Math.min(progress * 120, 120)

  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#04070d]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(94,100,172,0.16),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(67,99,255,0.10),transparent_25%),radial-gradient(circle_at_50%_100%,rgba(255,154,90,0.08),transparent_35%)]" />
      <StarField />

      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: sunriseOpacity,
          background:
            "linear-gradient(to bottom, rgba(59,72,128,0.18) 0%, rgba(86,67,151,0.18) 20%, rgba(214,120,88,0.14) 60%, rgba(255,180,120,0.10) 85%, rgba(255,214,165,0.08) 100%)",
        }}
      />

      <div
        className="absolute left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          bottom: `${-260 + dawnLift}px`,
          opacity: 0.16 + sunriseOpacity * 0.24,
          background:
            "radial-gradient(circle, rgba(255,184,120,0.42) 0%, rgba(255,164,101,0.18) 34%, rgba(255,149,83,0.08) 52%, transparent 70%)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.02] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#04070d] via-[#04070d]/55 to-transparent" />
      <div className="absolute left-[8%] top-[12%] h-64 w-64 rounded-full bg-cyan-400/5 blur-3xl" />
      <div className="absolute right-[10%] top-[20%] h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute left-[20%] bottom-[12%] h-96 w-96 rounded-full bg-orange-400/5 blur-3xl" />
    </div>
  )
}

/* =====================================================================================
   FADE IN
===================================================================================== */

function FadeIn({ children, className, delay = 0, y = 22 }: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0",
        className
      )}
      style={{
        transitionDelay: `${delay}s`,
        transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  )
}

/* =====================================================================================
   SHARED UI
===================================================================================== */

function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative border-b border-white/8 py-18 sm:py-22 lg:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 lg:mb-14">
          {eyebrow ? (
            <FadeIn>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-300">
                <Sparkles className="h-3.5 w-3.5 text-orange-200/80" />
                {eyebrow}
              </div>
            </FadeIn>
          ) : null}

          <FadeIn>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </FadeIn>

          {subtitle ? (
            <FadeIn delay={0.05}>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {subtitle}
              </p>
            </FadeIn>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  )
}

function GlassCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),transparent_24%)]" />
      <div className="relative">{children}</div>
    </div>
  )
}

function DividerGlow() {
  return (
    <div className="relative my-7 h-px w-full bg-white/8">
      <div className="absolute left-0 top-0 h-px w-48 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
    </div>
  )
}

function BulletRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/75" />
      <p className="text-sm leading-7 text-slate-400">{text}</p>
    </div>
  )
}

/* =====================================================================================
   DATA
===================================================================================== */

const products: Product[] = [
  {
    name: "Lumora Essence",
    tag: "Signature mask",
    price: "$99",
    description:
      "Our signature mask, built for darkness, comfort, and nightly consistency with a luxury feel designed to live in a ritual, not a medicine cabinet.",
    bullets: [
      "Mulberry silk exterior",
      "Structured low-pressure design",
      "Premium blackout comfort",
      "Subtle morning light permeability",
    ],
    phase: "Fall Asleep",
    icon: <BedDouble className="h-5 w-5 text-cyan-200" />,
    accent: "from-cyan-300/20 to-transparent",
  },
  {
    name: "Lumora Caelum",
    tag: "Thermal inserts",
    price: "$24",
    description:
      "Interchangeable PCM inserts designed to regulate heat and reduce the restless discomfort caused by overheating through the night.",
    bullets: [
      "PCM temperature regulation",
      "Cooling support through the night",
      "Designed for the Essence platform",
      "Easy insert-and-swap format",
    ],
    phase: "Stay Asleep",
    icon: <Thermometer className="h-5 w-5 text-sky-200" />,
    accent: "from-sky-300/20 to-transparent",
  },
  {
    name: "Lumora Sonus",
    tag: "Audio band",
    price: "$69",
    description:
      "A soft audio band that delivers calming soundscapes and guided wind-down experiences without earbuds or heavy facial hardware.",
    bullets: [
      "Near-ear or bone-conduction audio",
      "Soft band construction",
      "No earbuds required",
      "Works beautifully with Essence",
    ],
    phase: "Fall Asleep",
    icon: <Volume2 className="h-5 w-5 text-violet-200" />,
    accent: "from-violet-300/20 to-transparent",
  },
  {
    name: "Lumora Aurora",
    tag: "Wake light",
    price: "$89",
    description:
      "A sunrise-inspired bedside light designed to complete the Lumora system with a calmer and more elegant morning transition.",
    bullets: [
      "Gradual dawn-inspired wake sequence",
      "Complements partial light permeability concept",
      "Minimal bedside design",
      "Gentler morning transition",
    ],
    phase: "Wake Naturally",
    icon: <SunMedium className="h-5 w-5 text-orange-200" />,
    accent: "from-orange-300/20 to-transparent",
  },
  {
    name: "Lumora Voyage",
    tag: "Travel case",
    price: "$39",
    description:
      "A premium travel case built to protect, organize, and transport the Lumora system with the same level of detail as the products it holds.",
    bullets: [
      "Structured premium case",
      "Designed for system organization",
      "Travel friendly profile",
      "Luxury storage feel",
    ],
    phase: "System",
    icon: <Briefcase className="h-5 w-5 text-slate-200" />,
    accent: "from-slate-300/20 to-transparent",
  },
  {
    name: "Lumora Max",
    tag: "Flagship future expression",
    price: "$249",
    description:
      "Our premium future-facing experience exploring deeper relaxation through elevated materials, advanced comfort systems, and massage-inspired restoration.",
    bullets: [
      "Advanced comfort system",
      "Massage-inspired relaxation",
      "Luxury construction",
      "Flagship Lumora expression",
    ],
    phase: "System",
    icon: <Gem className="h-5 w-5 text-amber-200" />,
    accent: "from-amber-300/20 to-transparent",
  },
]

/* =====================================================================================
   HERO
===================================================================================== */

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/8 pt-8 sm:pt-10 lg:pt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-4 border-b border-white/8 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="h-6 w-px bg-white/10" />

          <img
            src="https://thevirus-limiter.github.io/filestorage/aurumsleep.png"
            alt="Lumora Sleep"
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="grid min-h-[74vh] items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div>
            <FadeIn>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/8 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-orange-100">
                <Sparkles className="h-3.5 w-3.5" />
                Lumora V2
              </div>
            </FadeIn>

            <FadeIn delay={0.04}>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.2rem] xl:leading-[0.96]">
                The Pivot
              </h1>
            </FadeIn>

            <FadeIn delay={0.08}>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
                Lumora started as a smart sleep mask. It is becoming a modular
                sleep system built around how rest actually works: falling
                asleep, staying asleep, and waking naturally.
              </p>
            </FadeIn>

          
                <div className="mt-5 rounded-[24px] border border-orange-300/20 bg-orange-300/8 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-orange-100" />
                    <p className="text-sm leading-7 text-orange-100/85">
                      Adaptive intelligence sits across the system, improving how
                      Essence, Sonus, Caelum, and Aurora work together over time.
                    </p>
                  </div>
                </div>
              </div>
           

          <FadeIn delay={0.1}>
            <GlassCard className="rounded-[34px] p-0">
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Product architecture
                </p>
                <p className="mt-1 text-lg font-medium text-white">
                  The system at a glance
                </p>
              </div>

              <div className="p-6">
                <div className="relative min-h-[520px] rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(96,165,250,0.10),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6">
                  <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                  <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path d="M50 48 C42 32, 28 22, 19 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
                    <path d="M50 48 C59 32, 73 24, 82 26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
                    <path d="M50 52 C40 64, 28 74, 20 76" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
                    <path d="M50 52 C60 64, 74 72, 83 73" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
                  </svg>

                  <div className="absolute left-1/2 top-1/2 z-20 w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-gradient-to-br from-slate-700/80 to-slate-950/95 p-6 text-center shadow-[0_0_100px_rgba(255,255,255,0.04)] animate-[lumoraPulse_4.5s_ease-in-out_infinite]">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                      Foundation
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold text-white">Essence</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Darkness, comfort, structure, and the base layer of the
                      system.
                    </p>
                  </div>

                  <div className="absolute left-[18%] top-[18%] z-20 w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <Volume2 className="h-5 w-5 text-violet-200" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Sonus</p>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                          Fall asleep
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[82%] top-[22%] z-20 w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <Thermometer className="h-5 w-5 text-sky-200" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Caelum</p>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                          Stay asleep
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[20%] top-[80%] z-20 w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <SunMedium className="h-5 w-5 text-orange-200" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Aurora</p>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                          Wake naturally
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[82%] top-[78%] z-20 w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <Briefcase className="h-5 w-5 text-slate-200" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Voyage</p>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                          System carry
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* =====================================================================================
   COMBINED PROBLEM + REALIZATION
===================================================================================== */

function CoreProblemSection() {
  return (
    <SectionShell
      id="problem"
      eyebrow="The problem"
      title="Sleep is not one problem. It is a system."
      subtitle="Sleep is not failing in one place. More than 80% of people struggle with sleep in some way, and many report 45–90 minute sleep latency before they even get into real rest."
    >
      <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-6">
          <FadeIn>
            <GlassCard className="rounded-[30px] p-7">
              <p className="text-lg leading-8 text-slate-300">
                What we kept hearing was consistent. The problem was not just
                darkness. It was overstimulation before bed, overheating after
                sleep begins, and harsh alarms in the morning. Each one seems
                small on its own. Together, they shape the whole quality of
                sleep.
              </p>

              <DividerGlow />

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "80% struggle with sleep",
                  "45–90 min sleep latency",
                  "Multiple nightly disruptions",
                  "Average sleep satisfaction around 6/10",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.05}>
            <GlassCard className="rounded-[30px] p-7">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                The realization
              </p>
              <p className="mt-4 text-lg leading-8 text-white">
                People were stacking solutions. None of them worked together.
              </p>

              <div className="mt-5 space-y-4">
                {[
                  "A fan for cooling",
                  "A white noise app for sound",
                  "Supplements for relaxation",
                  "A sunrise alarm for waking",
                  "Different routines, pillows, and hacks",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <div className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/75" />
                    <p className="text-sm leading-7 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-400">
                That fragmentation was the real problem. Sleep is a sequence:
                falling asleep, staying asleep, and waking naturally. That is
                what Lumora is now designed around.
              </p>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   SHIFT
===================================================================================== */

function ShiftSection() {
  return (
    <SectionShell
      id="shift"
      eyebrow="The shift"
      title="We stopped building one device and started building a coordinated system."
      subtitle="The pivot is not abstract. It is a more specific architecture with clearer product roles across the full sleep cycle."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <FadeIn>
            <p className="text-xl leading-9 text-white sm:text-2xl sm:leading-10">
              Falling asleep.
              <br />
              Staying asleep.
              <br />
              Waking naturally.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="text-lg leading-8 text-slate-300">
              The original all-in-one mask idea was elegant, but too broad.
              Sleep is a sequence, not a single moment. Better outcomes come
              from coordinating the right conditions at the right time, not from
              stuffing every feature into one piece of hardware.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <GlassCard className="rounded-[30px] p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              What changed
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Essence becomes the nightly foundation",
                "Sonus helps guide the fall-asleep phase",
                "Aurora completes the morning transition",
                "Max represents the premium future of the platform",
              ].map((line) => (
                <div
                  key={line}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-7 text-slate-300"
                >
                  {line}
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   PRODUCT SYSTEM
===================================================================================== */

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-b opacity-70", product.accent)} />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            {product.icon}
          </div>
          <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white">
            {product.price}
          </div>
        </div>

        <p className="mt-4 text-lg font-semibold text-white">{product.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
          {product.tag}
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          {product.description}
        </p>

        <div className="mt-4 space-y-2">
          {product.bullets.map((bullet) => (
            <BulletRow key={bullet} text={bullet} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductSystemSection() {
  return (
    <SectionShell
      id="products"
      eyebrow="Specific products, specific jobs"
      title="Specific products, specific jobs."
      subtitle="The pivot is only meaningful if the products are clearer. Lumora now has defined roles across the system instead of one device trying to do everything."
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <FadeIn>
            <p className="text-lg leading-8 text-slate-300">
              Essence is the foundation. Caelum regulates heat. Sonus supports
              wind-down audio without earbuds. Aurora creates a gentler wake-up.
              Voyage organizes the system for travel. Max represents the premium
              future of the category.
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <GlassCard className="rounded-[30px] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Why this is better
              </p>
              <div className="mt-5 space-y-4">
                {[
                  "Clearer function for each component",
                  "Less forced complexity in one device",
                  "A more premium and expandable product model",
                  "Stronger foundation for adaptive sleep improvement",
                ].map((line) => (
                  <div
                    key={line}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-slate-300"
                  >
                    {line}
                  </div>
                ))}
              </div>

              <DividerGlow />

              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-sm font-medium text-white">Better entry point</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    Users can start with Essence and build up, instead of being
                    forced into a heavy all-in-one device from day one.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-sm font-medium text-white">Better long-term model</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    The ecosystem creates room for upgrades, add-ons, premium
                    tiers, and future intelligence across the entire system.
                  </p>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   SYSTEM MAP
===================================================================================== */

function SystemMapSection() {
  return (
    <SectionShell
      id="system-map"
      eyebrow="System map"
      title="How the products work together."
      subtitle="The center is Lumora Essence. Around it, each layer improves a specific part of the sleep cycle. The adaptive layer coordinates the whole experience."
    >
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <FadeIn>
            <p className="text-lg leading-8 text-slate-300">
              This system is built around one simple idea. Better sleep does not
              come from adding more random features. It comes from coordinating
              the right conditions at the right time.
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <GlassCard className="rounded-[30px] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                System logic
              </p>
              <div className="mt-5 space-y-4">
                {[
                  "Essence anchors the nightly experience",
                  "Sonus helps initiate sleep",
                  "Caelum helps preserve overnight stability",
                  "Aurora helps complete the morning transition",
                  "Adaptive intelligence makes timing and sequencing better over time",
                ].map((line) => (
                  <div
                    key={line}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                  >
                    <div className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/75" />
                    <p className="text-sm leading-7 text-slate-300">{line}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <div className="space-y-5">
            <GlassCard className="relative rounded-[36px] p-0">
              <div className="border-b border-white/10 px-7 py-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Lumora system map
                </p>
                <p className="mt-2 text-lg font-medium text-white">
                  Clear, connected, and product-specific
                </p>
              </div>

              <div className="relative h-[560px] overflow-hidden p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_42%,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_50%_92%,rgba(251,146,60,0.07),transparent_22%)]" />

                <div className="absolute left-1/2 top-[48%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                <div className="absolute left-1/2 top-[48%] h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path d="M51 45 C41 30, 30 25, 22 25" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.55" strokeDasharray="2 2" />
                  <path d="M53 45 C65 32, 76 29, 84 31" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.55" strokeDasharray="2 2" />
                  <path d="M50 49 C46 60, 36 69, 29 77" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.55" strokeDasharray="2 2" />
                  <path d="M54 49 C62 60, 72 68, 79 73" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.55" strokeDasharray="2 2" />
                </svg>

                <div className="absolute left-1/2 top-[48%] z-20 w-[250px] -translate-x-1/2 -translate-y-1/2">
                  <div className="relative rounded-full border border-white/15 bg-gradient-to-br from-slate-700/80 to-slate-950/95 p-6 shadow-[0_0_100px_rgba(255,255,255,0.04)] animate-[lumoraPulse_4.5s_ease-in-out_infinite]">
                    <div className="absolute inset-3 rounded-full border border-white/10" />
                    <div className="relative flex h-[160px] flex-col items-center justify-center text-center">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                        Foundation
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        Essence
                      </h3>
                      <p className="mt-3 max-w-[12rem] text-sm leading-6 text-slate-400">
                        Darkness, comfort, structure, and the base layer of the
                        system.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[22%] top-[22%] z-20 w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-[26px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[calc(50%+4px)] hover:border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <Volume2 className="h-5 w-5 text-violet-200" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Sonus</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                        Fall Asleep
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    Calming soundscapes and wind-down audio without earbuds.
                  </p>
                </div>

                <div className="absolute left-[82%] top-[28%] z-20 w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-[26px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[calc(50%+4px)] hover:border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <Thermometer className="h-5 w-5 text-sky-200" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Caelum</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                        Stay Asleep
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    PCM inserts that reduce overheating and improve overnight
                    thermal balance.
                  </p>
                </div>

                <div className="absolute left-[28%] top-[76%] z-20 w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-[26px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[calc(50%+4px)] hover:border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <SunMedium className="h-5 w-5 text-orange-200" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Aurora</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                        Wake Naturally
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    A dawn-inspired wake light for a gentler morning transition.
                  </p>
                </div>

                <div className="absolute left-[80%] top-[72%] z-20 w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-[26px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[calc(50%+4px)] hover:border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <Briefcase className="h-5 w-5 text-slate-200" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Voyage</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                        System Carry
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    Protects, organizes, and transports the Lumora ecosystem.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="rounded-[28px] border-orange-300/20 bg-gradient-to-r from-orange-300/10 via-orange-200/8 to-transparent px-6 py-5 shadow-[0_0_80px_rgba(251,146,60,0.08)]">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-orange-300/25 bg-orange-300/10 p-3">
                  <Cpu className="h-5 w-5 text-orange-100" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Adaptive Intelligence Layer
                  </p>
                  <p className="mt-1 text-sm leading-7 text-orange-100/80">
                    Learns your sleep patterns and improves the system over time
                    by adjusting timing, temperature, and routines across
                    Essence, Caelum, Sonus, and Aurora.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   BEFORE / AFTER
===================================================================================== */

function BeforeAfterTableSection() {
  const rows: TableRow[] = [
    {
      category: "Product Type",
      before: "Mask",
      after: "System",
      note: "A single object becomes a coordinated experience.",
    },
    {
      category: "Structure",
      before: "All-in-one",
      after: "Modular",
      note: "Each product handles a more specific job.",
    },
    {
      category: "Focus",
      before: "Comfort",
      after: "Performance",
      note: "Comfort stays important, but outcomes matter more.",
    },
    {
      category: "Model",
      before: "One-time",
      after: "Ecosystem",
      note: "There is room for layering, upgrading, and expansion.",
    },
    {
      category: "Approach",
      before: "Tracking",
      after: "Improving",
      note: "The point is not just observing sleep. It is making sleep better.",
    },
  ]

  return (
    <SectionShell
      id="before-after"
      eyebrow="Before vs after"
      title="The pivot changed the product and the business."
      subtitle="This is the clearest summary of what actually changed."
    >
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl">
        <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-white/10 bg-white/[0.05]">
          <div className="px-6 py-5 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Category
          </div>
          <div className="px-6 py-5 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Before
          </div>
          <div className="px-6 py-5 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            After
          </div>
        </div>

        <div>
          {rows.map((row) => (
            <div
              key={row.category}
              className="group grid grid-cols-1 border-b border-white/10 transition-colors duration-200 hover:bg-white/[0.04] md:grid-cols-[1.2fr_1fr_1fr]"
            >
              <div className="px-6 py-5">
                <p className="text-sm font-medium text-white">{row.category}</p>
                <p className="mt-2 max-w-[20rem] text-sm leading-6 text-slate-400">
                  {row.note}
                </p>
              </div>

              <div className="px-6 py-5 md:border-l md:border-white/10">
                <p className="text-lg font-medium text-slate-300">{row.before}</p>
              </div>

              <div className="px-6 py-5 md:border-l md:border-white/10">
                <p className="text-lg font-medium text-white">{row.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   ADAPTIVE
===================================================================================== */

function AdaptiveSection() {
  return (
    <SectionShell
      id="adaptive"
      eyebrow="Adaptive intelligence"
      title="AI should make the system better, not louder."
      subtitle="Lumora’s adaptive layer is there to improve outcomes, not to bury people in dashboards."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <FadeIn>
            <p className="text-lg leading-8 text-slate-300">
              The system learns patterns like when you tend to fall asleep, when
              overheating becomes a problem, and how your routine changes across
              days. Then it uses that information to make better decisions
              across the products.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: <Clock3 className="h-5 w-5 text-cyan-200" />,
                  title: "Timing",
                  body: "Adjusts when sleep support and wake cues happen.",
                },
                {
                  icon: <Thermometer className="h-5 w-5 text-orange-200" />,
                  title: "Temperature",
                  body: "Improves how Caelum and the thermal experience work through the night.",
                },
                {
                  icon: <Brain className="h-5 w-5 text-violet-200" />,
                  title: "Routine",
                  body: "Helps sequence Essence, Sonus, and Aurora more intelligently over time.",
                },
              ].map((card) => (
                <GlassCard key={card.title} className="rounded-[28px] p-5">
                  <div className="w-fit rounded-2xl border border-white/10 bg-white/5 p-3">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-base font-medium text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{card.body}</p>
                </GlassCard>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <GlassCard className="rounded-[32px] p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Simple principle
            </p>
            <p className="mt-4 text-2xl font-semibold leading-9 text-white">
              The goal is not more data.
              <br />
              The goal is better sleep.
            </p>

            <DividerGlow />

            <div className="space-y-4">
              {[
                "Essence provides the nightly foundation",
                "Sonus helps guide the fall-asleep phase",
                "Caelum supports overnight comfort and stability",
                "Aurora completes the wake-up experience",
                "AI coordinates all of it so the system improves with use",
              ].map((line) => (
                <div
                  key={line}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-7 text-slate-300"
                >
                  {line}
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   WHY IT MATTERS
===================================================================================== */

function WhyThisMattersSection() {
  return (
    <SectionShell
      id="why-it-matters"
      eyebrow="Why this matters"
      title="Better sleep changes the rest of the day."
      subtitle="That is why Lumora is being built around outcomes, not novelty."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: <Zap className="h-5 w-5 text-orange-200" />,
            title: "Energy",
            body: "Better mornings start with better nights.",
          },
          {
            icon: <Brain className="h-5 w-5 text-cyan-200" />,
            title: "Focus",
            body: "A more stable night directly affects clarity and attention.",
          },
          {
            icon: <ShieldCheck className="h-5 w-5 text-violet-200" />,
            title: "Recovery",
            body: "Recovery depends on more than just total hours in bed.",
          },
          {
            icon: <SunMedium className="h-5 w-5 text-amber-200" />,
            title: "Consistency",
            body: "Small improvements compound because they happen every day.",
          },
        ].map((reason) => (
          <FadeIn key={reason.title}>
            <GlassCard className="rounded-[28px] p-6">
              <div className="w-fit rounded-2xl border border-white/10 bg-white/5 p-3">
                {reason.icon}
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">{reason.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-400">{reason.body}</p>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   FINAL
===================================================================================== */

function FinalSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28 lg:py-30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(251,146,60,0.10),transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <FadeIn>
          <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.04] p-10 shadow-[0_28px_90px_rgba(0,0,0,0.40)] backdrop-blur-xl sm:p-12 lg:p-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                Closing
              </p>

              <div className="mt-8 space-y-6">
                <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  We are not building a sleep mask.
                </h2>

                <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  We are building a new way to sleep.
                </h2>
              </div>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                A modular system. Specific products. Adaptive intelligence.
                Better sleep through a more intentional experience from night to
                morning.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* =====================================================================================
   FLOATING NAV
===================================================================================== */

function FloatingSectionNav() {
  const items = [
    { href: "#problem", label: "Problem" },
    { href: "#shift", label: "Shift" },
    { href: "#products", label: "Products" },
    { href: "#system-map", label: "System Map" },
    { href: "#before-after", label: "Before vs After" },
    { href: "#adaptive", label: "Adaptive AI" },
    { href: "#why-it-matters", label: "Why It Matters" },
  ]

  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  return (
    <div ref={wrapperRef} className="fixed bottom-5 right-5 z-50 hidden lg:block">
      {open ? (
        <div className="mb-3 w-[260px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1019]/90 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-200">
          <div className="border-b border-white/10 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Jump to section
            </p>
          </div>
          <div className="p-3">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-2xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-white/20 hover:bg-white/12"
      >
        Explore page
        <MoveRight className="h-4 w-4" />
      </button>
    </div>
  )
}

/* =====================================================================================
   PAGE
===================================================================================== */

export default function PivotPage() {
  const progress = useScrollProgress()

  return (
    <div className="relative min-h-screen scroll-smooth bg-[#04070d] text-white">
      <NightToSunriseBackground progress={progress} />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-[#04070d] via-[#04070d]/70 to-transparent" />

      <main className="relative z-10">
        <HeroSection />
        <CoreProblemSection />
        <ShiftSection />
        <ProductSystemSection />
        <SystemMapSection />
        <BeforeAfterTableSection />
        <AdaptiveSection />
        <WhyThisMattersSection />
        <FinalSection />
      </main>

      <FloatingSectionNav />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes lumoraFloat {
          0% {
            transform: translate3d(0px, 0px, 0px);
          }
          50% {
            transform: translate3d(0px, -10px, 0px);
          }
          100% {
            transform: translate3d(0px, 0px, 0px);
          }
        }

        @keyframes lumoraPulse {
          0% {
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.04);
          }
          50% {
            box-shadow: 0 0 95px rgba(255, 255, 255, 0.07);
          }
          100% {
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.04);
          }
        }

        ::selection {
          background: rgba(251, 146, 60, 0.22);
          color: white;
        }
      `}</style>
    </div>
  )
}
