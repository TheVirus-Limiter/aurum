"use client"

import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function FadeIn({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  )
}

function Divider() {
  return (
    <div className="relative my-16">
      <div className="h-px bg-white/10" />
      <div className="absolute inset-0 flex justify-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" />
      </div>
    </div>
  )
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] bottom-[-100px] right-[-100px]" />
      </div>

      <header className="py-8 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-slate-300 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            Back
          </a>
          <div className="w-px h-6 bg-white/10" />
          <img src="/images/lumora-logo.png" className="h-14" />
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">

          {/* Title */}
          <FadeIn>
            <h1 className="text-5xl font-semibold text-center bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              The Pivot
            </h1>
            <p className="mt-6 text-center text-slate-300/70">
              Why Lumora changed direction and what we are building instead
            </p>
          </FadeIn>

          <Divider />

          {/* SECTION 1 */}
          <FadeIn>
            <p>When we first started Lumora, the idea was simple.</p>
            <p className="mt-3">We wanted to build a better sleep mask.</p>
            <p className="mt-3">
              Not just something more comfortable, but something that actually improved how people slept. We designed around features like audio, temperature, and light.
            </p>
            <p className="mt-3">On paper, it made sense.</p>
          </FadeIn>

          <Divider />

          {/* SECTION 2 */}
          <FadeIn>
            <p>But once we started talking to people, something became obvious.</p>
            <p className="mt-4 text-white text-lg font-medium">
              Sleep is not one problem. It is a system.
            </p>
            <p className="mt-3">
              Over 80 percent of people struggle with sleep. Most take 45 to 90 minutes to fall asleep. Many wake up multiple times per night.
            </p>
          </FadeIn>

          <Divider />

          {/* SECTION 3 */}
          <FadeIn>
            <p>
              People were stacking solutions. Fans, apps, supplements, alarms. None of it worked together.
            </p>
            <p className="mt-3 text-white">
              That was the real problem.
            </p>
          </FadeIn>

          <Divider />

          {/* SECTION 4 */}
          <FadeIn>
            <p className="text-white text-lg font-medium">
              So we changed direction.
            </p>
            <p className="mt-3">
              Instead of building a product, we started building a system.
            </p>
          </FadeIn>

          <Divider />

          {/* SYSTEM */}
          <FadeIn>
            <h2 className="text-xl font-semibold text-white">From product to system</h2>
            <p className="mt-3">
              Lumora is now a modular system designed around the full cycle of sleep. Falling asleep, staying asleep, and waking up.
            </p>
          </FadeIn>

          <Divider />

          {/* TABLE */}
          <FadeIn>
            <h2 className="text-xl font-semibold text-white mb-4">What changed</h2>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-4 text-left">Before</th>
                    <th className="p-4 text-left">After</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="p-4">Smart sleep mask</td>
                    <td className="p-4">Modular sleep system</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="p-4">All features in one device</td>
                    <td className="p-4">Layered experience</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="p-4">Comfort focused</td>
                    <td className="p-4">Performance + environment</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="p-4">One-time purchase</td>
                    <td className="p-4">Expandable ecosystem</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>

          <Divider />

          {/* AI */}
          <FadeIn>
            <h2 className="text-xl font-semibold text-white">Adaptive system</h2>
            <p className="mt-3">
              Lumora learns how you sleep and adjusts automatically.
            </p>
            <p className="mt-3">
              Over time, it improves timing, temperature, and routines without effort.
            </p>
          </FadeIn>

          <Divider />

          {/* FINAL */}
          <FadeIn>
            <p className="text-white text-lg font-medium">
              We did not set out to build a better sleep mask.
            </p>
            <p className="text-white text-lg font-medium">
              We set out to build a better way to sleep.
            </p>
          </FadeIn>

        </div>
      </main>
    </div>
  )
}
