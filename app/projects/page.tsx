"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black mb-4">My Projects</h1>
        <p className="text-lg text-gray-400 mb-10">A collection of my featured and personal projects. Explore more of my work below!</p>
        <div className="grid sm:grid-cols-2 gap-8">
          {/* Project 1 */}
          <Card className="bg-gray-900 border-gray-800 hover:border-white transition-all duration-300 group">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">CiptaLife Healthcare Platform</h2>
                <p className="text-gray-400 mb-4">A comprehensive web-based healthcare platform for Depok Health Department. Features patient management, scheduling, medical records, and analytics dashboard.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">React</Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">Next.js</Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">Golang</Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">MySQL</Badge>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Link href="#" className="text-white hover:text-gray-300 flex items-center gap-1">
                  <ExternalLink className="w-4 h-4" /> Demo
                </Link>
                <Link href="#" className="text-white hover:text-gray-300 flex items-center gap-1">
                  <Github className="w-4 h-4" /> Code
                </Link>
              </div>
            </CardContent>
          </Card>
          {/* Project 2 */}
          <Card className="bg-gray-900 border-gray-800 hover:border-white transition-all duration-300 group">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Personal Portfolio Website</h2>
                <p className="text-gray-400 mb-4">A modern, responsive portfolio website showcasing my skills, projects, and passion in web development and digital design.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">Next.js</Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">TypeScript</Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">Tailwind CSS</Badge>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Link href="#" className="text-white hover:text-gray-300 flex items-center gap-1">
                  <ExternalLink className="w-4 h-4" /> Demo
                </Link>
                <Link href="#" className="text-white hover:text-gray-300 flex items-center gap-1">
                  <Github className="w-4 h-4" /> Code
                </Link>
              </div>
            </CardContent>
          </Card>
          {/* Tambah project lain di sini */}
        </div>
      </div>
    </div>
  )
} 