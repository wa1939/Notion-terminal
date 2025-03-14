"use client"

import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { MessageSquare } from "lucide-react"

// Dynamically import Giscus to avoid SSR issues
const Giscus = dynamic(() => import("@giscus/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full p-6 retro-card text-center text-retro-light-blue">
      <div className="retro-card-content p-8">
        <p className="mb-4 text-retro-purple">Initializing comment system...</p>
        <div className="flex justify-center items-center space-x-2">
          <span className="inline-block w-2 h-2 bg-retro-blue rounded-full animate-pulse"></span>
          <span
            className="inline-block w-2 h-2 bg-retro-purple rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="inline-block w-2 h-2 bg-retro-pink rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>
    </div>
  ),
})

interface CommentSectionProps {
  giscus: {
    GISCUS_REPO: string
    GISCUS_REPO_ID: string
    GISCUS_CATEGORY: string
    GISCUS_CATEGORY_ID: string
  }
}

// Update the CommentSection component to use the provided environment variables
const CommentSection = ({ giscus }: CommentSectionProps) => {
  // In Next.js 13 App Router, we need to use the usePathname hook instead
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""
  const { theme = "dark" } = useTheme()
  const locale = "en" // Default to English, you can make this dynamic

  return (
    <div className="md:col-span-2 flex content-center">
      <div className="w-full retro-window">
        <div className="retro-window-header">
          <div className="retro-window-button bg-red-500"></div>
          <div className="retro-window-button bg-yellow-500"></div>
          <div className="retro-window-button bg-blue-500"></div>
          <div className="flex-1 text-center text-sm text-retro-purple truncate flex items-center justify-center">
            <MessageSquare size={14} className="mr-2 text-retro-blue" />
            <span className="gradient-text">comments.exe</span>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-retro-black to-retro-dark-blue">
          <Giscus
            id="comments"
            repo="wa1939/waleednotion_Q-A"
            repoId="R_kgDONQHI9"
            category="Q&A"
            categoryId="DIC_kwDONQHI984CkUKd"
            mapping="pathname"
            strict="1"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            loading="lazy"
            theme={theme === "dark" ? "dark" : "light"}
            host="https://giscus.app"
            lang={locale}
          />
        </div>
      </div>
    </div>
  )
}

export default CommentSection

