/* One-off generator: renders branded OG image PNGs into public/og/.
   - <slug>.png            one per blog post
   - og-home.png, og-explore.png, og-waitlist.png, og-blog.png   main pages
   - og-cat-<slug>.png     one per blog category hub
   - og-sevora.png         the SEVORA microsite (warm theme)
   Run with: npx tsx scripts/gen-og.ts */
import { readFileSync, writeFileSync, mkdirSync } from "fs"
import { join } from "path"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { blogPosts, categoryList, categoryIntros } from "../lib/blog"

const ROOT = process.cwd()
const OUT = join(ROOT, "public", "og")
mkdirSync(OUT, { recursive: true })

const inter400 = readFileSync(join(ROOT, "lib", "og-fonts", "inter-400.woff"))
const inter700 = readFileSync(join(ROOT, "lib", "og-fonts", "inter-700.woff"))

const FONTS = [
  { name: "Inter", data: inter400, weight: 400 as const, style: "normal" as const },
  { name: "Inter", data: inter700, weight: 700 as const, style: "normal" as const },
]

type El = { type: string; props: { style?: Record<string, unknown>; children?: unknown } }
const div = (style: Record<string, unknown>, children?: unknown): El => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
})

/* trim an intro to a clean length ending on a word boundary */
function clamp(text: string, max = 118) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + "..."
}

/* ---------- Lumora dark cards ---------- */

function card(title: string, category: string, minutes: number): El {
  return div(
    {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px",
      backgroundColor: "#08070c",
      backgroundImage:
        "radial-gradient(circle at 82% 4%, rgba(139,124,255,0.34), transparent 58%)",
      color: "#eceaf4",
      fontFamily: "Inter",
    },
    [
      div({ alignItems: "center" }, [
        div({ fontSize: 34, fontWeight: 700, letterSpacing: 8 }, "LUMORA"),
        div({ width: 1, height: 28, margin: "0 18px", backgroundColor: "rgba(236,234,244,0.3)" }),
        div({ fontSize: 23, fontWeight: 400, letterSpacing: 5, color: "#a99aff" }, "THE JOURNAL"),
      ]),
      div({ flexDirection: "column" }, [
        div(
          { fontSize: 25, fontWeight: 700, letterSpacing: 5, color: "#a99aff", marginBottom: 22 },
          category.toUpperCase(),
        ),
        div({ fontSize: 64, fontWeight: 700, lineHeight: 1.12, maxWidth: 1010 }, title),
      ]),
      div({ alignItems: "center", justifyContent: "space-between" }, [
        div({ fontSize: 26, fontWeight: 400, color: "#b8b3c7" }, "uselumora.co"),
        div({ fontSize: 26, fontWeight: 400, color: "#837e96" }, `${minutes} min read`),
      ]),
    ],
  )
}

function pageCard(opts: {
  eyebrow: string
  title: string
  subtitle: string
  footRight?: string
  titleSize?: number
}): El {
  return div(
    {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px",
      backgroundColor: "#08070c",
      backgroundImage:
        "radial-gradient(circle at 82% 4%, rgba(139,124,255,0.34), transparent 58%)",
      color: "#eceaf4",
      fontFamily: "Inter",
    },
    [
      div({ alignItems: "center" }, [
        div({ fontSize: 34, fontWeight: 700, letterSpacing: 8 }, "LUMORA"),
      ]),
      div({ flexDirection: "column" }, [
        div(
          { fontSize: 25, fontWeight: 700, letterSpacing: 5, color: "#a99aff", marginBottom: 22 },
          opts.eyebrow.toUpperCase(),
        ),
        div(
          { fontSize: opts.titleSize ?? 74, fontWeight: 700, lineHeight: 1.06, letterSpacing: -1, maxWidth: 1010 },
          opts.title,
        ),
        div(
          { fontSize: 30, fontWeight: 400, color: "#b8b3c7", marginTop: 26, lineHeight: 1.32, maxWidth: 940 },
          opts.subtitle,
        ),
      ]),
      div({ alignItems: "center", justifyContent: "space-between" }, [
        div({ fontSize: 26, fontWeight: 400, color: "#b8b3c7" }, "uselumora.co"),
        div({ fontSize: 26, fontWeight: 400, color: "#837e96" }, opts.footRight ?? ""),
      ]),
    ],
  )
}

