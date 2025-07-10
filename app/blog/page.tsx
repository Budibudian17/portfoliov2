"use client"

import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Pin } from "lucide-react"
import { useState } from "react"

let blogPosts = [
  // 🔧 Tentang Proyek & Pengalaman
  {
    slug: "build-erp-system",
    titleKey: "blog.erp.title",
    summaryKey: "blog.erp.summary",
    date: "2025-02-01",
    thumbnail: "/img/blog1.png",
    category: "Project Experience",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-blue-600",
  },
  {
    slug: "building-ciptalife",
    titleKey: "blog.ciptalife.title",
    summaryKey: "blog.ciptalife.summary",
    date: "2025-05-30",
    thumbnail: "/img/blog2.png",
    category: "Project Experience",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-teal-600",
  },
  // 💻 Tentang Koding dan Stack
  {
    slug: "why-nextjs-portfolio",
    titleKey: "blog.whyNextjs.title",
    summaryKey: "blog.whyNextjs.summary",
    date: "2025-08-28",
    thumbnail: "/img/blog4.png",
    category: "Tech Stack",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-gray-700",
  },
  {
    slug: "role-based-access-nextjs",
    titleKey: "blog.roleBasedAccess.title",
    summaryKey: "blog.roleBasedAccess.summary",
    date: "2024-04-15",
    thumbnail: "/img/blog5.png",
    category: "Tech Stack",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-purple-700",
  },
  {
    slug: "tailwind-dashboard-ui",
    titleKey: "blog.tailwindDashboard.title",
    summaryKey: "blog.tailwindDashboard.summary",
    date: "2024-04-01",
    thumbnail: "/img/blog6.png",
    category: "Tech Stack",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-pink-600",
  },
  // 🧠 Tentang Journey & Belajar
  {
    slug: "learning-journey-student",
    titleKey: "blog.learningJourney.title",
    summaryKey: "blog.learningJourney.summary",
    date: "2024-03-20",
    thumbnail: "/img/blog7.png",
    category: "Learning",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-yellow-600",
  },
  {
    slug: "real-projects-vs-tutorials",
    titleKey: "blog.realProjects.title",
    summaryKey: "blog.realProjects.summary",
    date: "2024-10-10",
    thumbnail: "/img/blog8.png",
    category: "Learning",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-orange-600",
  },
  // 🗺️ Tentang Proyek Lokal
  {
    slug: "self-taught-motivation",
    titleKey: "blog.selfTaughtMotivation.title",
    summaryKey: "blog.selfTaughtMotivation.summary",
    date: "2024-02-25",
    thumbnail: "/img/blog9.png",
    category: "Personal Growth",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-cyan-700",
  },
  {
    slug: "soft-skills-in-tech",
    titleKey: "blog.softSkills.title",
    summaryKey: "blog.softSkills.summary",
    date: "2025-02-10",
    thumbnail: "/img/blog10.png",
    category: "Personal Growth",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-lime-700",
  },
]

// Urutkan blogPosts dari yang terbaru ke yang terlama
blogPosts = blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// Pin post CiptaLife di paling atas
const pinnedKey = "blog.ciptalife.title"
const pinnedPost = blogPosts.find(post => post.titleKey === pinnedKey)
const otherPosts = blogPosts.filter(post => post.titleKey !== pinnedKey)
const allArticles = pinnedPost ? [pinnedPost, ...otherPosts] : otherPosts

export default function BlogPage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")
  // Featured: 2 artikel pertama
  const featured = blogPosts.slice(0, 2)

  const categories = [
    { label: t("blog.category.all"), value: "all" },
    { label: t("blog.category.project"), value: "project-experience" },
    { label: t("blog.category.tech"), value: "tech-stack" },
    { label: t("blog.category.learning"), value: "learning" },
    { label: t("blog.category.growth"), value: "personal-growth" },
  ]

  // Filter articles by activeCategory
  const filteredArticles = activeCategory === "all"
    ? allArticles
    : allArticles.filter(post => post.category.replace(/\s+/g, '-').toLowerCase() === activeCategory)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar tetap pakai komponen yang sama */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-xl font-bold text-white">HILMI PORTFOLIO</div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
                {t("nav.home")}
              </Link>
              <Link href="/projects" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
                {t("nav.project")}
              </Link>
              <Link href="/blog" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider font-bold">
                {t("nav.blog")}
              </Link>
              <LanguageSwitcher />
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm" className="text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section ala homepage */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="grid-background"></div>
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight animate-slide-up">
                {t("blog.hero.title")}
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay px-4">
                {t("blog.hero.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <main className="pt-8 pb-16 px-4 min-h-screen max-w-7xl mx-auto">
        {/* All Articles Section */}
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8">{t("blog.allArticles")}</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1 rounded-full text-sm font-semibold cursor-pointer transition-all
                ${activeCategory === cat.value ? 'bg-white text-black' : 'bg-gray-800 text-gray-200'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredArticles.map((post, idx) => (
            <Link href={`/blog/${post.slug}`} key={post.slug + '-' + idx} className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden group border border-gray-800 hover:shadow-2xl transition-all flex flex-col focus:outline-none">
              <div className="relative h-48 overflow-hidden">
                {/* Pin icon jika post di-pin */}
                {post.titleKey === "blog.ciptalife.title" && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-black/80 px-2 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                    <Pin className="w-4 h-4 text-white" />
                    <span className="text-xs text-white font-semibold">{t("blog.pinned")}</span>
                  </div>
                )}
                <img src={post.thumbnail} alt={t(post.titleKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" />
                <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${post.badgeColor} text-white bg-opacity-90`}>{post.category}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">{t(post.titleKey)}</h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">{t(post.summaryKey)}</p>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <img src={post.avatar} alt={post.author} className="w-7 h-7 rounded-full border border-gray-700" />
                  <span className="text-xs text-gray-400">{post.author} &bull; {new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
} 