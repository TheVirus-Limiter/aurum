import { Instagram, Linkedin, Mail } from "lucide-react"
import { SITE } from "@/lib/site-content"

export default function SiteFooter() {
  const year = 2026

  return (
    <footer className="relative border-t border-ink/10 bg-base">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-16 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
              An all in one luxury sleep mask. Light, sound, and temperature, in a single ritual.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3 text-sm text-mist">
              <li>
                <a href="/#system" className="link-quiet hover:text-ink">
                  The system
                </a>
              </li>
              <li>
                <a href="/explore" className="link-quiet hover:text-ink">
                  The lineup
                </a>
              </li>
              <li>
                <a href="/blog" className="link-quiet hover:text-ink">
                  The journal
                </a>
              </li>
              <li>
                <a href="/waitlist" className="link-quiet hover:text-ink">
                  Join the waitlist
                </a>
              </li>
              <li>
                <a href="/team" className="link-quiet hover:text-ink">
                  Our team
                </a>
              </li>
              <li>
                <a href="/#faq" className="link-quiet hover:text-ink">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-4 text-sm text-mist">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex items-center gap-3 hover:text-ink"
                >
                  <Mail className="h-4 w-4 text-faint transition-colors group-hover:text-iris" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 hover:text-ink"
                >
                  <Instagram className="h-4 w-4 text-faint transition-colors group-hover:text-iris" />
                  {SITE.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 hover:text-ink"
                >
                  <Linkedin className="h-4 w-4 text-faint transition-colors group-hover:text-iris" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 hairline" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-faint sm:flex-row">
          <p>© {year} Lumora Sleep. All rights reserved.</p>
          <p className="tracking-wide">Designed for the deepest sleep of your life.</p>
        </div>

        <p className="mt-5 text-center text-[0.7rem] text-faint/80 sm:text-left">
          Building with AI agents? Lumora ships an{" "}
          <a href="/.well-known/mcp-server-card.json" className="link-quiet hover:text-mist">
            MCP server
          </a>
          {", "}
          <a href="/llms.txt" className="link-quiet hover:text-mist">
            llms.txt
          </a>
          {", and "}
          <a href="/AGENTS.md" className="link-quiet hover:text-mist">
            AGENTS.md
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
