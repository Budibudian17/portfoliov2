// app/admin-dashboard/layout.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  FolderKanban,
  Lock,
} from "lucide-react";
import React, { useState } from "react";

const menu = [
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Blog",
    href: "/admin-dashboard/blog",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "Chat",
    href: "/admin-dashboard/chat",
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    label: "Projects",
    href: "/admin-dashboard/projects",
    icon: <FolderKanban className="w-5 h-5" />,
  },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const ADMIN_PASSWORD = "budibudian_17";

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Password salah!");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <form
          onSubmit={handleAuth}
          className="bg-gray-900 p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 border border-gray-800 w-full max-w-xs"
        >
          <Lock className="w-8 h-8 text-gray-400 mb-2" />
          <h2 className="text-xl font-bold text-white mb-2">Admin Login</h2>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-700"
            placeholder="Password admin..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 font-semibold hover:bg-gray-800 transition-colors mt-2"
          >
            Masuk
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col py-8 px-4">
        <div className="mb-10 flex items-center gap-3 px-2">
          <span className="text-2xl font-black text-white tracking-tight">Hilmi</span>
          <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded font-mono">Admin Dashboard</span>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-colors border border-transparent text-sm
                ${pathname === item.href
                  ? "bg-black text-white border-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 