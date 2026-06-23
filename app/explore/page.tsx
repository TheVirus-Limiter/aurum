import type { Metadata } from "next"
import { ArrowRight, Check, Minus } from "lucide-react"
import PageHeader from "@/components/site/page-header"
import SiteFooter from "@/components/site/site-footer"
import { Reveal, Stagger, StaggerItem } from "@/components/site/reveal"
import { Icon } from "@/components/site/icon"
import { products, pillars } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Explore the Lineup",
  description:
    "Compare Lumora Essence ($89), Lumora Max ($249), and Lumora Caelum inserts ($24). One mask that brings light, sound, and temperature into a single ritual of rest.",
  alternates: { canonical: "/explore" },
  openGraph: {
    url: "https://uselumora.co/explore",
    title: "Explore the Lumora Lineup",
    description: "Light, sound, and temperature in one sleep mask.",
  },
}

const productLd = {
  "@context": "https://schema.org",
  "@graph": products.map((p) => ({
    "@type": "Product",
    name: p.name,
    image: `https://uselumora.co${p.image}`,
    description: p.description,
    brand: { "@type": "Brand", name: "Lumora Sleep" },
    category: p.key === "caelum" ? "Sleep mask accessory" : "Smart sleep mask",
    offers: {
      "@type": "Offer",
      url: "https://uselumora.co/waitlist",
      price: p.price.replace("$", ""),
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
    },
  })),
}

const matrix: { feature: string; essence: string; max: string; caelum: string }[] = [
  { feature: "Programmable light", essence: "yes", max: "Adaptive sunrise", caelum: "no" },
  { feature: "Immersive sound", essence: "yes", max: "High fidelity", caelum: "no" },
  { feature: "Active temperature", essence: "yes", max: "Dual zone", caelum: "Inserts" },
  { feature: "Adaptive sleep sensing", essence: "no", max: "yes", caelum: "no" },
  { feature: "Battery", essence: "Full night", max: "Multi night", caelum: "n/a" },
  { feature: "Price", essence: "$89", max: "$249", caelum: "$24" },
]

function Cell({ value }: { value: string }) {
  if (value === "yes") return <Check className="mx-auto h-4 w-4 text-iris" />
  if (value === "no") return <Minus className="mx-auto h-4 w-4 text-faint" />
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
            <p className="eyebrow mb-6">The lineup</p>
            <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-light leading-[0.92] tracking-[-0.02em] text-ink">
              One mask. <span className="italic text-iris-soft">Three systems.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist">
              Lumora brings light, sound, and temperature into a single wearable. No stack of
              gadgets, no apps competing for attention. Just one refined ritual of rest, in three
              tiers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* the three systems */}
      <section className="border-t border-ink/10 bg-base-2 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-4">The technology</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light tracking-tight text-ink">
              Built into the mask, not bolted on.
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <StaggerItem key={p.index} className="rounded-3xl border border-ink/10 bg-base p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-iris/20 bg-iris/10 text-iris">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-6 text-2xl font-light text-ink">{p.title}</h3>
                <p className="mt-1 text-sm italic text-iris-soft/80">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-mist">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* products */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-4">The products</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light tracking-tight text-ink">
              Three tiers, one standard.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {products.map((p, i) => (
              <Reveal
                key={p.key}
                delay={i * 0.08}
                className={`flex h-full flex-col overflow-hidden rounded-3xl border p-6 ${
                  p.flagship ? "border-iris/30 bg-base-2 glow-iris" : "border-ink/10 bg-base-2"
                }`}
              >
                <div className="plate relative aspect-[4/3] w-full rounded-2xl">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[0.7rem] uppercase tracking-[0.18em] text-faint">{p.tag}</span>
                  <span className="font-display text-xl text-ink">{p.price}</span>
                </div>
                <h3 className="font-display mt-2 text-2xl font-light text-ink">{p.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-mist">{p.description}</p>
                <ul className="mt-5 space-y-2 border-t border-ink/10 pt-5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-mist">
                      <Check className="h-4 w-4 shrink-0 text-iris/70" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* comparison */}
      <section className="border-y border-ink/10 bg-base-2 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <p className="eyebrow mb-4">Compare</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-light tracking-tight text-ink">
              Find your tier.
            </h2>
          </Reveal>
          <div className="mt-12 overflow-hidden rounded-3xl border border-ink/10">
            <div className="grid grid-cols-4 border-b border-ink/10 bg-base px-4 py-4 text-center text-[0.7rem] uppercase tracking-[0.16em] text-faint sm:px-6">
              <span className="text-left">Feature</span>
              <span>Essence</span>
              <span className="text-iris">Max</span>
              <span>Caelum</span>
            </div>
            {matrix.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 items-center border-b border-ink/10 px-4 py-4 text-center last:border-b-0 sm:px-6"
              >
                <span className="text-left text-sm text-ink">{row.feature}</span>
                <Cell value={row.essence} />
                <Cell value={row.max} />
                <Cell value={row.caelum} />
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
            Reserve your tier.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-mist">
            Lumora is pre launch. Join the waitlist for first access and founding pricing that we
            will not offer again.
          </p>
          <a
            href="/waitlist"
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
