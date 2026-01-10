"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  Thermometer,
  Volume2,
  Sun,
  Leaf,
  Plane,
  Crown,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Mail,
  Instagram,
} from "lucide-react"

type ProductKey = "core" | "natural" | "travel" | "max"

type QuizAnswer = {
  questionId: string
  answer: string
  score: { [key: string]: number }
}

type QuizState = {
  currentStep: number
  answers: QuizAnswer[]
  showResults: boolean
  recommendedProduct: ProductKey | null
}

// Simple Product Image with Discover Link
const InteractiveMaskDiagram = () => {
  return (
    <div className="relative w-full max-w-md mx-auto text-center">
      <div className="relative">
        <img
          src="/images/sleep-mask-2.png"
          alt="Lumora Sleep Mask Detail"
          className="w-full h-auto object-contain"
          style={{ filter: "drop-shadow(0 18px 55px rgba(15, 23, 42, 0.55))" }}
        />
      </div>

      <div className="mt-5">
        <a
          href="/explore"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm tracking-wide transition-colors duration-300"
        >
          View the interactive demo
          <ArrowRight className="w-4 h-4 opacity-80" />
        </a>
      </div>
    </div>
  )
}

const faqData = [
  {
    question: "When will Lumora Sleep masks be available?",
    answer:
      "We’re in the final stages of development and testing. Join the waitlist to be first in line at launch. We expect to begin shipping in Q2 2026.",
  },
  {
    question: "How do I contact customer support?",
    answer: "Email us at hello@uselumora.co. We typically respond within 24 hours on business days.",
  },
  {
    question: "What's the current status of your startup?",
    answer:
      "We’re currently raising pre-seed funding to bring Lumora Sleep to market. If you’re an investor interested in the future of rest, reach out at funding@uselumora.co.",
  },
  {
    question: "What's included with each Lumora Sleep mask?",
    answer:
      "Each mask includes the sleep mask, adjustable strap, USB-C charging cable, premium carrying case, and a detailed user guide. Higher-tier models include additional accessories like aromatherapy inserts or travel cases.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "Battery life varies by model: Essence (N/A - no electronics), Pure (3–5 nights), Voyage (7–10 nights), and Max (5–7 nights with all features active). All models charge fully in under 2 hours.",
  },
  {
    question: "Is there a warranty or return policy?",
    answer:
      "Yes. We offer a 30-day satisfaction guarantee and a 1-year warranty on electronic components. If you’re not satisfied, return your mask for a full refund.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "We currently ship to the US, Canada, UK, and EU. International rates and delivery times vary by location. More regions coming soon.",
  },
  {
    question: "How is this different from regular sleep masks?",
    answer:
      "Lumora Sleep combines premium materials with smart technology. Adaptive temperature control, bone-conduction audio, and a sunrise wake light create a complete sleep ritual—not just a light blocker.",
  },
]

const quizQuestions = [
  {
    id: "sleep-priority",
    question: "What most often disrupts your sleep?",
    options: [
      { text: "I run warm at night", value: "temperature", score: { travel: 1, natural: 2, core: 2, max: 3 } },
      { text: "Noise pulls me out of rest", value: "noise", score: { travel: 3, natural: 1, core: 1, max: 3 } },
      { text: "I wake up feeling heavy and groggy", value: "wakeup", score: { travel: 1, natural: 2, core: 1, max: 3 } },
      { text: "Light is the problem (streetlights, screens, early sun)", value: "light", score: { travel: 2, natural: 2, core: 3, max: 2 } },
    ],
  },
  {
    id: "lifestyle",
    question: "Which best fits your lifestyle?",
    options: [
      { text: "I travel often", value: "traveler", score: { travel: 4, natural: 1, core: 2, max: 2 } },
      { text: "Wellness-minded and eco-conscious", value: "wellness", score: { travel: 1, natural: 4, core: 1, max: 2 } },
      { text: "I like smart tools and optimization", value: "tech", score: { travel: 2, natural: 1, core: 1, max: 4 } },
      { text: "Simple, practical, and consistent", value: "simple", score: { travel: 2, natural: 2, core: 4, max: 1 } },
    ],
  },
  {
    id: "budget",
    question: "Where do you want to land on investment?",
    options: [
      { text: "Under $100 — essential quality", value: "budget", score: { travel: 1, natural: 1, core: 4, max: 0 } },
      { text: "$100–150 — strong value", value: "mid", score: { travel: 3, natural: 3, core: 2, max: 1 } },
      { text: "$150–200 — premium comfort", value: "premium", score: { travel: 2, natural: 2, core: 1, max: 2 } },
      { text: "$200+ — best-in-class experience", value: "luxury", score: { travel: 1, natural: 1, core: 0, max: 4 } },
    ],
  },
  {
    id: "features",
    question: "What feature feels most “worth it” to you?",
    options: [
      { text: "Travel-ready design", value: "portable", score: { travel: 4, natural: 1, core: 2, max: 2 } },
      { text: "Organic, natural materials", value: "organic", score: { travel: 1, natural: 4, core: 2, max: 2 } },
      { text: "A smarter wake-up routine", value: "smart", score: { travel: 2, natural: 1, core: 1, max: 4 } },
      { text: "Simple and effective design", value: "simple", score: { travel: 2, natural: 2, core: 4, max: 1 } },
    ],
  },
]

