"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import GitHubCalendar from 'react-github-calendar'
import OptimizedImage from "@/components/optimized-image"

interface GitHubUser {
  public_repos: number
  followers: number
  avatar_url: string
  html_url: string
  name: string
  login: string
}

export function GitHubContributions({ t }: { t: (key: string) => string }) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [contributionCount, setContributionCount] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    async function fetchGitHubUser() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("https://api.github.com/users/Budibudian17", {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-App'
          }
        })
        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("GitHub API rate limit exceeded")
          } else if (res.status === 404) {
            throw new Error("GitHub user not found")
          } else {
            throw new Error(`GitHub API error: ${res.status}`)
          }
        }
        const data = await res.json()
        setUser(data)
      } catch (e: any) {
        console.error("GitHub user fetch error:", e)
        setError(e.message)
        // Set fallback data if API fails
        setUser({
          public_repos: 3,
          followers: 5,
          avatar_url: "/img/avatar.webp",
          html_url: "https://github.com/Budibudian17",
          name: "Hilmi",
          login: "Budibudian17"
        })
      } finally {
        setLoading(false)
      }
    }
    fetchGitHubUser()
  }, [])

  // Fetch total contributions in the selected year from external API
  useEffect(() => {
    async function fetchContributions() {
      try {
        // Try multiple API endpoints for better reliability
        const endpoints = [
          `https://github-contributions-api.jogruber.de/v4/Budibudian17?y=${selectedYear}`,
          `https://github-contributions-api.jogruber.de/v4/Budibudian17?y=${selectedYear}&format=nested`,
          `https://github-contributions-api.jogruber.de/v4/Budibudian17?y=${selectedYear}&format=flat`,
          // Alternative endpoints
          `https://api.github.com/users/Budibudian17/events?per_page=100`,
          `https://api.github.com/users/Budibudian17/repos?per_page=100`
        ]
        
        let success = false
        for (const endpoint of endpoints) {
          try {
            const res = await fetch(endpoint, {
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'Portfolio-App'
              }
            })
            
            if (res.ok) {
              const data = await res.json()
              let total = 0
              
              // Handle different response formats
              if (endpoint.includes('github-contributions-api')) {
                if (typeof data.total === 'number') {
                  total = data.total
                } else if (typeof data.total === 'object' && data.total !== null) {
                  total = Object.values(data.total).reduce((sum: number, val) => sum + Number(val), 0)
                }
              } else if (endpoint.includes('events')) {
                // Count push events as contributions
                total = data.filter((event: any) => event.type === 'PushEvent').length
              } else if (endpoint.includes('repos')) {
                // Count repositories as a contribution metric
                total = data.length
              }
              
              if (total > 0) {
                setContributionCount(total)
                success = true
                break
              }
            }
          } catch (e) {
            console.log(`Failed to fetch from ${endpoint}:`, e)
            continue
          }
        }
        
        if (!success) {
          // Use fallback data instead of throwing error
          console.log("All API endpoints failed, using fallback data")
          const fallbackContributions: { [key: number]: number } = {
            2023: 12,
            2024: 8,
            2025: 5
          }
          setContributionCount(fallbackContributions[selectedYear] || 0)
          return
        }
      } catch (e: any) {
        console.error("GitHub contributions fetch error:", e)
        // Fallback: set known contributions for different years
        const fallbackContributions: { [key: number]: number } = {
          2023: 12,
          2024: 8,
          2025: 5
        }
        setContributionCount(fallbackContributions[selectedYear] || 0)
      }
    }
    fetchContributions()
  }, [selectedYear])

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <div className="text-center p-4 bg-gray-900 rounded-xl border border-gray-800">
          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">
            {loading ? "-" : user?.public_repos ?? "-"}
          </div>
          <div className="text-xs sm:text-sm text-gray-400">{t("github.reposLabel")}</div>
        </div>
        <div className="text-center p-4 bg-gray-900 rounded-xl border border-gray-800">
          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">
            {loading ? "-" : user?.followers ?? "-"}
          </div>
          <div className="text-xs sm:text-sm text-gray-400">{t("github.followersLabel")}</div>
        </div>
        <div className="text-center p-4 bg-gray-900 rounded-xl border border-gray-800">
          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">Budibudian17</div>
          <div className="text-xs sm:text-sm text-gray-400">{t("github.usernameLabel")}</div>
        </div>
        <div className="text-center p-4 bg-gray-900 rounded-xl border border-gray-800">
          <a href={user?.html_url} target="_blank" rel="noopener noreferrer">
            <OptimizedImage 
              src={user?.avatar_url || "/img/avatar.webp"} 
              fallback="/img/avatar.png"
              alt="avatar" 
              width={48} 
              height={48} 
              className="w-12 h-12 rounded-full mx-auto mb-2" 
            />
            <div className="text-xs sm:text-sm text-gray-400">{t("github.profileLabel")}</div>
          </a>
        </div>
      </div>
      {error && (
        <div className="text-yellow-500 text-center text-sm bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          ⚠️ {error} - Using fallback data
        </div>
      )}
      <div className="bg-gray-900 p-6 sm:p-10 rounded-xl border border-gray-800">
        <h4 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center">
          {contributionCount !== null ? `${contributionCount} ${t("github.contributionsCount")}` : t("github.contributionsIn")} {selectedYear}
        </h4>
        <div className="flex justify-center mb-4">
          <select
            className="bg-gray-800 text-white rounded px-3 py-1 border border-gray-700 focus:outline-none"
            value={selectedYear}
            onChange={e => setSelectedYear(Number(e.target.value))}
          >
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
          </select>
        </div>
        <div className="flex justify-center">
          <GitHubCalendar 
            username="Budibudian17" 
            colorScheme="dark" 
            blockSize={16} 
            blockMargin={5} 
            fontSize={16} 
            style={{ width: '100%' }}
            year={selectedYear}
            theme={{
              dark: ['#0d1117', '#0e4429', '#006d32', '#26a641', '#39d353']
            }}
          />
        </div>
      </div>
    </div>
  )
}

