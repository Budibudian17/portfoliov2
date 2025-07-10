import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import AppLoadingGate from "@/components/app-loading-gate"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hilmi Portfolio",
  description: "Hilmi Farrel Firjatullah Digital Portfolio",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-black text-white">
        <LanguageProvider>
          <AppLoadingGate>
            {children}
          </AppLoadingGate>
        </LanguageProvider>
      </body>
    </html>
  )
}
