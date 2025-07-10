"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [dots, setDots] = useState<{left: number, top: number, duration: number}[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Generate random dots di client
    setDots(
      Array.from({ length: 12 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 3,
      }))
    )
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg sm:text-xl font-bold text-white hover:text-gray-300 transition-colors">
              HILMI PORTFOLIO
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-background"></div>
      </div>

      {/* Interactive Mouse Follower */}
      <div
        className="fixed w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out z-10"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-404"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${dot.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* 404 Number with Glitch Effect */}
          <div className="relative mb-8 sm:mb-12">
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black leading-none select-none">
              <span className="inline-block animate-glitch-1">4</span>
              <span className="inline-block animate-glitch-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                0
              </span>
              <span className="inline-block animate-glitch-3">4</span>
            </h1>

            {/* Glitch Overlay Effects */}
            <div className="absolute inset-0 text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black leading-none opacity-20">
              <span className="inline-block text-red-500 animate-glitch-overlay-1">4</span>
              <span className="inline-block text-blue-500 animate-glitch-overlay-2">0</span>
              <span className="inline-block text-green-500 animate-glitch-overlay-3">4</span>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="block">PAGE NOT FOUND</span>
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-white mx-auto"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
              The page you're looking for seems to have vanished into the digital void.
              <br className="hidden sm:block" />
              But don't worry, let's get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            <Link href="/">
              <Button className="bg-white text-black hover:bg-gray-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                Back to Home
              </Button>
            </Link>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-transparent w-full sm:w-auto group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan-404"
            style={{
              top: `${20 + i * 20}%`,
              width: "100%",
              animationDelay: `${i * 1.5}s`,
              animationDuration: "6s",
            }}
          />
        ))}
      </div>
    </div>
  )
}
