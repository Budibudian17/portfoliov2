"use client"

import { useEffect, useRef, useState } from "react"

export interface IntroVideoProps {
  onVideoComplete: () => void
  videoPath?: string
}

export function IntroVideo({ onVideoComplete, videoPath = "/video/intro.mp4" }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSkipHint, setShowSkipHint] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set video to play immediately - no loading state
    setIsPlaying(true)

    let hasTriedPlay = false // Prevent multiple play() calls

    const handleEnded = () => {
      onVideoComplete()
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handleError = () => {
      console.error("Error loading video:", videoPath)
      // If video fails to load, skip to main content
      setTimeout(() => {
        onVideoComplete()
      }, 1000)
    }

    // Try to play only once when video is ready
    const tryPlay = () => {
      if (hasTriedPlay) return // Prevent multiple calls
      
      // Only try to play if video is ready
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        hasTriedPlay = true
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              // Ignore interruption errors
              if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
                console.error("Error playing video:", error)
              }
              // Still mark as playing to avoid loading overlay
              setIsPlaying(true)
            })
        }
      }
    }

    // Try playing when video can play (readyState >= 3)
    const handleCanPlay = () => {
      tryPlay()
    }

    // Also try when loaded enough data (readyState >= 2)
    const handleLoadedData = () => {
      tryPlay()
    }

    video.addEventListener("ended", handleEnded)
    video.addEventListener("play", handlePlay)
    video.addEventListener("error", handleError)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("canplay", handleCanPlay)

    // Don't call load() if video already has source and is loading
    // Only load if needed
    if (video.readyState === 0) {
      video.load()
    } else {
      // Video already has data, try playing immediately
      tryPlay()
    }

    return () => {
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("error", handleError)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [onVideoComplete, videoPath])

  const handleSkip = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
    }
    onVideoComplete()
  }

  // Show skip hint after 5 seconds from component mount (when user clicked continue)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkipHint(true)
    }, 5000) // 5 seconds delay

    return () => {
      clearTimeout(timer)
    }
  }, []) // Run once on mount

  // Remove body/html margin/padding when video is mounted for true fullscreen
  useEffect(() => {
    const originalBodyStyle = {
      margin: document.body.style.margin,
      padding: document.body.style.padding,
      overflow: document.body.style.overflow,
    }
    const originalHtmlStyle = {
      margin: document.documentElement.style.margin,
      padding: document.documentElement.style.padding,
      overflow: document.documentElement.style.overflow,
      height: document.documentElement.style.height,
    }

    // Remove all margins and padding for fullscreen
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.margin = '0'
    document.documentElement.style.padding = '0'
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.height = '100%'

    return () => {
      // Restore original styles when component unmounts
      document.body.style.margin = originalBodyStyle.margin
      document.body.style.padding = originalBodyStyle.padding
      document.body.style.overflow = originalBodyStyle.overflow
      document.documentElement.style.margin = originalHtmlStyle.margin
      document.documentElement.style.padding = originalHtmlStyle.padding
      document.documentElement.style.overflow = originalHtmlStyle.overflow
      document.documentElement.style.height = originalHtmlStyle.height
    }
  }, [])

  // Handle keyboard shortcut (Space to skip)
  useEffect(() => {
    if (!isPlaying) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        const video = videoRef.current
        if (video) {
          video.pause()
        }
        onVideoComplete()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [isPlaying, onVideoComplete])

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        backgroundColor: 'black',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Video - Fullscreen without any container that might take space */}
      <video
        ref={videoRef}
        playsInline
        muted={false}
        preload="auto"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          minWidth: '100vw',
          minHeight: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          margin: 0,
          padding: 0,
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
        }}
      >
        <source src={videoPath} type="video/mp4" />
        <source src={videoPath.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Skip Hint - Overlay on top of video (appears after 5 seconds) */}
      {showSkipHint && (
        <div 
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 10000,
            pointerEvents: 'auto',
            margin: 0,
            padding: 0,
          }}
        >
          <button
            onClick={handleSkip}
            className="text-white/70 hover:text-white text-xs sm:text-sm font-light tracking-wide backdrop-blur-sm bg-black/20 hover:bg-black/30 px-3 py-1.5 rounded-md transition-all duration-200 active:scale-95"
          >
            <span className="hidden sm:inline">Press </span>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs sm:text-sm font-mono border border-white/20">
              Space
            </kbd>
            <span className="hidden sm:inline"> to skip</span>
            <span className="sm:hidden">Tap to skip</span>
          </button>
        </div>
      )}
    </div>
  )
}

