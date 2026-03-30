"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  Thermometer,
  Volume2,
  Sun,
  Crown,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Mail,
  Instagram,
  MoonStar,
  Sparkles,
  ShieldCheck,
  Waves,
  Briefcase,
  Plane,
  Gem,
} from "lucide-react"

type ProductKey = "essence" | "caelum" | "sonus" | "aurora" | "voyage" | "max"

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

const faqData = [
  {
    question: "What is Lumora?",
    answer:
      "Lumora is a modular sleep system built around the real moments that shape rest: falling asleep, staying comfortable through the night, and waking naturally in the morning. Instead of asking people to rely on supplements, more screen time, or bulky bedside hardware alone, Lumora combines a premium sleep mask with optional ecosystem pieces designed to create a more complete ritual of rest.",
  },
  {
    question: "Why did Lumora pivot to a modular system?",
    answer:
      "As we studied how people actually sleep, we realized the best experience was not about packing heavy technology directly onto the face. We redesigned Lumora to be lighter, more intuitive, and more comfortable long term. The result is a system where each product works beautifully on its own, but together creates a more complete sleep experience.",
  },
  {
    question: "What makes the Lumora Essence mask different from a normal sleep mask?",
    answer:
      "Lumora Essence is designed as a premium blackout sleep mask with mulberry silk, structured comfort, reduced pressure on the eyes, and compatibility with the broader Lumora system. It is not just a light blocker. It is the foundation of a better sleep environment. It is also designed with subtle morning light permeability, allowing natural wake cues to register more gently over time instead of feeling completely disconnected from daylight rhythms.",
  },
  {
    question: "What does partial light leakage mean?",
    answer:
      "Lumora uses a refined version of full blackout. At night, the goal is deep darkness and comfort. In the morning, the design allows subtle natural light cues to begin registering more gently. This helps the system feel more aligned with circadian rhythms while still functioning as a true sleep mask. It is an intentional design choice, not a flaw.",
  },
  {
    question: "How does Lumora Caelum work?",
    answer:
      "Lumora Caelum is our premium PCM insert system. PCM stands for phase change material, which helps regulate temperature by absorbing and releasing heat as conditions change. In simple terms, it helps reduce overheating and keeps the mask environment more stable and comfortable across the night.",
  },
  {
    question: "Is the audio built into the mask?",
    answer:
      "No. That is intentional. Lumora Sonus is designed as a separate, low intrusion audio band so users can experience calming soundscapes without forcing heavy electronics directly onto the face. This keeps the mask lighter, more comfortable, and more adaptable.",
  },
  {
    question: "How does Lumora Aurora fit into the system if the mask blocks light?",
    answer:
      "Lumora Aurora is not meant to replace the mask. It completes the experience. Essence helps create darkness for sleep onset, while Aurora is designed to support a gentler wake up in the morning. Together, they help cover both ends of the sleep cycle.",
  },
  {
    question: "Who is Lumora for?",
    answer:
      "Our earliest traction came from high school and college students, athletes, and performance minded young adults who care about focus, recovery, and consistent energy. Over time, we see major opportunity with working professionals, travelers, corporate wellness programs, and performance-driven environments where better sleep has direct value.",
  },
]

