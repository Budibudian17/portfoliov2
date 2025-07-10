"use client"

import { useEffect } from "react"

export function ScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    // Observe all elements with reveal classes
    const revealElements = document.querySelectorAll(
      ".reveal-on-scroll, .reveal-on-scroll-delay, .reveal-on-scroll-delay-2",
    )
    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
