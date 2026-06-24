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

export function slugifyCategory(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function getCategoryBySlug(slug: string) {
  return blogCategories.find((c) => slugifyCategory(c) === slug)
}

export const categoryList = blogCategories.map((name) => ({
  name,
  slug: slugifyCategory(name),
  count: postsByCategory(name).length,
}))

/** Short, search-friendly intros shown on each category landing page. */
export const categoryIntros: Record<string, string> = {
  "Sleep Science":
    "How sleep actually works, from cycles and stages to the chemistry that makes you tired. Clear explanations of the science behind a good night, and what it means for your rest.",
  "Sleep Masks":
    "Everything about sleep masks, from materials and fit to light blocking and the smart features that make rest deeper. Practical guides for choosing and using one well.",
  "Light and Circadian Rhythm":
    "How light sets your body clock, and how to use morning light, dim evenings, and a gentle wake light to fall asleep and wake up on your terms.",
  Temperature:
    "Why your body cools down to fall asleep, and how to hold a calm, stable climate through the night so overheating never fragments your rest.",
  "Sound and the Mind":
    "How sound shapes sleep without waking you, how to quiet a busy mind, and what to play when silence is not enough.",
  "Sleep and Performance":
    "Sleep is recovery. How rest drives focus, reaction time, mood, and athletic performance, and how to protect it when life gets busy.",
  "Routines and Habits":
    "The small, repeatable habits that build deep and consistent sleep, from wind down rituals and caffeine timing to a bedroom that signals rest.",
  "Travel and Special Situations":
    "How to sleep well away from home, through jet lag, long flights, hotels, shift work, and the nights that do not go to plan.",
}

export function getRelated(slug: string, n = 3) {
  const post = getPostBySlug(slug)
  if (!post) return []
  const sameCat = blogPosts.filter((p) => p.slug !== slug && p.category === post.category)
  if (sameCat.length >= n) return sameCat.slice(0, n)
  const others = blogPosts.filter((p) => p.slug !== slug && p.category !== post.category)
  return [...sameCat, ...others].slice(0, n)
}
