import type { Metadata } from "next"
import { ArrowRight, Check, Minus } from "lucide-react"
import PageHeader from "@/components/site/page-header"
import SiteFooter from "@/components/site/site-footer"
import { Reveal, Stagger, StaggerItem } from "@/components/site/reveal"
import { Icon } from "@/components/site/icon"
import { StatusBadge } from "@/components/site/status-badge"
import { products, pillars, architecture, SITE } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "The Mask",
  description:
    "Lumora is a sleep mask in development, designed to wake you during lighter sleep within a window you choose. What is built, what is next, and planned launch pricing.",
  alternates: { canonical: "/explore" },
  openGraph: {
    url: "https://uselumora.co/explore",
    title: "Lumora, a sleep mask in development",
    description: "What is built today, what I am testing next, and what is still planned.",
    images: [{ url: "/og/og-explore.png", width: 1200, height: 630, alt: "The Lumora sleep mask" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumora, a sleep mask in development",
    description: "What is built today, what I am testing next, and what is still planned.",
    images: ["/og/og-explore.png"],
  },
}

const product = products[0]

const productLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  image: `https://uselumora.co${product.image}`,
  description: product.description,
  brand: { "@type": "Brand", name: "Lumora Sleep" },
  category: "Smart sleep mask",
}

/** What a typical tracker does versus what Lumora is being designed to do. */
const matrix: { feature: string; tracker: string; lumora: string }[] = [
  { feature: "Measures movement and temperature", tracker: "yes", lumora: "Built" },
  { feature: "Morning sleep score", tracker: "yes", lumora: "no" },
  { feature: "Chooses when to wake you", tracker: "Some apps", lumora: "Next test" },
  { feature: "Wakes you with gradual light", tracker: "no", lumora: "Planned" },
  { feature: "Blocks light", tracker: "no", lumora: "Planned" },
]

function Cell({ value }: { value: string }) {
  if (value === "yes") return <Check className="mx-auto h-4 w-4 text-iris" />
  if (value === "no") return <Minus className="mx-auto h-4 w-4 text-faint" />
  if (value === "Built" || value === "Next test" || value === "Planned" || value === "Design")
    return <StatusBadge status={value} className="mx-auto" />
  return <span className="text-sm text-mist">{value}</span>
}

export default function ExplorePage() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <PageHeader active="explore" />

      {/* hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden px-5 pt-28 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-[20%] h-[36rem] w-[36rem] max-w-[80vw] rounded-full blur-3xl anim-breathe"
          style={{ background: "radial-gradient(circle, rgba(139,124,255,0.14), transparent 62%)" }}
        />
        <div className="mx-auto w-full max-w-7xl">
          <Reveal className="max-w-4xl">
            <p className="eyebrow mb-6">The product, in development</p>
            <h1 className="font-display text-[clamp(2.6rem,8vw,6rem)] font-light leading-[0.94] tracking-[-0.02em] text-ink">
              One mask.{" "}
              <span className="italic text-iris-soft">One job.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist">
              {product.description}
            </p>
            <p className="mt-6 text-sm text-mist">{SITE.nextMilestone}</p>
            <p className="mt-2 text-sm text-faint">{product.priceNote}</p>
          </Reveal>
        </div>
      </section>

      {/* how it works */}
      <section className="border-t border-ink/10 bg-base-2 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light tracking-tight text-ink">
              Built, next, and planned.
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <StaggerItem key={p.index} className="rounded-3xl border border-ink/10 bg-base p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-iris/20 bg-iris/10 text-iris">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-light text-ink">{p.title}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-1 text-sm italic text-iris-soft/80">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-mist">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* what is in it */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-4">The architecture, by design</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light tracking-tight text-ink">
              A simple mask. A smart pod.
            </h2>
            <p className="mt-5 text-mist">
              The design keeps the mask simple. All of the electronics live in a small removable pod,
              so the mask can be washed and the electronics upgraded later without replacing it.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
            {architecture.map((a) => (
              <StaggerItem key={a.title} className="rounded-3xl border border-ink/10 bg-base-2 p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-iris/20 bg-iris/10 text-iris">
                  <Icon name={a.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-6 text-2xl font-light text-ink">{a.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-mist">{a.body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-12">
            <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f.text} className="flex items-center justify-between gap-3 text-sm text-mist">
                  <span className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-iris/70" />
                    {f.text}
                  </span>
                  <StatusBadge status={f.status} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* comparison */}
      <section className="border-y border-ink/10 bg-base-2 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <p className="eyebrow mb-4">Compare</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-light tracking-tight text-ink">
              A tracker reports. Lumora is designed to act.
            </h2>
          </Reveal>
          <div className="mt-12 overflow-hidden rounded-3xl border border-ink/10">
            <div className="grid grid-cols-3 border-b border-ink/10 bg-base px-4 py-4 text-center text-[0.7rem] uppercase tracking-[0.16em] text-faint sm:px-6">
              <span className="text-left">Feature</span>
              <span>Sleep tracker</span>
              <span className="text-iris">Lumora today</span>
            </div>
            {matrix.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 items-center border-b border-ink/10 px-4 py-4 text-center last:border-b-0 sm:px-6"
              >
                <span className="text-left text-sm text-ink">{row.feature}</span>
                <Cell value={row.tracker} />
                <Cell value={row.lumora} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="relative overflow-hidden px-5 py-28 text-center sm:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[42rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(139,124,255,0.12), transparent 60%)" }}
        />
        <Reveal className="relative mx-auto max-w-3xl">
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-light leading-[1.02] tracking-tight text-ink">
            Follow the build.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-mist">
            Join the waitlist for launch updates. {SITE.pricingLabel} starts at{" "}
            {SITE.kickstarterPrice} on Kickstarter, with retail planned at {SITE.retailRange}.
          </p>
          <a
            href="/waitlist/"
            className="glow-iris group mt-9 inline-flex items-center gap-2 rounded-full bg-iris px-8 py-3.5 text-sm font-semibold text-[#0a0913] transition-colors duration-300 hover:bg-iris-soft"
          >
            Join the waitlist
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  )
}
