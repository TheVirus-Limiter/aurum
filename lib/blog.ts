import { posts as b1 } from "./blog-posts/batch1"
import { posts as b2 } from "./blog-posts/batch2"
import { posts as b3 } from "./blog-posts/batch3"
import { posts as b4 } from "./blog-posts/batch4"
import { posts as b5 } from "./blog-posts/batch5"
import { posts as b6 } from "./blog-posts/batch6"
import { posts as b7 } from "./blog-posts/batch7"
import { posts as b8 } from "./blog-posts/batch8"

export type BlogPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  metaDescription: string
  tags: string[]
  content: string
  date: string
  readingMinutes: number
}

type RawPost = Omit<BlogPost, "date" | "readingMinutes">

const raw = [...b1, ...b2, ...b3, ...b4, ...b5, ...b6, ...b7, ...b8] as unknown as RawPost[]

// keep slugs unique just in case two batches collided
const seen = new Set<string>()
const unique = raw.filter((p) => {
  if (seen.has(p.slug)) return false
  seen.add(p.slug)
  return true
})

function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(3, Math.round(words / 220))
}

// Deterministic publish dates, most recent first, spread two days apart.
const BASE = Date.UTC(2026, 5, 18)
const DAY = 86_400_000

export const blogPosts: BlogPost[] = unique.map((p, i) => ({
  ...p,
  readingMinutes: readingMinutes(p.content),
  date: new Date(BASE - i * 2 * DAY).toISOString().slice(0, 10),
}))

export function getAllPosts() {
  return blogPosts
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug)
}

export const blogCategories = Array.from(new Set(blogPosts.map((p) => p.category)))

export function postsByCategory(category: string) {
  return blogPosts.filter((p) => p.category === category)
}

export function getRelated(slug: string, n = 3) {
  const post = getPostBySlug(slug)
  if (!post) return []
  const sameCat = blogPosts.filter((p) => p.slug !== slug && p.category === post.category)
  if (sameCat.length >= n) return sameCat.slice(0, n)
  const others = blogPosts.filter((p) => p.slug !== slug && p.category !== post.category)
  return [...sameCat, ...others].slice(0, n)
}