const products = {
  core: {
    name: "Lumora Essence",
    tagline: "Better Sleep for Everyone",
    price: "$89",
    icon: Zap,
    description:
      "A refined essential: premium light-blocking, soft materials, and a fit designed for comfort night after night.",
    features: ["Premium light-blocking", "Soft, breathable materials", "Adjustable strap", "Essential comfort"],
  },
  natural: {
    name: "Lumora Pure",
    tagline: "Nature Meets Rest",
    price: "$129",
    icon: Leaf,
    description:
      "For the eco-conscious sleeper. Organic materials and aromatherapy support a calmer routine, without overcomplicating your night.",
    features: ["Organic cotton exterior", "Biodegradable packaging", "Aromatherapy infusion", "Eco-friendly design"],
  },
  travel: {
    name: "Lumora Voyage",
    tagline: "Rest, Anywhere",
    price: "$159",
    icon: Plane,
    description:
      "Built for movement. Compact, quieting, and designed to keep your routine consistent across time zones and environments.",
    features: ["Ultra-compact design", "Noise-dampening technology", "Portable charging case", "Travel-optimized"],
  },
  max: {
    name: "Lumora Max",
    tagline: "Luxury Without Limits",
    price: "$299",
    icon: Crown,
    description:
      "Our most advanced experience: smart temperature control, bone-conduction audio, and a gentle sunrise wake light—fine-tuned to you.",
    features: ["Smart temperature control", "Bone-conduction audio", "Sunrise wake light", "App connectivity"],
  },
} as const

