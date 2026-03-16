"use client"

import { useEffect, useState } from "react"

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________"

interface AsciiHeaderProps {
  targetLines: string[]
  duration?: number
  delay?: number
}

export default function AsciiHeader({
  targetLines,
  duration = 1200,
  delay = 0,
}: AsciiHeaderProps) {
  const [lines, setLines] = useState<string[]>(
    targetLines.map((line) => " ".repeat(line.length))
  )
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasStarted(true)
    }, delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number | null = null
    let animationFrameId: number

    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setLines(targetLines.map(line => {
        return line.split('').map((char, index) => {
          // Keep spaces as spaces to preserve structure
          if (char === ' ') return ' '
          
          // Determine if this character should be fully resolved
          // We use a combination of overall progress and the character's horizontal position
          // to create a left-to-right decoding sweep.
          const charThreshold = (index / line.length) * 0.3 + 0.7
          
          if (progress >= charThreshold) return char
          if (progress < charThreshold * 0.2) return ' ' // Start empty

          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      }))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        setLines(targetLines) // ensure perfect final state
      }
    }

    animationFrameId = requestAnimationFrame(render)

    return () => cancelAnimationFrame(animationFrameId)
  }, [targetLines, duration, hasStarted])

  return (
    <pre className="overflow-x-auto text-[clamp(0.9rem,1.8vw,1.35rem)] leading-[1.2] text-term-white font-mono whitespace-pre">
      {lines.join("\n")}
    </pre>
  )
}
