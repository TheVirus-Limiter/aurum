import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog"

const BASE = "https://uselumora.co"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = "2026-06-24"

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/waitlist/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/explore/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/team/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ]

  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}/`,
    lastModified: p.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticPages, ...posts]
}
