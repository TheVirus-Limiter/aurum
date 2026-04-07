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
  Waves,
  Wind,
  Zap,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

/* =====================================================================================
   LUMORA SLEEP — THE PIVOT
   Premium production-style Next.js + TypeScript + Tailwind page
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

type StatCard = {
  label: string
  value: string
  detail: string
  icon: ReactNode
}

type ProblemPoint = {
  title: string
  body: string
  icon: ReactNode
}

type TableRow = {
  category: string
  before: string
  after: string
  note: string
}

type SystemNode = {
  id: string
  title: string
  short: string
  body: string
  accent: string
  icon: ReactNode
  x: number
  y: number
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}

/* =====================================================================================
   UTILITIES
===================================================================================== */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

/* =====================================================================================
   SCROLL PROGRESS + SUNRISE BACKGROUND
===================================================================================== */

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

function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => ({
        id: i,
        size: i % 11 === 0 ? 3 : i % 5 === 0 ? 2 : 1,
        top: `${(i * 13.7) % 100}%`,
        left: `${(i * 9.9 + 17) % 100}%`,
        delay: `${(i % 7) * 0.8}s`,
        duration: `${7 + (i % 6)}s`,
        opacity: 0.18 + ((i * 17) % 30) / 100,
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
  const sunriseOpacity = Math.min(progress * 1.25, 1)
  const dawnLift = Math.min(progress * 140, 140)

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
          opacity: 0.18 + sunriseOpacity * 0.25,
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
   ANIMATION HELPERS
===================================================================================== */

function FadeIn({ children, className, delay = 0, y = 22 }: FadeInProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

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
        "relative border-b border-white/8 py-20 sm:py-24 lg:py-28",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 lg:mb-16">
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

/* =====================================================================================
   SHARED UI BLOCKS
===================================================================================== */

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
      {children}
    </div>
  )
}

function DividerGlow() {
  return (
    <div className="relative my-8 h-px w-full bg-white/8">
      <div className="absolute left-0 top-0 h-px w-48 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
    </div>
  )
}

function MicroPill({
  children,
  active = false,
}: {
  children: ReactNode
  active?: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
        active
          ? "border-orange-300/30 bg-orange-300/10 text-orange-100"
          : "border-white/10 bg-white/5 text-slate-300"
      )}
    >
      {children}
    </span>
  )
}

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

          <div className="inline-flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-2 shadow-inner shadow-white/5">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-xs font-semibold tracking-[0.25em] text-white">
                L
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Lumora Sleep</p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Product story
              </p>
            </div>
          </div>
        </div>

        <div className="grid min-h-[78vh] items-center gap-14 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div>
            <FadeIn>
              <div className="mb-6 flex flex-wrap gap-3">
                <MicroPill active>The Pivot</MicroPill>
                <MicroPill>System Thinking</MicroPill>
                <MicroPill>Adaptive Sleep</MicroPill>
              </div>
            </FadeIn>

            <FadeIn delay={0.03}>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.6rem] xl:leading-[0.96]">
                The Pivot
              </h1>
            </FadeIn>

            <FadeIn delay={0.08}>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
                Why Lumora changed direction and what we are building instead.
                We began with a product idea. What emerged was something much
                larger: a connected sleep system built around the full cycle of
                rest, recovery, and waking.
              </p>
            </FadeIn>

            <FadeIn delay={0.13}>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "From",
                    value: "Smart Mask",
                    detail: "single device thesis",
                  },
                  {
                    title: "To",
                    value: "Modular System",
                    detail: "phase-based experience",
                  },
                  {
                    title: "Goal",
                    value: "Better Sleep",
                    detail: "not more dashboards",
                  },
                ].map((card) => (
                  <GlassCard key={card.title} className="p-5">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                      {card.title}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {card.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {card.detail}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.12} className="relative">
            <GlassCard className="relative min-h-[620px] rounded-[34px] border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.04] p-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.08),transparent_32%),radial-gradient(circle_at_70%_110%,rgba(251,146,60,0.10),transparent_28%)]" />

              <div className="relative flex h-full min-h-[620px] flex-col">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                      Concept transition
                    </p>
                    <p className="mt-1 text-lg font-medium text-white">
                      From isolated device to orchestrated system
                    </p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    Lumora 02
                  </div>
                </div>

                <div className="grid flex-1 gap-6 p-6">
                  <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
                    <div className="rounded-[26px] border border-white/10 bg-[#0b111d]/70 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-white">
                          Original thesis
                        </p>
                        <MicroPill>Before</MicroPill>
                      </div>

                      <div className="relative mx-auto mt-10 h-72 w-52 rounded-[48px] border border-white/10 bg-gradient-to-b from-slate-800 to-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                        <div className="absolute left-1/2 top-4 h-2.5 w-20 -translate-x-1/2 rounded-full bg-white/10" />
                        <div className="absolute inset-x-6 top-10 h-28 rounded-[32px] border border-cyan-300/20 bg-gradient-to-b from-cyan-300/10 to-cyan-300/5 shadow-[0_0_40px_rgba(125,211,252,0.10)]" />
                        <div className="absolute inset-x-6 bottom-8 grid gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300">
                            Audio
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300">
                            Cooling
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300">
                            Wake light
                          </div>
                        </div>
                      </div>

                      <p className="mt-8 text-sm leading-7 text-slate-400">
                        A single device carrying every function. Elegant in
                        theory, but too much complexity concentrated into one
                        touchpoint.
                      </p>
                    </div>

                    <div className="rounded-[26px] border border-white/10 bg-[#0a0f1a]/70 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-white">
                          New architecture
                        </p>
                        <MicroPill active>After</MicroPill>
                      </div>

                      <div className="relative mt-6 h-[22rem]">
                        <div className="absolute left-1/2 top-[45%] z-20 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-gradient-to-br from-slate-700/80 to-slate-950/90 shadow-[0_0_80px_rgba(255,255,255,0.04)]">
                          <div className="flex h-full flex-col items-center justify-center text-center">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                              Core
                            </p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              Lumora
                            </p>
                            <p className="text-sm font-semibold text-white">
                              System
                            </p>
                          </div>
                        </div>

                        {[
                          {
                            label: "Fall Asleep",
                            sub: "sensory transition",
                            cls: "left-[6%] top-[8%]",
                          },
                          {
                            label: "Stay Asleep",
                            sub: "temperature stability",
                            cls: "right-[4%] top-[18%]",
                          },
                          {
                            label: "Wake Naturally",
                            sub: "gentle morning cues",
                            cls: "left-[22%] bottom-[6%]",
                          },
                        ].map((node) => (
                          <div
                            key={node.label}
                            className={cn(
                              "absolute z-10 rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl",
                              node.cls
                            )}
                          >
                            <p className="text-sm font-medium text-white">
                              {node.label}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {node.sub}
                            </p>
                          </div>
                        ))}

                        <svg
                          className="absolute inset-0 h-full w-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M50 45 C38 30, 29 25, 19 18"
                            fill="none"
                            stroke="rgba(255,255,255,0.18)"
                            strokeWidth="0.5"
                            strokeDasharray="2 2"
                          />
                          <path
                            d="M52 44 C62 32, 72 28, 82 25"
                            fill="none"
                            stroke="rgba(255,255,255,0.18)"
                            strokeWidth="0.5"
                            strokeDasharray="2 2"
                          />
                          <path
                            d="M48 50 C44 64, 36 75, 30 86"
                            fill="none"
                            stroke="rgba(255,255,255,0.18)"
                            strokeWidth="0.5"
                            strokeDasharray="2 2"
                          />
                        </svg>

                        <div className="absolute bottom-4 left-1/2 w-[82%] -translate-x-1/2 rounded-[22px] border border-orange-300/20 bg-orange-300/8 px-5 py-4 shadow-[0_0_50px_rgba(251,146,60,0.12)]">
                          <div className="flex items-center gap-3">
                            <Cpu className="h-5 w-5 text-orange-200" />
                            <div>
                              <p className="text-sm font-medium text-white">
                                Adaptive Intelligence Layer
                              </p>
                              <p className="text-xs leading-5 text-orange-100/80">
                                Learns timing, temperature, and routines across
                                the full experience
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="mt-6 text-sm leading-7 text-slate-400">
                        Instead of one heavy object attempting to do everything,
                        Lumora becomes an orchestrated set of components and
                        signals working together with much more control.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      "Better division of function",
                      "Less friction in use",
                      "More room to improve over time",
                    ].map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-slate-300"
                      >
                        {point}
                      </div>
                    ))}
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
   PROBLEM
