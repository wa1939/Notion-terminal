import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Code, ChevronRight, Heart } from "lucide-react"

export default function RetroFooter() {
  return (
    <footer className="bg-retro-black border-t border-retro-cyan/20 py-12 relative overflow-hidden">
      <div className="retro-grid opacity-10"></div>
      <div className="retro-radial"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-bold text-2xl mb-6 text-retro-cyan-light flex items-center group">
              <Code className="mr-2 h-6 w-6 text-retro-cyan group-hover:text-retro-cyan-light transition-colors" />
              <span className="retro-text-shadow">Retro.Dev</span>
            </h3>
            <p className="mb-6 text-retro-light">
              A modern portfolio with retro aesthetics, showcasing my work and thoughts on web development, design, and
              technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="retro-icon-box">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="retro-icon-box">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="retro-icon-box">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="retro-icon-box">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 text-retro-cyan-light">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2">
              <Link
                href="/"
                className="text-retro-light hover:text-retro-cyan-light transition-colors flex items-center group py-1"
              >
                <ChevronRight className="h-4 w-4 mr-1 text-retro-cyan group-hover:translate-x-1 transition-transform" />
                Home
              </Link>
              <Link
                href="/about"
                className="text-retro-light hover:text-retro-cyan-light transition-colors flex items-center group py-1"
              >
                <ChevronRight className="h-4 w-4 mr-1 text-retro-cyan group-hover:translate-x-1 transition-transform" />
                About
              </Link>
              <Link
                href="/projects"
                className="text-retro-light hover:text-retro-cyan-light transition-colors flex items-center group py-1"
              >
                <ChevronRight className="h-4 w-4 mr-1 text-retro-cyan group-hover:translate-x-1 transition-transform" />
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-retro-light hover:text-retro-cyan-light transition-colors flex items-center group py-1"
              >
                <ChevronRight className="h-4 w-4 mr-1 text-retro-cyan group-hover:translate-x-1 transition-transform" />
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-retro-light hover:text-retro-cyan-light transition-colors flex items-center group py-1"
              >
                <ChevronRight className="h-4 w-4 mr-1 text-retro-cyan group-hover:translate-x-1 transition-transform" />
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 text-retro-cyan-light">Newsletter</h3>
            <p className="mb-4 text-retro-light">Subscribe to get updates on new projects and blog posts.</p>
            <form className="flex mb-6">
              <input type="email" placeholder="your.email@example.com" className="retro-input flex-1 rounded-l-lg" />
              <button type="submit" className="retro-button px-4 py-2 rounded-r-lg">
                Subscribe
              </button>
            </form>
            <p className="text-sm text-retro-light/70">I respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-retro-cyan/10 text-center text-retro-light/70">
          <p className="flex items-center justify-center">
            © {new Date().getFullYear()} Retro.Dev. Made with
            <Heart className="h-4 w-4 mx-1 text-retro-pink" /> and
            <Code className="h-4 w-4 mx-1 text-retro-cyan" />
          </p>
        </div>
      </div>
    </footer>
  )
}

