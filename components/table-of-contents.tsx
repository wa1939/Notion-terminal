"use client"

import { useEffect, useState } from "react"
import { NotionToHeading } from "@/components/notion-render"
import { ChevronRight, Hash, Terminal } from "lucide-react"

interface TableOfContentsProps {
  contents: any[]
}

const TableOfContents = ({ contents }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("")
  const [isTyping, setIsTyping] = useState(true)
  const headings = NotionToHeading(contents)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    // Simulate typing effect completion
    const timer = setTimeout(() => {
      setIsTyping(false)
    }, 2000)

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) observer.unobserve(element)
      })
      clearTimeout(timer)
    }
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="sticky top-24">
      <div className="bg-term-dark border border-term-cyan/20 rounded-none overflow-hidden">
        <div className="bg-term-darker px-4 py-2 flex items-center justify-between border-b border-term-cyan/20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-term-gray flex items-center">
            <Terminal className="h-3 w-3 mr-2 text-term-cyan" />
            toc.sh
          </div>
          <div className="w-4"></div>
        </div>

        <div className="p-4">
          <div className={`mb-3 flex items-center ${isTyping ? "terminal-text" : ""}`}>
            <span className="text-term-green mr-2">$</span>
            <span className="text-term-cyan">cat</span>
            <span className="text-term-gray"> table_of_contents.md</span>
            {isTyping && <span className="terminal-cursor"></span>}
          </div>

          <nav className="space-y-1 text-sm max-h-[calc(100vh-200px)] overflow-auto">
            {headings.map((heading, i) => (
              <a
                key={i}
                href={`#${heading.id}`}
                className={`block py-1 px-2 border-l-2 transition-all duration-200 hover:bg-term-dark/50 group ${
                  activeId === heading.id
                    ? "border-term-cyan text-term-cyan bg-term-dark/30"
                    : "border-term-cyan/50 text-term-cyan/80 hover:text-term-cyan"
                }`}
                style={{
                  animationDelay: `${(i + 1) * 0.1 + 1}s`,
                  opacity: isTyping ? 0 : 1,
                  transform: isTyping ? "translateX(-10px)" : "translateX(0)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <div className="flex items-center">
                  <Hash className="h-4 w-4 mr-1 text-term-cyan opacity-70" />
                  {heading.type === "heading_2" && <ChevronRight className="h-4 w-4 mr-1 text-term-cyan opacity-70" />}
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{heading.text}</span>
                </div>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default TableOfContents

