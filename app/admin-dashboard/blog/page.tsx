// app/admin-dashboard/blog/page.tsx
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";

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

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    date: "",
    thumbnail: "",
    content: "",
    author: "",
    category: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<{ id: string; title: string } | null>(null);

  // Kategori blog
  const categories = [
    "Project Experience",
    "Tech Stack",
    "Learning",
    "Personal Growth",
    "Other",
  ];

  // Helper: get today yyyy-mm-dd
  function getToday() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

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

  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Hapus blog
  const handleDeleteBlog = async (id: string) => {
    setShowConfirm(null);
    setFormError(null);
    setFormSuccess(null);
    try {
      await deleteDoc(doc(db, "blogs", id));
      setFormSuccess("Blog berhasil dihapus!");
      // Tidak perlu refresh manual, onSnapshot akan update otomatis
      // Jika sedang edit blog yang dihapus, reset form
      if (editId === id) {
        setEditId(null);
        setForm({ title: "", summary: "", date: "", thumbnail: "", content: "", author: "", category: "" });
      }
    } catch (err: any) {
      setFormError("Gagal menghapus blog.");
    }
  };

  // Reset form (default tanggal hari ini)
  const resetForm = () => {
    setForm({ title: "", summary: "", date: getToday(), thumbnail: "", content: "", author: "", category: categories[0] });
  };

  // Edit blog: isi form dengan data blog
  const handleEditBlog = (blog: BlogPost) => {
    setEditId(blog.id);
    setForm({
      title: blog.title,
      summary: blog.summary,
      date: blog.date ? blog.date.slice(0, 10) : getToday(),
      thumbnail: blog.thumbnail,
      content: blog.content,
      author: blog.author,
      category: blog.category || categories[0],
    });
    setFormError(null);
    setFormSuccess(null);
  };

  // Submit form: tambah atau edit
  const handleAddOrEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      if (!form.title || !form.summary || !form.date || !form.content || !form.author || !form.category) {
        setFormError("Semua field wajib diisi!");
        setFormLoading(false);
        return;
      }
      if (editId) {
        // Edit mode
        await updateDoc(doc(db, "blogs", editId), {
          ...form,
          date: new Date(form.date).toISOString(),
        });
        setFormSuccess("Blog berhasil diupdate!");
      } else {
        // Tambah mode
        await addDoc(collection(db, "blogs"), {
          ...form,
          date: new Date(form.date).toISOString(),
          createdAt: serverTimestamp(),
        });
        setFormSuccess("Blog berhasil ditambahkan!");
      }
      setForm({ title: "", summary: "", date: "", thumbnail: "", content: "", author: "", category: "" });
      setEditId(null);
      // Tidak perlu refresh manual, onSnapshot akan update otomatis
    } catch (err: any) {
      setFormError(editId ? "Gagal update blog." : "Gagal menambah blog.");
    }
    setFormLoading(false);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditId(null);
    resetForm();
    setFormError(null);
    setFormSuccess(null);
  };

  // On mount, set default tanggal & kategori
  useEffect(() => {
    resetForm();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-black mb-4 text-white">Blog Management</h1>
      <p className="text-gray-400 mb-8">Kelola postingan blog portfolio kamu di sini. Fitur tambah/edit/hapus akan segera hadir!</p>

      {/* Form tambah/edit blog */}
      <form onSubmit={handleAddOrEditBlog} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8 shadow-lg space-y-4">
        <h2 className="text-lg font-bold text-white mb-2">{editId ? "Edit Blog" : "Tambah Blog Baru"}</h2>
        {formError && <div className="text-red-400 text-sm">{formError}</div>}
        {formSuccess && <div className="text-green-400 text-sm">{formSuccess}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1">Judul</label>
            <input name="title" value={form.title} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Kategori</label>
            <select name="category" value={form.category} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none">
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Tanggal</label>
            <input name="date" type="date" value={form.date} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Author</label>
            <input name="author" value={form.author} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-300 mb-1">Thumbnail (URL gambar)</label>
            <input name="thumbnail" value={form.thumbnail} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" />
            <div className="text-xs text-gray-500 mt-1">Contoh: /img/blog1.png</div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-300 mb-1">Summary</label>
            <input name="summary" value={form.summary} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-300 mb-1">Content</label>
            <textarea name="content" value={form.content} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none min-h-[80px]" />
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button type="submit" disabled={formLoading} className="px-6 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-800 disabled:opacity-50">
            {formLoading ? (editId ? "Menyimpan..." : "Menyimpan...") : (editId ? "Update Blog" : "Tambah Blog")}
          </button>
          {editId && (
            <button type="button" onClick={handleCancelEdit} className="px-6 py-2 rounded bg-gray-700 text-white font-bold hover:bg-gray-800">Batal</button>
          )}
        </div>
      </form>

      {/* Dialog konfirmasi hapus */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl text-center">
            <div className="text-white text-lg mb-4">Yakin hapus blog <span className="font-bold">{showConfirm.title}</span>?</div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => handleDeleteBlog(showConfirm.id)} className="px-6 py-2 rounded bg-red-700 text-white font-bold hover:bg-red-800">Hapus</button>
              <button onClick={() => setShowConfirm(null)} className="px-6 py-2 rounded bg-gray-700 text-white font-bold hover:bg-gray-800">Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel blog */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-gray-300 shadow-lg min-h-[200px]">
        {loading && <div className="text-gray-400">Loading blog posts...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {!loading && blogs.length === 0 && <div className="text-gray-500">Belum ada blog post.</div>}
        {!loading && blogs.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="py-2">Judul</th>
                <th className="py-2">Tanggal</th>
                <th className="py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-2 font-semibold text-white">{blog.title}</td>
                  <td className="py-2">{new Date(blog.date).toLocaleDateString()}</td>
                  <td className="py-2 flex gap-2">
                    <button onClick={() => handleEditBlog(blog)} className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700">Edit</button>
                    <button onClick={() => setShowConfirm({ id: blog.id, title: blog.title })} className="px-3 py-1 rounded bg-red-800 text-white hover:bg-red-700">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 