// app/admin-dashboard/projects/page.tsx
"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { Edit, Trash2, Plus, Save, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  projectLink: string;
  githubLink?: string;
  createdAt?: any;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Partial<Project>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setProjects(
        snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Project, "id">) }))
      );
    });
    return () => unsub();
  }, []);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Handle add/edit submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.title || !form.description || !form.projectLink) {
      setError("Judul, deskripsi, dan link project wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), {
          ...form,
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "projects"), {
          ...form,
          createdAt: serverTimestamp(),
        });
      }
      setForm({});
    } catch (err) {
      setError("Gagal menyimpan project.");
    }
    setLoading(false);
  };

  // Handle edit
  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      image: project.image || "",
      projectLink: project.projectLink,
      githubLink: project.githubLink || "",
    });
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus project ini?")) return;
    setLoading(true);
    await deleteDoc(doc(db, "projects", id));
    setLoading(false);
    if (editingId === id) {
      setEditingId(null);
      setForm({});
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingId(null);
    setForm({});
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-black mb-4 text-white">Project Management</h1>
      <p className="text-gray-400 mb-8">Kelola project portfolio kamu di sini.</p>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 shadow-lg flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-200">Judul Project</label>
          <input
            type="text"
            name="title"
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none"
            placeholder="Judul project..."
            value={form.title || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-200">Deskripsi</label>
          <textarea
            name="description"
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none min-h-[80px]"
            placeholder="Deskripsi project..."
            value={form.description || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-200">Gambar (opsional, URL)</label>
          <input
            type="text"
            name="image"
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none"
            placeholder="URL gambar project..."
            value={form.image || ""}
            onChange={handleChange}
          />
          {form.image && (
            <img src={form.image} alt="preview" className="w-full max-w-xs rounded-lg mt-2 border border-gray-700" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-200">Link Project (wajib)</label>
          <input
            type="url"
            name="projectLink"
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none"
            placeholder="https://project-demo.com"
            value={form.projectLink || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-200">Link Github (opsional)</label>
          <input
            type="url"
            name="githubLink"
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none"
            placeholder="https://github.com/username/project"
            value={form.githubLink || ""}
            onChange={handleChange}
          />
        </div>
        {error && <div className="text-red-400 text-sm font-bold">{error}</div>}
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
            disabled={loading}
          >
            <Save className="w-4 h-4" />
            {editingId ? "Simpan Perubahan" : "Tambah Project"}
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={handleCancel}
              disabled={loading}
            >
              <X className="w-4 h-4" />
              Batal
            </button>
          )}
        </div>
      </form>
      {/* List */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-gray-300 shadow-lg">
        {projects.length === 0 ? (
          <div className="text-gray-500 text-center">Belum ada project.</div>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gray-800 rounded-xl p-4 border border-gray-700"
              >
                <div className="flex-1">
                  <div className="font-bold text-lg text-white mb-1">{project.title}</div>
                  <div className="text-gray-300 mb-2 text-sm whitespace-pre-line">{project.description}</div>
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full max-w-xs rounded-lg mb-2 border border-gray-700" />
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline font-bold"
                    >
                      Lihat Project
                    </a>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 underline font-bold"
                      >
                        Github
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-2 sm:flex-col sm:gap-2 items-center justify-end">
                  <button
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                    onClick={() => handleEdit(project)}
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-red-700 hover:bg-red-800 text-white"
                    onClick={() => handleDelete(project.id)}
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 