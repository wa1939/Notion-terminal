"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// ── Theme definitions ──────────────────────────────────────────────
export interface ThemeDef {
  name: string
  label: string
  bg: string
  fg: string
  gray: string
  accent: string
  accentBright: string
  green: string
  line: string
  darker: string
}

export const THEMES: ThemeDef[] = [
  {
    name: "default",
    label: "default",
    bg: "#0b0b0f",
    fg: "#f3eadb",
    gray: "#6b7280",
    accent: "#7dd3fc",
    accentBright: "#bae6fd",
    green: "#4ade80",
    line: "#23232b",
    darker: "#111117",
  },
  {
    name: "tokyonight",
    label: "tokyonight",
    bg: "#1a1b26",
    fg: "#c0caf5",
    gray: "#565f89",
    accent: "#7aa2f7",
    accentBright: "#b4f9f8",
    green: "#9ece6a",
    line: "#292e42",
    darker: "#16161e",
  },
  {
    name: "rosepine",
    label: "rosé pine",
    bg: "#191724",
    fg: "#e0def4",
    gray: "#6e6a86",
    accent: "#c4a7e7",
    accentBright: "#ebbcba",
    green: "#31748f",
    line: "#26233a",
    darker: "#1f1d2e",
  },
  {
    name: "solarized",
    label: "solarized",
    bg: "#002b36",
    fg: "#839496",
    gray: "#586e75",
    accent: "#2aa198",
    accentBright: "#93a1a1",
    green: "#859900",
    line: "#073642",
    darker: "#001e26",
  },
  {
    name: "synthwave84",
    label: "synthwave '84",
    bg: "#262335",
    fg: "#f0e3ff",
    gray: "#848bbd",
    accent: "#ff7edb",
    accentBright: "#fede5d",
    green: "#72f1b8",
    line: "#34294f",
    darker: "#1e1a2e",
  },
  {
    name: "palenight",
    label: "palenight",
    bg: "#292d3e",
    fg: "#a6accd",
    gray: "#676e95",
    accent: "#82aaff",
    accentBright: "#c3e88d",
    green: "#c3e88d",
    line: "#3a3f58",
    darker: "#1f2233",
  },
  {
    name: "vercel",
    label: "vercel",
    bg: "#000000",
    fg: "#ededed",
    gray: "#666666",
    accent: "#ededed",
    accentBright: "#ffffff",
    green: "#50e3c2",
    line: "#1a1a1a",
    darker: "#0a0a0a",
  },
  {
    name: "osakajade",
    label: "osaka-jade",
    bg: "#0d1117",
    fg: "#b5cea8",
    gray: "#4b6043",
    accent: "#7ec699",
    accentBright: "#a8d8a8",
    green: "#98c379",
    line: "#1b2a1b",
    darker: "#060d06",
  },
  {
    name: "matrix",
    label: "matrix",
    bg: "#050505",
    fg: "#00ff00",
    gray: "#00cc00",
    accent: "#00ff66",
    accentBright: "#33ff99",
    green: "#33ff33",
    line: "#004400",
    darker: "#020202",
  },
  {
    name: "paper",
    label: "paper (light)",
    bg: "#FAF8F5",
    fg: "#1a1a1a",
    gray: "#8c8c8c",
    accent: "#c05621",
    accentBright: "#dd6b20",
    green: "#2f855a",
    line: "#e8e4df",
    darker: "#f0ece7",
  },
  {
    name: "daylight",
    label: "daylight (light)",
    bg: "#ffffff",
    fg: "#111111",
    gray: "#6b7280",
    accent: "#2563eb",
    accentBright: "#3b82f6",
    green: "#059669",
    line: "#e5e7eb",
    darker: "#f9fafb",
  },
]

// ── Apply theme by setting CSS variables on <html> ─────────────────
function applyTheme(theme: ThemeDef) {
  const root = document.documentElement
  root.style.setProperty("--term-black", theme.bg)
  root.style.setProperty("--term-white", theme.fg)
  root.style.setProperty("--term-gray", theme.gray)
  root.style.setProperty("--term-cyan", theme.accent)
  root.style.setProperty("--term-cyan-bright", theme.accentBright)
  root.style.setProperty("--term-green", theme.green)
  root.style.setProperty("--term-line", theme.line)
  root.style.setProperty("--term-darker", theme.darker)
  // Persist selection
  localStorage.setItem("site-theme", theme.name)
}

// ── Theme Picker Component ─────────────────────────────────────────
export default function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTheme, setActiveTheme] = useState("default")
  const [search, setSearch] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [highlightIdx, setHighlightIdx] = useState(0)

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("site-theme")
    if (saved) {
      const found = THEMES.find((t) => t.name === saved)
      if (found) {
        setActiveTheme(found.name)
        applyTheme(found)
      }
    }
  }, [])

  // Focus search when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchRef.current?.focus(), 50)
      setSearch("")
      setHighlightIdx(0)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isOpen])

  const filtered = THEMES.filter((t) =>
    t.label.toLowerCase().includes(search.toLowerCase())
  )

  const selectTheme = useCallback((theme: ThemeDef) => {
    setActiveTheme(theme.name)
    applyTheme(theme)
    setIsOpen(false)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filtered[highlightIdx]) selectTheme(filtered[highlightIdx])
      }
    },
    [filtered, highlightIdx, selectTheme]
  )

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-term-gray hover:text-term-cyan transition-colors"
        aria-label="Open theme picker"
      >
        <span className="inline-block w-2 h-2 rounded-full border border-current" />
        <span className="hidden sm:inline">themes</span>
      </button>

      {/* Modal Backdrop + Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="w-[min(340px,calc(100vw-2rem))] max-h-[min(420px,calc(100vh-4rem))] border border-term-line bg-term-black shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden font-mono text-sm"
            onKeyDown={handleKeyDown}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-term-line">
              <span className="text-term-white text-xs uppercase tracking-[0.16em] font-semibold">Themes</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-term-gray hover:text-term-white text-xs uppercase tracking-[0.16em]"
              >
                esc
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-2 border-b border-term-line">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setHighlightIdx(0)
                }}
                className="w-full bg-transparent text-term-white placeholder-term-gray outline-none text-sm"
              />
            </div>

            {/* Theme List */}
            <div className="overflow-y-auto max-h-[300px]">
              {filtered.map((theme, idx) => (
                <button
                  key={theme.name}
                  onClick={() => selectTheme(theme)}
                  className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                    idx === highlightIdx
                      ? "bg-term-line text-term-white"
                      : "text-term-gray hover:bg-term-line/50 hover:text-term-white"
                  }`}
                >
                  {/* Color Preview Swatch */}
                  <span
                    className="inline-flex gap-0.5 flex-shrink-0"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: theme.accent }} />
                    <span className="w-2 h-2 rounded-full" style={{ background: theme.green }} />
                    <span className="w-2 h-2 rounded-full" style={{ background: theme.fg }} />
                  </span>

                  {/* Active Indicator */}
                  {activeTheme === theme.name ? (
                    <span className="text-term-green text-xs">●</span>
                  ) : (
                    <span className="w-3" />
                  )}

                  <span>{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
