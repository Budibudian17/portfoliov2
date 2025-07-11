// app/admin-dashboard/projects/page.tsx
"use client";

export default function AdminProjectsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-black mb-4 text-white">Project Management</h1>
      <p className="text-gray-400 mb-8">Kelola project portfolio kamu di sini. Fitur tambah/edit/hapus akan segera hadir!</p>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-gray-300 shadow-lg flex items-center justify-center min-h-[200px]">
        <span className="text-gray-500">(Daftar project akan tampil di sini)</span>
      </div>
    </div>
  );
} 