const quizQuestions = [
  {
    id: "sleep-priority",
    question: "What feels like the biggest barrier between you and better sleep?",
    options: [
      { text: "I get too warm and uncomfortable during the night", value: "temperature", score: { essence: 2, caelum: 4, sonus: 1, aurora: 1, voyage: 2, max: 3 } },
      { text: "My mind stays active and sound keeps me alert", value: "sound", score: { essence: 1, caelum: 1, sonus: 4, aurora: 1, voyage: 2, max: 3 } },
      { text: "Mornings feel harsh, abrupt, and groggy", value: "wake", score: { essence: 1, caelum: 1, sonus: 1, aurora: 4, voyage: 1, max: 3 } },
      { text: "I want a complete premium setup, not a single product", value: "system", score: { essence: 2, caelum: 2, sonus: 2, aurora: 2, voyage: 2, max: 5 } },
    ],
  },
  {
    id: "lifestyle",
    question: "Which best describes your lifestyle?",
    options: [
      { text: "Performance focused and recovery minded", value: "performance", score: { essence: 3, caelum: 3, sonus: 2, aurora: 2, voyage: 1, max: 4 } },
      { text: "I travel often and need consistency anywhere", value: "travel", score: { essence: 2, caelum: 2, sonus: 2, aurora: 1, voyage: 5, max: 2 } },
      { text: "I love clean design and premium routines", value: "luxury", score: { essence: 3, caelum: 2, sonus: 2, aurora: 2, voyage: 2, max: 4 } },
      { text: "I want the simplest high impact improvement", value: "simple", score: { essence: 5, caelum: 3, sonus: 1, aurora: 1, voyage: 1, max: 1 } },
    ],
  },
  {
    id: "feature",
    question: "Which feature feels most valuable to you right now?",
    options: [
      { text: "A premium mask that feels incredible every night", value: "mask", score: { essence: 5, caelum: 1, sonus: 1, aurora: 1, voyage: 1, max: 3 } },
      { text: "Cooling comfort that reduces overheating", value: "cooling", score: { essence: 2, caelum: 5, sonus: 1, aurora: 1, voyage: 1, max: 3 } },
      { text: "Calming sound without earbuds", value: "audio", score: { essence: 1, caelum: 1, sonus: 5, aurora: 1, voyage: 1, max: 3 } },
      { text: "A softer, more natural wake up", value: "light", score: { essence: 1, caelum: 1, sonus: 1, aurora: 5, voyage: 1, max: 3 } },
    ],
  },
]

const products = {
  essence: {
    name: "Lumora Essence",
    tagline: "Redefine rest at its foundation.",
    price: "$99",
    icon: MoonStar,
    description:
      "Our signature mask. Crafted for darkness, comfort, and nightly consistency with a luxury feel that belongs in a modern ritual, not a medicine cabinet.",
    features: ["Mulberry silk exterior", "Structured low-pressure design", "Premium blackout comfort", "Subtle morning light permeability"],
  },
  caelum: {
    name: "Lumora Caelum",
    tagline: "Thermal balance, refined.",
    price: "$24",
    icon: Thermometer,
    description:
      "Interchangeable PCM inserts designed to regulate heat and reduce the restless discomfort caused by overheating.",
    features: ["PCM temperature regulation", "Cooling support through the night", "Designed for the Essence platform", "Easy insert-and-swap format"],
  },
  sonus: {
    name: "Lumora Sonus",
    tagline: "Sound without intrusion.",
    price: "$69",
    icon: Volume2,
    description:
      "A soft audio band designed to deliver calming soundscapes and guided wind down experiences without the feel of earbuds or heavy facial hardware.",
    features: ["Near-ear or bone-conduction audio", "Soft band construction", "No earbuds required", "Works beautifully with Essence"],
  },
  aurora: {
    name: "Lumora Aurora",
    tagline: "Wake with light, not shock.",
    price: "$89",
    icon: Sun,
    description:
      "A sunrise-inspired bedside wake light designed to help complete the Lumora system with a calmer, more elegant morning experience.",
    features: ["Gradual dawn-inspired wake sequence", "Complements partial light permeability concept", "Minimal bedside design", "Gentler morning transition"],
  },
  voyage: {
    name: "Lumora Voyage",
    tagline: "Take your rest anywhere.",
    price: "$39",
    icon: Plane,
    description:
      "A premium travel case built to protect, organize, and transport your Lumora system with the same level of detail as the products it holds.",
    features: ["Structured premium case", "Designed for system organization", "Travel friendly profile", "Luxury storage feel"],
  },
  max: {
    name: "Lumora Max",
    tagline: "The full expression of comfort.",
    price: "$249",
    icon: Crown,
    description:
      "Our premium future-facing experience, designed to explore deeper relaxation through elevated materials, advanced comfort systems, and integrated massage-inspired restoration.",
    features: ["Advanced comfort system", "Massage-inspired relaxation", "Luxury construction", "Flagship Lumora expression"],
  },
} as const

