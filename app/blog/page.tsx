"use client"

import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Pin } from "lucide-react"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  thumbnail: string;
  content: string;
  author: string;
  category: string;
}

export default function BlogPage() {
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const q = query(collection(db, "blogs"), orderBy("date", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<BlogPost, "id">) }));
      setBlogs(data);
      setLoading(false);
    }, (err) => {
      setError("Gagal mengambil data blog.");
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Mapping kategori ke warna badge
  const badgeColorMap: Record<string, string> = {
    "Project Experience": "bg-blue-600",
    "Tech Stack": "bg-gray-700",
    "Learning": "bg-yellow-600",
    "Personal Growth": "bg-cyan-700",
    "Other": "bg-purple-700",
  };

  // Pin post dengan judul tertentu (misal: CiptaLife Healthcare Platform)
  const PINNED_TITLE = "CiptaLife Healthcare Platform";
  const pinnedPost = blogs.find((post) => post.title === PINNED_TITLE);
  const otherPosts = blogs.filter((post) => post.title !== PINNED_TITLE);
  const allArticles = pinnedPost ? [pinnedPost, ...otherPosts] : blogs;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
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
                {t("blog.page.title")}
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay px-4">
                {t("blog.page.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <main className="pt-8 pb-16 px-4 min-h-screen max-w-7xl mx-auto">
        {/* All Articles Section */}
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8">{t("blog.page.allArticles")}</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {/* Categories removed as per new_code, but keeping the structure */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading && <div className="text-gray-400 text-center col-span-full">{t("blog.page.loading")}</div>}
          {error && <div className="text-red-400 text-center col-span-full">{error}</div>}
          {!loading && blogs.length === 0 && <div className="text-gray-500 text-center col-span-full">{t("blog.page.noPosts")}</div>}
          {!loading && allArticles.map((post, idx) => (
            <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden group flex flex-col focus:outline-none">
              <div className="relative h-48 overflow-hidden">
                {/* Pin icon jika post di-pin */}
                {post.title === PINNED_TITLE && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-black/80 px-2 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m4-6v6m0 0l-2-2m2 2l2-2" /></svg>
                    <span className="text-xs text-white font-semibold">Pinned</span>
                  </div>
                )}
                {post.thumbnail ? (
                  <Image src={post.thumbnail} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs">No Image</div>
                )}
                <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${badgeColorMap[post.category] || "bg-gray-700"} text-white bg-opacity-90`}>
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">{post.summary}</p>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <Image src={"/img/avatar.png"} alt="Hilmi" width={28} height={28} className="w-7 h-7 rounded-full border border-gray-700" />
                  <span className="text-xs text-gray-400">Hilmi &bull; {new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-flex w-auto items-center gap-2 px-4 py-2 rounded-full border border-blue-700 text-blue-400 hover:bg-blue-700 hover:text-white transition-colors text-sm font-semibold shadow-sm focus:outline-none"
                  style={{ width: 'fit-content' }}
                >
                  {t("blog.page.readMore")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 