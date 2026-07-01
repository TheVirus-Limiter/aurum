import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import PageHeader from "@/components/site/page-header"
import SiteFooter from "@/components/site/site-footer"
import { Reveal } from "@/components/site/reveal"
import {
  categoryList,
  categoryIntros,
  getCategoryBySlug,
  postsByCategory,
  slugifyCategory,
  type BlogPost,
} from "@/lib/blog"

export function generateStaticParams() {
  return categoryList.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const name = getCategoryBySlug(params.category)
  if (!name) return {}
  const intro = categoryIntros[name] || `Articles on ${name.toLowerCase()} from Lumora Sleep.`
  return {
    title: `${name} Articles`,
    description: intro.slice(0, 158),
    alternates: { canonical: `/blog/category/${params.category}` },
    openGraph: {
      url: `https://uselumora.co/blog/category/${params.category}`,
      title: `${name} Articles from Lumora Sleep`,
      description: intro.slice(0, 158),
      images: [
        { url: `/og/og-cat-${params.category}.png`, width: 1200, height: 630, alt: `${name} articles from Lumora Sleep` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} Articles from Lumora Sleep`,
      description: intro.slice(0, 158),
      images: [`/og/og-cat-${params.category}.png`],
    },
  }
}

function fmtDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-base-2 p-7 transition-colors duration-500 hover:border-iris/30"
    >
      <span className="text-[0.7rem] uppercase tracking-[0.18em] text-iris">{post.category}</span>
      <h3 className="font-display mt-3 text-xl font-light leading-snug text-ink group-hover:text-iris-soft">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{post.excerpt}</p>
      <div className="mt-5 flex items-center justify-between text-xs text-faint">
        <span>{fmtDate(post.date)}</span>
        <span>{post.readingMinutes} min read</span>
      </div>
    </a>
  )
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const name = getCategoryBySlug(params.category)
  if (!name) notFound()
  const posts = postsByCategory(name)
  const intro = categoryIntros[name] || `Articles on ${name.toLowerCase()} from Lumora Sleep.`
  const others = categoryList.filter((c) => c.slug !== params.category)

  return (
    <main className="relative">
      <PageHeader active="blog" />

      {/* hero */}
      <section className="relative overflow-hidden px-5 pt-32 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-[16%] h-[30rem] w-[30rem] max-w-[80vw] rounded-full blur-3xl anim-breathe"
          style={{ background: "radial-gradient(circle, rgba(139,124,255,0.13), transparent 62%)" }}
        />
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              The Journal
            </a>
            <p className="eyebrow mb-4 mt-8">Topic</p>
            <h1 className="font-display text-[clamp(2.6rem,7vw,5rem)] font-light leading-[0.97] tracking-[-0.02em] text-ink">
              {name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{intro}</p>
            <p className="mt-4 text-sm text-faint">{posts.length} articles</p>
          </Reveal>
        </div>
      </section>

      {/* posts */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* other topics */}
      <section className="border-t border-ink/10 bg-base-2 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-6">More topics</p>
          <div className="flex flex-wrap gap-3">
            {others.map((c) => (
              <a
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className="rounded-full border border-ink/10 bg-base px-4 py-2 text-sm text-mist transition-colors hover:border-iris/30 hover:text-ink"
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="relative overflow-hidden border-t border-ink/10 px-5 py-24 text-center sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-[90vw] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(139,124,255,0.12), transparent 62%)" }}
        />
        <Reveal className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight text-ink">
            Reading helps. The mask helps more.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-mist">
            Lumora brings light, sound, and temperature into one ritual. Join the waitlist for first
            access and founding pricing.
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
