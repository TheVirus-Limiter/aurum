"use client"

import React from "react"

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
  Sparkles,
  Plus,
  Minus,
  Mail,
  Instagram,
} from "lucide-react"
import { useState, useEffect } from "react"

// Interactive Product Hero Component
const InteractiveMaskDiagram = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [revealMode, setRevealMode] = useState(false)

  const features = [
    {
      id: "thermal",
      title: "Adaptive Thermal Control",
      description: "Advanced PCM and TEC technology maintains perfect temperature",
      details: "Paraffin-based Phase Change Materials (28-32°C) provide passive temperature buffering, while thermoelectric coolers offer active heating/cooling with precision NTC thermistor feedback.",
      position: { x: 20, y: 45 },
      icon: "🌡️"
    },
    {
      id: "audio", 
      title: "Bone-Conduction Audio",
      description: "Immersive soundscapes without blocking ambient awareness",
      details: "Temple-mounted transducers in impact-resistant ABS housing deliver crystal-clear audio through bone conduction, maintaining spatial awareness for safety.",
      position: { x: 15, y: 25 },
      icon: "🎵"
    },
    {
      id: "lights",
      title: "Circadian Wake Light",
      description: "Gentle sunrise simulation using LED arrays",
      details: "PMMA light guides ensure even distribution across a 20-minute sunrise simulation, perfectly aligned with your circadian rhythm for natural awakening.",
      position: { x: 50, y: 35 },
      icon: "☀️"
    },
    {
      id: "comfort",
      title: "Memory Foam Comfort",
      description: "Medical-grade materials for pressure-free wear",
      details: "Biocompatible memory foam maintains its shape while providing effective light blockage and supreme comfort during extended wear periods.",
      position: { x: 45, y: 60 },
      icon: "☁️"
    },
    {
      id: "materials",
      title: "Luxury Materials", 
      description: "Mulberry silk exterior with moisture-wicking properties",
      details: "Hypoallergenic mulberry silk and bamboo fiber provide temperature regulation, luxury feel, and effective moisture management for all-night comfort.",
      position: { x: 70, y: 65 },
      icon: "✨"
    },
    {
      id: "power",
      title: "Wireless Charging",
      description: "Long-lasting battery with gold-plated contacts",
      details: "Polycarbonate flame-retardant housing protects the battery system, while gold-plated copper contacts ensure corrosion resistance and reliable charging.",
      position: { x: 80, y: 45 },
      icon: "🔋"
    }
  ]

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Product Image Container */}
      <div className="relative group">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 rounded-3xl blur-3xl transform scale-110 opacity-50"></div>
        
        {/* Product Image */}
        <div className={`relative overflow-hidden rounded-2xl transition-all duration-700 ${isZoomed ? 'scale-110' : 'scale-100'}`}>
          <img
            src="/images/sleep-mask-2.png"
            alt="Lumora Sleep Mask - Interactive View"
            className="w-full h-auto object-contain transition-all duration-500"
            style={{
              filter: `${revealMode ? 'brightness(0.7) contrast(1.2)' : 'brightness(1) contrast(1)'} drop-shadow(0 8px 32px rgba(0, 0, 0, 0.3))`
            }}
          />
          
          {/* Internal Components Overlay (Reveal Mode) */}
          {revealMode && (
            <div className="absolute inset-0 transition-opacity duration-700 opacity-90">
              {/* Thermal zones */}
              <div className="absolute" style={{left: '18%', top: '40%', width: '12%', height: '15%'}}>
                <div className="w-full h-full bg-blue-400/30 rounded-lg border-2 border-blue-400/60 animate-pulse"></div>
                <div className="text-xs text-blue-300 mt-1 font-medium">Thermal</div>
              </div>
              <div className="absolute" style={{left: '70%', top: '40%', width: '12%', height: '15%'}}>
                <div className="w-full h-full bg-blue-400/30 rounded-lg border-2 border-blue-400/60 animate-pulse"></div>
              </div>
              
              {/* Audio transducers */}
              <div className="absolute" style={{left: '12%', top: '25%', width: '8%', height: '8%'}}>
                <div className="w-full h-full bg-purple-400/40 rounded-full border-2 border-purple-400/70 animate-pulse"></div>
                <div className="text-xs text-purple-300 mt-1 font-medium">Audio</div>
              </div>
              <div className="absolute" style={{left: '80%', top: '25%', width: '8%', height: '8%'}}>
                <div className="w-full h-full bg-purple-400/40 rounded-full border-2 border-purple-400/70 animate-pulse"></div>
              </div>
              
              {/* LED arrays */}
              <div className="absolute" style={{left: '45%', top: '30%', width: '10%', height: '4%'}}>
                <div className="w-full h-full bg-amber-400/40 rounded-full border-2 border-amber-400/70 animate-pulse"></div>
                <div className="text-xs text-amber-300 mt-1 font-medium">LEDs</div>
              </div>
              
              {/* Battery */}
              <div className="absolute" style={{left: '75%', top: '55%', width: '8%', height: '6%'}}>
                <div className="w-full h-full bg-green-400/40 rounded border-2 border-green-400/70 animate-pulse"></div>
                <div className="text-xs text-green-300 mt-1 font-medium">Battery</div>
              </div>
            </div>
          )}

          {/* Interactive Hotspots */}
          {features.map((feature) => (
            <button
              key={feature.id}
              className={`absolute w-8 h-8 rounded-full transition-all duration-300 transform hover:scale-125 focus:scale-125 focus:outline-none ${
                selectedFeature === feature.id 
                  ? 'bg-amber-400 shadow-lg shadow-amber-400/50 scale-125' 
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
              }`}
              style={{
                left: `${feature.position.x}%`,
                top: `${feature.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
              onDoubleClick={() => setIsZoomed(!isZoomed)}
            >
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-xs">{feature.icon}</span>
              </div>
              
              {/* Pulsing ring animation */}
              <div className={`absolute inset-0 rounded-full border-2 border-white/50 animate-ping ${
                selectedFeature === feature.id ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setRevealMode(!revealMode)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              revealMode 
                ? 'bg-amber-500 text-slate-900 shadow-lg' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {revealMode ? 'Hide Internals' : 'Show Internals'}
          </button>
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
          >
            {isZoomed ? 'Zoom Out' : 'Zoom In'}
          </button>
        </div>
      </div>

      {/* Feature Detail Panel */}
      {selectedFeature && (
        <div className="mt-8 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30 transition-all duration-500 ease-out transform animate-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {features.find(f => f.id === selectedFeature)?.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {features.find(f => f.id === selectedFeature)?.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {features.find(f => f.id === selectedFeature)?.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFeature(null)}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              ✕
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {features.find(f => f.id === selectedFeature)?.details}
          </p>
        </div>
      )}

      {/* Feature Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {features.map((feature) => (
          <button
            key={feature.id}
            className={`p-3 rounded-xl text-left transition-all duration-200 ${
              selectedFeature === feature.id
                ? 'bg-amber-500/20 border border-amber-500/40 shadow-lg'
                : 'bg-slate-800/50 hover:bg-slate-700/50 border border-transparent'
            }`}
            onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{feature.icon}</span>
              <span className="text-sm font-medium text-white">{feature.title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {feature.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

interface QuizAnswer {
  questionId: string
  answer: string
  score: { [key: string]: number }
}

interface QuizState {
  currentStep: number
  answers: QuizAnswer[]
  showResults: boolean
  recommendedProduct: string | null
}

export default function AurumSleep() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const redefineSection = document.querySelector("h1")
      if (redefineSection) {
        const rect = redefineSection.getBoundingClientRect()
        setShowNavbar(rect.bottom < 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 0,
    answers: [],
    showResults: false,
    recommendedProduct: null,
  })

  const faqData = [
    {
      question: "When will Lumora Sleep masks be available?",
      answer:
        "We're currently in the final stages of development and testing. Join our waitlist to be the first to know when we launch. We expect to begin shipping in Q2 2026.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our team at hello@uselumora.co. We typically respond within 24 hours during business days.",
    },
    {
      question: "What's the current status of your startup?",
      answer:
        "We're currently looking for preseed funding to bring Lumora Sleep to market. If you're an investor interested in revolutionizing the sleep industry, reach out at funding@uselumora.co.",
    },
    {
      question: "What's included with each Lumora Sleep mask?",
      answer:
        "Each mask includes the sleep mask, adjustable strap, USB-C charging cable, premium carrying case, and a detailed user guide. Higher-tier models include additional accessories like aromatherapy inserts or travel cases.",
    },
    {
      question: "How long does the battery last?",
      answer:
        "Battery life varies by model: Essence (N/A - no electronics), Pure (3-5 nights), Voyage (7-10 nights), and Max (5-7 nights with all features active). All models charge fully in under 2 hours.",
    },
    {
      question: "Is there a warranty or return policy?",
      answer:
        "Yes! We offer a 30-day satisfaction guarantee and 1-year warranty on all electronic components. If you're not completely satisfied, return your mask for a full refund.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "We currently ship to the US, Canada, UK, and EU. International shipping rates and delivery times vary by location. More regions coming soon!",
    },
    {
      question: "How is this different from regular sleep masks?",
      answer:
        "Lumora Sleep masks combine premium materials with smart technology. Features like adaptive temperature control, bone-conduction audio, and sunrise wake lights create a complete sleep ritual, not just light blocking.",
    },
  ]

  const quizQuestions = [
    {
      id: "sleep-priority",
      question: "What's your biggest sleep challenge?",
      options: [
        {
          text: "I get too hot while sleeping",
          value: "temperature",
          score: { travel: 1, natural: 2, core: 2, max: 3 },
        },
        { text: "Noise keeps me awake", value: "noise", score: { travel: 3, natural: 1, core: 1, max: 3 } },
        { text: "I wake up groggy", value: "wakeup", score: { travel: 1, natural: 2, core: 1, max: 3 } },
        { text: "Light pollution", value: "light", score: { travel: 2, natural: 2, core: 3, max: 2 } },
      ],
    },
    {
      id: "lifestyle",
      question: "Which describes your lifestyle best?",
      options: [
        { text: "Frequent traveler", value: "traveler", score: { travel: 4, natural: 1, core: 2, max: 2 } },
        {
          text: "Eco-conscious wellness enthusiast",
          value: "wellness",
          score: { travel: 1, natural: 4, core: 1, max: 2 },
        },
        { text: "Tech-savvy optimizer", value: "tech", score: { travel: 2, natural: 1, core: 1, max: 4 } },
        { text: "Simple and practical", value: "simple", score: { travel: 2, natural: 2, core: 4, max: 1 } },
      ],
    },
    {
      id: "budget",
      question: "What's your investment range?",
      options: [
        { text: "Under $100 - Essential quality", value: "budget", score: { travel: 1, natural: 1, core: 4, max: 0 } },
        { text: "$100-150 - Good value", value: "mid", score: { travel: 3, natural: 3, core: 2, max: 1 } },
        { text: "$150-200 - Premium features", value: "premium", score: { travel: 2, natural: 2, core: 1, max: 2 } },
        { text: "$200+ - Best of everything", value: "luxury", score: { travel: 1, natural: 1, core: 0, max: 4 } },
      ],
    },
    {
      id: "features",
      question: "Which feature excites you most?",
      options: [
        { text: "Portable design for travel", value: "portable", score: { travel: 4, natural: 1, core: 2, max: 2 } },
        { text: "Natural, organic materials", value: "organic", score: { travel: 1, natural: 4, core: 2, max: 2 } },
        { text: "Smart wake-up technology", value: "smart", score: { travel: 2, natural: 1, core: 1, max: 4 } },
        { text: "Simple, effective design", value: "simple", score: { travel: 2, natural: 2, core: 4, max: 1 } },
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
        "Perfect for those who want quality sleep essentials without complexity. Features premium light-blocking materials and comfortable design.",
      features: ["Premium light-blocking", "Soft, breathable materials", "Adjustable strap", "Essential comfort"],
    },
    natural: {
      name: "Lumora Pure",
      tagline: "Nature Meets Rest",
      price: "$129",
      icon: Leaf,
      description:
        "Ideal for eco-conscious sleepers who value sustainability. Made with organic materials and includes aromatherapy benefits.",
      features: ["Organic cotton exterior", "Biodegradable packaging", "Aromatherapy infusion", "Eco-friendly design"],
    },
    travel: {
      name: "Lumora Voyage",
      tagline: "Rest, Anywhere",
      price: "$159",
      icon: Plane,
      description:
        "Designed for frequent travelers who need quality sleep on the go. Compact, portable, and optimized for various environments.",
      features: ["Ultra-compact design", "Noise-dampening technology", "Portable charging case", "Travel-optimized"],
    },
    max: {
      name: "Lumora Max",
      tagline: "Luxury Without Limits",
      price: "$299",
      icon: Crown,
      description:
        "The ultimate sleep experience with cutting-edge technology. Features smart controls, premium materials, and personalized settings.",
      features: ["Smart temperature control", "Bone-conduction audio", "Sunrise wake light", "App connectivity"],
    },
  }

  const handleQuizAnswer = (questionId: string, answer: string, score: { [key: string]: number }) => {
    const newAnswers = [...quizState.answers.filter((a) => a.questionId !== questionId), { questionId, answer, score }]

    if (quizState.currentStep < quizQuestions.length - 1) {
      setQuizState({
        ...quizState,
        answers: newAnswers,
        currentStep: quizState.currentStep + 1,
      })
    } else {
      // Calculate recommendation
      const scores = { core: 0, natural: 0, travel: 0, max: 0 }
      newAnswers.forEach((answer) => {
        Object.entries(answer.score).forEach(([product, points]) => {
          scores[product as keyof typeof scores] += points
        })
      })

      const recommendedProduct = Object.entries(scores).reduce((a, b) =>
        scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b,
      )[0]

      setQuizState({
        ...quizState,
        answers: newAnswers,
        showResults: true,
        recommendedProduct,
      })
    }
  }

  const resetQuiz = () => {
    setQuizState({
      currentStep: 0,
      answers: [],
      showResults: false,
      recommendedProduct: null,
    })
  }

  const goToPreviousStep = () => {
    if (quizState.currentStep > 0) {
      setQuizState({
        ...quizState,
        currentStep: quizState.currentStep - 1,
      })
    }
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-x-hidden font-sans">
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-24 sm:h-28 w-auto" />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#products"
                className="text-slate-300 hover:text-white transition-colors font-light"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Products
              </a>
              <a
                href="#customize"
                className="text-slate-300 hover:text-white transition-colors font-light"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("customize")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Discover Lumora
              </a>
              <a
                href="#faq"
                className="text-slate-300 hover:text-white transition-colors font-light"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                FAQ
              </a>
              <Button
                size="sm"
                className="pill-button bg-transparent border border-slate-400 text-slate-400 hover:bg-slate-400 hover:text-slate-900 hover:shadow-lg hover:shadow-slate-400/20 px-6 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105"
                onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join Waitlist
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center aurum-gradient pt-20">
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-light mb-6 fade-up">
              <span className="sage-gradient font-semibold">Redefine</span> Rest.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-light fade-up">
              Luxury sleep, reimagined.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="pill-button bg-transparent border-2 border-slate-400 text-slate-400 hover:bg-slate-400 hover:text-slate-900 hover:shadow-xl hover:shadow-slate-400/30 px-8 sm:px-12 py-4 text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto"
                onClick={() => document.getElementById("customize")?.scrollIntoView({ behavior: "smooth" })}
              >
                Discover Lumora
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800/50 hover:shadow-lg px-6 sm:px-8 py-4 text-base sm:text-lg font-light transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-hint">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-12 sm:mb-16 sage-gradient">
            Why We Can't Sleep.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700/30 to-slate-800/50 p-6 sm:p-8 border border-slate-600/20 hover:border-slate-500/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="group-hover:animate-pulse">
                  <span className="absolute top-4 left-4 text-2xl opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-100">
                    🔥
                  </span>
                  <span className="absolute top-8 right-8 text-xl opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-200">
                    🌡️
                  </span>
                  <span className="absolute bottom-12 left-8 text-lg opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-300">
                    🔥
                  </span>
                  <span className="absolute bottom-8 right-4 text-xl opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-150">
                    🌡️
                  </span>
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-slate-400/80 to-slate-500/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Thermometer className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">Overheating</h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  Temperature spikes interrupt deep sleep cycles and prevent recovery, leaving you restless.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700/30 to-slate-800/50 p-6 sm:p-8 border border-slate-600/20 hover:border-slate-500/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="group-hover:animate-pulse">
                  <span className="absolute top-4 left-4 text-2xl opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-100">
                    🎵
                  </span>
                  <span className="absolute top-8 right-8 text-xl opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-200">
                    🔊
                  </span>
                  <span className="absolute bottom-12 left-8 text-lg opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-300">
                    🎶
                  </span>
                  <span className="absolute bottom-8 right-4 text-xl opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-150">
                    🎵
                  </span>
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-slate-400/80 to-slate-500/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">Noise & Distraction</h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  Environmental noise and stress triggers keep the mind alert when it should be winding down.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700/30 to-slate-800/50 p-6 sm:p-8 border border-slate-600/20 hover:border-slate-500/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="group-hover:animate-pulse">
                  <span className="absolute top-4 left-4 text-2xl opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-100">
                    ⏰
                  </span>
                  <span className="absolute top-8 right-8 text-xl opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-200">
                    🕐
                  </span>
                  <span className="absolute bottom-12 left-8 text-lg opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-300">
                    ⏰
                  </span>
                  <span className="absolute bottom-8 right-4 text-xl opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-150">
                    🕕
                  </span>
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-slate-400/80 to-slate-500/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">Harsh Alarms</h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  Jolting wake-ups cause cortisol spikes and grogginess that lasts throughout the day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-16 sm:py-24 aurum-gradient">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="w-full h-64 sm:h-96 flex items-center justify-center">
                <InteractiveMaskDiagram />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-8 sage-gradient">
                The Ritual of Deep Rest.
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Thermometer className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-200">Adaptive Thermal Control</h3>
                    <p className="text-slate-400 font-light text-sm sm:text-base">
                      Actively regulates temperature to prevent overheating and maintain optimal comfort
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-200">Bone-Conduction Audio</h3>
                    <p className="text-slate-400 font-light text-sm sm:text-base">
                      Delivers subtle soundscapes or meditations without blocking the ear
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-200">Gentle Sunrise Wake Light</h3>
                    <p className="text-slate-400 font-light text-sm sm:text-base">
                      Mimics natural dawn to ease you awake without cortisol spikes
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="pill-button mt-8 bg-slate-400 text-slate-900 hover:bg-slate-500 px-8 sm:px-12 py-4 text-base sm:text-lg font-medium transition-all duration-300 w-full sm:w-auto"
                onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-800" id="products">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16 sage-gradient">
            Choose Your Sleep Journey.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-700 to-slate-800 p-8 border border-slate-600/50 hover:border-slate-400/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Lumora Essence</h3>
                <p className="text-sm text-slate-400 mb-4 font-medium italic">"Better Sleep for Everyone."</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Entry-level comfort with light-blocking and soft materials. Essential functions for quality rest.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-600/50">
                  <span className="text-slate-400 text-xs font-medium">STARTING AT</span>
                  <div className="text-white text-lg font-semibold">$89</div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900/30 to-slate-800 p-8 border border-green-700/30 hover:border-green-500/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Lumora Pure</h3>
                <p className="text-sm text-green-300 mb-4 font-medium italic">"Nature Meets Rest."</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Organic fabrics, biodegradable packaging, and aromatherapy infusion for eco-conscious rest.
                </p>
                <div className="mt-6 pt-4 border-t border-green-700/30">
                  <span className="text-slate-400 text-xs font-medium">STARTING AT</span>
                  <div className="text-white text-lg font-semibold">$129</div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/30 to-slate-800 p-8 border border-blue-700/30 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Plane className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Lumora Voyage</h3>
                <p className="text-sm text-blue-300 mb-4 font-medium italic">"Rest, Anywhere."</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Compact foldable design with noise-dampening and portable charging case for travelers.
                </p>
                <div className="mt-6 pt-4 border-t border-blue-700/30">
                  <span className="text-slate-400 text-xs font-medium">STARTING AT</span>
                  <div className="text-white text-lg font-semibold">$159</div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-slate-900 p-8 border-2 border-amber-500/60 hover:border-yellow-400/80 transition-all duration-500 hover:transform hover:scale-105 ring-2 ring-amber-400/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute top-4 right-4">
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
                  PREMIUM
                </span>
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Crown className="w-7 h-7 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Lumora Max</h3>
                <p className="text-sm text-amber-300 mb-4 font-medium italic">"Luxury Without Limits"</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Premium silk exterior with customizable hardware and app-based personalization.
                </p>
                <div className="mt-6 pt-4 border-t border-amber-400/30">
                  <span className="text-slate-400 text-xs font-medium">STARTING AT</span>
                  <div className="text-white text-lg font-semibold">$299</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Customization Section */}
      <section
        className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
        id="customize"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(148,163,184,0.1)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-slate-400" />
              <span className="text-slate-400 font-medium">PERSONALIZED RECOMMENDATION</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 sage-gradient">Discover Your Lumora</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Take our quick quiz to find the Lumora Sleep mask designed for your unique rest and lifestyle.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {!quizState.showResults ? (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>
                      Question {quizState.currentStep + 1} of {quizQuestions.length}
                    </span>
                    <span>{Math.round(((quizState.currentStep + 1) / quizQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-slate-400 to-slate-300 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((quizState.currentStep + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Current Question */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {quizQuestions[quizState.currentStep].question}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[quizState.currentStep].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleQuizAnswer(quizQuestions[quizState.currentStep].id, option.value, option.score)
                        }
                        className="w-full text-left p-4 rounded-xl bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 hover:bg-slate-700/70 transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-slate-200 group-hover:text-white">{option.text}</span>
                          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-300 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                {quizState.currentStep > 0 && (
                  <div className="flex justify-start">
                    <Button variant="ghost" onClick={goToPreviousStep} className="text-slate-400 hover:text-slate-300">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              // Results
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/50">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Perfect Match Found!</h3>
                  <p className="text-slate-300">Based on your answers, we recommend:</p>
                </div>

                {quizState.recommendedProduct && (
                  <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-8 border border-slate-600/30 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        quizState.recommendedProduct === 'core' ? 'bg-gradient-to-br from-slate-400 to-slate-600' :
                        quizState.recommendedProduct === 'natural' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                        quizState.recommendedProduct === 'travel' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                        quizState.recommendedProduct === 'max' ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                        'bg-gradient-to-br from-slate-400 to-slate-600'
                      }`}>
                        {React.createElement(products[quizState.recommendedProduct as keyof typeof products].icon, {
                          className: "w-8 h-8 text-white",
                        })}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">
                          {products[quizState.recommendedProduct as keyof typeof products].name}
                        </h4>
                        <p className="text-slate-300 italic">
                          {products[quizState.recommendedProduct as keyof typeof products].tagline}
                        </p>
                        <p className="text-slate-400 font-semibold">
                          {products[quizState.recommendedProduct as keyof typeof products].price}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-300 mb-6">
                      {products[quizState.recommendedProduct as keyof typeof products].description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {products[quizState.recommendedProduct as keyof typeof products].features.map(
                        (feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-slate-300 text-sm">{feature}</span>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        className="pill-button bg-slate-400 text-slate-900 hover:bg-slate-300 px-8 py-3 font-medium flex-1"
                        onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Join Waitlist for {products[quizState.recommendedProduct as keyof typeof products].name}
                      </Button>
                      <Button variant="ghost" onClick={resetQuiz} className="text-slate-400 hover:text-slate-300">
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

      {/* FAQ Section */}
      <section className="py-24 bg-slate-800" id="faq">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 sage-gradient">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to know about Lumora Sleep. Can't find what you're looking for? Contact us directly.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <Minus className="w-5 h-5 text-slate-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="mt-16 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-3xl p-8 border border-slate-600/30">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">Still have questions?</h3>
                <p className="text-slate-300">Our team is here to help you find the perfect sleep solution.</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-600/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-slate-300" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">Email Us</h4>
                  <p className="text-slate-300 text-sm">hello@uselumora.co</p>
                  <p className="text-slate-400 text-xs mt-1">Response within 24 hours</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-600/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Instagram className="w-6 h-6 text-slate-300" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">Follow Us</h4>
                  <a 
                    href="https://www.instagram.com/lumorasleep?igsh=MWpwcHQxYXE5Z2hnYg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 text-sm hover:text-white transition-colors block"
                  >
                    @lumorasleep
                  </a>
                  <p className="text-slate-400 text-xs mt-1">Latest updates & behind-the-scenes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Final CTA Section */}
<section className="py-16 sm:py-24 aurum-gradient" id="waitlist-form">
  <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
    <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-8 text-slate-50">
      The Future of Sleep Starts Here.
    </h2>

    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-4 sm:p-8 border border-slate-600/30">
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
        ></iframe>
      </div>
    </div>
  </div>
</section>

{/* Tally embed loader script */}
<script
  dangerouslySetInnerHTML={{
    __html: `
      var d=document,w="https://tally.so/widgets/embed.js",v=function(){
        if(typeof Tally!="undefined"){Tally.loadEmbeds();}
        else d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach(function(e){e.src=e.dataset.tallySrc});
      };
      if(typeof Tally!="undefined")v();
      else if(d.querySelector('script[src="'+w+'"]')==null){
        var s=d.createElement("script");s.src=w;s.onload=v;s.onerror=v;d.body.appendChild(s);
      }
    `,
  }}
/>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-24 sm:h-28 w-auto opacity-80" />
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 text-slate-400 justify-center">
              <a href="#" className="hover:text-slate-300 transition-colors font-light">
                About
              </a>
              <a href="#faq" className="hover:text-slate-300 transition-colors font-light">
                FAQ
              </a>
              <a
                href="#waitlist-form"
                className="hover:text-slate-300 transition-colors font-light"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Contact
              </a>
              <a href="/team" className="hover:text-slate-300 transition-colors font-light">
                Our Team
              </a>
              <a href="/admin" className="hover:text-slate-300 transition-colors font-light">
                Admin
              </a>
              <a href="https://www.instagram.com/lumorasleep?igsh=MWpwcHQxYXE5Z2hnYg==" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors font-light">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
