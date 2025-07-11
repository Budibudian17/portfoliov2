"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getDoc(doc(db, "blogs", id))
      .then((snap) => {
        if (!snap.exists()) {
          setError("Blog tidak ditemukan.");
          setBlog(null);
        } else {
          setBlog({ id: snap.id, ...(snap.data() as Omit<BlogPost, "id">) });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data blog.");
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
        <Link href="/blog" className="text-blue-400 hover:underline">Kembali ke Blog</Link>
            </div>
    );
  }
  if (!blog) return null;

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="mb-6 inline-flex w-auto items-center gap-2 px-4 py-2 rounded-full border border-blue-700 text-blue-400 hover:bg-blue-700 hover:text-white transition-colors text-sm font-semibold shadow-sm focus:outline-none"
          style={{ width: 'fit-content' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Blog
                </Link>
        <h1 className="text-3xl sm:text-4xl font-black mb-4">{blog.title}</h1>
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-6">
          <Image src={"/img/avatar.png"} alt={blog.author} width={28} height={28} className="w-7 h-7 rounded-full border border-gray-700" />
          <span>{blog.author}</span>
          <span>•</span>
          <span>{new Date(blog.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{blog.category}</span>
              </div>
        {blog.thumbnail && (
          <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden">
            <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" />
              </div>
        )}
        <div className="prose prose-invert max-w-none text-lg mt-8" dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
              </div>
  );
} 