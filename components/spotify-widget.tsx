"use client"

import { useEffect, useState } from "react"

const TRACKS = [
  { title: "Midnight City", artist: "M83" },
  { title: "Resonance", artist: "HOME" },
  { title: "Digital Love", artist: "Daft Punk" },
  { title: "Starlight", artist: "Muse" },
  { title: "Intro", artist: "The xx" },
  { title: "Nightcall", artist: "Kavinsky" },
]

export default function SpotifyWidget() {
  const [trackIdx, setTrackIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(true)

  // Simulate track progress
  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setTrackIdx((i) => (i + 1) % TRACKS.length)
          return 0
        }
        return p + 0.5
      })
    }, 100)
    return () => clearInterval(interval)
  }, [playing])

  const track = TRACKS[trackIdx]
  const barLen = 20
  const filled = Math.floor((progress / 100) * barLen)
  const bar = "▓".repeat(filled) + "░".repeat(barLen - filled)

  return (
    <div className="border border-term-line bg-term-darker p-3 font-mono text-xs">
      <div className="flex items-center justify-between text-term-gray uppercase tracking-[0.14em] mb-2">
        <span>♫ now playing</span>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="hover:text-term-cyan transition-colors"
        >
          {playing ? "[ ■ ]" : "[ ▶ ]"}
        </button>
      </div>
      <div className="text-term-white truncate">
        {track.title} <span className="text-term-gray">— {track.artist}</span>
      </div>
      <div className="text-term-green mt-1 tracking-wider">{bar}</div>
    </div>
  )
}
