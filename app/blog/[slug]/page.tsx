import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { marked } from "marked"
import PageHeader from "@/components/site/page-header"
import SiteFooter from "@/components/site/site-footer"
import { getAllPosts, getPostBySlug, getRelated, slugifyCategory } from "@/lib/blog"

marked.use({ gfm: true })

const CATEGORY_PITCH: Record<string, { headline: string; body: string }> = {
  "Sleep Masks": {
    headline: "A sleep mask that acts.",
    body: "Most masks just block light. Lumora reads your night and wakes you at a lighter moment, with a gradual sunrise built in. Get on the list for launch access.",
  },
  "Light and Circadian Rhythm": {
    headline: "Wake with light, not shock.",
    body: "Instead of firing at a fixed time, Lumora looks for a lighter moment inside your window and brings you up with a gradual sunrise. Get on the list for launch access.",
  },
  Temperature: {
    headline: "Cooler, without the fight.",
    body: "A passive cooling insert helps the mask resist the overheating that fragments sleep, while the sensor follows how your night is actually going. Get on the list for launch access.",
  },
  "Sound and the Mind": {
    headline: "Quiet the night, then end it well.",
    body: "Lumora blocks the light, and when morning comes it wakes you at a lighter moment instead of yanking you out of deep sleep. Get on the list for launch access.",
  },
  "Sleep and Performance": {
    headline: "The morning is the whole point.",
    body: "Waking from the wrong moment can leave fog that follows you for hours. Lumora is built to find a better one. Get on the list for launch access.",
  },
  "Sleep Science": {
    headline: "Built around how sleep works.",
    body: "Your alarm ignores where you are in your sleep. Lumora reads movement and temperature to find a lighter moment to wake you. Get on the list for launch access.",
  },
  "Routines and Habits": {
    headline: "One habit that does the work.",
    body: "Put it on, set a window, and let the mask handle the rest of the night. Get on the list for launch access.",
  },
  "Travel and Special Situations": {
    headline: "Your rest, anywhere.",
    body: "A blackout mask that works in any room, and wakes you at a lighter moment instead of a fixed one. Get on the list for launch access.",
  },
}

const DEFAULT_PITCH = {
  headline: "Everything else tracks your sleep.",
  body: "Lumora changes it. A sleep mask that learns your night and wakes you at the right moment, not the same moment. Get on the list for launch access.",
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const url = `https://uselumora.co/blog/${post.slug}`
  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.date,
      images: [{ url: `/og/${post.slug}.png`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [`/og/${post.slug}.png`],
    },
  }
}

function fmtDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  // Normalize internal links from authored markdown to the trailing-slash form
  // the site is served at (trailingSlash: true), so no link routes through a 301.
  const html = (marked.parse(post.content) as string).replace(
    /(href=")(\/(?:explore|waitlist|blog|team)(?:\/[a-z0-9-]+)*)\/?(#[^"]*)?"/gi,
    (_m, pre, path, hash) => `${pre}${path}/${hash ?? ""}"`,
  )
  const related = getRelated(post.slug, 3)
  const pitch = CATEGORY_PITCH[post.category] ?? DEFAULT_PITCH

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    image: "https://uselumora.co/images/products/lumorahero.png",
    articleSection: post.category,
    keywords: post.tags.join(", "),
    author: { "@type": "Organization", name: "Lumora Sleep", url: "https://uselumora.co" },
    publisher: {
      "@type": "Organization",
      name: "Lumora Sleep",
      logo: { "@type": "ImageObject", url: "https://uselumora.co/images/lumora-logo.png" },
    },
    mainEntityOfPage: `https://uselumora.co/blog/${post.slug}`,
  }

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader active="blog" />

      <article className="px-5 pt-32 sm:px-8">
        {/* header */}
        <div className="mx-auto max-w-3xl">
          <a
            href="/blog/"
            className="inline-flex w-fit items-center gap-2 text-sm text-mist transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            The Journal
          </a>
          <a
            href={`/blog/category/${slugifyCategory(post.category)}/`}
            className="eyebrow mt-9 block w-fit transition-colors hover:text-ink"
          >
            {post.category}
          </a>
          <h1 className="font-display mt-4 text-[clamp(2.2rem,5.5vw,3.75rem)] font-light leading-[1.05] tracking-tight text-ink">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-faint">
            <span>{fmtDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-faint" />
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="hairline" />
        </div>

        {/* body */}
        <div
          className="prose-lumora mx-auto mt-12 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* tags */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/10 bg-base-2 px-3 py-1 text-xs text-mist"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* inline CTA */}
        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-iris/25 bg-base-2 p-8 text-center sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-48 w-[28rem] max-w-full -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "radial-gradient(ellipse, rgba(139,124,255,0.16), transparent 60%)" }}
            />
            <div className="relative">
              <p className="eyebrow mb-3">From Lumora</p>
              <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">{pitch.headline}</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-mist">{pitch.body}</p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/waitlist/"
                  className="glow-iris inline-flex items-center gap-2 rounded-full bg-iris px-7 py-3 text-sm font-semibold text-[#0a0913] transition-colors hover:bg-iris-soft"
                >
                  Join the waitlist
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/explore/"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3 text-sm font-medium text-ink transition-all hover:border-ink/40 hover:bg-ink/5"
                >
                  See the mask
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-ink/10 bg-base-2 px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow mb-8">Keep reading</p>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/blog/${r.slug}/`}
                  className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-base p-7 transition-colors duration-500 hover:border-iris/30"
                >
                  <span className="text-[0.7rem] uppercase tracking-[0.18em] text-iris">{r.category}</span>
                  <h3 className="font-display mt-3 text-lg font-light leading-snug text-ink group-hover:text-iris-soft">
                    {r.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{r.excerpt}</p>
                  <span className="mt-5 text-xs text-faint">{r.readingMinutes} min read</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  )
}
