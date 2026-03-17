"use client"

import { useState } from "react"

const CAL_URL = "https://app.cal.com/waleedalghamdi/30min?embed&theme=dark&layout=month_view"

export default function CalEmbed() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="border border-term-line bg-term-darker rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-term-line text-xs uppercase tracking-[0.14em] text-term-gray">
        <span>
          <span className="text-term-cyan">$</span> cal.com/waleedalghamdi
        </span>
        <span>book a session</span>
      </div>
      <div className="relative" style={{ minHeight: 500 }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
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
        <iframe
          src={CAL_URL}
          title="Book a session with Waleed Alhamed"
          className="w-full border-0"
          style={{ height: 700, minHeight: 500 }}
          onLoad={() => setLoaded(true)}
          allow="payment"
        />
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
