"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"
import { faqs } from "@/lib/site-content"
import { Reveal } from "@/components/site/reveal"

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="px-5 py-28 sm:px-8 sm:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow mb-4">Questions</p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.75rem)] font-light leading-tight tracking-tight text-ink">
            The details matter.
          </h2>
          <p className="mt-4 text-mist">
            If you want a direct answer, reach out any time. We usually reply within a day.
          </p>
        </Reveal>

        <div className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg text-ink sm:text-xl">{faq.question}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 text-iris transition-transform duration-500 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 leading-relaxed text-mist">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
