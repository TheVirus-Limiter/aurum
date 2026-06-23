"use client"

import dynamic from "next/dynamic"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import SiteHeader from "@/components/site/site-header"
import SiteFooter from "@/components/site/site-footer"
import Hero from "@/components/site/hero"
import EssenceReveal from "@/components/site/essence-reveal"
import CollectionGallery from "@/components/site/collection-gallery"
import Waitlist from "@/components/site/waitlist"
import Faq from "@/components/site/faq"
import StickyCta from "@/components/site/sticky-cta"
import { Reveal, Stagger, StaggerItem } from "@/components/site/reveal"

const ModelPreloader = dynamic(() => import("@/components/site/model-preloader"), { ssr: false })
import { Icon } from "@/components/site/icon"
import { problems, pillars, stats, founders, SITE } from "@/lib/site-content"

export default function Home() {
  return (
    <main className="relative">
      <ModelPreloader />
      <SiteHeader />
      <Hero />

      {/* marquee divider */}
      <div className="overflow-hidden border-y border-ink/10 py-5">
        <div className="anim-marquee flex w-max items-center gap-10 whitespace-nowrap text-sm uppercase tracking-[0.24em] text-faint">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex items-center gap-10">
              {["Light", "Sound", "Temperature", "Falling asleep", "Waking naturally"].map((w) => (
                <span key={w} className="flex items-center gap-10">
                  {w}
                  <span className="h-1 w-1 rounded-full bg-iris" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section id="problem" className="px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">Why sleep still feels broken</p>
            <h2 className="font-display text-balance text-[clamp(2.2rem,5.5vw,4rem)] font-light leading-[1.05] tracking-tight text-ink">
              Most products solve one slice of the night.
            </h2>
            <p className="mt-5 text-mist">
              Real rest is shaped by light, temperature, sound, and rhythm working together. We built
              Lumora around that fuller reality, not a single feature.
            </p>
          </Reveal>

          <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
            {problems.map((p) => (
              <StaggerItem
                key={p.title}
                className="group rounded-3xl border border-ink/10 bg-base-2 p-8 transition-colors duration-500 hover:border-ink/25"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-ink/10 bg-ink/[0.04] text-iris">
                  <Icon name={p.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-display mt-7 text-2xl font-light text-ink">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SYSTEM / PILLARS */}
      <section id="system" className="border-y border-ink/10 bg-base-2 px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">The Lumora system</p>
            <h2 className="font-display text-balance text-[clamp(2.4rem,6vw,4.5rem)] font-light leading-[1.02] tracking-tight text-ink">
              One mask.
              <br />
              <span className="italic text-iris-soft">Three systems of rest.</span>
            </h2>
            <p className="mt-5 text-mist">
              Light, sound, and temperature are built into a single wearable. Each works on its own.
              Together they feel like a complete ritual, from the moment you lie down to the moment
              you wake.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.index} delay={i * 0.08} className="bg-base-2">
                <div className="flex h-full flex-col p-9">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-light text-ink/25">{pillar.index}</span>
                    <Icon name={pillar.icon} className="h-6 w-6 text-iris" />
                  </div>
                  <h3 className="font-display mt-10 text-3xl font-light text-ink">{pillar.title}</h3>
                  <p className="mt-2 text-sm italic text-iris-soft/80">{pillar.tagline}</p>
                  <p className="mt-5 leading-relaxed text-mist">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE 3D REVEAL */}
      <EssenceReveal />

      {/* COLLECTION */}
      <CollectionGallery />

      {/* SIGNALS */}
      <section id="signals" className="border-y border-ink/10 bg-base-2 px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">Signals we could not ignore</p>
            <h2 className="font-display text-balance text-[clamp(2.2rem,5.5vw,4rem)] font-light leading-[1.05] tracking-tight text-ink">
              Sleep is not a niche issue. It is a daily performance problem.
            </h2>
            <p className="mt-5 text-mist">
              Before refining the product, we talked to people directly. Students, athletes, and
              professionals. The message was consistent.
            </p>
          </Reveal>

          <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="rounded-3xl border border-ink/10 bg-base p-9 text-center">
                <div className="font-display text-6xl font-light text-ink">{s.value}</div>
                <div className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-iris">{s.label}</div>
                <p className="mt-4 text-sm leading-relaxed text-mist">{s.detail}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-12 text-center">
            <a
              href={SITE.tractionStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-ink"
            >
              Read our customer discovery study
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* FOUNDERS TEASER */}
      <section className="px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="eyebrow mb-4">The people behind Lumora</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.75rem)] font-light leading-[1.05] tracking-tight text-ink">
              Built with discipline.
              <br />
              <span className="italic text-iris-soft">Cared for like craft.</span>
            </h2>
            <p className="mt-5 max-w-lg text-mist">
              We obsess over the details you will never see. Fit, pressure, materials, and the quiet
              feeling of refinement. If it does not feel premium at two in the morning, it does not
              ship.
            </p>
            <a
              href="/team"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:border-ink/40 hover:bg-ink/5"
            >
              Meet the founders
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-5">
              {founders.map((f) => (
                <a key={f.name} href="/team" className="group overflow-hidden rounded-3xl border border-ink/10 bg-base-2">
                  <div className="plate aspect-[4/5] w-full">
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-display text-lg text-ink">{f.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-faint">{f.role}</p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Faq />
      <Waitlist />
      <SiteFooter />
      <StickyCta />
    </main>
  )
}
