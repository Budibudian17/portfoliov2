// app/admin-dashboard/certifications/page.tsx
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { Pin } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description: string;
  category: string;
  image?: string;
  pinned?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    description: "",
    category: "",
    image: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<{ id: string; title: string } | null>(null);

  // Kategori sertifikasi
  const categories = [
    "Programming",
    "Design",
    "Project Management",
    "Language",
    "Cloud Computing",
    "Cybersecurity",
    "Data Science",
    "Other"
  ];

  // Helper: get today yyyy-mm-dd
  function getToday() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

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

  useEffect(() => {
    setLoading(true);
    setError(null);
    const q = query(collection(db, "certifications"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Certification, "id">) }));
      setCertifications(data);
      setLoading(false);
    }, (err) => {
      setError("Gagal mengambil data sertifikasi.");
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Hapus sertifikasi
  const handleDeleteCertification = async (id: string) => {
    setShowConfirm(null);
    setFormError(null);
    setFormSuccess(null);
    try {
      await deleteDoc(doc(db, "certifications", id));
      setFormSuccess("Sertifikasi berhasil dihapus!");
      // Tidak perlu refresh manual, onSnapshot akan update otomatis
      // Jika sedang edit sertifikasi yang dihapus, reset form
      if (editId === id) {
        setEditId(null);
        setForm({ title: "", issuer: "", issueDate: "", expiryDate: "", credentialId: "", credentialUrl: "", description: "", category: "", image: "" });
      }
    } catch (err: any) {
      setFormError("Gagal menghapus sertifikasi.");
    }
  };

  // Reset form (default tanggal hari ini)
  const resetForm = () => {
    setForm({ title: "", issuer: "", issueDate: getToday(), expiryDate: "", credentialId: "", credentialUrl: "", description: "", category: categories[0], image: "" });
  };

  // Edit sertifikasi: isi form dengan data sertifikasi
  const handleEditCertification = (certification: Certification) => {
    setEditId(certification.id);
    setForm({
      title: certification.title,
      issuer: certification.issuer,
      issueDate: certification.issueDate,
      expiryDate: certification.expiryDate || "",
      credentialId: certification.credentialId || "",
      credentialUrl: certification.credentialUrl || "",
      description: certification.description,
      category: certification.category,
      image: certification.image || "",
    });
    setFormError(null);
    setFormSuccess(null);
  };

  // Tambah atau edit sertifikasi
  const handleAddOrEditCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      if (!form.title.trim() || !form.issuer.trim() || !form.issueDate) {
        throw new Error("Judul, penerbit, dan tanggal terbit wajib diisi.");
      }

      // Convert image URL to WebP if it's Imgur
      const processedImage = form.image ? await convertImgurToWebP(form.image) : form.image;

      const certificationData = {
        title: form.title.trim(),
        issuer: form.issuer.trim(),
        issueDate: form.issueDate,
        expiryDate: form.expiryDate || null,
        credentialId: form.credentialId || null,
        credentialUrl: form.credentialUrl || null,
        description: form.description.trim(),
        category: form.category,
        image: processedImage || null,
        updatedAt: serverTimestamp(),
      };

      if (editId) {
        // Update existing
        await updateDoc(doc(db, "certifications", editId), certificationData);
        setFormSuccess("Sertifikasi berhasil diupdate!");
        setEditId(null);
        resetForm();
      } else {
        // Add new
        await addDoc(collection(db, "certifications"), {
          ...certificationData,
          createdAt: serverTimestamp(),
          pinned: false,
        });
        setFormSuccess("Sertifikasi berhasil ditambahkan!");
        resetForm();
      }
      // Tidak perlu refresh manual, onSnapshot akan update otomatis
    } catch (err: any) {
      setFormError(editId ? "Gagal update sertifikasi." : "Gagal menambah sertifikasi.");
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

  // Tambah handler untuk pin/unpin
  const handleTogglePin = async (id: string, pinned: boolean) => {
    setFormLoading(true);
    try {
      await updateDoc(doc(db, "certifications", id), { pinned: !pinned });
    } catch (err) {
      setFormError("Gagal update pin.");
    }
    setFormLoading(false);
  };

  // On mount, set default tanggal & kategori
  useEffect(() => {
    resetForm();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-black mb-4 text-white">Certification Management</h1>
      <p className="text-gray-400 mb-8">Kelola sertifikasi portfolio kamu di sini. Fitur tambah/edit/hapus dengan realtime update!</p>

      {/* Form tambah/edit sertifikasi */}
      <form onSubmit={handleAddOrEditCertification} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8 shadow-lg space-y-4">
        <h2 className="text-lg font-bold text-white mb-2">{editId ? "Edit Sertifikasi" : "Tambah Sertifikasi Baru"}</h2>
        {formError && <div className="text-red-400 text-sm">{formError}</div>}
        {formSuccess && <div className="text-green-400 text-sm">{formSuccess}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1">Judul Sertifikasi</label>
            <input name="title" value={form.title} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Penerbit</label>
            <input name="issuer" value={form.issuer} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" />
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
            <label className="block text-gray-300 mb-1">Tanggal Terbit</label>
            <input name="issueDate" type="date" value={form.issueDate} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Tanggal Expired (Opsional)</label>
            <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">ID Kredensial (Opsional)</label>
            <input name="credentialId" value={form.credentialId} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-300 mb-1">Gambar Sertifikasi (URL gambar, Imgur, Google Drive, dll)</label>
            <input name="image" value={form.image} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" placeholder="https://i.imgur.com/namafile.png" />
            <div className="text-xs text-gray-500 mt-1">Gunakan link dari Imgur, Google Drive (public), dsb. Gambar Imgur akan otomatis dikonversi ke WebP.</div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-300 mb-1">URL Verifikasi (Opsional)</label>
            <input name="credentialUrl" value={form.credentialUrl} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none" placeholder="https://example.com/verify" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-300 mb-1">Deskripsi</label>
            <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none min-h-[80px]" />
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button type="submit" disabled={formLoading} className="px-6 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-800 disabled:opacity-50">
            {formLoading ? (editId ? "Menyimpan..." : "Menyimpan...") : (editId ? "Update Sertifikasi" : "Tambah Sertifikasi")}
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
            <div className="text-white text-lg mb-4">Yakin hapus sertifikasi <span className="font-bold">{showConfirm.title}</span>?</div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => handleDeleteCertification(showConfirm.id)} className="px-6 py-2 rounded bg-red-700 text-white font-bold hover:bg-red-800">Hapus</button>
              <button onClick={() => setShowConfirm(null)} className="px-6 py-2 rounded bg-gray-700 text-white font-bold hover:bg-gray-700">Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel sertifikasi */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-gray-300 shadow-lg min-h-[200px]">
        {loading && <div className="text-gray-400">Loading sertifikasi...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {!loading && certifications.length === 0 && <div className="text-gray-500">Belum ada sertifikasi.</div>}
        {!loading && certifications.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="py-2">Judul</th>
                <th className="py-2">Penerbit</th>
                <th className="py-2">Tanggal</th>
                <th className="py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((certification) => (
                <tr key={certification.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-2 font-semibold text-white flex items-center gap-2">
                    <button
                      className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                      title={certification.pinned ? "Unpin" : "Pin"}
                      onClick={() => handleTogglePin(certification.id, !!certification.pinned)}
                      disabled={formLoading}
                    >
                      <Pin className={`w-5 h-5 ${certification.pinned ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} fill={certification.pinned ? "#facc15" : "none"} />
                    </button>
                    {certification.title}
                  </td>
                  <td className="py-2">{certification.issuer}</td>
                  <td className="py-2">{new Date(certification.issueDate).toLocaleDateString()}</td>
                  <td className="py-2 flex gap-2">
                    <button onClick={() => handleEditCertification(certification)} className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700">Edit</button>
                    <button onClick={() => setShowConfirm({ id: certification.id, title: certification.title })} className="px-3 py-1 rounded bg-red-800 text-white hover:bg-red-700">Hapus</button>
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

