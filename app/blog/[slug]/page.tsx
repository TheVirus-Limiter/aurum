import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { marked } from "marked"
import PageHeader from "@/components/site/page-header"
import SiteFooter from "@/components/site/site-footer"
import { getAllPosts, getPostBySlug, getRelated } from "@/lib/blog"

marked.use({ gfm: true })

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
      images: ["/images/products/lumorahero.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
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

  const html = marked.parse(post.content) as string
  const related = getRelated(post.slug, 3)

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
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            The Journal
          </a>
          <p className="eyebrow mt-8">{post.category}</p>
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
              <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">
                Built for the deepest sleep of your life.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-mist">
                Lumora is a luxury sleep mask that brings light, sound, and temperature into one
                ritual. Founding members get first access and pricing we will not offer again.
              </p>
              <a
                href="/waitlist"
                className="glow-iris mt-6 inline-flex items-center gap-2 rounded-full bg-iris px-7 py-3 text-sm font-semibold text-[#0a0913] transition-colors hover:bg-iris-soft"
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
              </a>
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
                  href={`/blog/${r.slug}`}
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
