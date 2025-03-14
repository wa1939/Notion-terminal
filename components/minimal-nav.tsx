"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, User, FileText, Mail } from "lucide-react"

export default function MinimalNav() {
  const [isHovered, setIsHovered] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { path: "/", label: "cd ~", icon: Home, text: "Home" },
    { path: "/about", label: "cat about.txt", icon: User, text: "About" },
    { path: "/blog", label: "ls posts/", icon: FileText, text: "Blog" },
    { path: "/contact", label: "ping me", icon: Mail, text: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 font-mono bg-term-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background line that appears on hover */}
          <motion.div
            className="absolute inset-0 bg-term-dark"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Nav items */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    py-2 transition-colors duration-200 group flex items-center
                    ${pathname === item.path ? "text-term-cyan" : "text-term-gray hover:text-term-white"}
                  `}
                >
                  <span className="hidden md:inline">
                    <span className="text-term-green">$</span> {item.label}
                  </span>
                  <span className="md:hidden flex items-center">
                    <item.icon className="w-5 h-5 mr-1" />
                  </span>

                  {/* User-friendly tooltip that appears on hover */}
                  <span className="ml-2 text-xs bg-term-dark px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity absolute left-0 top-full">
                    {item.text}
                  </span>
                </Link>
              ))}
            </div>

            {/* Simple text navigation for non-technical users */}
            <div className="hidden sm:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    px-3 py-1 rounded transition-colors duration-200 flex items-center
                    ${
                      pathname === item.path
                        ? "bg-term-cyan/10 text-term-cyan border border-term-cyan/30"
                        : "text-term-gray hover:text-term-white hover:bg-term-dark/50"
                    }
                  `}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Scan line effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-px bg-term-cyan/20 animate-scan" />
          </div>
        </div>
      </div>
    </nav>
  )
}

