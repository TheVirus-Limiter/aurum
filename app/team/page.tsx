"use client"

import React from "react"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Rehan Raj",
      role: "Co-Founder & CEO",
      bio: "Junior at Lutheran High School focused on innovation and entrepreneurship. Active in varsity robotics and varsity soccer, and currently leading a $50,000 Leukemia & Lymphoma Society fundraiser supporting families impacted by blood cancer.",
      image: "/images/rehan-raj.png",
    },
    {
      name: "Ben Storandt",
      role: "Co-Founder & COO",
      bio: "Senior at Lutheran High School with a strong product and technology mindset. Competes in varsity robotics and varsity soccer, and is fundraising $50,000 with the Leukemia & Lymphoma Society to advance blood cancer research and support patients.",
      image: "/images/ben-storandt.png",
    },
  ]

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100">
      {/* Subtle luxury background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_18%_55%,rgba(56,189,248,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_82%_55%,rgba(167,139,250,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0),rgba(2,6,23,0.85))]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070A12]/65 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-20 sm:h-24 w-auto" />
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a href="/#products" className="text-slate-200/70 hover:text-white transition-colors font-light">
                Products
              </a>
              <a href="/#customize" className="text-slate-200/70 hover:text-white transition-colors font-light">
                Discover Lumora
              </a>
              <a href="/#faq" className="text-slate-200/70 hover:text-white transition-colors font-light">
                FAQ
              </a>
              <a
                href="/#waitlist-form"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-medium text-slate-100/90 hover:bg-white/10 hover:border-white/30 transition"
              >
                Join Waitlist
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.26em] uppercase text-slate-200/70">
            About
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-semibold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
            Meet the Team
          </h1>

          <p className="mt-5 text-base md:text-lg text-slate-200/70 max-w-3xl mx-auto leading-relaxed">
            We’re building Lumora with the same discipline we’ve learned in robotics, athletics, and service.
            Thoughtful design, relentless iteration, and a mission bigger than ourselves.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/30"
              >
                {/* Card sheen */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(255,255,255,0.12),transparent_55%)]" />
                </div>

                <div className="relative p-8 md:p-10">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full blur-xl bg-white/10 opacity-60" />
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-1 ring-white/15 bg-white/5">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl md:text-2xl font-semibold text-white truncate">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm md:text-base text-slate-200/65">
                        {member.role}
                      </p>

                      <div className="mt-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] tracking-[0.18em] uppercase text-slate-200/65">
                        Lumora Sleep
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 text-sm md:text-base text-slate-200/75 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-18 md:py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 md:p-12 shadow-2xl shadow-black/30">
            <h2 className="text-3xl md:text-5xl font-semibold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Join Our Mission
            </h2>
            <p className="mt-5 text-base md:text-lg text-slate-200/70 max-w-2xl mx-auto leading-relaxed">
              Join the waitlist to be first in line when Lumora launches and to receive early updates as we refine the mask.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <a
                href="/#waitlist-form"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#070A12] px-10 py-3 text-base font-semibold hover:bg-slate-100 transition"
              >
                Join the Waitlist
              </a>
              <a
                href="/#products"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 py-3 text-base font-medium text-slate-100/90 hover:bg-white/10 hover:border-white/30 transition"
              >
                View Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#070A12]/70 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-16 w-auto opacity-80" />

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-slate-200/60">
              <a href="/" className="hover:text-slate-100 transition-colors font-light">
                Home
              </a>
              <a href="/#faq" className="hover:text-slate-100 transition-colors font-light">
                FAQ
              </a>
              <a href="mailto:hello@uselumora.co" className="hover:text-slate-100 transition-colors font-light">
                Contact
              </a>
              <a
                href="https://www.instagram.com/lumorasleep"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-100 transition-colors font-light"
              >
                Instagram
              </a>
              <a href="/team" className="hover:text-slate-100 transition-colors font-light">
                Our Team
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-slate-200/45 tracking-wide">
            © {new Date().getFullYear()} Lumora Sleep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
