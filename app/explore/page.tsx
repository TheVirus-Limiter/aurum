"use client"

import React, { useState } from "react"
import { ArrowLeft } from "lucide-react"

// Interactive 3D Product Showcase Component
const InteractiveProductHero = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [isExploded, setIsExploded] = useState(false)
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

  const components = [
    {
      id: "thermal",
      title: "Temperature Control",
      description: "Advanced PCM gel pad maintains perfect skin temperature",
      details: "Phase Change Materials adapt to your body temperature, providing cooling relief when you're warm and gentle warmth when needed.",
      explodedPosition: { x: -150, y: 100 },
      color: "blue",
      icon: "🌡️",
      size: { width: 180, height: 80 }
    },
    {
      id: "leds", 
      title: "Wake Light System",
      description: "Gentle sunrise simulation for natural awakening",
      details: "Precisely positioned LED arrays simulate a natural sunrise over 20 minutes, gradually preparing your body for a refreshed awakening.",
      explodedPosition: { x: -100, y: -80 },
      color: "amber",
      icon: "☀️",
      size: { width: 60, height: 60 }
    },
    {
      id: "audio",
      title: "Bone-Conduction Audio",
      description: "Immersive soundscapes via bone conduction",
      details: "High-quality bone conduction transducers deliver crystal-clear audio while maintaining awareness of your surroundings.",
      explodedPosition: { x: 200, y: -50 },
      color: "purple",
      icon: "🎵",
      size: { width: 50, height: 50 }
    },
    {
      id: "battery",
      title: "Wireless Charging",
      description: "Long-lasting battery with magnetic charging",
      details: "Advanced lithium battery provides 8+ hours of use with convenient wireless charging via gold-plated magnetic contacts.",
      explodedPosition: { x: -120, y: 180 },
      color: "green",
      icon: "🔋",
      size: { width: 40, height: 30 }
    },
    {
      id: "comfort",
      title: "Memory Foam Padding",
      description: "Medical-grade comfort layer",
      details: "Biocompatible memory foam provides perfect pressure distribution while maintaining effective light blocking.",
      explodedPosition: { x: 0, y: 150 },
      color: "gray",
      icon: "☁️",
      size: { width: 200, height: 100 }
    },
    {
      id: "exterior",
      title: "Mulberry Silk Cover",
      description: "Luxury temperature-regulating exterior",
      details: "Premium mulberry silk exterior provides natural temperature regulation and moisture-wicking properties for all-night comfort.",
      explodedPosition: { x: 150, y: 120 },
      color: "slate",
      icon: "✨",
      size: { width: 220, height: 120 }
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500/80 border-blue-400 shadow-blue-500/50'
      case 'amber': return 'bg-amber-500/80 border-amber-400 shadow-amber-500/50'
      case 'purple': return 'bg-purple-500/80 border-purple-400 shadow-purple-500/50'
      case 'green': return 'bg-green-500/80 border-green-400 shadow-green-500/50'
      case 'gray': return 'bg-gray-500/80 border-gray-400 shadow-gray-500/50'
      case 'slate': return 'bg-slate-500/80 border-slate-400 shadow-slate-500/50'
      default: return 'bg-white/80 border-white shadow-white/50'
    }
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto" style={{ minHeight: '600px' }}>
      {/* 3D Scene Container */}
      <div className="relative h-96 md:h-[500px]" style={{ perspective: '1000px' }}>
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 rounded-3xl blur-3xl transform scale-110 opacity-50"></div>
        
        {/* Main Product Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative transition-all duration-1000 transform-gpu ${isExploded ? 'scale-75 opacity-40' : 'scale-100 opacity-100'}`}>
            <img
              src="/images/sleep-mask-2.png"
              alt="Lumora Sleep Mask"
              className="w-80 h-auto object-contain"
              style={{
                filter: "drop-shadow(0 8px 32px rgba(0, 0, 0, 0.3))"
              }}
            />
          </div>
        </div>

        {/* Exploded Components */}
        {isExploded && components.map((component, index) => (
          <div
            key={component.id}
            className={`absolute transition-all duration-1000 transform-gpu cursor-pointer ${
              hoveredComponent === component.id ? 'scale-110 z-20' : 'scale-100 z-10'
            }`}
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${component.explodedPosition.x}px, ${component.explodedPosition.y}px) rotateX(${isExploded ? 15 : 0}deg) rotateY(${isExploded ? index * 5 - 15 : 0}deg)`,
              transitionDelay: `${index * 100}ms`,
              width: `${component.size.width}px`,
              height: `${component.size.height}px`
            }}
            onMouseEnter={() => setHoveredComponent(component.id)}
            onMouseLeave={() => setHoveredComponent(null)}
            onClick={() => setSelectedComponent(selectedComponent === component.id ? null : component.id)}
          >
            <div className={`w-full h-full rounded-xl border-2 ${getColorClasses(component.color)} backdrop-blur-sm shadow-2xl flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="relative z-10 text-center">
                <div className="text-2xl mb-1">{component.icon}</div>
                <div className="text-xs font-medium text-white">{component.title}</div>
              </div>
              
              {/* Hover Effect */}
              {hoveredComponent === component.id && (
                <div className="absolute inset-0 bg-white/10 rounded-xl animate-pulse"></div>
              )}
            </div>
            
            {/* Component Label Line */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-300 whitespace-nowrap bg-slate-800/80 px-2 py-1 rounded">
              {component.title}
            </div>
          </div>
        ))}

        {/* Control Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-500 transform hover:scale-105 ${
              isExploded 
                ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isExploded ? 'Assemble View' : 'Exploded View'}
          </button>
        </div>

        {/* Rotation Instructions */}
        {!isExploded && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 bg-slate-800/80 px-4 py-2 rounded-lg">
            Click "Exploded View" to explore the technology
          </div>
        )}
      </div>

      {/* Component Detail Panel */}
      {selectedComponent && (
        <div className="mt-8 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30 transition-all duration-500 ease-out">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {components.find(c => c.id === selectedComponent)?.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {components.find(c => c.id === selectedComponent)?.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {components.find(c => c.id === selectedComponent)?.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedComponent(null)}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              ✕
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {components.find(c => c.id === selectedComponent)?.details}
          </p>
        </div>
      )}

      {/* Technology Overview Grid */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {components.map((component) => (
          <button
            key={component.id}
            className={`p-4 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
              selectedComponent === component.id
                ? 'bg-amber-500/20 border border-amber-500/40 shadow-lg'
                : 'bg-slate-800/50 hover:bg-slate-700/50 border border-transparent hover:border-slate-600'
            }`}
            onClick={() => setSelectedComponent(selectedComponent === component.id ? null : component.id)}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{component.icon}</span>
              <span className="text-sm font-medium text-white">{component.title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {component.description}
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