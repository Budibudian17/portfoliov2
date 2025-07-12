"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Code,
  Palette,
  Zap,
  Calendar,
  Building,
  Volume2,
  VolumeX,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { GitHubContributions } from "@/components/github-contributions"
import dynamic from "next/dynamic"
import type { LoadingScreenProps } from "@/components/loading-screen"
import Navbar from "@/components/navbar";
const LoadingScreen = dynamic<LoadingScreenProps>(
  () => import("@/components/loading-screen").then(mod => mod.LoadingScreen),
  { ssr: false }
)

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const { t } = useLanguage()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [audioReady, setAudioReady] = useState(false)

  // Sertifikat modal state
  const [openCertModal, setOpenCertModal] = useState(false)
  const [selectedCert, setSelectedCert] = useState<{ src: string; alt: string } | null>(null)

  // Sertifikat data (biar DRY)
  const certificates = [
    { src: "/img/sertiflsp.jpeg", alt: "BNSP" },
    { src: "/img/skorttoeic.jpeg", alt: "TOEIC" },
    { src: "/img/sertifpkl.jpeg", alt: "Internship" },
    { src: "/img/setifgame.jpg", alt: "Game Dev" },
    { src: "/img/sertifpublik.png", alt: "Public Speaking" },
    { src: "/img/sertifikasikelasindustri.jpg", alt: "Industry Class" },
  ]

  useEffect(() => {
    // IMPROVED Scroll reveal animation - More responsive!
    const observerOptions = {
      threshold: 0.15, // Trigger when 15% of element is visible (was 0.1)
      rootMargin: "0px 0px -20px 0px", // Trigger earlier (was -50px)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll(
      ".reveal-on-scroll, .reveal-on-scroll-delay, .reveal-on-scroll-delay-2",
    )
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [])

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
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.muted = true
        audioRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
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

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid-background"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none animate-slide-up">
                {t("hero.title1")}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                  {t("hero.title2")}
                </span>
              </h1>
            </div>

            <div className="overflow-hidden">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay px-4">
                {t("hero.subtitle")}
                <br className="hidden sm:block" />
                {t("hero.subtitle2")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-slide-up-delay-2 px-4">
              <Button className="bg-white text-black hover:bg-gray-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group w-full sm:w-auto">
                {t("hero.cta.work")}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-transparent w-full sm:w-auto"
              >
                <a href="/CV.pdf" download>
                  <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  {t("hero.cta.cv")}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2 animate-scroll-indicator"></div>
          </div>
        </div>
      </section>

      {/* About Section with Reveal Animation */}
      <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white text-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8 reveal-on-scroll">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
                  {t("about.title")}
                  <br />
                  <span className="text-gray-400">{t("about.title2")}</span>
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-black"></div>
              </div>

              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t("about.description1")}</p>
                <p>{t("about.description2")}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">{t("about.location")}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative reveal-on-scroll-delay">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="space-y-3 sm:space-y-4 text-center p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-black">3</div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                    {t("about.stats.projects")}
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4 text-center p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-black">3+</div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                    {t("about.stats.experience")}
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4 text-center p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-black">10+</div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                    {t("about.stats.clients")}
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4 text-center p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-black">100%</div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                    {t("about.stats.satisfaction")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="work" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 reveal-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
              {t("projects.title")}
              <br />
              <span className="text-gray-400">{t("projects.title2")}</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-black mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
              {t("projects.subtitle")}
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {/* Project 1 - CiptaLife */}
            <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 items-center reveal-on-scroll">
              <div className="lg:col-span-3 space-y-4 sm:space-y-6 order-2 lg:order-1">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-black">{t("projects.ciptalife.title")}</h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {t("projects.ciptalife.description")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    HTML
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    CSS
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    NEXT JS
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    REACT JS
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    GOLANG
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    MYSQL
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("projects.demo")}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white bg-transparent w-full sm:w-auto"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    {t("projects.code")}
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-2 relative group order-1 lg:order-2">
                <div className="absolute inset-0 bg-black rounded-lg sm:rounded-xl transform rotate-1 sm:rotate-2 group-hover:rotate-2 sm:group-hover:rotate-3 transition-transform duration-300"></div>
                {/* Mobile image */}
                <Image
                  src="/img/cipta2mobile.png"
                  alt="CiptaLife Healthcare Platform Mobile"
                  width={350}
                  height={200}
                  className="relative rounded-lg sm:rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-300 w-full h-32 sm:h-40 md:h-48 lg:h-auto object-cover block sm:hidden"
                />
                {/* Desktop image */}
                <Image
                  src="/img/cipta2.jpg"
                  alt="CiptaLife Healthcare Platform"
                  width={350}
                  height={200}
                  className="relative rounded-lg sm:rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-300 w-full h-32 sm:h-40 md:h-48 lg:h-auto object-cover hidden sm:block"
                />
              </div>
            </div>

            {/* Project 2 - ERP System */}
            <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 items-center reveal-on-scroll">
              <div className="lg:col-span-2 relative group order-1">
                <div className="absolute inset-0 bg-black rounded-lg sm:rounded-xl transform -rotate-1 sm:-rotate-2 group-hover:-rotate-2 sm:group-hover:-rotate-3 transition-transform duration-300"></div>
                {/* Mobile image */}
                <Image
                  src="/img/erpmobile.png"
                  alt="ERP System Mobile"
                  width={350}
                  height={200}
                  className="relative rounded-lg sm:rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-300 w-full h-32 sm:h-40 md:h-48 lg:h-auto object-cover block sm:hidden"
                />
                {/* Desktop image */}
                <Image
                  src="/img/erp.jpg"
                  alt="ERP System"
                  width={350}
                  height={200}
                  className="relative rounded-lg sm:rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-300 w-full h-32 sm:h-40 md:h-48 lg:h-auto object-cover hidden sm:block"
                />
              </div>
              <div className="lg:col-span-3 space-y-4 sm:space-y-6 order-2">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-black">{t("projects.erp.title")}</h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{t("projects.erp.description")}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    HTML
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    CSS
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    JAVASCRIPT
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    PHALCON
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    MYSQL
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("projects.demo")}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white bg-transparent w-full sm:w-auto"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    {t("projects.code")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Project 3 - Portfolio */}
            <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 items-center reveal-on-scroll">
              <div className="lg:col-span-3 space-y-4 sm:space-y-6 order-2 lg:order-1">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-black">{t("projects.portfolio.title")}</h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {t("projects.portfolio.description")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    Next.js
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    TypeScript
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    Tailwind CSS
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    Framer Motion
                  </Badge>
                  <Badge variant="outline" className="border-black text-black text-xs sm:text-sm">
                    Vercel
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("projects.demo")}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white bg-transparent w-full sm:w-auto"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    {t("projects.code")}
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-2 relative group order-1 lg:order-2">
                <div className="absolute inset-0 bg-black rounded-lg sm:rounded-xl transform rotate-1 sm:rotate-2 group-hover:rotate-2 sm:group-hover:rotate-3 transition-transform duration-300"></div>
                {/* Mobile image */}
                <Image
                  src="/img/portfoliomobile.png"
                  alt="Personal Portfolio Website Mobile"
                  width={350}
                  height={200}
                  className="relative rounded-lg sm:rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-300 w-full h-32 sm:h-40 md:h-48 lg:h-auto object-cover block sm:hidden"
                />
                {/* Desktop image */}
                <Image
                  src="/img/portfolio.jpg"
                  alt="Personal Portfolio Website"
                  width={350}
                  height={200}
                  className="relative rounded-lg sm:rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-300 w-full h-32 sm:h-40 md:h-48 lg:h-auto object-cover hidden sm:block"
                />
              </div>
            </div>
          </div>
          {/* Tombol View More */}
          <div className="flex justify-center mt-8 reveal-on-scroll">
            <Button asChild className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base sm:text-lg font-semibold rounded-full shadow-lg">
              <Link href="/projects">{t("projects.viewMore")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 reveal-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
              {t("experience.title")}
              <br />
              <span className="text-gray-400">{t("experience.title2")}</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-black mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
              {t("experience.subtitle")}
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Experience 1 - Fulltime */}
            <div className="relative reveal-on-scroll">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                <div className="lg:w-1/3">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center overflow-hidden">
                      <Image src="/img/ciptadra.jpg" alt="PT. Ciptadra SoftIndo" width={48} height={48} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black">{t("experience.ciptalife.title")}</h3>
                      <p className="text-gray-600 font-medium">{t("experience.ciptalife.company")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 mb-4 lg:mb-0">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{t("experience.ciptalife.period")}</span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {t("experience.ciptalife.description")}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="border-black text-black text-xs">
                      React
                    </Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">
                      Next.js
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience 2 - Intern */}
            <div className="relative reveal-on-scroll-delay">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                <div className="lg:w-1/3">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center overflow-hidden">
                    <Image src="/img/ciptadra.jpg" alt="PT. Ciptadra SoftIndo" width={48} height={48} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black">{t("experience.ciptalifeintern.title")}</h3>
                      <p className="text-gray-600 font-medium">{t("experience.ciptalifeintern.company")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 mb-4 lg:mb-0">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{t("experience.ciptalifeintern.period")}</span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {t("experience.ciptalifeintern.description")}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="border-black text-black text-xs">
                      React
                    </Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">
                      Golang
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 reveal-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
              {t("education.title")}
              <br />
              <span className="text-gray-400">{t("education.title2")}</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-black mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
              {t("education.subtitle")}
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Education 1 - University */}
            <div className="relative reveal-on-scroll">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                <div className="lg:w-1/3">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center overflow-hidden">
                      <Image src="/img/smkn1depok.jpg" alt="SMKN 01 Depok" width={48} height={48} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black">{t("education.university.degree")}</h3>
                      <p className="text-gray-600 font-medium">{t("education.university.school")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 mb-4 lg:mb-0">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{t("education.university.period")}</span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                    {t("education.university.description")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-black text-black text-xs">HTML</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">CSS</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">JavaScript</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">PHP</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">Web</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">Mobile</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">Game</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Education 2 - High School */}
            <div className="relative reveal-on-scroll-delay">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                <div className="lg:w-1/3">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                      <Image src="/img/smpn3depok.jpg" alt="SMPN 03 Depok" width={48} height={48} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black">{t("education.highschool.degree")}</h3>
                      <p className="text-gray-600 font-medium">{t("education.highschool.school")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 mb-4 lg:mb-0">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{t("education.highschool.period")}</span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                    {t("education.highschool.description")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-black text-black text-xs">School Activities</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">IT Basics</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">Computers</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Education 3 - Certifications */}
            <div className="relative reveal-on-scroll-delay-2">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                <div className="lg:w-1/3">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black">{t("education.certifications.title")}</h3>
                      <p className="text-gray-600 font-medium">{t("education.certifications.subtitle")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 mb-4 lg:mb-0">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{t("education.certifications.period")}</span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                    {t("education.certifications.description")}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {/* Sertifikat cards, clickable */}
                    {certificates.map((cert, idx) => (
                      <button
                        key={cert.alt}
                        type="button"
                        className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-3 focus:outline-none shadow-lg hover:shadow-2xl transition-shadow min-h-[90px] h-full w-full"
                        onClick={() => { setSelectedCert(cert); setOpenCertModal(true) }}
                        tabIndex={0}
                        aria-label={`View certificate: ${cert.alt}`}
                      >
                        <Image src={cert.src} alt={cert.alt} width={32} height={32} className="rounded" />
                        <div className="flex flex-col items-start justify-center h-full">
                          {idx === 0 && <><h4 className="font-semibold text-sm text-gray-800 mb-1">{t("certificates.competence.title")}</h4><p className="text-xs text-gray-600">{t("certificates.competence.desc")}</p></>}
                          {idx === 1 && <><h4 className="font-semibold text-sm text-gray-800 mb-1">{t("certificates.toeic.title")}</h4><p className="text-xs text-gray-600">{t("certificates.toeic.desc")}</p></>}
                          {idx === 2 && <><h4 className="font-semibold text-sm text-gray-800 mb-1">{t("certificates.internship.title")}</h4><p className="text-xs text-gray-600">{t("certificates.internship.desc")}</p></>}
                          {idx === 3 && <><h4 className="font-semibold text-sm text-gray-800 mb-1">{t("certificates.gamedev.title")}</h4><p className="text-xs text-gray-600">{t("certificates.gamedev.desc")}</p></>}
                          {idx === 4 && <><h4 className="font-semibold text-sm text-gray-800 mb-1">{t("certificates.publicspeaking.title")}</h4><p className="text-xs text-gray-600">{t("certificates.publicspeaking.desc")}</p></>}
                          {idx === 5 && <><h4 className="font-semibold text-sm text-gray-800 mb-1">{t("certificates.industryclass.title")}</h4><p className="text-xs text-gray-600">{t("certificates.industryclass.desc")}</p></>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Activity Section - More Compact */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 reveal-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
              {t("github.title")}
              <br />
              <span className="text-gray-400">{t("github.title2")}</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-white mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-400 mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
              {t("github.subtitle")}
            </p>
          </div>

          <div className="reveal-on-scroll">
            <GitHubContributions t={t} />
          </div>
        </div>
      </section>

      {/* Skills Section with Interactive Cards */}
      <section id="skills" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 reveal-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              {t("skills.title")}
              <br />
              <span className="text-gray-400">{t("skills.title2")}</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
            <Card className="bg-gray-900 border-gray-800 hover:border-white transition-all duration-300 group reveal-on-scroll">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Code className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
                  {t("skills.frontend.title")}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{t("skills.frontend.description")}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">
                    React
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">
                    Next.js
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">
                    TypeScript
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-white transition-all duration-300 group reveal-on-scroll-delay">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
                  {t("skills.backend.title")}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{t("skills.backend.description")}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">{t("skills.backend.nodejs")}</Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">{t("skills.backend.mysql")}</Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">{t("skills.backend.golang")}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-white transition-all duration-300 group reveal-on-scroll-delay-2 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
                  {t("skills.design.title")}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{t("skills.design.description")}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">{t("skills.design.figma")}</Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">{t("skills.design.balsamiq")}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tech Stack Marquee */}
          <div className="space-y-6 sm:space-y-8 reveal-on-scroll">
            <div className="flex animate-marquee-tech space-x-8 sm:space-x-12 whitespace-nowrap">
              {[
                "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "MySQL", "Golang", "Figma", "Balsamiq"
              ].map(
                (tech, index) => (
                  <div
                    key={index}
                    className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </div>
                ),
              )}
              {[
                "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "MySQL", "Golang", "Figma", "Balsamiq"
              ].map(
                (tech, index) => (
                  <div
                    key={`dup-${index}`}
                    className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center reveal-on-scroll">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8">
            {t("contact.title")}
            <br />
            <span className="text-gray-400">{t("contact.title2")}</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-white mx-auto mb-8 sm:mb-12"></div>

          <p className="text-lg sm:text-xl text-gray-400 mb-12 sm:mb-16 max-w-2xl mx-auto px-4">
            {t("contact.subtitle")}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hilmifarrel03@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="space-y-3 sm:space-y-4 group block rounded-xl transition-shadow focus:outline-none"
              aria-label="Email"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">{t("contact.email")}</h3>
              <p className="text-sm sm:text-base text-gray-400">hilmifarrel03@gmail.com</p>
            </a>
            <a
              href="https://github.com/Budibudian17"
              target="_blank"
              rel="noopener noreferrer"
              className="space-y-3 sm:space-y-4 group block rounded-xl transition-shadow focus:outline-none"
              aria-label="GitHub"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Github className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">{t("contact.github")}</h3>
              <p className="text-sm sm:text-base text-gray-400">@Budibudian17</p>
            </a>
            <a
              href="https://www.linkedin.com/in/hilmifarrel-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="space-y-3 sm:space-y-4 group sm:col-span-2 lg:col-span-1 block rounded-xl transition-shadow focus:outline-none"
              aria-label="LinkedIn"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Linkedin className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">{t("contact.linkedin")}</h3>
              <p className="text-sm sm:text-base text-gray-400">@Hilmi Farrel Firjatullah</p>
            </a>
          </div>

          <Button className="bg-white text-black hover:bg-gray-200 px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-bold group w-full sm:w-auto">
            {t("contact.cta")}
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>

      {/* Modal Sertifikat */}
      {openCertModal && selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => { setOpenCertModal(false); setSelectedCert(null) }}
        >
          <div
            className="relative bg-white rounded-lg shadow-xl p-4 max-w-full max-h-full flex flex-col items-center"
            style={{ minWidth: 320, minHeight: 200 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-black text-2xl font-bold focus:outline-none"
              onClick={() => { setOpenCertModal(false); setSelectedCert(null) }}
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src={selectedCert.src}
              alt={selectedCert.alt}
              width={480}
              height={340}
              className="rounded max-h-[70vh] w-auto h-auto object-contain"
            />
            <div className="mt-2 text-center text-gray-800 text-sm font-medium">{selectedCert.alt}</div>
          </div>
        </div>
      )}
    </div>
  )
}
