"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, User, FileText, Mail, Code } from "lucide-react"
import { usePathname } from "next/navigation"

export default function RetroHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: User },
    { name: "Projects", path: "/projects", icon: Code },
    { name: "Blog", path: "/blog", icon: FileText },
    { name: "Contact", path: "/contact", icon: Mail },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-retro-black/90 backdrop-blur-md shadow-neon-cyan" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-bold text-2xl text-retro-cyan-light flex items-center group">
            <Code className="mr-2 h-6 w-6 text-retro-cyan group-hover:text-retro-cyan-light transition-colors" />
            <span className="retro-text-shadow">Retro.Dev</span>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 font-medium transition-all duration-200 flex items-center rounded-lg ${
                    isActive(item.path)
                      ? "bg-retro-cyan/20 text-retro-cyan-light"
                      : "text-retro-light hover:bg-retro-dark hover:text-retro-cyan-light"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden border border-retro-cyan/30 text-retro-cyan-light rounded-lg hover:bg-retro-cyan/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-retro-black/95 backdrop-blur-md border-t border-retro-cyan/20">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-3 my-1 font-medium rounded-lg flex items-center ${
                    isActive(item.path)
                      ? "bg-retro-cyan/20 text-retro-cyan-light"
                      : "text-retro-light hover:bg-retro-dark hover:text-retro-cyan-light"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

