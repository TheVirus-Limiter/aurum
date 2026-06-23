"use client"

import { useEffect, useState } from "react"
import ProductViewer from "@/components/site/product-viewer"
import { SITE } from "@/lib/site-content"

const MODELS = ["/models/LumoraEssence.glb", "/models/LumoraMax.glb"]

/**
 * Randomly shows the Essence or Max model on each visit. The pick happens after
 * mount (client only), so there is no hydration mismatch and no model swap.
 */
export default function WaitlistModel() {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    setUrl(MODELS[Math.floor(Math.random() * MODELS.length)])
  }, [])

  if (!url) return null
  return <ProductViewer url={url} fallback={SITE.heroImage} alt="Lumora sleep mask" distance={6} />
}