export default function AurumSleep() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showNavbar, setShowNavbar] = useState(false)

  const aurumGradient =
    "bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(148,163,184,0.14),transparent_55%),radial-gradient(900px_600px_at_85%_20%,rgba(245,158,11,0.10),transparent_55%),linear-gradient(180deg,rgba(15,23,42,1),rgba(2,6,23,1))]"
  const sageGradientText =
    "bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent"

  useEffect(() => {
    const handleScroll = () => {
      const redefineSection = document.querySelector("h1")
      if (!redefineSection) return
      const rect = redefineSection.getBoundingClientRect()
      setShowNavbar(rect.bottom < 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Tally embed loader (avoid <script> tag in JSX)
  useEffect(() => {
    const src = "https://tally.so/widgets/embed.js"

    const load = () => {
      // @ts-ignore
      if (typeof (window as any)?.Tally !== "undefined") {
        // @ts-ignore
        ;(window as any).Tally.loadEmbeds()
        return
      }
      document
        .querySelectorAll('iframe[data-tally-src]:not([src])')
        .forEach((el) => ((el as HTMLIFrameElement).src = (el as HTMLIFrameElement).dataset.tallySrc || ""))
    }

    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
    if (existing) {
      load()
      return
    }

    const s = document.createElement("script")
    s.src = src
    s.async = true
    s.onload = load
    s.onerror = load
    document.body.appendChild(s)
  }, [])

  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 0,
    answers: [],
    showResults: false,
    recommendedProduct: null,
  })

  const toggleFAQ = (index: number) => setOpenFAQ(openFAQ === index ? null : index)

  const handleQuizAnswer = (questionId: string, answer: string, score: { [key: string]: number }) => {
    const newAnswers = [...quizState.answers.filter((a) => a.questionId !== questionId), { questionId, answer, score }]

    if (quizState.currentStep < quizQuestions.length - 1) {
      setQuizState({ ...quizState, answers: newAnswers, currentStep: quizState.currentStep + 1 })
      return
    }

    const scores = { core: 0, natural: 0, travel: 0, max: 0 }
    newAnswers.forEach((a) => {
      Object.entries(a.score).forEach(([product, points]) => {
        scores[product as keyof typeof scores] += points
      })
    })

    const recommendedProduct = Object.entries(scores).reduce((a, b) =>
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b,
    )[0] as ProductKey

    setQuizState({ ...quizState, answers: newAnswers, showResults: true, recommendedProduct })
  }

  const resetQuiz = () =>
    setQuizState({ currentStep: 0, answers: [], showResults: false, recommendedProduct: null })

  const goToPreviousStep = () => {
    if (quizState.currentStep > 0) setQuizState({ ...quizState, currentStep: quizState.currentStep - 1 })
  }

  const recommended = useMemo(() => {
    if (!quizState.recommendedProduct) return null
    return products[quizState.recommendedProduct]
  }, [quizState.recommendedProduct])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden font-sans">
      {/* Top nav */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-slate-800/50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } bg-slate-950/70`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-24 sm:h-28 w-auto" />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#products"
                className="text-slate-300 hover:text-white transition-colors font-light tracking-wide"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Products
              </a>
              <a
                href="#customize"
                className="text-slate-300 hover:text-white transition-colors font-light tracking-wide"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("customize")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Discover Lumora
              </a>
              <a
                href="#faq"
                className="text-slate-300 hover:text-white transition-colors font-light tracking-wide"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                FAQ
              </a>

              <Button
                size="sm"
                className="rounded-full bg-transparent border border-slate-400/80 text-slate-200 hover:bg-slate-100 hover:text-slate-950 px-6 py-2 text-sm font-medium transition-all duration-300"
                onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join Waitlist
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className={`relative min-h-screen flex items-center justify-center pt-20 ${aurumGradient}`}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light [background-image:url('/images/noise.png')] [background-size:300px_300px]" />

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-light mb-6 leading-[0.95]">
              <span className={`${sageGradientText} font-semibold`}>Redefine</span> Rest.
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              Luxury sleep, reimagined through comfort, technology, and ritual.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="rounded-full bg-slate-100 text-slate-950 hover:bg-white px-8 sm:px-12 py-4 text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto"
                onClick={() => document.getElementById("customize")?.scrollIntoView({ behavior: "smooth" })}
              >
                Discover Lumora
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="rounded-full text-slate-200 hover:text-white hover:bg-slate-800/50 px-6 sm:px-8 py-4 text-base sm:text-lg font-light transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto border border-slate-700/60"
                onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join the Waitlist
              </Button>
            </div>

            <div className="mt-10 text-slate-400 text-sm font-light">A limited first release.</div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-80">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* Why */}
      <section className="py-16 sm:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-12 sm:mb-16 ${sageGradientText}`}>
            Why We Can’t Sleep.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { title: "Overheating", icon: Thermometer, body: "Temperature spikes disrupt deep sleep cycles and limit recovery—leaving you restless." },
              { title: "Noise & Distraction", icon: Volume2, body: "Environmental noise and stress cues keep the mind alert when it should be powering down." },
              { title: "Harsh Alarms", icon: Sun, body: "Jolting wake-ups can trigger cortisol spikes and the kind of grogginess that lingers." },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 p-6 sm:p-8 border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:transform hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(148,163,184,0.12),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100/10 border border-slate-600/40 flex items-center justify-center mb-6">
                    <card.icon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-200" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">{card.title}</h3>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className={`py-16 sm:py-24 ${aurumGradient}`}>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="w-full h-64 sm:h-96 flex items-center justify-center">
                <InteractiveMaskDiagram />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-slate-300/90 text-xs tracking-[0.22em] uppercase mb-4">
                <span className="w-10 h-px bg-slate-500/70" />
                The Approach
              </div>

              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-8 ${sageGradientText}`}>
                The Ritual of Deep Rest.
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Thermometer className="w-6 h-6 sm:w-8 sm:h-8 text-slate-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-100">Adaptive Thermal Control</h3>
                    <p className="text-slate-300/90 font-light text-sm sm:text-base">
                      Actively regulates temperature to reduce overheating and maintain comfort.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 text-slate-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-100">Bone-Conduction Audio</h3>
                    <p className="text-slate-300/90 font-light text-sm sm:text-base">
                      Subtle soundscapes or meditations—without blocking your ear canal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-slate-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-100">Gentle Sunrise Wake Light</h3>
                    <p className="text-slate-300/90 font-light text-sm sm:text-base">
                      A gradual dawn effect that helps you wake without the shock.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="
                  relative rounded-full mt-8
                  bg-slate-100 text-slate-950
                  px-8 sm:px-12 py-4 text-base sm:text-lg font-medium
                  transition-all duration-300 ease-out
                  w-full sm:w-auto
                  hover:bg-white
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_35px_rgba(255,255,255,0.18)]
                  before:absolute before:inset-0 before:rounded-full
                  before:border before:border-slate-300/40
                  before:opacity-0 hover:before:opacity-100
                  before:transition-opacity
                  focus:outline-none focus:ring-2 focus:ring-slate-300/40
                "
                onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 bg-slate-900" id="products">
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl md:text-5xl font-semibold text-center mb-4 ${sageGradientText}`}>
            Choose Your Sleep Journey.
          </h2>
          <p className="text-slate-300/90 text-center max-w-3xl mx-auto mb-16 font-light">
            Four tiers, one philosophy: elevate the hours that shape your days.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Essence */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/60 to-slate-950/40 p-8 border border-slate-700/60 hover:border-slate-600/70 transition-all duration-500 hover:transform hover:scale-[1.02]">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-100/10 border border-slate-600/40 flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Lumora Essence</h3>
                <p className="text-sm text-slate-300/90 mb-4 font-medium italic">“Better Sleep for Everyone.”</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Entry-level comfort with light-blocking and soft materials. Essential functions for quality rest.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-700/60">
                  <span className="text-slate-400 text-xs font-medium tracking-wide">STARTING AT</span>
                  <div className="text-white text-lg font-semibold">$89</div>
                </div>
              </div>
            </div>

            {/* Pure */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-950/30 to-slate-950/40 p-8 border border-emerald-800/40 hover:border-emerald-600/50 transition-all duration-500 hover:transform hover:scale-[1.02]">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-700/40 flex items-center justify-center mb-6">
                  <Leaf className="w-7 h-7 text-emerald-200" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Lumora Pure</h3>
                <p className="text-sm text-emerald-200/90 mb-4 font-medium italic">“Nature Meets Rest.”</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Organic fabrics, biodegradable packaging, and aromatherapy infusion for eco-conscious rest.
                </p>
                <div className="mt-6 pt-4 border-t border-emerald-800/40">
                  <span className="text-slate-400 text-xs font-medium tracking-wide">STARTING AT</span>
                  <div className="text-white text-lg font-semibold">$129</div>
                </div>
              </div>
            </div>

            {/* Voyage */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/30 to-slate-950/40 p-8 border border-indigo-800/40 hover:border-indigo-600/50 transition-all duration-500 hover:transform hover:scale-[1.02]">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-700/40 flex items-center justify-center mb-6">
                  <Plane className="w-7 h-7 text-indigo-200" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Lumora Voyage</h3>
                <p className="text-sm text-indigo-200/90 mb-4 font-medium italic">“Rest, Anywhere.”</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Compact foldable design with noise-dampening and portable charging case for travelers.
                </p>
                <div className="mt-6 pt-4 border-t border-indigo-800/40">
                  <span className="text-slate-400 text-xs font-medium tracking-wide">STARTING AT</span>
                  <div className="text-white text-lg font-semibold">$159</div>
                </div>
              </div>
            </div>

            {/* Max */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 p-8 border border-amber-400/40 hover:border-amber-300/60 transition-all duration-500 hover:transform hover:scale-[1.02] ring-1 ring-amber-300/20">
              <div className="absolute top-4 right-4">
                <span className="bg-amber-200 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                  PREMIUM
                </span>
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-amber-200/20 border border-amber-300/30 flex items-center justify-center mb-6">
                  <Crown className="w-7 h-7 text-amber-100" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Lumora Max</h3>
                <p className="text-sm text-amber-200/90 mb-4 font-medium italic">“Luxury Without Limits”</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Premium silk exterior with customizable hardware and app-based personalization.
                </p>
                <div className="mt-6 pt-4 border-t border-amber-400/30">
                  <span className="text-slate-400 text-xs font-medium tracking-wide">STARTING AT</span>
                  <div className="text-white text-lg font-semibold">$299</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden" id="customize">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(148,163,184,0.10)_0%,transparent_55%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 mb-4 text-slate-300/90 text-xs tracking-[0.22em] uppercase">
              <span className="w-10 h-px bg-slate-500/70" />
              Personal recommendation
              <span className="w-10 h-px bg-slate-500/70" />
            </div>

            <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${sageGradientText}`}>Discover Your Lumora</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
              A quick quiz to help match you with the Lumora mask that fits your rest and your routine.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {!quizState.showResults ? (
              <div className="bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/60">
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>
                      Question {quizState.currentStep + 1} of {quizQuestions.length}
                    </span>
                    <span>{Math.round(((quizState.currentStep + 1) / quizQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-slate-200 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((quizState.currentStep + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {quizQuestions[quizState.currentStep].question}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[quizState.currentStep].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(quizQuestions[quizState.currentStep].id, option.value, option.score)}
                        className="w-full text-left p-4 rounded-2xl bg-slate-900/40 border border-slate-700/60 hover:border-slate-600 hover:bg-slate-900/55 transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-200 group-hover:text-white">{option.text}</span>
                          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {quizState.currentStep > 0 && (
                  <div className="flex justify-start">
                    <Button
                      variant="ghost"
                      onClick={goToPreviousStep}
                      className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-full"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/60">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-slate-100/10 border border-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-slate-200" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Your match is ready.</h3>
                  <p className="text-slate-300 font-light">Based on your answers, we recommend:</p>
                </div>

                {recommended && quizState.recommendedProduct && (
                  <div className="bg-slate-900/40 rounded-2xl p-8 border border-slate-700/60 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center border bg-slate-100/10 border-slate-700/50">
                        {React.createElement(recommended.icon, { className: "w-8 h-8 text-slate-200" })}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">{recommended.name}</h4>
                        <p className="text-slate-300 italic font-light">{recommended.tagline}</p>
                        <p className="text-slate-400 font-semibold">{recommended.price}</p>
                      </div>
                    </div>

                    <p className="text-slate-300 mb-6 font-light">{recommended.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {recommended.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                          <span className="text-slate-300 text-sm font-light">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        className="rounded-full bg-slate-100 text-slate-950 hover:bg-white px-8 py-3 font-medium flex-1"
                        onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Join Waitlist for {recommended.name}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={resetQuiz}
                        className="rounded-full text-slate-300 hover:text-white hover:bg-slate-800/40 border border-slate-700/60"
                      >
                        Retake Quiz
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-900" id="faq">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-semibold mb-6 ${sageGradientText}`}>Frequently Asked Questions</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
              Everything you need to know about Lumora Sleep. If you want a direct answer, reach out anytime.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-slate-950/30 backdrop-blur-sm rounded-2xl border border-slate-700/60 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-slate-950/50 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? <Minus className="w-5 h-5 text-slate-400" /> : <Plus className="w-5 h-5 text-slate-400" />}
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-slate-300 leading-relaxed font-light">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 bg-slate-950/30 rounded-3xl p-8 border border-slate-700/60">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">Still have questions?</h3>
                <p className="text-slate-300 font-light">We’ll point you to the right option or help you decide.</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-100/10 border border-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-slate-200" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">Email Us</h4>
                  <p className="text-slate-300 text-sm font-light">hello@uselumora.co</p>
                  <p className="text-slate-400 text-xs mt-1 font-light">Response within 24 hours</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-100/10 border border-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Instagram className="w-6 h-6 text-slate-200" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">Follow Us</h4>
                  <a
                    href="https://www.instagram.com/lumorasleep?igsh=MWpwcHQxYXE5Z2hnYg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 text-sm hover:text-white transition-colors block font-light"
                  >
                    @lumorasleep
                  </a>
                  <p className="text-slate-400 text-xs mt-1 font-light">Product updates and behind-the-scenes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-16 sm:py-24 ${aurumGradient}`} id="waitlist-form">
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-4 text-slate-50">
            The Future of Sleep Starts Here.
          </h2>
          <p className="text-slate-300/90 max-w-2xl mx-auto mb-10 font-light">
            Join the waitlist to get launch timing, early access, and product updates as we finalize the first run.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-950/25 backdrop-blur-sm rounded-3xl p-4 sm:p-8 border border-slate-700/60">
              <iframe
                data-tally-src="https://tally.so/embed/mO6OrM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="529"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Lumora Interest Form"
                className="w-full rounded-2xl"
                style={{ maxWidth: "640px", margin: "0 auto", display: "block" }}
              />
              <div className="mt-6 text-slate-400 text-xs font-light">
                By joining, you’ll receive updates from Lumora Sleep. You can unsubscribe at any time.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="opacity-90">
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-24 sm:h-28 w-auto" />
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 text-slate-400 justify-center text-sm">
              <a href="#" className="hover:text-slate-200 transition-colors font-light tracking-wide">
                About
              </a>
              <a href="#faq" className="hover:text-slate-200 transition-colors font-light tracking-wide">
                FAQ
              </a>
              <a
                href="#waitlist-form"
                className="hover:text-slate-200 transition-colors font-light tracking-wide"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Contact
              </a>
              <a href="/team" className="hover:text-slate-200 transition-colors font-light tracking-wide">
                Our Team
              </a>
              <a
                href="https://www.instagram.com/lumorasleep?igsh=MWpwcHQxYXE5Z2hnYg=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-200 transition-colors font-light tracking-wide"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-slate-500 text-xs font-light">
            © {new Date().getFullYear()} Lumora Sleep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
