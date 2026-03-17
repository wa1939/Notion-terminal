"use client"

import { useEffect, useRef, useState } from "react"

export default function CalEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://app.cal.com/embed/embed.js"
    script.async = true
    script.onerror = () => {
      setLoading(false)
      setError(true)
    }
    script.onload = () => {
      const win = window as unknown as Record<string, unknown>
      if (typeof window !== "undefined" && win.Cal) {
        try {
          const Cal = win.Cal as (
            action: string,
            ...args: unknown[]
          ) => void
          Cal("init", { origin: "https://cal.com" })
          Cal("inline", {
            calLink: "waleedalghamdi/30min",
            elementOrSelector: containerRef.current,
            config: { layout: "month_view", theme: "dark" },
          })
          Cal("ui", {
            theme: "dark",
            styles: { branding: { brandColor: "#A7B8FF" } },
            hideEventTypeDetails: false,
            layout: "month_view",
          })
          setLoading(false)
        } catch {
          setLoading(false)
          setError(true)
        }
      }
    }
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div className="border border-term-line bg-term-darker rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-term-line text-xs uppercase tracking-[0.14em] text-term-gray">
        <span>
          <span className="text-term-cyan">$</span> cal.com/waleedalghamdi
        </span>
        <span>book a session</span>
      </div>
      <div className="relative min-h-[400px]">
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-2 text-center">
              <div className="text-term-gray text-xs uppercase tracking-[0.14em] animate-pulse">
                loading calendar...
              </div>
              <div className="flex gap-1 justify-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-term-cyan animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="text-term-gray text-xs uppercase tracking-[0.14em]">
                calendar widget unavailable
              </div>
              <a
                href="https://cal.com/waleedalghamdi/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-term-cyan text-term-cyan px-4 py-2 text-sm hover:bg-term-cyan hover:text-term-black transition-colors"
              >
                book directly on cal.com
              </a>
            </div>
          </div>
        )}
        <div ref={containerRef} className="w-full" style={{ minHeight: 400 }} />
      </div>
      <div className="px-4 py-2 border-t border-term-line text-[10px] text-term-gray">
        prefer email?{" "}
        <a href="mailto:waok@outlook.sa" className="text-term-cyan hover:underline">
          waok@outlook.sa
        </a>
      </div>
    </div>
  )
}
