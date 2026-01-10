"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown, Mail, Instagram as InstagramIcon } from "lucide-react"

type TeamMember = {
  name: string
  role: string
  bio: string
  image: string
  accent: "slate" | "amber"
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

/** Cursor-follow spotlight (noticeable but still premium). */
function SpotlightBackground({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set defaults so it looks good even before first move.
    el.style.setProperty("--sx", "50%")
    el.style.setProperty("--sy", "25%")

    if (!enabled) return

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      el.style.setProperty("--sx", `${x}%`)
      el.style.setProperty("--sy", `${y}%`)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [enabled])

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10">
      {/* Base ambient (matches home) */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(148,163,184,0.14),transparent_55%),radial-gradient(900px_600px_at_85%_20%,rgba(245,158,11,0.10),transparent_55%),linear-gradient(180deg,rgba(15,23,42,1),rgba(2,6,23,1))]" />

      {/* Cursor spotlight — boosted so it’s visible, still tasteful */}
      <div
        className="absolute inset-0 opacity-[0.18] transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(720px 460px at var(--sx, 50%) var(--sy, 25%), rgba(255,255,255,0.26), transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Secondary warm bloom to give “luxury” depth */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          background:
            "radial-gradient(820px 520px at calc(var(--sx, 50%) + 10%) calc(var(--sy, 25%) + 12%), rgba(245,158,11,0.18), transparent 65%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Noise texture (matches home) */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-soft-light [background-image:url('/images/noise.png')] [background-size:300px_300px]" />
    </div>
  )
}

function TeamCard({ member }: { member: TeamMember }) {
  const accent =
    member.accent === "amber"
      ? {
          ring: "ring-amber-300/20 border-amber-400/30 hover:border-amber-300/55",
          badge: "text-amber-200/90 border-amber-300/20 bg-amber-200/10",
          glow: "from-amber-200/14 via-transparent to-transparent",
        }
      : {
          ring: "ring-slate-300/15 border-slate-700/60 hover:border-slate-600/70",
          badge: "text-slate-200/80 border-slate-300/15 bg-slate-100/10",
          glow: "from-slate-200/14 via-transparent to-transparent",
        }

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/50 to-slate-950/35 p-8 sm:p-9 border transition-all duration-500 hover:transform hover:scale-[1.01] ${accent.ring} ring-1`}
    >
      {/* Hover sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(148,163,184,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_40%)]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            {/* Outer specular ring */}
            <div className="pointer-events-none absolute -inset-1 rounded-full bg-[conic-gradient(from_180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.05),rgba(255,255,255,0.18))] blur-[0.5px] opacity-70 group-hover:opacity-100 transition-opacity" />
            {/* Inner ring */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-1 ring-white/15 bg-slate-100/5">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
            </div>
          </div>

          {/* Name / role */}
          <div className="min-w-0">
            <div
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] tracking-[0.22em] uppercase ${accent.badge}`}
            >
              Founder
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-white truncate">{member.name}</h3>
            <p className="mt-1 text-slate-300/80 font-light">{member.role}</p>
          </div>
        </div>

        <p className="mt-6 text-slate-300/90 leading-relaxed font-light">{member.bio}</p>

        <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400/80 font-light">
          <span className="tracking-wide">San Antonio, TX</span>
          <span className="tracking-wide">Founding Team</span>
        </div>
      </div>

      {/* Corner glow accent */}
      <div
        className={`pointer-events-none absolute -top-24 -right-24 h-64 w-64 bg-gradient-to-b ${accent.glow} blur-2xl opacity-70`}
      />
    </div>
  )
}

