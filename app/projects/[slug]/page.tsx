"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

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

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getDoc(doc(db, "projects", id))
      .then((snap) => {
        if (!snap.exists()) {
          setError("Project tidak ditemukan.");
          setProject(null);
        } else {
          setProject({ id: snap.id, ...(snap.data() as Omit<Project, "id">) });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data project.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="text-red-400 mb-4">{error}</div>
        <Link href="/projects" className="text-blue-400 hover:underline">Kembali ke Projects</Link>
      </div>
    );
  }
  if (!project) return null;

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="mb-6 inline-flex w-auto items-center gap-2 px-4 py-2 rounded-full border border-blue-700 text-blue-400 hover:bg-blue-700 hover:text-white transition-colors text-sm font-semibold shadow-sm focus:outline-none"
          style={{ width: 'fit-content' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Projects
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-black mb-4">{project.title}</h1>
        
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-6">
          <Image src={"/img/avatar.png"} alt="Hilmi" width={28} height={28} className="w-7 h-7 rounded-full border border-gray-700" />
          <span>Hilmi</span>
          <span>•</span>
          <span>{project.createdAt && typeof project.createdAt.toDate === "function" ? new Date(project.createdAt.toDate()).toLocaleDateString() : "No date"}</span>
        </div>

        {project.image && (
          <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">Project Description</h2>
          <div className="prose prose-invert max-w-none text-lg leading-relaxed">
            {project.content ? (
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            ) : (
              <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {project.projectLink && (
            <Link
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-700 text-blue-400 hover:bg-blue-700 hover:text-white transition-colors text-sm font-semibold shadow-sm focus:outline-none"
            >
              <ExternalLink className="w-4 h-4" />
              View Live Project
            </Link>
          )}
          
          {project.githubLink && (
            <Link
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm font-semibold shadow-sm focus:outline-none"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 