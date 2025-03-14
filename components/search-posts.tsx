"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import type React from "react"

export default function SearchPosts() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      router.push(`/blog?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push("/blog")
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-term-gray" />
      </div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-term-dark border border-term-cyan/30 text-term-white focus:outline-none focus:border-term-cyan/60"
      />
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  )
}

