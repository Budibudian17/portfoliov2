// app/admin-dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { MessageCircle, FileText, FolderKanban } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function AdminDashboardHome() {
  const [chatCount, setChatCount] = useState<number | null>(null);
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [projectCount, setProjectCount] = useState<number | null>(null);

  useEffect(() => {
    // Chat count (jumlah user unik)
    const unsubChat = onSnapshot(collection(db, "chats"), (snap) => {
      const userIds = new Set<string>();
      snap.docs.forEach((doc) => {
        const data = doc.data() as { userId?: string };
        if (data.userId) userIds.add(data.userId);
      });
      setChatCount(userIds.size);
    });
    // Blog count
    const unsubBlog = onSnapshot(collection(db, "blogs"), (snap) => {
      setBlogCount(snap.size);
    });
    // Project count (jika belum ada koleksi, set 0)
    let unsubProject: (() => void) | null = null;
    try {
      unsubProject = onSnapshot(collection(db, "projects"), (snap) => {
        setProjectCount(snap.size);
      });
    } catch {
      setProjectCount(0);
    }
    return () => {
      unsubChat();
      unsubBlog();
      if (unsubProject) unsubProject();
    };
  }, []);

  const stats = [
    {
      label: "Total Chat",
      value: chatCount,
      icon: <MessageCircle className="w-7 h-7 text-blue-400" />,
    },
    {
      label: "Blog Post",
      value: blogCount,
      icon: <FileText className="w-7 h-7 text-green-400" />,
    },
    {
      label: "Projects",
      value: projectCount,
      icon: <FolderKanban className="w-7 h-7 text-yellow-400" />,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-black mb-8 text-white">Welcome to Hilmi Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center shadow-lg"
          >
            <div className="mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-white mb-1">
              {stat.value === null ? <span className="text-gray-500 text-lg">Loading...</span> : stat.value}
            </div>
            <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-gray-300 shadow-lg">
        <h2 className="text-xl font-bold mb-2 text-white">Quick Tips</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Gunakan sidebar untuk navigasi ke fitur admin lain.</li>
          <li>Statistik di atas akan otomatis update jika sudah terhubung ke data asli.</li>
          <li>Menu Chat untuk membalas pesan user secara real-time.</li>
          <li>Menu Blog & Projects untuk kelola konten portfolio kamu.</li>
        </ul>
      </div>
    </div>
  );
} 