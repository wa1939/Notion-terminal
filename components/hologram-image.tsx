"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface HologramImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function HologramImage({ src, alt, width, height, className = "" }: HologramImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Hologram Base */}
      <div className="absolute inset-0 bg-retro-cyan/5 rounded-full animate-pulse"></div>

      {/* Hologram Rings */}
      <div className="absolute inset-0 rounded-full border border-retro-cyan/20 animate-[ping_3s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 rounded-full border border-retro-cyan/10 animate-[ping_3s_ease-in-out_1s_infinite]"></div>

      {/* Main Image */}
      <div
        className={`relative transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="rounded-full relative z-10"
        />

        {/* Glitch Effects */}
        <div className="absolute inset-0 rounded-full bg-retro-cyan/30 mix-blend-overlay animate-glitch"></div>
        <div className="absolute inset-0 rounded-full bg-retro-pink/20 mix-blend-overlay animate-glitch [animation-delay:150ms]"></div>

        {/* Scan Line */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-retro-cyan/10 to-transparent w-full h-[200%] animate-scan"></div>
        </div>
      </div>

      {/* Hologram Glow */}
      <div className="absolute -inset-4 bg-retro-cyan/5 rounded-full blur-xl animate-pulse"></div>
    </div>
  )
}

