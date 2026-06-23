import { ArrowLeft } from "lucide-react"

/** Simple header for sub pages. Links resolve back to the home sections. */
export default function PageHeader({ active }: { active?: "team" | "explore" }) {
  const links = [
    { label: "The System", href: "/#system" },
    { label: "The Lineup", href: "/explore", key: "explore" as const },
    { label: "Our Team", href: "/team", key: "team" as const },
    { label: "Waitlist", href: "/waitlist" },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-[90] border-b border-ink/10 bg-base/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <div className="flex items-center gap-5">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </a>
          <span className="hidden h-5 w-px bg-ink/15 sm:block" />
          <a href="/" className="flex items-center">
            <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-14 w-auto sm:h-16" />
          </a>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`link-quiet text-[0.8rem] font-medium tracking-wide ${
                active && l.key === active ? "text-ink" : "text-mist hover:text-ink"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/#waitlist"
          className="rounded-full bg-ink px-5 py-2.5 text-[0.8rem] font-semibold text-[#0a0913] transition-colors duration-300 hover:bg-iris-soft"
        >
          Join the waitlist
        </a>
      </div>
    </header>
  )
}
