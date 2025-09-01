"use client"

import { useEffect, useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [audioReady, setAudioReady] = useState(false)

  // Play audio on mount (muted)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
      audioRef.current.volume = isMuted ? 0 : 0.3
      audioRef.current.play().catch(() => {})
    }
  }, [isMuted, audioReady])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false
        audioRef.current.volume = 0.3
      } else {
        audioRef.current.muted = true
        audioRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      {/* Audio Player & Control - Bottom Left */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        muted={isMuted}
        onCanPlayThrough={() => setAudioReady(true)}
        style={{ display: "none" }}
      >
        <source src="/audio/opening.mp3" type="audio/mpeg" />
        <source src="/audio/opening.ogg" type="audio/ogg" />
      </audio>
      {audioReady && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-black/80 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-300 border border-white/30 shadow-lg backdrop-blur-sm"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
        </button>
      )}
    </>
  )
}
