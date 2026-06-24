/* One-off generator: renders a branded OG image PNG per blog post into
   public/og/<slug>.png. Run with: npx tsx scripts/gen-og.ts */
import { readFileSync, writeFileSync, mkdirSync } from "fs"
import { join } from "path"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { blogPosts } from "../lib/blog"

const ROOT = process.cwd()
const OUT = join(ROOT, "public", "og")
mkdirSync(OUT, { recursive: true })

const inter400 = readFileSync(join(ROOT, "lib", "og-fonts", "inter-400.woff"))
const inter700 = readFileSync(join(ROOT, "lib", "og-fonts", "inter-700.woff"))

type El = { type: string; props: { style?: Record<string, unknown>; children?: unknown } }
const div = (style: Record<string, unknown>, children?: unknown): El => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
})

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

async function run() {
  let n = 0
  for (const post of blogPosts) {
    const svg = await satori(card(post.title, post.category, post.readingMinutes) as never, {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: inter400, weight: 400, style: "normal" },
        { name: "Inter", data: inter700, weight: 700, style: "normal" },
      ],
    })
    const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng()
    writeFileSync(join(OUT, `${post.slug}.png`), png)
    n++
  }
  console.log(`generated ${n} OG images into public/og/`)
}

run()
