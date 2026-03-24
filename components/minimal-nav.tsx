"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ThemePicker from "@/components/theme-picker"
import { siteConfig } from "@/content/site"

const navItems = [
  { path: "/", number: "01", label: "home", command: "cd ~" },
  { path: "/blog", number: "02", label: "journal", command: "ls posts/" },
  { path: "/about", number: "03", label: "about", command: "cat resume.md" },
  { path: "/contact", number: "04", label: "contact", command: "ping me" },
] as const

export default function MinimalNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-term-line bg-term-black/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-4 text-sm">
          <Link href="/" className="min-w-0 text-term-white transition-colors hover:text-term-cyan group">
            <pre className="text-[8px] leading-[1.1] text-term-cyan group-hover:text-term-white transition-colors font-mono select-none" aria-hidden="true">{`█╗ ╔█╗ ╔═╗\n██╗██║ ╠═╣\n╚═╝╚╝ ╩ ╩`}</pre>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-term-gray mt-0.5">portfolio</span>
          </Link>

          <div className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => {
              const active = item.path === "/" ? pathname === "/" : pathname === item.path || pathname.startsWith(`${item.path}/`)

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`transition-colors ${active ? "text-term-white" : "text-term-gray hover:text-term-cyan"}`}
                >
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-term-gray">({item.number}) {item.command}</span>
                  <span className="block text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-6">
            <ThemePicker />
            <div className="hidden lg:flex items-center gap-4 text-xs tracking-[0.16em] text-term-gray uppercase">
              {Object.values(siteConfig.socials).map((social) => (
                <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-term-cyan focus:text-term-cyan outline-none transition-colors flex items-center gap-1.5">
                  <span className="text-term-white font-bold">{social.icon}</span> {social.label.toLowerCase()}
                </a>
              ))}
              <a href={`mailto:${siteConfig.email}`} className="hover:text-term-cyan focus:text-term-cyan outline-none transition-colors flex items-center gap-1.5">
                <span className="text-term-white font-bold">@</span> email
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center justify-center border border-term-line px-4 py-3 min-w-[44px] min-h-[44px] text-term-white lg:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "[X]" : "[=]"}
          </button>
        </div>

        {open && (
          <div id="mobile-nav" className="border-t border-term-line py-3 lg:hidden">
            <div className="grid gap-3">
              {navItems.map((item) => {
                const active = item.path === "/" ? pathname === "/" : pathname === item.path || pathname.startsWith(`${item.path}/`)

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className={`border border-term-line px-4 py-4 min-h-[48px] ${active ? "bg-term-dark text-term-white" : "text-term-gray hover:text-term-cyan"}`}
                  >
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-term-gray">({item.number}) {item.command}</span>
                    <span className="mt-1 block text-sm">{item.label}</span>
                  </Link>
                )
              })}
              <div className="flex items-center gap-4 px-4 py-2 text-xs tracking-[0.16em] text-term-gray uppercase">
                {Object.values(siteConfig.socials).map((social) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-term-cyan flex items-center gap-1.5">
                    <span className="text-term-white font-bold">{social.icon}</span> {social.label.toLowerCase()}
                  </a>
                ))}
                <a href={`mailto:${siteConfig.email}`} className="hover:text-term-cyan flex items-center gap-1.5">
                  <span className="text-term-white font-bold">@</span> email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
