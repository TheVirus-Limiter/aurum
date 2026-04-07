"use client"

import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

/* =========================
   BACKGROUND COMPONENT
========================= */

function StarBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_30%)]" />

      {/* stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white/30 rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

/* =========================
   SECTION WRAPPER
========================= */

function Section({ children }: { children: React.ReactNode }) {
  return <section className="py-20 border-b border-white/5">{children}</section>
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

  const sunrise = Math.min(scrollY / 1200, 1)

  return (
    <div className="min-h-screen text-white relative">

      <StarBackground />

      {/* sunrise overlay */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-900 via-purple-800 to-orange-300 transition-opacity duration-700"
        style={{ opacity: sunrise }}
      />

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

      <main>

        {/* HERO */}
        <Section>
          <div className="container mx-auto px-6 max-w-5xl">
            <h1 className="text-6xl font-semibold">The Pivot</h1>
            <p className="mt-6 text-xl text-slate-300/80 max-w-2xl">
              Why Lumora changed direction and what we are building instead
            </p>
          </div>
        </Section>

        {/* PROBLEM */}
        <Section>
          <div className="container mx-auto px-6 max-w-4xl space-y-6 text-slate-300">
            <h2 className="text-2xl font-semibold text-white">The Problem</h2>

            <p>
              When we first started Lumora, we thought the problem was simple. People needed a better sleep mask.
            </p>

            <p>
              But the data told a different story.
            </p>

            <ul className="space-y-2 list-disc list-inside text-slate-400">
              <li>Over 80 percent of people struggle with sleep</li>
              <li>Most take 45 to 90 minutes to fall asleep</li>
              <li>Many wake up multiple times per night</li>
              <li>Average sleep satisfaction is around 6 out of 10</li>
            </ul>

            <p>
              The issue was not a single failure. It was a combination of small disruptions.
            </p>
          </div>
        </Section>

        {/* REALIZATION */}
        <Section>
          <div className="container mx-auto px-6 max-w-4xl space-y-6">
            <h2 className="text-2xl font-semibold text-white">The Realization</h2>

            <p className="text-slate-300">
              People were stacking solutions. Fans, apps, supplements, alarms.
            </p>

            <p className="text-white text-xl font-medium">
              None of it worked together.
            </p>

            <p className="text-slate-300">
              That was the real problem. Sleep is not one issue. It is a system.
            </p>
          </div>
        </Section>

        {/* SHIFT */}
        <Section>
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 max-w-6xl">

            <div className="space-y-6 text-slate-300">
              <h2 className="text-2xl font-semibold text-white">The Shift</h2>

              <p>
                We stopped building a product and started building a system.
              </p>

              <p>
                Instead of packing everything into one device, we broke the experience into layers.
              </p>

              <p className="text-white font-medium">
                Falling asleep. Staying asleep. Waking up.
              </p>

              <p>
                Each phase is handled intentionally instead of randomly.
              </p>
            </div>

            {/* DIAGRAM */}
            <div className="flex items-center justify-center">
              <div className="relative w-[300px] h-[300px]">

                <div className="absolute inset-0 border border-white/10 rounded-full" />

                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    Sleep
                  </div>
                </div>

                <div className="absolute bottom-0 left-0">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    Fall
                  </div>
                </div>

                <div className="absolute bottom-0 right-0">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    Wake
                  </div>
                </div>

                <svg className="absolute inset-0">
                  <line x1="150" y1="40" x2="40" y2="250" stroke="white" strokeOpacity="0.2" />
                  <line x1="150" y1="40" x2="260" y2="250" stroke="white" strokeOpacity="0.2" />
                </svg>

              </div>
            </div>

          </div>
        </Section>

        {/* TABLE */}
        <Section>
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-2xl font-semibold text-white mb-6">Before vs After</h2>

            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Product Type", "Mask", "System"],
                  ["Structure", "All-in-one", "Modular"],
                  ["Focus", "Comfort", "Performance"],
                  ["Approach", "Track", "Improve"],
                  ["Model", "One-time", "Ecosystem"],
                ].map((row, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="py-3 text-slate-400">{row[0]}</td>
                    <td className="py-3">{row[1]}</td>
                    <td className="py-3 text-white">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* AI */}
        <Section>
          <div className="container mx-auto px-6 max-w-4xl space-y-6 text-slate-300">
            <h2 className="text-2xl font-semibold text-white">Adaptive System</h2>

            <p>
              Lumora learns how you sleep and improves over time.
            </p>

            <p>
              It adjusts timing, temperature, and routines automatically.
            </p>

            <p className="text-white">
              The goal is not more data. The goal is better sleep.
            </p>
          </div>
        </Section>

        {/* FINAL */}
        <Section>
          <div className="container mx-auto px-6 max-w-4xl space-y-6 text-slate-300">
            <p className="text-white text-2xl font-semibold">
              We are not building a sleep mask.
            </p>
            <p className="text-white text-2xl font-semibold">
              We are building a new way to sleep.
            </p>
          </div>
        </Section>

      </main>
    </div>
  )
}
