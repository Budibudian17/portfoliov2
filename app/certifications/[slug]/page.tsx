"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Award, ExternalLink, Pin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import OptimizedImage from "@/components/optimized-image";
import { useLanguage } from "@/contexts/language-context";


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

export default function CertificationDetail() {
  const { t } = useLanguage();
  const params = useParams();
  const [certification, setCertification] = useState<Certification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertification = async () => {
      if (!params.slug) return;
      
      try {
        const docRef = doc(db, "certifications", params.slug as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setCertification({ id: docSnap.id, ...docSnap.data() } as Certification);
        } else {
          setError("Certification not found");
        }
      } catch (err) {
        setError("Failed to fetch certification");
        console.error("Error fetching certification:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertification();
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const isExpiringSoon = (expiryDate: string) => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return new Date(expiryDate) <= thirtyDaysFromNow && !isExpired(expiryDate);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !certification) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto">
                     <Link
             href="/certifications"
             className="mb-6 inline-flex w-auto items-center gap-2 px-4 py-2 rounded-full border border-blue-700 text-blue-400 hover:bg-blue-700 hover:text-white transition-colors text-sm font-semibold shadow-sm focus:outline-none"
             style={{ width: 'fit-content' }}
           >
             <ArrowLeft className="w-4 h-4" />
             {t("certifications.page.backToCertifications")}
           </Link>
          
          <div className="flex items-center gap-3 mb-4">
            {certification.pinned && (
              <span className="bg-yellow-600/20 p-2 rounded-full border border-yellow-400/30">
                <Pin className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </span>
            )}
            <Badge className="bg-blue-600 text-white">
              {certification.category}
            </Badge>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black mb-4">{certification.title}</h1>
          
                     <div className="flex items-center gap-3 text-xs text-gray-400 mb-6">
             <OptimizedImage src="/img/avatar.webp" fallback="/img/avatar.png" alt="Admin" width={28} height={28} className="w-7 h-7 rounded-full border border-gray-700" />
             <span>Hilmi</span>
             <span>•</span>
             <span>{certification.issuer}</span>
             <span>•</span>
             <span>{formatDate(certification.issueDate)}</span>
           </div>

          {/* Certification image or default */}
          <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden">
            {certification.image ? (
              <img 
                src={certification.image} 
                alt={certification.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to default if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            {/* Fallback default image */}
            <div className={`w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center ${certification.image ? 'hidden' : ''}`}>
              <Award className="w-24 h-24 text-blue-400" />
            </div>
          </div>

          {/* Status Badge */}
          {certification.expiryDate && (
            <div className="mb-8">
              <span className={`px-3 py-1 text-sm rounded-full font-bold ${
                isExpired(certification.expiryDate) ? "bg-red-600 text-white" :
                isExpiringSoon(certification.expiryDate) ? "bg-yellow-600 text-white" :
                "bg-green-600 text-white"
              }`}>
                {isExpired(certification.expiryDate) ? "Expired" :
                 isExpiringSoon(certification.expiryDate) ? "Expiring Soon" :
                 "Valid"}
              </span>
            </div>
          )}

                     {/* Description */}
           <div className="mb-8">
             <h2 className="text-xl font-bold mb-4 text-white">{t("certifications.page.description")}</h2>
             <div className="prose prose-invert max-w-none text-lg leading-relaxed">
               <p className="text-gray-300 whitespace-pre-line">{certification.description}</p>
             </div>
           </div>

          {/* Additional Information */}
          <div className="mb-8 space-y-4">
            {certification.credentialId && (
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <Award className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Credential ID</p>
                  <p className="text-white font-mono">{certification.credentialId}</p>
                </div>
              </div>
            )}

            {certification.expiryDate && (
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <Calendar className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Expiry Date</p>
                  <p className="text-white font-semibold">{formatDate(certification.expiryDate)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            {certification.credentialUrl && (
                             <a
                 href={certification.credentialUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-700 text-blue-400 hover:bg-blue-700 hover:text-white transition-colors text-sm font-semibold shadow-sm focus:outline-none"
               >
                 <ExternalLink className="w-4 h-4" />
                 {t("certifications.page.verifyCredential")}
               </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