export default function TeamPage() {
  const reducedMotion = usePrefersReducedMotion()

  const aurumGradient =
    "bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(148,163,184,0.14),transparent_55%),radial-gradient(900px_600px_at_85%_20%,rgba(245,158,11,0.10),transparent_55%),linear-gradient(180deg,rgba(15,23,42,1),rgba(2,6,23,1))]"
  const sageGradientText =
    "bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent"

  const teamMembers: TeamMember[] = useMemo(
    () => [
      {
        name: "Rehan Raj",
        role: "Chief Executive Officer",
        bio: "Junior at Lutheran High School focused on innovation and entrepreneurship. Active in varsity robotics and varsity soccer, and currently leading a $50,000 Leukemia & Lymphoma Society campaign to support families impacted by blood cancer.",
        image: "/images/rehan-raj.png",
        accent: "slate",
      },
      {
        name: "Ben Storandt",
        role: "Chief Operations Officer",
        bio: "Senior at Lutheran High School with a product and technology mindset. Competes in varsity robotics and varsity soccer, and is raising $50,000 with the Leukemia & Lymphoma Society to advance blood cancer research and strengthen patient support.",
        image: "/images/ben-storandt.png",
        accent: "slate",
      },
    ],
    []
  )

return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <SpotlightBackground enabled={!reducedMotion} />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-800/50 bg-slate-950/70">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-slate-300 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Home
          </a>
          <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-20 w-auto" />
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[72vh] flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center">
          {/* LOGO LOCKUP */}
          <div className="flex flex-col items-center mb-10">
            <img
              src="/images/lumora-logo.png"
              alt="Lumora Sleep"
              className="h-16 sm:h-20 md:h-24 w-auto opacity-95"
            />
            <div className="mt-4 text-[11px] tracking-[0.28em] uppercase text-slate-300/70">
              Lumora Sleep
            </div>
            <div className="mt-5 h-px w-28 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light mb-6">
            Built with <span className={`${sageGradientText} font-semibold`}>discipline</span>.
          </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Lumora is shaped by iteration, craft, and service. We build like engineers and care like humans.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="rounded-full bg-slate-100 text-slate-950 hover:bg-white px-8 sm:px-12 py-4 text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto"
                onClick={() => document.getElementById("team-grid")?.scrollIntoView({ behavior: "smooth" })}
              >
                Meet the founders
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="rounded-full text-slate-200 hover:text-white hover:bg-slate-800/50 px-6 sm:px-8 py-4 text-base sm:text-lg font-light transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto border border-slate-700/60"
                onClick={() => document.getElementById("team-cta")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join the waitlist
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-80">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 sm:py-24 bg-slate-900" id="team-grid">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 ${sageGradientText}`}>
            The Founding Team
          </h2>
          <p className="text-slate-300/90 text-center max-w-3xl mx-auto mb-12 font-light">
            Two builders. One standard: make rest feel effortless.
          </p>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {teamMembers.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>

          {/* Contact strip */}
          <div className="mt-12 max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-950/30 backdrop-blur-sm p-8 sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(148,163,184,0.10)_0%,transparent_55%)]" />

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white">We obsess over the details you’ll never see.</h3>
                <p className="mt-3 text-slate-300/90 font-light leading-relaxed max-w-3xl">
                  Fit, pressure distribution, materials, and the quiet feeling of refinement. If it does not feel premium at 2 a.m.,
                  it does not ship.
                </p>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                <div className="mt-7 grid sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100/10 border border-slate-700/50 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-slate-200" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Email</div>
                      <a
                        href="mailto:hello@uselumora.co"
                        className="text-slate-300/80 font-light text-sm hover:text-white transition-colors"
                      >
                        hello@uselumora.co
                      </a>
                    </div>
                  </div>

                  {/* Instagram (entire row is clickable) */}
                  <a
                    href="https://www.instagram.com/lumorasleep?igsh=MWpwcHQxYXE5Z2hnYg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                    aria-label="Open Lumora Sleep on Instagram"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100/10 border border-slate-700/50 flex items-center justify-center group-hover:bg-slate-100/15 group-hover:border-slate-600/70 transition-colors">
                      <InstagramIcon className="w-6 h-6 text-slate-200 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Instagram</div>
                      <div className="text-slate-300/80 font-light text-sm group-hover:text-white transition-colors">
                        @lumorasleep
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 sm:py-24 ${aurumGradient}`} id="team-cta">
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-4 text-slate-50">Join the first release.</h2>
          <p className="text-slate-300/90 max-w-2xl mx-auto mb-10 font-light">
            Get launch timing, early access, and behind-the-scenes updates as we finalize the first run.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="rounded-full bg-slate-100 text-slate-950 hover:bg-white px-8 sm:px-12 py-4 text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto"
              onClick={() => (window.location.href = "/#waitlist-form")}
            >
              Join Waitlist
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="rounded-full text-slate-200 hover:text-white hover:bg-slate-800/50 px-6 sm:px-8 py-4 text-base sm:text-lg font-light transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto border border-slate-700/60"
              onClick={() => (window.location.href = "/explore")}
            >
              View the interactive demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="opacity-90">
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-24 sm:h-28 w-auto" />
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 text-slate-400 justify-center text-sm">
              <a href="/" className="hover:text-slate-200 transition-colors font-light tracking-wide">
                Home
              </a>
              <a href="/#faq" className="hover:text-slate-200 transition-colors font-light tracking-wide">
                FAQ
              </a>
              <a href="/team" className="hover:text-slate-200 transition-colors font-light tracking-wide">
                Our Team
              </a>
              <a
                href="https://www.instagram.com/lumorasleep?igsh=MWpwcHQxYXE5Z2hnYg=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-200 transition-colors font-light tracking-wide"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-slate-500 text-xs font-light">
            © {new Date().getFullYear()} Lumora Sleep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
