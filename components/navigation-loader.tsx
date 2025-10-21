"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function NavigationLoader() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const [previousPathname, setPreviousPathname] = useState(pathname)

  useEffect(() => {
    // Detect route change
    if (pathname !== previousPathname) {
      setLoading(true)
      setProgress(0)

      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + Math.random() * 30
        })
      }, 200)

      // Complete loading after a short delay
      const timeout = setTimeout(() => {
        setProgress(100)
        setTimeout(() => {
          setLoading(false)
          setProgress(0)
        }, 300)
      }, 800)

      setPreviousPathname(pathname)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [pathname, previousPathname])

  if (!loading && progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <div 
        className="h-1 bg-gradient-to-r from-white/60 via-white to-white/60 transition-all duration-300 ease-out shadow-lg shadow-white/50"
        style={{ 
          width: `${progress}%`,
          opacity: loading ? 1 : 0
        }}
      />
    </div>
  )
}
