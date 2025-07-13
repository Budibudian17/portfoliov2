"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  projectLink: string;
  githubLink?: string;
  createdAt?: any;
  content?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setProjects(
        snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Project, "id">) }))
      );
      setLoading(false);
    });
    return () => unsub();
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-xl font-bold text-white">HILMI PORTFOLIO</div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
                Home
              </Link>
              <Link href="/projects" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider font-bold">
                Projects
              </Link>
              <Link href="/blog" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
                Blog
              </Link>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <button className="text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="grid-background"></div>
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight animate-slide-up">
                My Projects
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay px-4">
                A collection of my featured and personal projects. Explore more of my work below!
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="pt-8 pb-16 px-4 min-h-screen max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8">All Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading && <div className="text-gray-400 text-center col-span-full">Loading projects...</div>}
          {!loading && projects.length === 0 && <div className="text-gray-500 text-center col-span-full">Belum ada project.</div>}
          {!loading && projects.map((project) => (
            <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden group flex flex-col focus:outline-none transition-all hover:border-blue-500 hover:shadow-blue-900/30">
              <div className="relative h-48 overflow-hidden">
                {project.image ? (
                  <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs">No Image</div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">{project.description?.slice(0, 120)}{project.description && project.description.length > 120 ? '...' : ''}</p>
                </div>
                <div className="flex items-center gap-2 mt-auto mb-2">
                  <Image src="/img/avatar.png" alt="Admin" width={28} height={28} className="w-7 h-7 rounded-full border border-gray-700" />
                  <span className="text-xs text-gray-400">Hilmi</span>
                  {project.createdAt && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">{typeof project.createdAt.toDate === "function" ? new Date(project.createdAt.toDate()).toLocaleDateString() : ""}</span>
                    </>
                  )}
                </div>
                <Link
                  href={`/projects/${project.id}`}
                  className="mt-4 inline-flex w-auto items-center gap-2 px-4 py-2 rounded-full border border-blue-700 text-blue-400 hover:bg-blue-700 hover:text-white transition-colors text-sm font-semibold shadow-sm focus:outline-none"
                  style={{ width: 'fit-content' }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
} 