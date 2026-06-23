import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import SiteFooter from "@/components/site/site-footer"
import WaitlistForm from "@/components/site/waitlist-form"
import { Reveal, Stagger, StaggerItem } from "@/components/site/reveal"
import { Icon } from "@/components/site/icon"
import { whyJoin, faqs, SITE } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description:
    "Join the Lumora Sleep founding waitlist for first access and founding pricing on the all-in-one smart sleep mask. Light, sound, and temperature in one wearable.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    url: "https://uselumora.co/waitlist",
    title: "Join the Lumora Sleep Waitlist",
    description: "First access and founding pricing on the all-in-one smart sleep mask.",
  },
}

const waitlistFaqs = faqs.filter((f) =>
  ["When can I get one?", "What is Lumora?", "What is the difference between Essence and Max?"].includes(
    f.question,
  ),
)

export default function WaitlistPage() {
  return (
    <main className="relative">
      {/* slim, distraction-free header */}
      <header className="fixed inset-x-0 top-0 z-[90] border-b border-ink/10 bg-base/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-mist hover:text-ink">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Lumora</span>
          </a>
          <a href="/">
            <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-12 w-auto sm:h-14" />
          </a>
          <span className="w-24 text-right text-xs text-faint">By invitation</span>
        </div>
      </header>

      {/* hero with the form above the fold */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10%] top-[10%] h-[42rem] w-[42rem] max-w-[80vw] rounded-full blur-3xl anim-breathe"
          style={{ background: "radial-gradient(circle, rgba(139,124,255,0.16), transparent 62%)" }}
        />
        <img
          aria-hidden
          src={SITE.heroImage}
          alt=""
          className="pointer-events-none absolute right-[-4%] top-1/2 hidden w-[40vw] max-w-xl -translate-y-1/2 opacity-50 lg:block"
          style={{ filter: "drop-shadow(0 30px 90px rgba(139,124,255,0.4))" }}
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow mb-5">By invitation. For people who take rest seriously.</p>
              <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-ink">
                Rest was never meant to feel <span className="italic text-iris-soft">this good.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-mist">
                Lumora is a luxury sleep mask that brings light, sound, and temperature into one
                ritual. Join the founding waitlist for first access and pricing we will never offer
                again.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <WaitlistForm source="waitlist-hero" />
            </Reveal>

            <Reveal delay={0.16} className="mt-6">
              <p className="text-sm text-mist">
                Join{" "}
                <span className="font-medium text-ink">
                  {SITE.waitlistCount.toLocaleString()} sleepers
                </span>{" "}
                already on the list. The waitlist is free and your place is held the moment you join.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* why join */}
      <section className="border-t border-ink/10 bg-base-2 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-4">Why join now</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-light tracking-tight text-ink">
              Founders are treated like founders.
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2">
            {whyJoin.map((w) => (
              <StaggerItem
                key={w.title}
                className="flex gap-5 rounded-3xl border border-ink/10 bg-base p-7"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-iris/20 bg-iris/10 text-iris">
                  <Icon name={w.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-light text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{w.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* scarcity / founding member */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-iris/25 bg-base-2 p-9 text-center sm:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: "radial-gradient(ellipse, rgba(139,124,255,0.16), transparent 60%)" }}
              />
              <div className="relative">
                <p className="eyebrow mb-4">The founding circle</p>
                <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight text-ink">
                  Only the first 500 founders are named.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-mist">
                  Founding pricing, locked for life. First access before public launch. A direct line
                  to shape what Lumora becomes. Once the circle closes, it closes.
                </p>
                <div className="mx-auto mt-9 max-w-md">
                  <WaitlistForm compact source="waitlist-founding" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* faq-lite */}
      <section className="border-t border-ink/10 bg-base-2 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <p className="eyebrow mb-4">Before you join</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-light tracking-tight text-ink">
              The honest answers.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-4">
            {waitlistFaqs.map((f, i) => (
              <Reveal key={f.question} delay={i * 0.06}>
                <div className="rounded-2xl border border-ink/10 bg-base p-6">
                  <h3 className="font-display text-lg text-ink">{f.question}</h3>
                  <p className="mt-2 leading-relaxed text-mist">{f.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
