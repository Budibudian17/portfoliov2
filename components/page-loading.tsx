"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function PageLoadingIndicator() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setLoading(false)
  }, [pathname, searchParams])

  return loading ? (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-loading-bar"></div>
    </div>
  ) : null
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Logo/Title Skeleton */}
        <div className="animate-pulse">
          <div className="h-12 w-64 bg-gray-800 rounded-lg mx-auto mb-4"></div>
          <div className="h-6 w-48 bg-gray-800 rounded-lg mx-auto"></div>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-400 text-sm animate-pulse">Loading content...</p>
      </div>
    </div>
  )
}
