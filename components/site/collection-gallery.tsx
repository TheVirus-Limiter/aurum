"use client"

import { CheckCircle2 } from "lucide-react"
import { products, type Product } from "@/lib/site-content"
import { Icon } from "@/components/site/icon"
import { Reveal, Stagger, StaggerItem } from "@/components/site/reveal"
import ProductViewer from "@/components/site/product-viewer"

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border p-5 transition-colors duration-500 ${
        product.flagship
          ? "border-iris/30 bg-base-2 glow-iris"
          : "border-ink/10 bg-base-2 hover:border-ink/25"
      }`}
    >
      <div className="plate relative aspect-[4/3] w-full rounded-2xl">
        {product.flagship && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-iris px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0a0913]">
            Flagship
          </span>
        )}
        {product.model ? (
          <ProductViewer url={product.model} fallback={product.image} alt={product.name} />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            draggable={false}
          />
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-faint">
          <Icon name={product.icon} className="h-3.5 w-3.5 text-iris" />
          {product.tag}
        </span>
        <span className="font-display text-lg text-ink">{product.price}</span>
      </div>

      <h3 className="font-display mt-3 text-2xl font-light text-ink">{product.name}</h3>
      <p className="mt-1 text-sm italic text-iris-soft/80">{product.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-mist">{product.description}</p>

      <ul className="mt-5 space-y-2.5 border-t border-ink/10 pt-5">
        {product.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-mist">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-iris/70" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CollectionGallery() {
  return (
    <section id="collection" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-4">The lineup</p>
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-light leading-[1.02] tracking-tight text-ink">
            One mask.
            <br />
            <span className="italic text-iris-soft">Three ways to own the night.</span>
          </h2>
          <p className="mt-5 text-mist">
            Start with Essence. Step up to Max for the full expression. Add Caelum when you want to
            tune temperature even further. Each is complete on its own.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid items-stretch gap-6 md:grid-cols-3">
          {products.map((p) => (
            <StaggerItem key={p.key} className="h-full">
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
