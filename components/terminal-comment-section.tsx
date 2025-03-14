"use client"

import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { MessageSquare, AlertTriangle } from "lucide-react"

// Dynamically import Giscus to avoid SSR issues
const Giscus = dynamic(() => import("@giscus/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full p-6 bg-term-dark border border-term-cyan/20 text-center text-term-gray rounded-lg">
      <div className="p-8">
        <p className="mb-4 text-term-cyan">Initializing comment system...</p>
        <div className="flex justify-center items-center space-x-2">
          <span className="inline-block w-2 h-2 bg-term-cyan rounded-full animate-pulse"></span>
          <span
            className="inline-block w-2 h-2 bg-term-cyan rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="inline-block w-2 h-2 bg-term-cyan rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>
    </div>
  ),
})

const TerminalCommentSection = () => {
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""
  const { theme = "dark" } = useTheme()
  const locale = "en"

  const handleOnError = () => {
    console.error("Failed to load Giscus comments")
  }

  return (
    <div className="w-full">
      <div className="bg-term-dark border border-term-cyan/20 overflow-hidden rounded-lg">
        <div className="bg-term-darker px-4 py-2 flex items-center justify-between border-b border-term-cyan/20 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-term-gray flex items-center">
            <MessageSquare className="h-3 w-3 mr-2 text-term-cyan" />
            comments.sh
          </div>
          <div className="w-4"></div>
        </div>
        <div className="p-4">
          <div className="relative">
            <Giscus
              id="comments"
              repo={process.env.NEXT_PUBLIC_GISCUS_REPO || ""}
              repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ""}
              category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || ""}
              categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ""}
              mapping="pathname"
              term={pathname}
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              loading="lazy"
              theme={theme === "dark" ? "dark_high_contrast" : "light_high_contrast"}
              host="https://giscus.app"
              lang={locale}
              error={handleOnError}
            />
            <noscript>
              <div className="p-4 bg-term-darker border border-term-cyan/20 mt-4 rounded-lg">
                <div className="flex items-center text-term-cyan">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <p>Please enable JavaScript to view comments.</p>
                </div>
              </div>
            </noscript>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerminalCommentSection

