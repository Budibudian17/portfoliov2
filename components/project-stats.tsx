"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, onSnapshot } from "firebase/firestore"
import { useLanguage } from "@/contexts/language-context"
import { FolderOpen, Users, User } from "lucide-react"

interface Project {
  id: string;
  title: string;
  projectType?: "individual" | "collaboration";
  status?: "published" | "in-progress" | "planned";
}

export default function ProjectStats() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"));
    const unsub = onSnapshot(q, (snapshot) => {
      setProjects(
        snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Project, "id">) }))
      );
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-pulse">
          <div className="h-4 bg-gray-800 rounded mb-4"></div>
          <div className="h-8 bg-gray-800 rounded"></div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-pulse">
          <div className="h-4 bg-gray-800 rounded mb-4"></div>
          <div className="h-8 bg-gray-800 rounded"></div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-pulse">
          <div className="h-4 bg-gray-800 rounded mb-4"></div>
          <div className="h-8 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  const totalProjects = projects.length;
  const individualProjects = projects.filter(p => p.projectType === "individual").length;
  const contributionProjects = projects.filter(p => p.projectType === "collaboration").length;
  const publishedProjects = projects.filter(p => p.status === "published").length;
  const inProgressProjects = projects.filter(p => p.status === "in-progress").length;
  const plannedProjects = projects.filter(p => p.status === "planned").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Projects */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Projects</p>
            <p className="text-2xl font-bold text-white">{totalProjects}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Published:</span>
            <span className="text-green-400 font-semibold">{publishedProjects}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">In Progress:</span>
            <span className="text-yellow-400 font-semibold">{inProgressProjects}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Planned:</span>
            <span className="text-gray-400 font-semibold">{plannedProjects}</span>
          </div>
        </div>
      </div>

      {/* Individual Projects */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Individual</p>
            <p className="text-2xl font-bold text-white">{individualProjects}</p>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {individualProjects > 0 ? (
            <span className="text-purple-400">
              {((individualProjects / totalProjects) * 100).toFixed(1)}% of total
            </span>
          ) : (
            <span>No individual projects yet</span>
          )}
        </div>
      </div>

      {/* Contribution Projects */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Contributions</p>
            <p className="text-2xl font-bold text-white">{contributionProjects}</p>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {contributionProjects > 0 ? (
            <span className="text-orange-400">
              {((contributionProjects / totalProjects) * 100).toFixed(1)}% of total
            </span>
          ) : (
            <span>No contribution projects yet</span>
          )}
        </div>
      </div>
    </div>
  );
}