===================================================================================== */

function ProblemSection() {
  const stats: StatCard[] = [
    {
      label: "Struggle with sleep",
      value: "80%",
      detail:
        "A large majority report that sleep is not consistently working for them.",
      icon: <Moon className="h-5 w-5 text-cyan-200" />,
    },
    {
      label: "Sleep latency",
      value: "45–90 min",
      detail:
        "Many need nearly an hour or more just to make the transition into sleep.",
      icon: <Clock3 className="h-5 w-5 text-orange-200" />,
    },
    {
      label: "Average sleep satisfaction",
      value: "6/10",
      detail:
        "Even with enough hours on paper, many still do not feel deeply restored.",
      icon: <Zap className="h-5 w-5 text-violet-200" />,
    },
  ]

  const points: ProblemPoint[] = [
    {
      title: "Sleep fails in small ways before it fails in obvious ways.",
      body:
        "For most people, the problem is not a single dramatic disruption. It is a chain of smaller frictions that gradually compound into a poor night of sleep.",
      icon: <Brain className="h-5 w-5 text-cyan-200" />,
    },
    {
      title: "The environment keeps changing while the body is trying to stabilize.",
      body:
        "Temperature shifts, inconsistent sound, mental overstimulation, and harsh wake patterns all influence the quality of sleep even when each factor seems minor on its own.",
      icon: <Thermometer className="h-5 w-5 text-orange-200" />,
    },
    {
      title: "Most current solutions are reactive, fragmented, or incomplete.",
      body:
        "People buy one device for cooling, another for sound, another for waking, then rely on rituals and workarounds to stitch them together manually.",
      icon: <Waves className="h-5 w-5 text-sky-200" />,
    },
  ]

  return (
    <SectionShell
      id="problem"
      eyebrow="The problem"
      title="Sleep is universal, but the experience of solving it is fragmented."
      subtitle="When we started Lumora, we believed the pain point was straightforward: build a better sleep mask and make the nighttime experience more comfortable. The deeper we looked, the more obvious it became that comfort alone was too narrow a lens."
    >
      <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-6">
          <FadeIn>
            <GlassCard className="rounded-[30px] p-7">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                What the research kept showing
              </p>

              <p className="mt-4 text-lg leading-8 text-slate-300">
                Across early user conversations, a pattern repeated itself with
                surprising consistency. People were not just saying they were
                tired. They were describing a nightly system that broke in
                multiple places: difficulty falling asleep, waking repeatedly,
                difficulty feeling restored, and then relying on a hard reset in
                the morning to get moving again.
              </p>

              <DividerGlow />

              <p className="text-lg leading-8 text-slate-300">
                That distinction matters. A sleep mask can make darkness better.
                It cannot, by itself, fix an experience shaped by temperature,
                sensory load, transitions, routine, recovery, and wake timing.
              </p>

              <div className="mt-8 space-y-4">
                {points.map((point, index) => (
                  <motion.div
                    key={point.title}
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.18 }}
                    className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 rounded-2xl border border-white/10 bg-white/5 p-3">
                        {point.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-400">
                          {point.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.05}>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              className="grid gap-4"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={item}>
                  <GlassCard className="rounded-[28px] p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        {stat.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                          {stat.label}
                        </p>
                        <div className="mt-3 flex items-end justify-between gap-3">
                          <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                            {stat.value}
                          </p>
                          <ChevronRight className="h-5 w-5 shrink-0 text-slate-500" />
                        </div>
                        <p className="mt-4 text-sm leading-7 text-slate-400">
                          {stat.detail}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <GlassCard className="rounded-[30px] p-7">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                The practical reality
              </p>

              <div className="mt-5 space-y-4 text-slate-300">
                <p className="text-lg leading-8">
                  Most users are already attempting to solve sleep. The problem
                  is that they are forced to do it with disconnected tools.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "A fan for cooling",
                    "A white noise app for sound",
                    "Supplements for relaxation",
                    "A sunrise alarm for waking",
                    "Different pillows and routines",
                    "Habit trackers and sleep apps",
                  ].map((tool) => (
                    <div
                      key={tool}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-slate-300"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-7 text-slate-400">
                  Each tool attempts to solve one slice of the experience. None
                  are designed to behave like one coordinated system.
                </p>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   REALIZATION
===================================================================================== */

function RealizationSection() {
  return (
    <SectionShell
      id="realization"
      eyebrow="The realization"
      title="Sleep is not one problem. It is a system."
      subtitle="That sentence changed the direction of the company. It reframed the product question entirely."
      className="overflow-hidden"
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <FadeIn>
            <p className="max-w-3xl text-xl leading-9 text-slate-300 sm:text-2xl sm:leading-10">
              What stood out most was not only the scale of the struggle, but
              how people were trying to solve it. They were stacking solutions,
              layering device on top of device, routine on top of routine,
              hoping the collection of workarounds would eventually feel like a
              coherent answer.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.04] p-7">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                What was actually happening
              </p>
              <div className="mt-5 space-y-5">
                <p className="text-lg leading-8 text-white">
                  The fragmentation was the problem.
                </p>
                <p className="text-base leading-8 text-slate-300">
                  A fan might help with heat. A white noise app might reduce the
                  harshness of the room. A supplement might help someone feel
                  more prepared to rest. A wake light might improve the morning.
                  But because these pieces do not coordinate, the user still has
                  to do all of the orchestration.
                </p>
                <p className="text-base leading-8 text-slate-300">
                  That means the burden remains on the person who is already
                  tired. The solution is not simpler. It is just more crowded.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <GlassCard className="rounded-[32px] p-0">
            <div className="border-b border-white/10 px-7 py-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Reframing the category
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                From comfort accessory to sleep architecture
              </h3>
            </div>

            <div className="grid gap-0">
              {[
                {
                  title: "Old framing",
                  body:
                    "How do we build a better sleep mask with more integrated features?",
                },
                {
                  title: "New framing",
                  body:
                    "How do we improve the full experience of falling asleep, staying asleep, and waking up?",
                },
                {
                  title: "What changed",
                  body:
                    "The focus moved away from packing more functions into one object and toward designing a coordinated experience across multiple phases.",
                },
              ].map((row, index) => (
                <div
                  key={row.title}
                  className={cn(
                    "px-7 py-6",
                    index !== 2 ? "border-b border-white/10" : ""
                  )}
                >
                  <p className="text-sm font-medium text-white">{row.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {row.body}
                  </p>
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
   OLD APPROACH
===================================================================================== */

function OldApproachSection() {
  const limitations = [
    {
      title: "Too much complexity in one object",
      body:
        "Combining audio, temperature control, and wake light into one wearable creates engineering, battery, thermal, usability, and comfort tradeoffs at the same time.",
    },
    {
      title: "Too rigid for real sleep behavior",
      body:
        "Sleep does not behave like one uninterrupted block with one consistent need. The conditions that help someone fall asleep are not always the same ones that keep them asleep or wake them well.",
    },
    {
      title: "Harder to personalize",
      body:
        "When every function is bundled into one all-in-one form, there is less flexibility in how the user enters the system or adapts it over time.",
    },
  ]

  return (
    <SectionShell
      id="before"
      eyebrow="The old approach"
      title="Our first idea made sense on paper. It became weaker the closer it got to reality."
      subtitle="We originally designed Lumora around the logic most products follow: build a better device, add more features, and make that device feel more advanced."
    >
      <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-6">
          <FadeIn>
            <GlassCard className="rounded-[30px] p-7">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Original concept
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                A smart sleep mask
              </h3>
              <p className="mt-5 text-base leading-8 text-slate-300">
                The thesis was straightforward. If people struggle to sleep,
                then a single elegant object that combines darkness, sound,
                cooling, and a wake experience could become a compelling upgrade
                over what already exists. It felt premium, portable, and simple
                to explain.
              </p>
              <p className="mt-5 text-base leading-8 text-slate-300">
                But the more we examined the nightly experience, the more we saw
                that sleep is not experienced through a single touchpoint. It is
                experienced as a sequence. That matters because a single object
                can become overburdened the moment it tries to manage every
                stage with equal effectiveness.
              </p>

              <DividerGlow />

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Audio integration",
                  "Temperature control",
                  "Wake-up light",
                  "Portable form factor",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-300"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        <FadeIn delay={0.06}>
          <GlassCard className="rounded-[30px] p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Why it breaks down
            </p>
            <div className="mt-6 space-y-4">
              {limitations.map((limitation) => (
                <div
                  key={limitation.title}
                  className="rounded-[24px] border border-white/10 bg-black/20 p-5"
                >
                  <h3 className="text-base font-medium text-white">
                    {limitation.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {limitation.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] border border-orange-300/20 bg-orange-300/8 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-orange-100/80">
                Bottom line
              </p>
              <p className="mt-2 text-lg leading-8 text-white">
                The original device was solving the product beautifully, but not
                yet solving the system honestly.
              </p>
            </div>
          </GlassCard>
        </FadeIn>
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
      title="We stopped building a product and started building a system."
      subtitle="That shift changed both the architecture of Lumora and the logic behind how it creates value."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <FadeIn>
            <p className="text-lg leading-8 text-slate-300">
              Instead of forcing everything into one device, we separated the
              experience into layers that work together. The core insight was
              that falling asleep, staying asleep, and waking up are connected,
              but they are not identical problems. Each phase has different
              conditions, different constraints, and different design needs.
            </p>
          </FadeIn>

          <FadeIn delay={0.04}>
            <p className="text-lg leading-8 text-slate-300">
              That led Lumora toward a modular system. At the center is a core
              experience. Around it are components and behaviors optimized for
              specific moments in the sleep cycle. Instead of asking one object
              to do everything, the system distributes responsibility more
              intelligently.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                What modularity changes
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  "Improves clarity of function",
                  "Reduces unnecessary complexity",
                  "Makes the system easier to evolve",
                  "Lets the experience become more personalized over time",
                ].map((value) => (
                  <div
                    key={value}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-6 text-slate-300"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <GlassCard className="rounded-[32px] p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Structured logic
            </p>

            <div className="mt-6 space-y-5">
              {[
                {
                  step: "01",
                  title: "Phase-based design",
                  body:
                    "Each stage of sleep gets treated as a design problem with specific conditions rather than being collapsed into one generic wellness experience.",
                },
                {
                  step: "02",
                  title: "System-level coordination",
                  body:
                    "The system can align timing, sensory cues, and environmental adjustments instead of treating each intervention as a disconnected action.",
                },
                {
                  step: "03",
                  title: "Compounding outcomes",
                  body:
                    "Small improvements across multiple phases often matter more than one dramatic improvement in only one phase.",
                },
              ].map((entry) => (
                <div
                  key={entry.step}
                  className="grid gap-4 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:grid-cols-[72px_1fr]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white">
                    {entry.step}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {entry.body}
                    </p>
                  </div>
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
   MODULAR SYSTEM DIAGRAM
===================================================================================== */

function Line({
  from,
  to,
  active,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  active: boolean
}) {
  const path = `M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${
    (from.x + to.x) / 2
  } ${to.y}, ${to.x} ${to.y}`

  return (
    <>
      <path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="2"
        strokeDasharray="5 8"
      />
      <motion.path
        d={path}
        fill="none"
        stroke={active ? "rgba(255,214,170,0.85)" : "rgba(125,211,252,0.35)"}
        strokeWidth="2.5"
        initial={{ pathLength: 0, opacity: 0.35 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </>
  )
}

function SystemNodeCard({
  node,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: {
  node: SystemNode
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <motion.div
      className="group absolute z-20 w-[230px] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={cn(
          "rounded-[26px] border p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300",
          isActive
            ? "border-white/20 bg-white/[0.10]"
            : "border-white/10 bg-white/[0.06]"
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "rounded-2xl border p-3 transition-all duration-300",
              isActive
                ? "border-white/20 bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.06)]"
                : "border-white/10 bg-black/20"
            )}
          >
            {node.icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{node.title}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
              {node.short}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-400">{node.body}</p>

        <div
          className={cn(
            "mt-5 h-px w-full bg-gradient-to-r transition-all duration-300",
            node.accent
          )}
        />
      </div>
    </motion.div>
  )
}

function ModularSystemDiagramSection() {
  const [active, setActive] = useState("fall")

  const nodes: SystemNode[] = [
    {
      id: "fall",
      title: "Fall Asleep",
      short: "reduce sleep latency",
      body:
        "Calms sensory input, narrows stimulation, and creates a more reliable transition into rest.",
      accent: "from-cyan-300/60 via-cyan-300/20 to-transparent",
      icon: <Moon className="h-5 w-5 text-cyan-200" />,
      x: 22,
      y: 26,
    },
    {
      id: "stay",
      title: "Stay Asleep",
      short: "protect stability",
      body:
        "Maintains comfort and environmental consistency so sleep is less likely to fragment during the night.",
      accent: "from-violet-300/60 via-violet-300/20 to-transparent",
      icon: <Wind className="h-5 w-5 text-violet-200" />,
      x: 78,
      y: 34,
    },
    {
      id: "wake",
      title: "Wake Naturally",
      short: "end sleep gently",
      body:
        "Introduces a more gradual morning transition aligned with natural cues rather than abrupt interruption.",
      accent: "from-orange-300/60 via-orange-300/20 to-transparent",
      icon: <SunMedium className="h-5 w-5 text-orange-200" />,
      x: 30,
      y: 75,
    },
  ]

  const center = { x: 52, y: 48 }

  return (
    <SectionShell
      id="system"
      eyebrow="Modular system diagram"
      title="A clear system designed around the three critical phases of sleep."
      subtitle="This is the architectural idea behind the pivot. The core system sits at the center, with each phase supported intentionally instead of randomly."
    >
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <FadeIn>
            <p className="text-lg leading-8 text-slate-300">
              The model is simple to understand. The experience begins with
              helping the body transition into sleep. It then focuses on
              preserving stability across the night. Finally, it guides the body
              back out of sleep in a less abrupt and more natural way.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="text-lg leading-8 text-slate-300">
              The most important layer sits beneath all three. Adaptive
              intelligence does not exist as marketing decoration. It exists to
              coordinate timing, temperature, and routines across the system so
              the experience can improve through repeated use.
            </p>
          </FadeIn>

          <FadeIn delay={0.09}>
            <GlassCard className="rounded-[30px] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                System logic
              </p>
              <div className="mt-5 space-y-4">
                {[
                  "One core system",
                  "Three clear phases",
                  "One adaptive intelligence layer underneath all of them",
                ].map((line) => (
                  <div
                    key={line}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                    <p className="text-sm leading-7 text-slate-300">{line}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <GlassCard className="relative min-h-[720px] rounded-[36px] p-0">
            <div className="border-b border-white/10 px-7 py-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Lumora system map
              </p>
              <p className="mt-2 text-lg font-medium text-white">
                Clear, labeled, and phase-based
              </p>
            </div>

            <div className="relative h-[640px] overflow-hidden p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_40%,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_50%_90%,rgba(251,146,60,0.07),transparent_22%)]" />

              <div className="absolute left-1/2 top-[48%] z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-[48%] z-10 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

              <svg
                className="absolute inset-0 z-10 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <Line
                  from={center}
                  to={{ x: nodes[0].x, y: nodes[0].y }}
                  active={active === "fall"}
                />
                <Line
                  from={center}
                  to={{ x: nodes[1].x, y: nodes[1].y }}
                  active={active === "stay"}
                />
                <Line
                  from={center}
                  to={{ x: nodes[2].x, y: nodes[2].y }}
                  active={active === "wake"}
                />
              </svg>

              <div className="absolute left-[52%] top-[48%] z-20 w-[260px] -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="relative rounded-full border border-white/15 bg-gradient-to-br from-slate-700/80 to-slate-950/95 p-6 shadow-[0_0_100px_rgba(255,255,255,0.04)]"
                  animate={{
                    boxShadow: [
                      "0 0 60px rgba(255,255,255,0.04)",
                      "0 0 95px rgba(255,255,255,0.07)",
                      "0 0 60px rgba(255,255,255,0.04)",
                    ],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-3 rounded-full border border-white/10" />
                  <div className="relative flex h-[170px] flex-col items-center justify-center text-center">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                      Center node
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      Lumora System
                    </h3>
                    <p className="mt-3 max-w-[12rem] text-sm leading-6 text-slate-400">
                      One coordinated sleep experience across the entire night.
                    </p>
                  </div>
                </motion.div>
              </div>

              {nodes.map((node) => (
                <SystemNodeCard
                  key={node.id}
                  node={node}
                  isActive={active === node.id}
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive("fall")}
                />
              ))}

              <motion.div
                className="absolute bottom-7 left-1/2 z-20 w-[88%] -translate-x-1/2 rounded-[28px] border border-orange-300/20 bg-gradient-to-r from-orange-300/10 via-orange-200/8 to-transparent px-6 py-5 shadow-[0_0_80px_rgba(251,146,60,0.10)]"
                animate={{
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl border border-orange-300/25 bg-orange-300/10 p-3">
                    <Cpu className="h-5 w-5 text-orange-100" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Adaptive Intelligence Layer
                    </p>
                    <p className="mt-1 text-sm leading-7 text-orange-100/80">
                      Learns when you tend to fall asleep, where disruptions
                      occur, and how routines change so the system can quietly
                      improve timing, temperature, and sequencing over time.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   BEFORE VS AFTER TABLE
===================================================================================== */

function BeforeAfterTableSection() {
  const rows: TableRow[] = [
    {
      category: "Product Type",
      before: "Mask",
      after: "System",
      note: "Moves from a single object to a multi-phase experience.",
    },
    {
      category: "Structure",
      before: "All-in-one",
      after: "Modular",
      note: "Distributes functions more intelligently across the experience.",
    },
    {
      category: "Focus",
      before: "Comfort",
      after: "Performance",
      note: "Comfort still matters, but the target becomes outcomes and improvement.",
    },
    {
      category: "Model",
      before: "One-time",
      after: "Ecosystem",
      note: "Creates room for expansion, refinement, and layered value.",
    },
    {
      category: "Approach",
      before: "Tracking",
      after: "Improving",
      note: "Puts the emphasis on sleep quality itself, not just data collection.",
    },
  ]

  return (
    <SectionShell
      id="before-after"
      eyebrow="Before vs after"
      title="The pivot changed the structure, business model, and ambition of the product."
      subtitle="The table below shows the most important differences in how Lumora is now framed and built."
    >
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <FadeIn>
            <p className="text-lg leading-8 text-slate-300">
              A useful pivot is not cosmetic. It should change what the product
              is, how the system works, and where value is created. In Lumora’s
              case, the transition from mask to system changes the entire
              equation.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <GlassCard className="rounded-[30px] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                What this means strategically
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-400">
                <p>
                  The product becomes more expandable.
                </p>
                <p>
                  The system becomes easier to personalize.
                </p>
                <p>
                  The value proposition shifts from passive monitoring to
                  active improvement.
                </p>
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
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
                    <p className="text-sm font-medium text-white">
                      {row.category}
                    </p>
                    <p className="mt-2 max-w-[20rem] text-sm leading-6 text-slate-400">
                      {row.note}
                    </p>
                  </div>

                  <div className="px-6 py-5 md:border-l md:border-white/10">
                    <div className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                      Before
                    </div>
                    <p className="mt-3 text-lg font-medium text-slate-300">
                      {row.before}
                    </p>
                  </div>

                  <div className="px-6 py-5 md:border-l md:border-white/10">
                    <div className="inline-flex rounded-full border border-orange-300/20 bg-orange-300/8 px-3 py-1 text-xs uppercase tracking-[0.16em] text-orange-100/80">
                      After
                    </div>
                    <p className="mt-3 text-lg font-medium text-white">
                      {row.after}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   AI / ADAPTIVE SECTION
===================================================================================== */

function AdaptiveSection() {
  return (
    <SectionShell
      id="adaptive"
      eyebrow="Adaptive intelligence"
      title="The system should learn in the background, not overwhelm the user in the foreground."
      subtitle="Lumora’s adaptive layer is simple in concept. It notices patterns, adjusts conditions, and improves the experience over time."
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <FadeIn>
            <p className="text-lg leading-8 text-slate-300">
              We do not want intelligence to show up as noise. The point is not
              to confront users with more charts, more scores, or more wellness
              theater. The point is to make the system progressively better at
              doing the work for them.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: <Clock3 className="h-5 w-5 text-cyan-200" />,
                  title: "Learns timing",
                  body: "Recognizes when you tend to actually fall asleep and how routines shift over time.",
                },
                {
                  icon: <Thermometer className="h-5 w-5 text-orange-200" />,
                  title: "Adjusts conditions",
                  body: "Can tune temperature and transitions more intelligently based on repeated use.",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5 text-violet-200" />,
                  title: "Improves quietly",
                  body: "Works in the background without forcing the user to manage every setting each night.",
                },
              ].map((card) => (
                <GlassCard key={card.title} className="rounded-[28px] p-5">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 w-fit">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-base font-medium text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {card.body}
                  </p>
                </GlassCard>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-[30px] border border-orange-300/20 bg-gradient-to-r from-orange-300/10 via-orange-200/6 to-transparent p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-100/80">
                Important principle
              </p>
              <p className="mt-3 text-2xl font-semibold leading-9 text-white">
                The goal is not more data.
                <br />
                The goal is better sleep.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <GlassCard className="rounded-[32px] p-0">
            <div className="border-b border-white/10 px-7 py-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Simple adaptation loop
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Learn → adjust → improve
              </h3>
            </div>

            <div className="p-7">
              <div className="space-y-5">
                {[
                  {
                    icon: <Brain className="h-5 w-5 text-cyan-200" />,
                    title: "Learn patterns",
                    body:
                      "Notice when sleep begins, where interruptions tend to happen, and how habits evolve.",
                  },
                  {
                    icon: <Cpu className="h-5 w-5 text-orange-200" />,
                    title: "Adjust the sequence",
                    body:
                      "Shift timing, environmental cues, and routines to better match the user’s real behavior.",
                  },
                  {
                    icon: <MoveRight className="h-5 w-5 text-violet-200" />,
                    title: "Improve the outcome",
                    body:
                      "Make falling asleep easier, reduce avoidable disruptions, and support a gentler wake experience.",
                  },
                ].map((step, index) => (
                  <div key={step.title} className="relative">
                    <div className="grid gap-4 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:grid-cols-[60px_1fr]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        {step.icon}
                      </div>
                      <div>
                        <p className="text-base font-medium text-white">
                          {step.title}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-400">
                          {step.body}
                        </p>
                      </div>
                    </div>
                    {index !== 2 ? (
                      <div className="ml-6 h-5 w-px bg-gradient-to-b from-white/20 to-transparent" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   WHY THIS MATTERS
===================================================================================== */

function WhyThisMattersSection() {
  const reasons = [
    {
      icon: <Zap className="h-5 w-5 text-orange-200" />,
      title: "Energy",
      body: "Better sleep changes how people feel when the day starts.",
    },
    {
      icon: <Brain className="h-5 w-5 text-cyan-200" />,
      title: "Focus",
      body: "A more stable night directly influences clarity, attention, and cognitive sharpness.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-violet-200" />,
      title: "Recovery",
      body: "Physical and mental recovery depend on more than just total hours in bed.",
    },
    {
      icon: <SunMedium className="h-5 w-5 text-amber-200" />,
      title: "Consistency",
      body: "Small nightly improvements compound because they happen every day.",
    },
  ]

  return (
    <SectionShell
      id="why-it-matters"
      eyebrow="Why this matters"
      title="Sleep is one of the few inputs that touches nearly everything else."
      subtitle="That is why the category deserves better than fragmented gadgets and after-the-fact dashboards."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <FadeIn>
            <p className="text-lg leading-8 text-slate-300">
              Better sleep is not a vanity metric. It changes focus, mood,
              energy, training, recovery, and how people function in the hours
              that follow. It affects work, school, performance, and long-term
              health. Even modest improvements matter because they repeat
              nightly.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="text-lg leading-8 text-slate-300">
              Most sleep products either address one narrow slice of the problem
              or simply report what already happened. Lumora is built around a
              different idea: create the conditions that make better sleep more
              likely in the first place.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                What makes this important
              </p>
              <p className="mt-4 text-2xl font-semibold leading-9 text-white">
                Small improvements at night
                <br />
                create visible differences by morning.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <GlassCard key={reason.title} className="rounded-[28px] p-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 w-fit">
                  {reason.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  {reason.body}
                </p>
              </GlassCard>
            ))}
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   LOOKING FORWARD
===================================================================================== */

function LookingForwardSection() {
  return (
    <SectionShell
      id="forward"
      eyebrow="Looking forward"
      title="We are still early, but the direction is now much clearer."
      subtitle="The next phase is not about adding noise. It is about validating what truly improves the experience and refining the system around that."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <FadeIn>
          <GlassCard className="rounded-[30px] p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              What matters most now
            </p>
            <div className="mt-6 space-y-5">
              {[
                "Do people use it consistently?",
                "Does it improve how they sleep?",
                "Would they continue using it over time?",
              ].map((question) => (
                <div
                  key={question}
                  className="flex items-start gap-4 rounded-[22px] border border-white/10 bg-black/20 px-5 py-4"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-white/80" />
                  <p className="text-base leading-7 text-slate-300">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.08}>
          <GlassCard className="rounded-[30px] p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Directional principle
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Everything else comes after those signals. The system can evolve.
              The components can evolve. The interface can evolve. But the core
              question stays the same: does this actually make sleep better in a
              meaningful and repeatable way?
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              That is the standard the pivot creates. Not novelty. Not feature
              density. Not wellness theater. Better sleep.
            </p>
          </GlassCard>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

/* =====================================================================================
   FINAL
===================================================================================== */

function FinalSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(251,146,60,0.10),transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <FadeIn>
          <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.04] p-10 shadow-[0_28px_90px_rgba(0,0,0,0.40)] backdrop-blur-xl sm:p-12 lg:p-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                Closing
              </p>

              <div className="mt-8 space-y-6">
                <motion.h2
                  className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  We are not building a sleep mask.
                </motion.h2>

                <motion.h2
                  className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
                >
                  We are building a new way to sleep.
                </motion.h2>
              </div>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                Lumora began as a product idea. It is becoming a system built
                around better rest, better mornings, and a more intentional
                sleep experience from start to finish.
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
    { href: "#realization", label: "Realization" },
    { href: "#before", label: "Before" },
    { href: "#shift", label: "Shift" },
    { href: "#system", label: "System" },
    { href: "#before-after", label: "Table" },
    { href: "#adaptive", label: "Adaptive" },
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
    <div
      ref={wrapperRef}
      className="fixed bottom-5 right-5 z-50 hidden lg:block"
    >
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 w-[260px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1019]/90 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
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
          </motion.div>
        ) : null}
      </AnimatePresence>

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
        <ProblemSection />
        <RealizationSection />
        <OldApproachSection />
        <ShiftSection />
        <ModularSystemDiagramSection />
        <BeforeAfterTableSection />
        <AdaptiveSection />
        <WhyThisMattersSection />
        <LookingForwardSection />
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

        ::selection {
          background: rgba(251, 146, 60, 0.22);
          color: white;
        }
      `}</style>
    </div>
  )
}
