import type { Metadata } from "next"
import { ArrowRight, Mail, Instagram, Linkedin } from "lucide-react"
import PageHeader from "@/components/site/page-header"
import SiteFooter from "@/components/site/site-footer"
import { Reveal } from "@/components/site/reveal"
import { founders, SITE } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Our Team",
  description: "The founding team behind Lumora Sleep. Built with discipline, cared for like craft.",
}

export default function TeamPage() {
  return (
    <main className="relative">
      <PageHeader active="team" />

      {/* hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden px-5 pt-32 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-[14%] h-[34rem] w-[34rem] max-w-[80vw] rounded-full blur-3xl anim-breathe"
          style={{ background: "radial-gradient(circle, rgba(139,124,255,0.14), transparent 62%)" }}
        />
        <div className="mx-auto w-full max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-6">The founding team</p>
            <h1 className="font-display text-[clamp(2.8rem,8vw,6rem)] font-light leading-[0.95] tracking-[-0.02em] text-ink">
              Built with <span className="italic text-iris-soft">discipline.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist">
              Lumora is shaped by iteration, craft, and service. Two builders who care about the
              details you will never see. We build like engineers and care like humans.
            </p>
          </Reveal>
        </div>
      </section>

      {/* founders */}
      <section className="border-t border-ink/10 bg-base-2 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-4">Two builders. One standard.</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-light tracking-tight text-ink">
              Make rest feel effortless.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-base transition-colors duration-500 hover:border-iris/30">
                  <div className="plate relative aspect-[4/5] w-full sm:aspect-[5/4]">
                    <img
                      src={f.image}
                      alt={f.name}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-4 top-4 inline-flex rounded-full border border-iris/25 bg-base/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-iris backdrop-blur-sm">
                      Founder
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <h3 className="font-display text-3xl font-light text-ink">{f.name}</h3>
                    <p className="mt-1 text-sm text-iris-soft/80">{f.role}</p>
                    <p className="mt-5 flex-1 leading-relaxed text-mist">{f.bio}</p>
                    <div className="mt-7 hairline" />
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.16em] text-faint">San Antonio, TX</span>
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${f.name} on LinkedIn`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-mist transition-colors hover:text-iris"
                      >
                        <Linkedin className="h-4 w-4" />
                        Connect
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ethos + contact */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-base-2 p-9 sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(139,124,255,0.14), transparent 60%)" }}
              />
              <div className="relative">
                <p className="eyebrow mb-4">The standard</p>
                <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light leading-tight text-ink">
                  We obsess over the details you will never see.
                </h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-mist">
                  Fit, pressure distribution, materials, and the quiet feeling of refinement. If it
                  does not feel premium at two in the morning, it does not ship.
                </p>

                <div className="mt-9 hairline" />

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <a href={`mailto:${SITE.email}`} className="group flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-iris/20 bg-iris/10 text-iris">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-medium text-ink">Email</span>
                      <span className="text-sm text-mist group-hover:text-ink">{SITE.email}</span>
                    </span>
                  </a>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-iris/20 bg-iris/10 text-iris">
                      <Instagram className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-medium text-ink">Instagram</span>
                      <span className="text-sm text-mist group-hover:text-ink">{SITE.instagramHandle}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* cta */}
      <section className="relative overflow-hidden border-t border-ink/10 px-5 py-24 text-center sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-80 w-[36rem] max-w-[90vw] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(139,124,255,0.12), transparent 62%)" }}
        />
        <Reveal className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-light leading-[1.02] tracking-tight text-ink">
            Join the first release.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-mist">
            Get launch timing, early access, and behind the scenes updates as we finalize the first
            run.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/waitlist"
              className="glow-iris rounded-full bg-iris px-8 py-3.5 text-sm font-semibold text-[#0a0913] transition-colors duration-300 hover:bg-iris-soft"
            >
              Join the waitlist
            </a>
            <a
              href="/explore"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-8 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:border-ink/40 hover:bg-ink/5"
            >
              Explore the lineup
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  )
}
