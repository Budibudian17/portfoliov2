"use client";

import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        alert("Password salah!");
        return;
      }

      router.replace("/admin-dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit}
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
          disabled={submitting}
          className="w-full bg-black text-white rounded-lg py-2 font-semibold hover:bg-gray-800 transition-colors mt-2 disabled:opacity-60"
        >
          {submitting ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
