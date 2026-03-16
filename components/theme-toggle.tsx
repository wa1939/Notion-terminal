"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Monitor } from "lucide-react"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-6 w-16" /> // placeholder
  }

  const toggleTheme = () => {
    // Current themes: dark, matrix (can add light later)
    if (theme === "dark") {
      setTheme("matrix")
    } else {
      setTheme("dark")
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-term-gray hover:text-term-cyan transition-colors group"
      aria-label="Toggle theme"
    >
      <Monitor className="h-3 w-3 group-hover:animate-pulse" />
      <span>{theme === "matrix" ? "sys.matrix" : "sys.default"}</span>
    </button>
  )
}