/* ---------- SEVORA warm card ---------- */

function sevoraCard(): El {
  return div(
    {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px",
      backgroundColor: "#f7f3ec",
      backgroundImage:
        "radial-gradient(circle at 86% 2%, rgba(176,122,30,0.16), transparent 56%), radial-gradient(circle at 0% 100%, rgba(63,125,79,0.10), transparent 50%)",
      color: "#33241a",
      fontFamily: "Inter",
    },
    [
      div({ alignItems: "baseline" }, [
        div({ fontSize: 36, fontWeight: 700, letterSpacing: 3 }, "SEVORA"),
        div({ fontSize: 36, fontWeight: 700, color: "#b07a1e" }, "."),
      ]),
      div({ flexDirection: "column" }, [
        div(
          { fontSize: 25, fontWeight: 700, letterSpacing: 5, color: "#b07a1e", marginBottom: 22 },
          "PROTECT EVERY HARVEST",
        ),
        div({ fontSize: 88, fontWeight: 700, letterSpacing: -2, lineHeight: 1.02 }, [
          div({ marginRight: 24 }, "Know before it"),
          div({ color: "#9c3a16" }, "rots."),
        ]),
        div(
          { fontSize: 30, fontWeight: 400, color: "#6f5c47", marginTop: 26, lineHeight: 1.32, maxWidth: 940 },
          "A low cost, offline sensor that predicts grain spoilage days early and texts a warning to any basic phone.",
        ),
      ]),
      div({ alignItems: "center", justifyContent: "space-between" }, [
        div({ fontSize: 26, fontWeight: 400, color: "#6f5c47" }, "uselumora.co/sevora"),
        div({ fontSize: 26, fontWeight: 700, color: "#33241a" }, "$49 per probe"),
      ]),
    ],
  )
}

async function toPng(el: El): Promise<Buffer> {
  const svg = await satori(el as never, { width: 1200, height: 630, fonts: FONTS })
  return Buffer.from(new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng())
}

async function run() {
  let n = 0

  // blog articles
  for (const post of blogPosts) {
    writeFileSync(join(OUT, `${post.slug}.png`), await toPng(card(post.title, post.category, post.readingMinutes)))
    n++
  }

  // main pages
  const pages: { file: string; card: El }[] = [
    {
      file: "og-home.png",
      card: pageCard({
        eyebrow: "Lumora Sleep",
        title: "Redefine rest.",
        subtitle: "An all in one luxury sleep mask. Gentle light, immersive sound, and active temperature in a single wearable.",
        footRight: "Light · Sound · Temperature",
      }),
    },
    {
      file: "og-explore.png",
      card: pageCard({
        eyebrow: "The lineup",
        title: "Explore the lineup.",
        subtitle: "Lumora Essence, Max, and Caelum. One mask that brings light, sound, and temperature into a single ritual of rest.",
        footRight: "Essence · Max · Caelum",
      }),
    },
    {
      file: "og-waitlist.png",
      card: pageCard({
        eyebrow: "Founding waitlist",
        title: "Join the waitlist.",
        subtitle: "First access and founding pricing on the all in one smart sleep mask. Light, sound, and temperature in one wearable.",
        footRight: "First access",
      }),
    },
    {
      file: "og-blog.png",
      card: pageCard({
        eyebrow: "The Journal",
        title: "Notes on better rest.",
        subtitle: "Sleep science, sleep masks, light, sound, temperature, and the habits behind deep and consistent rest.",
        footRight: "The Journal",
      }),
    },
  ]
  for (const p of pages) {
    writeFileSync(join(OUT, p.file), await toPng(p.card))
    n++
  }

  // category hubs
  for (const c of categoryList) {
    const intro = categoryIntros[c.name] || `Writing on ${c.name.toLowerCase()} from Lumora Sleep.`
    writeFileSync(
      join(OUT, `og-cat-${c.slug}.png`),
      await toPng(
        pageCard({
          eyebrow: "The Journal",
          title: c.name,
          subtitle: clamp(intro),
          footRight: `${c.count} articles`,
          titleSize: c.name.length > 24 ? 58 : 68,
        }),
      ),
    )
    n++
  }

  // sevora microsite
  writeFileSync(join(OUT, "og-sevora.png"), await toPng(sevoraCard()))
  n++

  console.log(`generated ${n} OG images into public/og/`)
}

run()