const systemCards = [
  {
    title: "Darkness",
    icon: MoonStar,
    body:
      "A refined sleep mask experience designed to help the body settle. Essence creates the sense of escape people seek at night while still allowing subtle morning light cues to register more gently over time.",
  },
  {
    title: "Temperature",
    icon: Thermometer,
    body:
      "Caelum inserts help regulate heat using phase change materials. Instead of waking up warm and frustrated, users stay closer to a more stable sleep environment.",
  },
  {
    title: "Sound",
    icon: Waves,
    body:
      "Sonus adds subtle sound without demanding earbuds or heavy technology directly on the face. It is designed to support calm, not create friction.",
  },
  {
    title: "Wake",
    icon: Sun,
    body:
      "Aurora replaces the violence of alarms with a more natural progression into morning. It does not compete with the mask. It completes the cycle.",
  },
]

function InteractiveMaskDiagram() {
  return (
    <div className="relative w-full max-w-xl mx-auto text-center">
      <div className="absolute -inset-8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] blur-2xl" />
      <div className="relative">
        <img
          src="/images/sleep-mask-2.png"
          alt="Lumora Essence mask"
          className="w-full h-auto object-contain"
          style={{ filter: "drop-shadow(0 24px 70px rgba(15, 23, 42, 0.7))" }}
        />
      </div>
      <div className="mt-6">
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

export default function LumoraSiteV4() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const [showNavbar, setShowNavbar] = useState(false)

  const aurumGradient =
    "bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(148,163,184,0.16),transparent_55%),radial-gradient(900px_600px_at_85%_20%,rgba(245,158,11,0.08),transparent_55%),linear-gradient(180deg,rgba(15,23,42,1),rgba(2,6,23,1))]"
  const sageGradientText =
    "bg-gradient-to-r from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent"

  useEffect(() => {
    const handleScroll = () => {
      const heroTitle = document.querySelector("h1")
      if (!heroTitle) return
      const rect = heroTitle.getBoundingClientRect()
      setShowNavbar(rect.bottom < 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

    const scores = { essence: 0, caelum: 0, sonus: 0, aurora: 0, voyage: 0, max: 0 }
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-slate-800/60 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } bg-slate-950/70`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <a href="#top" className="flex items-center">
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-20 sm:h-24 w-auto" />
            </a>

            <nav className="hidden lg:flex items-center gap-6 text-sm">
              <a
                href="#story"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("story")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                Story
              </a>
              <a
                href="#system"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("system")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                System
              </a>
              <a
                href="#traction"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("traction")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                Traction
              </a>
              <a
                href="#products"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                Products
              </a>
              <a
                href="#faq"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                FAQ
              </a>
              <a href="/team" className="text-slate-300 hover:text-white transition-colors">Our Team</a>
              <a
                href="https://www.instagram.com/lumorasleep?igsh=MWpwcHQxYXE5Z2hnYg=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/40 px-3 py-2 text-slate-300 hover:text-white hover:border-slate-500 transition-all"
                aria-label="Lumora Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <Button
                size="sm"
                className="rounded-full bg-slate-100 text-slate-950 hover:bg-white px-6 py-2 text-sm font-medium"
                onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                Join Waitlist
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section id="top" className={`relative min-h-screen flex items-center justify-center pt-24 ${aurumGradient}`}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light [background-image:url('/images/noise.png')] [background-size:300px_300px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center max-w-7xl mx-auto">
            <div className="text-center lg:text-left">
              <div className="mb-6 flex items-center justify-center lg:justify-start">
                <img src="/images/lumora-logo.png" alt="Lumora Sleep logo" className="h-10 sm:h-12 w-auto opacity-95" />
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl font-light leading-[0.92] mb-6">
                <span className={`${sageGradientText} font-semibold`}>Redefine</span> Rest.
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light">
                A luxury sleep system designed around the real moments that shape rest: falling asleep, staying comfortable through the night, and waking up more naturally.
              </p>

              <p className="mt-6 text-slate-400 max-w-2xl leading-relaxed">
                Lumora was refined around a simple principle: sleep products should feel lighter, calmer, and more natural to live with. We moved away from the idea of heavy technology on the face and toward a modular system where each piece does its job beautifully. The result is a more elegant path to better sleep, with premium comfort at the center and optional layers that extend the experience from night into morning.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="rounded-full bg-slate-100 text-slate-950 hover:bg-white px-8 sm:px-12 py-4 text-base sm:text-lg font-medium transition-all duration-300 w-full sm:w-auto"
                  onClick={() => document.getElementById("system")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore the system
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="rounded-full text-slate-200 hover:text-white hover:bg-slate-800/50 px-8 py-4 text-base sm:text-lg font-light border border-slate-700/60 w-full sm:w-auto"
                  onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Join the waitlist
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-slate-400">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4" />Designed for comfort first</span>
                <span className="inline-flex items-center gap-2"><Gem className="w-4 h-4" />Luxury materials and finish</span>
                <span className="inline-flex items-center gap-2"><MoonStar className="w-4 h-4" />A limited first release</span>
              </div>
            </div>

            <div className="relative">
              <InteractiveMaskDiagram />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-80">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      <section id="story" className="py-20 sm:py-28 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className={`text-3xl sm:text-5xl font-semibold mb-6 ${sageGradientText}`}>Why sleep still feels broken</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Most sleep products solve one slice of the problem. A supplement. A sound app. A wake light. A tracker. But real sleep is shaped by a combination of darkness, temperature, sound, stress, and rhythm. We built Lumora around that fuller reality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Overheating",
                icon: Thermometer,
                body: "Temperature spikes quietly pull people out of deeper rest and make comfort harder to maintain. The result is a night that feels longer, lighter, and less restorative.",
              },
              {
                title: "Noise and mental activity",
                icon: Volume2,
                body: "Even when the room looks quiet, the mind often is not. Small sounds, phone habits, stress, and unfinished thought loops keep people alert when they should be easing into sleep.",
              },
              {
                title: "Harsh wake ups",
                icon: Sun,
                body: "Mornings often start with abrupt alarms that feel more like interruption than recovery. That first moment shapes the emotional tone of the day more than people realize.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/60 to-slate-900/50 p-8 border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(148,163,184,0.12),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100/10 border border-slate-600/40 flex items-center justify-center mb-6">
                    <card.icon className="w-7 h-7 text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{card.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="system" className={`py-20 sm:py-28 ${aurumGradient}`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-slate-300/90 text-xs tracking-[0.22em] uppercase mb-4">
              <span className="w-10 h-px bg-slate-500/70" />
              The Lumora system
              <span className="w-10 h-px bg-slate-500/70" />
            </div>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 ${sageGradientText}`}>One system. Three phases of rest.</h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
              Lumora is not a random collection of products. It is a layered sleep ecosystem designed to support what happens before sleep, during sleep, and as you wake. Each part works on its own. Together, they feel like a complete ritual.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {systemCards.map((card, idx) => (
              <div key={idx} className="rounded-3xl border border-slate-700/60 bg-slate-950/30 backdrop-blur-sm p-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-100/10 border border-slate-700/50 flex items-center justify-center mb-6">
                  <card.icon className="w-6 h-6 text-slate-200" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-slate-300 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="traction" className="py-20 sm:py-28 bg-black">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <h2 className={`text-4xl sm:text-5xl font-semibold mb-6 ${sageGradientText}`}>Signals we could not ignore</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Before refining the product, we talked to people directly. Students, athletes, young adults, and professionals. The message was consistent. Sleep is not a niche issue. It is a daily performance problem people are already trying and failing to solve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
            {[
              {
                number: "83%",
                label: "reported sleep difficulty",
                detail: "From our interview pool, the majority said sleep was a real and recurring issue.",
                ring: "border-cyan-500/30",
                glow: "from-cyan-500/15 via-blue-500/10 to-transparent",
                shadow: "hover:shadow-[0_18px_60px_rgba(34,211,238,0.12)]",
              },
              {
                number: "6/10",
                label: "average sleep score",
                detail: "People were not describing ideal rest. They were describing acceptable but frustrating sleep.",
                ring: "border-violet-500/30",
                glow: "from-violet-500/15 via-fuchsia-500/10 to-transparent",
                shadow: "hover:shadow-[0_18px_60px_rgba(168,85,247,0.12)]",
              },
              {
                number: "$950B",
                label: "projected sleep market by 2032",
                detail: "The category is growing because people increasingly invest in recovery, wellness, and better daily performance.",
                ring: "border-amber-400/30",
                glow: "from-amber-400/15 via-orange-400/10 to-transparent",
                shadow: "hover:shadow-[0_18px_60px_rgba(251,191,36,0.12)]",
              },
            ].map((stat, idx) => (
              <div key={idx} className={`group relative overflow-hidden rounded-3xl border ${stat.ring} bg-slate-950/50 p-8 text-center transition-all duration-500 hover:-translate-y-1 ${stat.shadow}`}>
                <div className={`absolute inset-0 bg-gradient-to-b ${stat.glow}`} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl font-semibold text-white mb-3">{stat.number}</div>
                  <div className="text-slate-200 font-medium mb-2">{stat.label}</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{stat.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm tracking-wide transition-colors duration-300"
            >
              Download our traction study
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      

      <section id="products" className="py-20 sm:py-28 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1500px]">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className={`text-4xl md:text-6xl font-semibold mb-5 ${sageGradientText}`}>The Lumora collection</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              A modular ecosystem with a clear center of gravity. Start with Essence. Build the system around the parts that matter most to your sleep, your routine, and your environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-6 gap-5">
            {Object.values(products).map((product, idx) => {
              const Icon = product.icon
              const cardStyles: Record<string, string> = {
                "Lumora Essence": "from-blue-950/70 via-slate-900/80 to-slate-950 border-blue-500/30 hover:border-blue-400/50",
                "Lumora Caelum": "from-cyan-950/70 via-slate-900/80 to-slate-950 border-cyan-500/30 hover:border-cyan-400/50",
                "Lumora Sonus": "from-violet-950/70 via-slate-900/80 to-slate-950 border-violet-500/30 hover:border-violet-400/50",
                "Lumora Aurora": "from-amber-950/60 via-slate-900/80 to-slate-950 border-amber-400/30 hover:border-amber-300/50",
                "Lumora Voyage": "from-indigo-950/70 via-slate-900/80 to-slate-950 border-indigo-500/30 hover:border-indigo-400/50",
                "Lumora Max": "from-fuchsia-950/60 via-slate-900/80 to-slate-950 border-rose-400/35 hover:border-rose-300/50 ring-1 ring-rose-300/15",
              }
              const iconStyles: Record<string, string> = {
                "Lumora Essence": "bg-blue-400/10 border-blue-400/20 text-blue-100",
                "Lumora Caelum": "bg-cyan-400/10 border-cyan-400/20 text-cyan-100",
                "Lumora Sonus": "bg-violet-400/10 border-violet-400/20 text-violet-100",
                "Lumora Aurora": "bg-amber-300/10 border-amber-300/20 text-amber-100",
                "Lumora Voyage": "bg-indigo-400/10 border-indigo-400/20 text-indigo-100",
                "Lumora Max": "bg-rose-300/10 border-rose-300/20 text-rose-100",
              }
              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-3xl p-7 border bg-gradient-to-b transition-all duration-500 hover:scale-[1.015] ${cardStyles[product.name]}`}
                >
                  {product.name === "Lumora Max" && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-rose-200 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">FLAGSHIP</span>
                    </div>
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${iconStyles[product.name]}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">{product.name}</h3>
                    <p className="text-sm mb-4 font-medium italic text-slate-300/90">{product.tagline}</p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">{product.description}</p>
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-5 border-t border-white/10">
                      <span className="text-slate-400 text-xs font-medium tracking-wide">STARTING AT</span>
                      <div className="text-white text-xl font-semibold">{product.price}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      

      <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden" id="customize">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(148,163,184,0.10)_0%,transparent_55%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 mb-4 text-slate-300/90 text-xs tracking-[0.22em] uppercase">
              <span className="w-10 h-px bg-slate-500/70" />
              Personal recommendation
              <span className="w-10 h-px bg-slate-500/70" />
            </div>

            <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${sageGradientText}`}>Discover your Lumora</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              A quick way to understand which part of the Lumora system aligns best with the way you actually sleep.
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
                    <Sparkles className="w-8 h-8 text-slate-200" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Your Lumora match</h3>
                  <p className="text-slate-300 font-light">Based on your answers, this is where we would begin.</p>
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

                    <p className="text-slate-300 mb-6 font-light leading-relaxed">{recommended.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
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
                        Join waitlist for {recommended.name}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={resetQuiz}
                        className="rounded-full text-slate-300 hover:text-white hover:bg-slate-800/40 border border-slate-700/60"
                      >
                        Retake quiz
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-slate-900" id="faq">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-semibold mb-6 ${sageGradientText}`}>Frequently asked questions</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              The details matter. If you want a direct answer, reach out anytime.
            </p>
          </div>

          <div id="contact-form" className="space-y-4">
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

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-slate-700/60 bg-slate-950/30 p-8 text-center">
              <div className="w-12 h-12 bg-slate-100/10 border border-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-slate-200" />
              </div>
              <h4 className="font-semibold text-white mb-2">Email us</h4>
              <p className="text-slate-300 text-sm font-light">hello@uselumora.co</p>
              <p className="text-slate-400 text-xs mt-2 font-light">Typical response within 24 hours</p>
            </div>
            <div className="rounded-3xl border border-slate-700/60 bg-slate-950/30 p-8 text-center">
              <div className="w-12 h-12 bg-slate-100/10 border border-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-6 h-6 text-slate-200" />
              </div>
              <h4 className="font-semibold text-white mb-2">Follow Lumora</h4>
              <a
                href="https://www.instagram.com/lumorasleep?igsh=MWpwcHQxYXE5Z2hnYg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 text-sm hover:text-white transition-colors block font-light"
              >
                @lumorasleep
              </a>
              <p className="text-slate-400 text-xs mt-2 font-light">Product updates and behind the scenes</p>
            </div>
            <div className="rounded-3xl border border-slate-700/60 bg-slate-950/30 p-8 text-center">
              <div className="w-12 h-12 bg-slate-100/10 border border-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-slate-200" />
              </div>
              <h4 className="font-semibold text-white mb-2">Meet the founders</h4>
              <a href="/team" className="text-slate-300 text-sm hover:text-white transition-colors block font-light">
                Visit our team page
              </a>
              <p className="text-slate-400 text-xs mt-2 font-light">The people building Lumora</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-20 sm:py-28 ${aurumGradient}`} id="waitlist-form">
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 max-w-5xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-5 text-slate-50">
            The future of sleep starts here.
          </h2>
          <p className="text-slate-300/90 max-w-2xl mx-auto mb-10 font-light text-lg leading-relaxed">
            Join the waitlist to get launch timing, early access, product updates, and a first look at how Lumora continues to evolve.
          </p>

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
      </section>

      <section className="py-20 sm:py-28 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className={`text-4xl sm:text-5xl font-semibold mb-6 ${sageGradientText}`}>What makes Lumora feel different</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              It is not only the materials. It is not only the features. It is the way the system has been thought through from night to morning. Each component has a job. Each detail reduces friction. Each interaction is designed to feel natural.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Luxury without shouting",
                body: "Mulberry silk, structured comfort, softened gradients, and restrained design language give Lumora the feel of a premium ritual product instead of a novelty gadget.",
              },
              {
                title: "Modular by design",
                body: "Users can begin with Essence and expand only where the experience becomes more valuable. That makes the system more intuitive, more accessible, and more believable.",
              },
              {
                title: "Designed for real use",
                body: "No need to commit to a complicated app flow every night. No need to strap bulky hardware to the face. The experience is designed to invite repeat use through comfort.",
              },
              {
                title: "A broader future",
                body: "While the system begins with premium personal sleep, the long-term vision can expand into travel, performance recovery, corporate wellness, and environments where better sleep has measurable value.",
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-3xl border border-slate-700/60 bg-slate-950/30 p-8">
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-left lg:pl-6">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400 mb-5">
                  <span className="w-8 h-px bg-slate-600" />
                  Intelligent blackout
                </div>
                <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-5">A more intelligent kind of blackout</h3>
                <p className="text-slate-300 leading-relaxed mb-5">
                  Lumora Essence is designed for deep nighttime darkness, but with a subtle long-term consideration: partial light permeability in the morning. The goal is not to flood the eyes with light. The goal is to allow soft natural cues to begin registering more gently as the day begins.
                </p>
                <p className="text-slate-400 leading-relaxed mb-5">
                  This helps the mask feel less like a total disconnection from morning and more like an intelligent extension of the sleep cycle. It is one of the details that makes Lumora feel considered rather than generic.
                </p>
                <div className="flex items-center gap-3 text-slate-300">
                  <Sun className="w-5 h-5" />
                  <span>Dark enough for night. Responsive enough for morning.</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 rounded-[2rem] border border-slate-700/60 bg-gradient-to-b from-slate-900/70 via-blue-950/20 to-slate-950/50 p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400 mb-5">
                <span className="w-8 h-px bg-slate-600" />
                Essence design detail
              </div>
              <h3 className="text-3xl font-semibold text-white mb-5">Designed around the body, not just the pitch deck</h3>
              <p className="text-slate-300 leading-relaxed mb-5">
                One of the clearest lessons from building Lumora was that comfort has to win. That is why the new direction is more intentional. The mask remains premium and deeply functional, but the ecosystem no longer depends on forcing every form of technology directly onto the face.
              </p>
              <p className="text-slate-400 leading-relaxed mb-5">
                That change gave us something better. Essence can stay elegant and lightweight. Sonus can handle audio without earbud discomfort. Aurora can support the morning without making the mask contradictory. Caelum can solve heat as an insert rather than as a bulky system. The result is a sleep experience that feels more intuitive, more premium, and more believable long term.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-700/60 bg-slate-950/30 p-5">
                  <div className="flex items-center gap-3 mb-2"><ShieldCheck className="w-5 h-5 text-slate-200" /><span className="font-medium text-white">No heavy facial hardware</span></div>
                  <p className="text-sm text-slate-400 leading-relaxed">More comfort, less liability, and better nightly wearability.</p>
                </div>
                <div className="rounded-2xl border border-slate-700/60 bg-slate-950/30 p-5">
                  <div className="flex items-center gap-3 mb-2"><Sparkles className="w-5 h-5 text-slate-200" /><span className="font-medium text-white">Built as a ritual</span></div>
                  <p className="text-sm text-slate-400 leading-relaxed">A system that feels deliberate, elegant, and easy to return to every night.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-950 border-t border-slate-800/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="opacity-90">
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-24 sm:h-28 w-auto" />
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 text-slate-400 justify-center text-sm">
              <a href="#story" className="hover:text-slate-200 transition-colors font-light tracking-wide">Story</a>
              <a href="#system" className="hover:text-slate-200 transition-colors font-light tracking-wide">System</a>
              <a href="#traction" className="hover:text-slate-200 transition-colors font-light tracking-wide">Traction</a>
              <a href="#faq" className="hover:text-slate-200 transition-colors font-light tracking-wide">FAQ</a>
              <a href="/team" className="hover:text-slate-200 transition-colors font-light tracking-wide">Our Team</a>
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
