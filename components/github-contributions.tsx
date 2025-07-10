"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import GitHubCalendar from 'react-github-calendar';

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
        const res = await fetch("https://api.github.com/users/Budibudian17")
        if (!res.ok) throw new Error("Failed to fetch GitHub user")
        const data = await res.json()
        setUser(data)
      } catch (e: any) {
        setError(e.message)
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
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/Budibudian17?y=${selectedYear}`);
        if (!res.ok) throw new Error("Failed to fetch contributions");
        const data = await res.json();
        let total = 0;
        if (typeof data.total === 'number') {
          total = data.total;
        } else if (typeof data.total === 'object' && data.total !== null) {
          total = Object.values(data.total).reduce((sum: number, val) => sum + Number(val), 0);
        }
        setContributionCount(total);
      } catch (e: any) {
        setContributionCount(null);
      }
    }
    fetchContributions();
  }, [selectedYear]);

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
            <img src={user?.avatar_url} alt="avatar" className="w-12 h-12 rounded-full mx-auto mb-2" />
            <div className="text-xs sm:text-sm text-gray-400">{t("github.profileLabel")}</div>
          </a>
        </div>
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="bg-gray-900 p-6 sm:p-10 rounded-xl border border-gray-800">
        <h4 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center">{t("github.contributionsIn")} {selectedYear}</h4>
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
          />
        </div>
      </div>
    </div>
  )
}

