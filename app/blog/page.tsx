import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import PageHeader from "@/components/site/page-header"
import SiteFooter from "@/components/site/site-footer"
import { Reveal } from "@/components/site/reveal"
import {
  blogPosts,
  blogCategories,
  categoryList,
  postsByCategory,
  slugifyCategory,
  type BlogPost,
} from "@/lib/blog"

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Notes on better rest from Lumora Sleep. Sleep science, sleep masks, light, sound, temperature, recovery, and the habits behind deep, consistent sleep.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "https://uselumora.co/blog",
    title: "The Lumora Journal",
    description: "Practical, well-researched writing on sleep, recovery, and rest.",
    images: [{ url: "/og/og-blog.png", width: 1200, height: 630, alt: "The Lumora Journal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lumora Journal",
    description: "Practical, well-researched writing on sleep, recovery, and rest.",
    images: ["/og/og-blog.png"],
  },
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

export default function BlogIndex() {
  const featured = blogPosts.slice(0, 3)

  return (
    <main className="relative">
      <PageHeader active="blog" />

      {/* hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-[12%] h-[34rem] w-[34rem] max-w-[80vw] rounded-full blur-3xl anim-breathe"
          style={{ background: "radial-gradient(circle, rgba(139,124,255,0.14), transparent 62%)" }}
        />
        <div className="mx-auto w-full max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-6">The Journal</p>
            <h1 className="font-display text-[clamp(2.8rem,8vw,6rem)] font-light leading-[0.95] tracking-[-0.02em] text-ink">
              Notes on <span className="italic text-iris-soft">better rest.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-mist">
              Practical, carefully researched writing on sleep science, sleep masks, light, sound,
              temperature, and the habits behind deep and consistent rest.
            </p>
          </Reveal>

          {/* explore by topic */}
          <Reveal delay={0.08} className="mt-10 flex flex-wrap gap-2.5">
            {categoryList.map((c) => (
              <a
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className="rounded-full border border-ink/12 bg-base-2 px-4 py-2 text-sm text-mist transition-colors hover:border-iris/30 hover:text-ink"
              >
                {c.name}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* featured */}
      <section className="bg-base-2 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-8">Latest</p>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* by category */}
      {blogCategories.map((category, i) => (
        <section
          key={category}
          className={`px-5 py-16 sm:px-8 ${
            i % 2 === 1 ? "border-y border-ink/10 bg-base-2" : ""
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-light tracking-tight text-ink">
                {category}
              </h2>
              <a
                href={`/blog/category/${slugifyCategory(category)}`}
                className="link-quiet shrink-0 text-sm text-mist hover:text-ink"
              >
                View all
              </a>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {postsByCategory(category).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* cta */}
      <section className="relative overflow-hidden border-t border-ink/10 px-5 py-24 text-center sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-[90vw] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(139,124,255,0.12), transparent 62%)" }}
        />
        <Reveal className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight text-ink">
            Better reading is one thing. Better nights are another.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-mist">
            Lumora brings light, sound, and temperature into a single mask. Join the waitlist for
            first access and founding pricing.
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
