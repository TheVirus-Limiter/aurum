"use client"

import { Reveal } from "@/components/site/reveal"
import WaitlistForm from "@/components/site/waitlist-form"
import CountUp from "@/components/site/count-up"
import { SITE } from "@/lib/site-content"

export default function Waitlist() {
  return (
    <section id="waitlist" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[40rem] max-w-[90vw] -translate-x-1/2 rounded-full blur-3xl anim-breathe"
        style={{ background: "radial-gradient(ellipse, rgba(139,124,255,0.18), transparent 62%)" }}
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow mb-5">Early access</p>
          <h2 className="font-display text-balance text-[clamp(2.4rem,6vw,4.5rem)] font-light leading-[1.02] tracking-tight text-ink">
            The future of sleep
            <br />
            <span className="italic text-iris-soft">starts here.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-mist">
            Join the founding waitlist for first access and pricing we will never offer again.
            Founding members keep founding pricing for life.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-xl">
          <div className="rounded-3xl border border-ink/10 bg-base-2/60 p-6 backdrop-blur-sm sm:p-8">
            <WaitlistForm source="home-waitlist" />
          </div>
          <p className="mt-5 text-sm text-mist">
            Join{" "}
            <span className="font-medium text-ink">
              <CountUp value={SITE.waitlistCount} /> sleepers
            </span>{" "}
            already on the list.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
