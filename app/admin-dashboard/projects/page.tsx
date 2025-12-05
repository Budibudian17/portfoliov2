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
import { Edit, Trash2, Plus, Save, X, Pin } from "lucide-react";
import ProjectStats from "@/components/project-stats";

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  videoUrl?: string;
  projectLink?: string;
  githubLink?: string;
  status: "published" | "in-progress" | "planned";
  createdAt?: any;
  pinned?: boolean;
  projectType?: "individual" | "collaboration";
  category?: "web" | "game" | "editing";
}

const getPlayableVideoUrl = (videoUrl?: string) => {
  if (!videoUrl) return "";

  if (videoUrl.includes("drive.google.com")) {
    try {
      let fileId = "";

      if (videoUrl.includes("/file/d/")) {
        const parts = videoUrl.split("/file/d/")[1];
        fileId = parts.split("/")[0].split("?")[0];
      } else if (videoUrl.includes("id=")) {
        const urlObj = new URL(videoUrl);
        const idParam = urlObj.searchParams.get("id");
        if (idParam) fileId = idParam;
      }

      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
    } catch (e) {
      console.error("Failed to parse Google Drive URL", e);
    }
  }

  return videoUrl;
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Partial<Project>>({
    status: "published",
    projectType: "individual",
    category: "web",
    videoUrl: ""
  });
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Function to convert Imgur URL to WebP
  const convertImgurToWebP = async (imageUrl: string) => {
    if (!imageUrl || !imageUrl.includes('imgur.com')) {
      console.log(`ℹ️ Non-Imgur URL, keeping as is: ${imageUrl}`);
      return imageUrl;
    }
    
    console.log(`🖼️ Converting Imgur URL: ${imageUrl}`);
    
    try {
      const response = await fetch('/api/convert-imgur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });
      
      console.log(`📡 API Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error: ${response.status} - ${errorText}`);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log(`📦 API Response:`, result);
      
      if (result.success) {
        console.log(`✅ Image converted: ${result.data.webpPath}`);
        return result.data.webpPath;
      } else {
        console.error(`❌ API returned success: false`, result);
        throw new Error(result.error || 'Unknown API error');
      }
    } catch (error) {
      console.error('❌ Error converting image:', error);
      // Return original URL if conversion fails
      return imageUrl;
    }
  };

  // Handle add/edit submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.title || !form.description) {
      setError("Judul dan deskripsi wajib diisi.");
      return;
    }
    if (form.status === "published" && !form.projectLink) {
      setError("Link project wajib diisi untuk project yang sudah publish.");
      return;
    }
    if (form.category === "editing" && !form.videoUrl) {
      setError("Untuk kategori Editing, link video wajib diisi (MP4/WebM). ");
      return;
    }
    setLoading(true);
    try {
      // Convert image URL to WebP if it's Imgur
      const processedImage = form.image ? await convertImgurToWebP(form.image) : form.image;
      
      const projectData = {
        ...form,
        image: processedImage,
      };
      
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), projectData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: serverTimestamp(),
        });
      }
      setForm({ status: "published", projectType: "individual", category: "web", videoUrl: "" });
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
      videoUrl: project.videoUrl || "",
      projectLink: project.projectLink || "",
      githubLink: project.githubLink || "",
      status: project.status || "published",
      projectType: project.projectType || "individual",
      category: project.category || "web",
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
      setForm({ status: "published", projectType: "individual" });
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingId(null);
    setForm({ status: "published", projectType: "individual", category: "web", videoUrl: "" });
    setError(null);
  };

  // Tambah handler untuk pin/unpin
  const handleTogglePin = async (id: string, pinned: boolean) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "projects", id), { pinned: !pinned });
    } catch (err) {
      setError("Gagal update pin.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-black mb-4 text-white">Project Management</h1>
      <p className="text-gray-400 mb-8">Kelola project portfolio kamu di sini.</p>
      
      {/* Project Statistics */}
      <ProjectStats />
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
          <label className="text-sm font-bold text-gray-200">Link Gambar (URL Imgur, Google Drive, dll)</label>
          <input
            type="text"
            name="image"
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none"
            placeholder="https://i.imgur.com/namafile.png"
            value={form.image || ""}
            onChange={handleChange}
          />
          <div className="text-xs text-gray-500 mt-1">Gunakan link dari Imgur, Google Drive (public), dsb.</div>
          {form.image && (
            <img src={form.image} alt="preview" className="w-full max-w-xs rounded-lg mt-2 border border-gray-700" />
          )}
        </div>
        {/* Conditional Video field for Editing category */}
        {form.category === "editing" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-200">Link Video (MP4 / WebM)</label>
            <input
              type="url"
              name="videoUrl"
              className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none"
              placeholder="https://cdn.example.com/video.mp4"
              value={form.videoUrl || ""}
              onChange={handleChange}
              required={form.category === "editing"}
            />
            <div className="text-xs text-gray-500 mt-1">Wajib untuk kategori Editing. Format disarankan: MP4 atau WebM.</div>
            {form.videoUrl && (
              <video src={getPlayableVideoUrl(form.videoUrl)} controls className="w-full max-w-md rounded-lg mt-2 border border-gray-700" />
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-200">Status Project</label>
            <select
              name="status"
              className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none"
              value={form.status || "published"}
              onChange={handleChange}
            >
              <option value="published">Published (Sudah Live)</option>
              <option value="in-progress">In Progress (Sedang Dikerjakan)</option>
              <option value="planned">Planned (Rencana)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-200">Tipe Project</label>
            <select
              name="projectType"
              className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none"
              value={form.projectType || "individual"}
              onChange={handleChange}
            >
              <option value="individual">Individual (Proyek Sendiri)</option>
              <option value="collaboration">Contributions (Kontribusi)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-200">Kategori</label>
            <select
              name="category"
              className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none"
              value={form.category || "web"}
              onChange={handleChange}
            >
              <option value="web">Web Development</option>
              <option value="game">Game Development</option>
              <option value="editing">Editing / Post-Production</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-200">
            Link Project {form.status === "published" ? "(wajib)" : "(opsional)"}
          </label>
          <input
            type="url"
            name="projectLink"
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none"
            placeholder={form.status === "published" ? "https://project-demo.com" : "https://project-demo.com (opsional)"}
            value={form.projectLink || ""}
            onChange={handleChange}
            required={form.status === "published"}
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
                  <div className="flex items-center gap-2 mb-1">
                    <button
                      className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                      title={project.pinned ? "Unpin" : "Pin"}
                      onClick={() => handleTogglePin(project.id, !!project.pinned)}
                      disabled={loading}
                    >
                      <Pin className={`w-5 h-5 ${project.pinned ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} fill={project.pinned ? "#facc15" : "none"} />
                    </button>
                    <div className="font-bold text-lg text-white">{project.title}</div>
                    <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                      project.status === "published" ? "bg-green-600 text-white" :
                      project.status === "in-progress" ? "bg-yellow-600 text-white" :
                      "bg-gray-600 text-white"
                    }`}>
                      {project.status === "published" ? "Published" :
                       project.status === "in-progress" ? "In Progress" :
                       "Planned"}
                    </span>
                    {project.projectType && (
                      <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                        project.projectType === "individual" ? "bg-purple-600 text-white" : "bg-orange-600 text-white"
                      }`}>
                        {project.projectType === "individual" ? "Individual" : "Contributions"}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-300 mb-2 text-sm whitespace-pre-line">{project.description}</div>
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full max-w-xs rounded-lg mb-2 border border-gray-700" />
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.projectLink ? (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline font-bold"
                    >
                      Lihat Project
                    </a>
                    ) : (
                      <span className="text-gray-500 font-bold">Belum ada link</span>
                    )}
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