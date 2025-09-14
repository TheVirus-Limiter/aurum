"use client"

import React, { useState } from "react"
import { ArrowLeft } from "lucide-react"

// Interactive Product Showcase with Callouts
const InteractiveProductHero = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [showCallouts, setShowCallouts] = useState(false)
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

  const components = [
    {
      id: "thermal",
      title: "Temperature Control",
      description: "Advanced PCM gel pad maintains perfect skin temperature",
      details: "Phase Change Materials adapt to your body temperature, providing cooling relief when you're warm and gentle warmth when needed.",
      position: { x: 50, y: 55 }, // Position on mask image
      side: "left",
      color: "blue",
      icon: "🌡️"
    },
    {
      id: "leds", 
      title: "Wake Light System",
      description: "Gentle sunrise simulation for natural awakening",
      details: "Precisely positioned LED arrays simulate a natural sunrise over 20 minutes, gradually preparing your body for a refreshed awakening.",
      position: { x: 35, y: 42 },
      side: "left",
      color: "amber",
      icon: "☀️"
    },
    {
      id: "audio",
      title: "Bone-Conduction Audio",
      description: "Immersive soundscapes via bone conduction",
      details: "High-quality bone conduction transducers deliver crystal-clear audio while maintaining awareness of your surroundings.",
      position: { x: 85, y: 48 },
      side: "right",
      color: "purple",
      icon: "🎵"
    },
    {
      id: "battery",
      title: "Battery & Charging",
      description: "Long-lasting battery with wired charging",
      details: "Advanced lithium battery provides 8+ hours of use with convenient wired charging via gold-plated contacts.",
      position: { x: 22, y: 61 },
      side: "left",
      color: "green",
      icon: "🔋"
    },
    {
      id: "comfort",
      title: "Memory Foam Padding",
      description: "Medical-grade comfort layer",
      details: "Biocompatible memory foam provides perfect pressure distribution while maintaining effective light blocking.",
      position: { x: 50, y: 65 },
      side: "right",
      color: "gray",
      icon: "☁️"
    },
    {
      id: "exterior",
      title: "Mulberry Silk Cover",
      description: "Luxury temperature-regulating exterior",
      details: "Premium mulberry silk exterior provides natural temperature regulation and moisture-wicking properties for all-night comfort.",
      position: { x: 70, y: 70 },
      side: "right",
      color: "slate",
      icon: "✨"
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500/90 border-blue-400 shadow-blue-500/50'
      case 'amber': return 'bg-amber-500/90 border-amber-400 shadow-amber-500/50'
      case 'purple': return 'bg-purple-500/90 border-purple-400 shadow-purple-500/50'
      case 'green': return 'bg-green-500/90 border-green-400 shadow-green-500/50'
      case 'gray': return 'bg-gray-500/90 border-gray-400 shadow-gray-500/50'
      case 'slate': return 'bg-slate-500/90 border-slate-400 shadow-slate-500/50'
      default: return 'bg-white/90 border-white shadow-white/50'
    }
  }

  const leftComponents = components.filter(c => c.side === "left")
  const rightComponents = components.filter(c => c.side === "right")

  return (
    <div className="relative w-full max-w-7xl mx-auto" style={{ minHeight: '700px' }}>
      {/* Main Interactive Scene */}
      <div className="relative h-[600px] flex items-center justify-center">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 rounded-3xl blur-3xl transform scale-110 opacity-50"></div>
        
        {/* Left Side Callouts */}
        <div className="absolute left-0 top-0 h-full w-80 flex flex-col justify-center space-y-6">
          {showCallouts && leftComponents.map((component, index) => (
            <div
              key={component.id}
              className={`relative transition-all duration-500 transform ${
                showCallouts ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`p-4 rounded-xl border-2 ${getColorClasses(component.color)} backdrop-blur-sm shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedComponent === component.id ? 'ring-2 ring-amber-400' : ''
                }`}
                onClick={() => setSelectedComponent(selectedComponent === component.id ? null : component.id)}
                onMouseEnter={() => setHoveredComponent(component.id)}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{component.icon}</span>
                  <span className="text-sm font-medium text-white">{component.title}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {component.description}
                </p>
              </div>
              
            </div>
          ))}
        </div>

        {/* Center Product Image */}
        <div className="relative">
          <img
            src="/images/sleep-mask-2.png"
            alt="Lumora Sleep Mask"
            className="w-96 md:w-[500px] h-auto object-contain transition-all duration-500"
            style={{
              filter: "drop-shadow(0 12px 40px rgba(0, 0, 0, 0.4))"
            }}
          />
          
          {/* Component Markers on Image */}
          {showCallouts && components.map((component) => {
            const getMarkerColor = (color: string) => {
              switch (color) {
                case 'blue': return hoveredComponent === component.id ? 'bg-blue-400 shadow-blue-400/50' : 'bg-blue-500'
                case 'amber': return hoveredComponent === component.id ? 'bg-amber-400 shadow-amber-400/50' : 'bg-amber-500'
                case 'purple': return hoveredComponent === component.id ? 'bg-purple-400 shadow-purple-400/50' : 'bg-purple-500'
                case 'green': return hoveredComponent === component.id ? 'bg-green-400 shadow-green-400/50' : 'bg-green-500'
                case 'gray': return hoveredComponent === component.id ? 'bg-gray-400 shadow-gray-400/50' : 'bg-gray-500'
                case 'slate': return hoveredComponent === component.id ? 'bg-slate-400 shadow-slate-400/50' : 'bg-slate-500'
                default: return hoveredComponent === component.id ? 'bg-white shadow-white/50' : 'bg-slate-500'
              }
            }
            
            const getPingColor = (color: string) => {
              switch (color) {
                case 'blue': return 'bg-blue-400'
                case 'amber': return 'bg-amber-400'
                case 'purple': return 'bg-purple-400'
                case 'green': return 'bg-green-400'
                case 'gray': return 'bg-gray-400'
                case 'slate': return 'bg-slate-400'
                default: return 'bg-slate-400'
              }
            }

            return (
              <div
                key={`marker-${component.id}`}
                className={`absolute w-4 h-4 rounded-full border-2 border-white transition-all duration-300 cursor-pointer ${
                  getMarkerColor(component.color)
                } ${hoveredComponent === component.id ? 'scale-150 shadow-lg' : 'hover:scale-125'}`}
                style={{
                  left: `${component.position.x}%`,
                  top: `${component.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => setSelectedComponent(selectedComponent === component.id ? null : component.id)}
                onMouseEnter={() => setHoveredComponent(component.id)}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                <div className={`absolute inset-0 rounded-full animate-ping ${getPingColor(component.color)}`}></div>
              </div>
            )
          })}
        </div>

        {/* Right Side Callouts */}
        <div className="absolute right-0 top-0 h-full w-80 flex flex-col justify-center space-y-6">
          {showCallouts && rightComponents.map((component, index) => (
            <div
              key={component.id}
              className={`relative transition-all duration-500 transform ${
                showCallouts ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
              style={{ transitionDelay: `${(index + leftComponents.length) * 150}ms` }}
            >
              
              <div
                className={`p-4 rounded-xl border-2 ${getColorClasses(component.color)} backdrop-blur-sm shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedComponent === component.id ? 'ring-2 ring-amber-400' : ''
                }`}
                onClick={() => setSelectedComponent(selectedComponent === component.id ? null : component.id)}
                onMouseEnter={() => setHoveredComponent(component.id)}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{component.icon}</span>
                  <span className="text-sm font-medium text-white">{component.title}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {component.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Control Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowCallouts(!showCallouts)}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-500 transform hover:scale-105 ${
              showCallouts 
                ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {showCallouts ? 'Hide Details' : 'Explore Components'}
          </button>
        </div>

        {/* Instructions */}
        {!showCallouts && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 bg-slate-800/80 px-4 py-2 rounded-lg">
            Click "Explore Components" to see the technology breakdown
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
              <img src="/images/lumora-logo.png" alt="Lumora Sleep" className="h-16 w-auto" />
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