"use client"

import React, { useState } from "react"
import { ArrowLeft } from "lucide-react"

// Interactive Product Hero Component for Explore Page
const InteractiveProductHero = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [revealMode, setRevealMode] = useState(false)

  const features = [
    {
      id: "thermal",
      title: "Temperature Control",
      description: "Advanced PCM and TEC technology maintains perfect temperature",
      details: "Paraffin-based Phase Change Materials (28-32°C) provide passive temperature buffering, while thermoelectric coolers offer active heating/cooling with precision NTC thermistor feedback.",
      position: { x: 45, y: 55 },
      icon: "🌡️"
    },
    {
      id: "audio", 
      title: "Music Audio",
      description: "Immersive soundscapes without blocking ambient awareness",
      details: "Temple-mounted transducers in impact-resistant ABS housing deliver crystal-clear audio through bone conduction, maintaining spatial awareness for safety.",
      position: { x: 84, y: 48 },
      icon: "🎵"
    },
    {
      id: "lights",
      title: "LED Wake Light",
      description: "Gentle sunrise simulation using LED arrays",
      details: "PMMA light guides ensure even distribution across a 20-minute sunrise simulation, perfectly aligned with your circadian rhythm for natural awakening.",
      position: { x: 28, y: 41 },
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
      title: "Battery & Charging",
      description: "Long-lasting battery with gold-plated contacts",
      details: "Polycarbonate flame-retardant housing protects the battery system, while gold-plated copper contacts ensure corrosion resistance and reliable charging.",
      position: { x: 19, y: 58 },
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
              {/* Temperature - rotated down and left */}
              <div className="absolute" style={{left: '20%', top: '40%', width: '50%', height: '30%', transform: 'rotate(-15deg)'}}>
                <div className="w-full h-full bg-blue-400/30 rounded-full border-2 border-blue-400/60 animate-pulse relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs text-blue-300 font-medium">Temperature</div>
                  </div>
                </div>
              </div>
              
              {/* Music - positioned per red arrow */}
              <div className="absolute" style={{left: '80%', top: '45%', width: '8%', height: '8%'}}>
                <div className="w-full h-full bg-purple-400/40 rounded-full border-2 border-purple-400/70 animate-pulse"></div>
                <div className="text-xs text-purple-300 mt-1 font-medium">Music</div>
              </div>
              
              {/* LED arrays - positioned per red arrows */}
              <div className="absolute" style={{left: '25%', top: '38%', width: '6%', height: '6%'}}>
                <div className="w-full h-full bg-amber-400/40 rounded-full border-2 border-amber-400/70 animate-pulse"></div>
                <div className="text-xs text-amber-300 mt-1 font-medium">LED</div>
              </div>
              <div className="absolute" style={{left: '55%', top: '38%', width: '6%', height: '6%'}}>
                <div className="w-full h-full bg-amber-400/40 rounded-full border-2 border-amber-400/70 animate-pulse"></div>
              </div>
              
              {/* Battery/Charge Port - positioned per red arrow */}
              <div className="absolute" style={{left: '15%', top: '55%', width: '8%', height: '6%'}}>
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

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="relative py-8 bg-slate-800/50 border-b border-slate-700/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </a>
              <div className="w-px h-6 bg-slate-600"></div>
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-10 w-auto" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent">
              Explore the Technology
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Discover the advanced engineering behind Lumora Sleep's revolutionary sleep enhancement technology.
            </p>
          </div>

          <InteractiveProductHero />

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Experience Luxury Sleep Technology
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-3xl mx-auto">
                Each component has been meticulously engineered to work in harmony, creating the ultimate sleep experience. 
                From medical-grade materials to cutting-edge electronics, every detail serves a purpose in your journey to better rest.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}