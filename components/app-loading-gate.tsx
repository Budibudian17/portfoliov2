"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { LoadingScreenProps } from "@/components/loading-screen"
import type { IntroVideoProps } from "@/components/intro-video"

const LoadingScreen = dynamic<LoadingScreenProps>(
  () => import("@/components/loading-screen").then(mod => mod.LoadingScreen),
  { ssr: false }
)

const IntroVideo = dynamic<IntroVideoProps>(
  () => import("@/components/intro-video").then(mod => mod.IntroVideo),
  { ssr: false }
)

export default function AppLoadingGate({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showVideo, setShowVideo] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolio-visited")
    if (!hasVisited) {
      setIsLoading(true)
      setShowVideo(false)
      setShowContent(false)
      sessionStorage.setItem("portfolio-visited", "true")
    } else {
      setIsLoading(false)
      setShowVideo(false)
      setShowContent(true)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // After user clicks continue, show video immediately
    setShowVideo(true)
  }

  const handleVideoComplete = () => {
    setShowVideo(false)
    // After video completes, show main content
    setTimeout(() => {
      setShowContent(true)
    }, 300)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  if (showVideo) {
    return <IntroVideo onVideoComplete={handleVideoComplete} />
  }

  return (
    <div className={showContent ? "opacity-100 transition-opacity duration-500" : "opacity-0"}>
      {children}
    </div>
  )
} 