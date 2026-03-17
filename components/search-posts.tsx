"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchPosts() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "")
  }, [searchParams])

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const query = searchQuery.trim()

    if (query) {
      router.push(`/blog?q=${encodeURIComponent(query)}`)
    } else {
      router.push("/blog")
    }
  }

  return (
    <form onSubmit={handleSearch} className="cli-frame overflow-hidden">
      <div className="flex items-center justify-between border-b border-term-line px-4 py-3 text-xs uppercase tracking-[0.16em] text-term-gray">
        <label htmlFor="search-posts">search&gt;</label>
        <span>grep archive</span>
      </div>

      <div className="flex items-center gap-3 px-4 py-4 text-sm text-term-white">
        <span className="text-term-green">$</span>
        <input
          id="search-posts"
          type="search"
          aria-label="Search blog posts"
          placeholder="type a topic, phrase, or tool"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-term-white outline-none placeholder:text-term-gray"
        />
        <button type="submit" className="border border-term-line px-3 py-2 text-xs uppercase tracking-[0.16em] text-term-gray transition-colors hover:border-term-cyan/40 hover:text-term-white">
          run
        </button>
      </div>
    </form>
  )
}
