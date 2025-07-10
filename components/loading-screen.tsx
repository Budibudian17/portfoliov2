"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState(0)
  const { t } = useLanguage()

  const loadingTexts = [
    "Initializing System...",
    "Loading Creative Assets...",
    "Preparing Portfolio...",
    "Setting Up Experience...",
    "Optimizing Performance...",
    "Finalizing Details...",
    "Almost Ready...",
    "Welcome!",
  ]

  useEffect(() => {
    // Progress animation - LONGER duration (7-8 seconds)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Longer delay before completing to show 100%
          setTimeout(() => {
            onLoadingComplete()
          }, 1200)
          return 100
        }
        // Slower progress increment for longer loading
        return prev + Math.random() * 8 + 2 // Random increment between 2-10 (slower)
      })
    }, 200) // Slower interval (was 150ms)

    // Text rotation - slower for longer experience
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length)
    }, 1000) // Slower text change (was 800ms)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-background"></div>
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse-slower"></div>

        {/* Moving Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan"
              style={{
                top: `${30 + i * 20}%`,
                width: "100%",
                animationDelay: `${i * 2}s`,
                animationDuration: "4s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo/Name Animation */}
        <div className="mb-16">
          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-3 animate-slide-up tracking-tight">
              HILMI
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="text-xl sm:text-2xl text-gray-400 animate-slide-up-delay tracking-[0.3em] font-light">
              PORTFOLIO
            </p>
          </div>
          <div className="mt-4 animate-slide-up-delay-2">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>
        </div>

        {/* Enhanced Loading Animation */}
        <div className="space-y-10 animate-fade-in-up">
          {/* Circular Progress with Glow */}
          <div className="relative w-32 h-32 mx-auto">
            {/* Glow Effect */}
            <div className="absolute inset-0 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-glow"></div>

            <svg className="w-32 h-32 transform -rotate-90 relative z-10" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#progressGradient)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-500 ease-out drop-shadow-lg"
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Progress Percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xl tracking-wider">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Loading Text with Typewriter Effect */}
          <div className="h-8">
            <p className="text-gray-300 text-base transition-all duration-500 font-light tracking-wide">
              {loadingTexts[currentText]}
            </p>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="w-full max-w-sm mx-auto">
            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-white/60 to-white rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Moving shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></div>
              </div>
            </div>
          </div>

          {/* Loading Stats */}
          <div className="grid grid-cols-3 gap-6 text-center mt-8">
            <div className="space-y-1">
              <div className="text-lg font-bold text-white">3+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Projects</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-white">3+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Years</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-white">15+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">People Collaborated</div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float-complex"
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Branding with Animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="space-y-2 animate-fade-in-up">
          <p className="text-gray-600 text-xs tracking-[0.2em] font-light animate-pulse">CRAFTED WITH PASSION</p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-1 h-1 bg-gray-600 rounded-full animate-ping"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
