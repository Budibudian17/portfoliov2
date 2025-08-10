"use client";
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Award, Pin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useLanguage } from "@/contexts/language-context";
import OptimizedImage from "@/components/optimized-image";

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
  pinned: boolean;
  createdAt: any;
  updatedAt: any;
}

export default function CertificationsPage() {
  const { t } = useLanguage();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const q = query(collection(db, "certifications"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const certs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Certification[];
        
        // Sort: pinned first, then by date
        const sorted = certs.sort((a, b) => {
          const aPinned = a.pinned ? 1 : 0;
          const bPinned = b.pinned ? 1 : 0;
          if (bPinned !== aPinned) return bPinned - aPinned;
          const aDate = a.createdAt && typeof a.createdAt.toDate === "function" ? a.createdAt.toDate() : new Date(a.issueDate);
          const bDate = b.createdAt && typeof b.createdAt.toDate === "function" ? b.createdAt.toDate() : new Date(b.issueDate);
          return bDate - aDate;
        });
        
        setCertifications(sorted);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching certifications:", error);
        setIsLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-400">{t("certifications.page.loading")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="grid-background"></div>
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight animate-slide-up">
                {t("certifications.page.title")}
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay px-4">
                {t("certifications.page.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="pt-8 pb-16 px-4 min-h-screen max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8">{t("certifications.page.allCertifications")}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {isLoading && <div className="text-gray-400 text-center col-span-full">{t("certifications.page.loading")}</div>}
          {!isLoading && certifications.length === 0 && <div className="text-gray-500 text-center col-span-full">{t("certifications.page.noCertifications")}</div>}
          {!isLoading && certifications.map((cert) => (
            <div key={cert.id} className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden group flex flex-col focus:outline-none">
              <div className="relative h-48 overflow-hidden">
                {/* Pin icon if pinned */}
                {cert.pinned && (
                  <span className="absolute top-3 left-3 z-10 bg-black/80 p-1 rounded-full border border-white/20 backdrop-blur-sm">
                    <Pin className="w-4 h-4 text-yellow-400 fill-yellow-400" fill="#facc15" />
                  </span>
                )}
                
                {/* Category badge */}
                {cert.category && (
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md z-10 bg-blue-600 text-white bg-opacity-90">
                    {cert.category}
                  </span>
                )}
                
                {/* Certification image or default */}
                {cert.image ? (
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    onError={(e) => {
                      // Fallback to default if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs group-hover:scale-105 transition-transform duration-300">
                    <Award className="w-16 h-16 text-blue-400" />
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">{cert.title}</h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">{cert.description}</p>
                </div>
                
                <div className="flex items-center gap-2 mt-auto">
                  <OptimizedImage src="/img/avatar.webp" fallback="/img/avatar.png" alt="Admin" width={28} height={28} className="w-7 h-7 rounded-full border border-gray-700" />
                  <span className="text-xs text-gray-400">Hilmi &bull; {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : "No date"}</span>
                </div>
                
                <Link
                  href={`/certifications/${cert.id}`}
                  className="mt-4 inline-flex w-auto items-center gap-2 px-4 py-2 rounded-full border border-blue-700 text-blue-400 hover:bg-blue-700 hover:text-white transition-colors text-sm font-semibold shadow-sm focus:outline-none"
                  style={{ width: 'fit-content' }}
                >
                  {t("certifications.page.viewDetails")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
