"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion"
import { essenceCallouts, products } from "@/lib/site-content"

const essence = products.find((p) => p.key === "essence")!

const EssenceScene = dynamic(() => import("@/components/three/scenes/essence-scene"), {
  ssr: false,
  loading: () => null,
})

export default function EssenceReveal() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(true)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // pause the canvas when this section is scrolled away
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "200px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const o0 = useTransform(scrollYProgress, [0, 0.05, 0.13, 0.2], [0, 1, 1, 0])
  const o1 = useTransform(scrollYProgress, [0.17, 0.24, 0.34, 0.42], [0, 1, 1, 0])
  const o2 = useTransform(scrollYProgress, [0.38, 0.46, 0.56, 0.64], [0, 1, 1, 0])
  const o3 = useTransform(scrollYProgress, [0.6, 0.68, 0.76, 0.84], [0, 1, 1, 0])
  const o4 = useTransform(scrollYProgress, [0.8, 0.88, 1, 1], [0, 1, 1, 1])
  const opacities = [o0, o1, o2, o3, o4]

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.18 ? 0 : v < 0.42 ? 1 : v < 0.64 ? 2 : v < 0.84 ? 3 : 4)
  })

  if (reduce) {
    return (
      <section id="essence" className="relative px-5 py-28 sm:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <img
            src={essence.image}
            alt={essence.name}
            className="w-full rounded-2xl"
            style={{ filter: "drop-shadow(0 30px 80px rgba(139,124,255,0.3))" }}
          />
          <div>
            <p className="eyebrow mb-4">The all in one mask</p>
            <h2 className="font-display text-4xl font-light text-ink sm:text-5xl">{essence.name}</h2>
            <p className="mt-4 text-mist">{essence.description}</p>
            <ul className="mt-8 space-y-5">
              {essenceCallouts.slice(1).map((c) => (
                <li key={c.label}>
                  <p className="font-display text-xl italic text-iris-soft">{c.label}</p>
                  <p className="text-sm text-mist">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="essence" ref={ref} className="relative h-[700vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <EssenceScene progress={scrollYProgress} frameloop={inView ? "always" : "never"} />

        {/* scrims keep the captions readable over the bright model */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-base via-base/80 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-base via-base/85 to-transparent"
        />

        <div className="pointer-events-none absolute left-1/2 top-[6%] -translate-x-1/2 text-center">
          <p className="eyebrow">The all in one mask</p>
          <h2 className="font-display mt-2 text-[clamp(2rem,6vw,4.25rem)] font-light leading-none tracking-tight text-ink">
            Lumora Essence
          </h2>
        </div>

        {/* cross-fading tour captions, real text for SEO */}
        <div className="pointer-events-none absolute bottom-28 left-0 right-0 mx-auto h-24 max-w-xl px-6 text-center">
          {essenceCallouts.map((c, i) => (
            <motion.div key={c.label} style={{ opacity: opacities[i] }} className="absolute inset-x-0">
              <p className="font-display text-2xl font-normal italic text-iris-soft sm:text-3xl">{c.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist sm:text-[1.05rem]">{c.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <span className="font-display text-xs text-mist">
            {String(active + 1).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {essenceCallouts.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  active === i ? "w-6 bg-iris" : "w-1.5 bg-ink/25"
                }`}
              />
            ))}
          </div>
          <span className="font-display text-xs text-faint">
            {String(essenceCallouts.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  )
}
