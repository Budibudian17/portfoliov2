import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";

export default function CertificationsNotFound() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      
      <main className="pt-8 pb-16 px-4 min-h-screen max-w-7xl mx-auto">
        <div className="max-w-md mx-auto text-center space-y-6">
          <Award className="w-24 h-24 text-gray-600 mx-auto" />
          <h1 className="text-3xl font-bold text-white">Certification Not Found</h1>
          <p className="text-gray-400">
            The certification you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/certifications">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <ArrowLeft className="w-4 h-4" />
                Back to Certifications
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
