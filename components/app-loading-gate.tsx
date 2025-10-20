"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { LoadingScreenProps } from "@/components/loading-screen"
const LoadingScreen = dynamic<LoadingScreenProps>(
  () => import("@/components/loading-screen").then(mod => mod.LoadingScreen),
  { ssr: false }
)

export default function AppLoadingGate({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem("portfolio-visited")
    if (!hasVisited) {
      setIsLoading(true)
      setShowContent(false)
      sessionStorage.setItem("portfolio-visited", "true")
    } else {
      setIsLoading(false)
      setShowContent(true)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => setShowContent(true), 300)
  }

  // Prevent hydration mismatch by showing content only after mount
  if (!isMounted) {
    return <div className="min-h-screen bg-black" />
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className={showContent ? "opacity-100 transition-opacity duration-500" : "opacity-0"}>
      {children}
    </div>
  )
}