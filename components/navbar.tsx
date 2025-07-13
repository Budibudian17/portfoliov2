import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

export default function Navbar() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  // Handle mount/unmount for animation
  useEffect(() => {
    if (mobileMenuOpen) {
      setShowDrawer(true);
    } else {
      // Delay unmount for animation
      const timeout = setTimeout(() => setShowDrawer(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg sm:text-xl font-bold text-white">HILMI PORTFOLIO</Link>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">{t("nav.home")}</Link>
            <Link href="/projects" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">{t("nav.project")}</Link>
            <Link href="/blog" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">{t("nav.blog")}</Link>
            <LanguageSwitcher />
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" className="text-white" onClick={() => setMobileMenuOpen(true)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu drawer with animation */}
      {showDrawer && (
        <>
          {/* Overlay with fade-in/out */}
          <div
            className={`fixed inset-0 z-[99] bg-black/70 transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          {/* Drawer with slide-in/out */}
          <div
            className={`fixed top-0 right-0 z-[100] h-screen w-3/4 max-w-xs
              bg-gradient-to-br from-black/90 via-black/80 to-black/60 backdrop-blur-md
              flex flex-col items-end p-8
              transform transition-transform duration-300 ease-in-out
              ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ willChange: 'transform' }}
          >
            <button
              className="mb-8 p-2 text-white self-end"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col items-end gap-8 w-full mt-8">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white">{t("nav.home")}</Link>
              <Link href="/projects" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white">{t("nav.project")}</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white">{t("nav.blog")}</Link>
            </nav>
          </div>
        </>
      )}
    </nav>
  );
} 