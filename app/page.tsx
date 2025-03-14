"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import MinimalNav from "@/components/minimal-nav"
import TypingAnimation from "@/components/typing-animation"
import InteractiveTerminal from "@/components/interactive-terminal"
import TerminalFooter from "@/components/terminal-footer"

const typingWords = ["Waleed Alghamdi", "Consultant", "Tech Consultant", "Tech Enthusiast"]

export default function Home() {
  const [time, setTime] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-term-black text-term-white font-mono flex flex-col">
      <MinimalNav />

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[url('/noise.png')] animate-noise" />

      {/* Main content */}
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Terminal-style header */}
          <div className="mb-8 text-term-gray pt-8">
            <p>
              <span className="text-term-cyan">waok</span> on{" "}
              <span className="text-term-white">{new Date().toLocaleDateString("en-US", { weekday: "long" })}</span> at{" "}
              <span className="text-term-cyan">{time}</span>
            </p>
          </div>

          {/* Main grid layout */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <TypingAnimation words={typingWords} />
                </h1>
                <div className="h-[1px] w-16 bg-term-cyan mb-4" />
                <p className="text-term-gray text-lg">
                  Digital craftsman, exploring the intersection of code and creativity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-4"
              >
                <p className="font-mono">
                  <span className="text-term-green">$</span> <span className="text-term-cyan">type</span> skills.txt
                </p>
                <div className="pl-4 border-l border-term-dark space-y-2 text-term-gray">
                  <p>Development • Design • Consulting</p>
                  <p>React • Next.js • Node.js • AWS</p>
                </div>
              </motion.div>

              {/* Interactive Terminal */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                <InteractiveTerminal />
              </motion.div>

              {/* User-friendly navigation buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="pt-4"
              >
                <p className="text-term-gray mb-3">Or navigate using buttons:</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { path: "/about", label: "About Me" },
                    { path: "/blog", label: "Blog" },
                    { path: "/contact", label: "Contact" },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="px-4 py-2 bg-term-dark hover:bg-term-dark/80 text-term-white border border-term-cyan/30 rounded transition-colors duration-200 hover:border-term-cyan/60"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative flex justify-center"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                {/* Water drop shape with clip-path */}
                <div
                  className="absolute inset-0 bg-term-cyan/10"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    borderRadius: "60% 40% 50% 50% / 40% 50% 50% 60%",
                    transform: "rotate(-45deg) scale(1.05)",
                  }}
                />

                {/* Circular image with water drop effect */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    borderRadius: "60% 40% 50% 50% / 40% 50% 50% 60%",
                    transform: "rotate(-45deg)",
                  }}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hwz-ngMQ9Ilavq9IDnNyVCaXrFNVkgm4Ol.webp"
                    alt="Waleed Alghamdi"
                    fill
                    className="object-cover"
                    style={{ transform: "rotate(45deg) scale(1.2)" }}
                  />

                  {/* Scan line effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="w-full h-px bg-term-cyan/20 animate-scan" />
                  </div>

                  {/* Glitch effect overlay */}
                  <div className="absolute inset-0 bg-term-cyan/5 animate-glitch" />
                </div>

                {/* Water drop highlight */}
                <div className="absolute top-[15%] left-[20%] w-[15%] h-[15%] bg-white/20 rounded-full blur-sm" />

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-term-cyan/5 rounded-full blur-md" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}

