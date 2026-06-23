"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { RotateCw } from "lucide-react"
import { useFinePointer } from "@/lib/use-fine-pointer"

const ProductCanvas = dynamic(() => import("@/components/three/scenes/product-canvas"), {
  ssr: false,
  loading: () => null,
})

/**
 * Live, rotatable product preview for a card. Mounts the WebGL canvas only
 * while the card is near the viewport. Shows nothing but the card's violet
 * plate background until the model is ready, so the product photo never
 * flashes. The photo is used only as the reduced-motion fallback.
 */
export default function ProductViewer({
  url,
  fallback,
  alt,
  distance,
}: {
  url: string
  fallback: string
  alt: string
  distance?: number
}) {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "700px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (reduce) {
    return <img src={fallback} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
  }

  return (
    <div ref={ref} className="absolute inset-0">
      {inView && <ProductCanvas url={url} distance={distance} />}
      {inView && fine && (
        <span className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-base/60 px-2.5 py-1 text-[0.6rem] uppercase tracking-wider text-mist backdrop-blur-sm">
          <RotateCw className="h-3 w-3" />
          Drag
        </span>
      )}
    </div>
  )
}
