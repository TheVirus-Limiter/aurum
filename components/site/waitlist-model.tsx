"use client"

import { useEffect, useState } from "react"
import ProductViewer from "@/components/site/product-viewer"
import { SITE } from "@/lib/site-content"

const MODEL = "/models/LumoraEssence.glb"

/**
 * Shows the Lumora mask. Mounted client side only, so there is no hydration
 * mismatch and the heavy model never blocks first paint.
 */
export default function WaitlistModel() {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    setUrl(MODEL)
  }, [])

  if (!url) return null
  return <ProductViewer url={url} fallback={SITE.heroImage} alt="Lumora sleep mask" distance={6} />
}
