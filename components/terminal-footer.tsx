"use client"

import { useEffect, useState } from "react"

export default function TerminalFooter() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
      )
    }
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <footer className="mt-auto">
      <div className="border-t border-term-line bg-term-black px-4 py-2">
        <div className="container mx-auto flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs font-mono uppercase tracking-[0.14em] text-term-gray">
          <span>
            by <span className="text-term-white">waleed alhamed</span> | {time || "--:--"}
          </span>
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="text-term-green">●</span> online
            </span>
            <span>|</span>
            <span className="text-term-white">:help</span> for commands
          </span>
        </div>
      </div>
    </footer>
  )
}
