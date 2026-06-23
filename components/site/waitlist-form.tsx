"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Check, Loader2 } from "lucide-react"
import { SITE } from "@/lib/site-content"

const STORAGE_KEY = "lumora_waitlist_joined"

const PERSONAS = [
  { value: "", label: "What describes you (optional)" },
  { value: "deep-sleeper", label: "I chase deep, uninterrupted sleep" },
  { value: "traveler", label: "I travel and sleep in new places often" },
  { value: "performance", label: "I optimize recovery and focus" },
  { value: "gift", label: "I am looking for a premium gift" },
  { value: "curious", label: "Just curious about Lumora" },
]

type Status = "idle" | "loading" | "success" | "error"

export default function WaitlistForm({
  compact = false,
  source = "site",
}: {
  compact?: boolean
  source?: string
}) {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") setStatus("success")
    } catch {
      /* private mode */
    }
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    const form = e.currentTarget
    const data = new FormData(form)

    if (data.get("botcheck")) return // honeypot

    const email = String(data.get("email") || "").trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      setError("Please enter a valid email address.")
      return
    }

    setStatus("loading")
    const personaLabel =
      PERSONAS.find((p) => p.value === data.get("persona"))?.label || "Not specified"

    const { provider, formspreeEndpoint, web3formsKey, sheetsEndpoint } = SITE.waitlist
    // Resolve the active provider, falling back to Formspree so the form keeps
    // working before keys are configured.
    let active: "web3forms" | "sheets" | "formspree" = provider
    if (active === "web3forms" && !web3formsKey) active = "formspree"
    if (active === "sheets" && !sheetsEndpoint) active = "formspree"

    const config: { endpoint: string; body: Record<string, string> } =
      active === "web3forms"
        ? {
            endpoint: "https://api.web3forms.com/submit",
            body: {
              access_key: web3formsKey,
              subject: "New Lumora waitlist signup",
              from_name: "Lumora Waitlist",
              email,
              describes_you: personaLabel,
              source,
            },
          }
        : active === "sheets"
          ? {
              endpoint: sheetsEndpoint,
              body: { email, describes_you: personaLabel, source },
            }
          : {
              endpoint: formspreeEndpoint,
              body: { email, describes_you: personaLabel, source, _subject: "New Lumora waitlist signup" },
            }

    const markJoined = () => {
      try {
        localStorage.setItem(STORAGE_KEY, "true")
      } catch {
        /* ignore */
      }
      setStatus("success")
      form.reset()
    }

    try {
      if (active === "sheets") {
        // Google Apps Script: send a "simple" request (text/plain, no preflight)
        // and treat the opaque response as success. The write still happens.
        await fetch(config.endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(config.body),
        })
        markJoined()
        return
      }

      const res = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(config.body),
      })
      if (res.ok) {
        markJoined()
      } else {
        const json = await res.json().catch(() => ({}))
        setStatus("error")
        setError(json?.message || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setError("Network error. Please check your connection and try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-iris/25 bg-base-2/70 p-8 text-center backdrop-blur-sm">
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-iris/15 text-iris">
          <Check className="h-6 w-6" />
        </span>
        <p className="eyebrow mb-2">You are on the list</p>
        <h3 className="font-display text-2xl font-light text-ink">Welcome to the inner circle.</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm text-mist">
          Your founding place is reserved. Watch your inbox for first access and founding pricing.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full text-left">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className={compact ? "flex flex-col gap-3 sm:flex-row" : "flex flex-col gap-3"}>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          aria-label="Email address"
          disabled={status === "loading"}
          className="w-full rounded-xl border border-ink/15 bg-base-2/70 px-4 py-3.5 text-ink outline-none transition placeholder:text-faint focus:border-iris/60 focus:ring-2 focus:ring-iris/30 disabled:opacity-60"
        />

        {!compact && (
          <select
            name="persona"
            aria-label="What describes you"
            disabled={status === "loading"}
            defaultValue=""
            className="w-full rounded-xl border border-ink/15 bg-base-2/70 px-4 py-3.5 text-ink outline-none transition focus:border-iris/60 focus:ring-2 focus:ring-iris/30 disabled:opacity-60"
          >
            {PERSONAS.map((p) => (
              <option key={p.value} value={p.value} className="bg-base-2 text-ink">
                {p.label}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="glow-iris inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-iris px-6 py-3.5 font-semibold text-[#0a0913] transition-colors hover:bg-iris-soft disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Reserving
            </>
          ) : (
            "Reserve my place"
          )}
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-[#ff8da3]">
          {error}
        </p>
      )}

      <p className="mt-4 text-xs text-faint">
        No spam. No noise. Only what matters, only when it matters. Unsubscribe any time.
      </p>
    </form>
  )
}
