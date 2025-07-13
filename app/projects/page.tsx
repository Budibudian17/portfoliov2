"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import Navbar from "@/components/navbar"

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  projectLink?: string;
  githubLink?: string;
  status?: "published" | "in-progress" | "planned";
  createdAt?: any;
  content?: string;
}

export default function ProjectsPage() {
  const { t } = useLanguage();
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

  // Sort projects by status priority and createdAt
  const statusPriority = { published: 0, "in-progress": 1, planned: 2 };
  const sortedProjects = [...projects].sort((a, b) => {
    const aPriority = statusPriority[a.status || "planned"];
    const bPriority = statusPriority[b.status || "planned"];
    if (aPriority !== bPriority) return aPriority - bPriority;
    // If same status, sort by createdAt desc
    const aDate = a.createdAt && typeof a.createdAt.toDate === "function" ? a.createdAt.toDate() : 0;
    const bDate = b.createdAt && typeof b.createdAt.toDate === "function" ? b.createdAt.toDate() : 0;
    return bDate - aDate;
  });

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

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
                {t("projects.page.title")}
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay px-4">
                {t("projects.page.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="pt-8 pb-16 px-4 min-h-screen max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8">{t("projects.page.allProjects")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading && <div className="text-gray-400 text-center col-span-full">{t("projects.page.loading")}</div>}
          {!loading && projects.length === 0 && <div className="text-gray-500 text-center col-span-full">{t("projects.page.noProjects")}</div>}
          {!loading && sortedProjects.map((project) => (
            <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden group flex flex-col focus:outline-none transition-all hover:border-blue-500 hover:shadow-blue-900/30">
              <div className="relative h-48 overflow-hidden">
                {project.image ? (
                  <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs">No Image</div>
                )}
                {project.status && (
                  <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md z-10 ${
                    project.status === "published" ? "bg-green-600" :
                    project.status === "in-progress" ? "bg-yellow-600" :
                    "bg-gray-600"
                  } text-white bg-opacity-90`}>
                    {project.status === "published" ? "Live" :
                     project.status === "in-progress" ? "Development" :
                     "Idea"}
                  </span>
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
                  {t("projects.page.readMore")}
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