"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Terminal, Heart, Code } from "lucide-react"

export default function TerminalFooter() {
  const [showSubscribeForm, setShowSubscribeForm] = useState(true)
  const [subscribeStatus, setSubscribeStatus] = useState<null | "success" | "error" | "loading">(null)

  // Check if user has already subscribed
  useEffect(() => {
    const hasSubscribed = localStorage.getItem("subscribed")
    if (hasSubscribed) {
      setSubscribeStatus("success")
      setShowSubscribeForm(false)
    }
  }, [])

  // Handle message from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from Chilipepper
      if (event.data && event.data.type === "chilipepper-form-submit-success") {
        setSubscribeStatus("success")
        setShowSubscribeForm(false)
        localStorage.setItem("subscribed", "true")
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <footer className="bg-term-darker border-t border-term-cyan/10 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About column */}
          <div className="space-y-4">
            <h3 className="text-term-cyan font-bold text-lg flex items-center">
              <Terminal className="mr-2 h-5 w-5" />
              <span>Waleed Alghamdi</span>
            </h3>
            <p className="text-term-gray">
              Management Consultant with a passion for technology, AI, and innovative
              solutions.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com/wa1939"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-term-dark hover:bg-term-darker text-term-cyan border border-term-cyan/30 rounded transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/waleedalghamdi/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-term-dark hover:bg-term-darker text-term-cyan border border-term-cyan/30 rounded transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/waleedpy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-term-dark hover:bg-term-darker text-term-cyan border border-term-cyan/30 rounded transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:waok@outlook.sa"
                className="p-2 bg-term-dark hover:bg-term-darker text-term-cyan border border-term-cyan/30 rounded transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-term-cyan font-bold text-lg">Quick Links</h3>
            <nav className="grid grid-cols-1 gap-2">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-term-gray hover:text-term-cyan transition-colors duration-200 flex items-center group"
                >
                  <span className="text-term-green mr-2">$</span>
                  <span className="text-term-cyan mr-1">cd</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {link.path === "/" ? "~" : link.path}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Subscribe column */}
          <div className="space-y-4">
            <h3 className="text-term-cyan font-bold text-lg">Subscribe to My Blog</h3>
            {subscribeStatus === "success" ? (
              <div className="bg-term-dark border border-term-cyan/20 p-4 rounded-md">
                <p className="text-term-green mb-1">✓ Subscribed!</p>
                <p className="text-term-gray text-sm">Thank you for subscribing to my blog updates.</p>
              </div>
            ) : (
              <>
                <p className="text-term-gray mb-2">Get notified about new articles and updates.</p>
                <div className="bg-term-dark border border-term-cyan/30 rounded-md overflow-hidden">
                  <iframe
                    src="https://chilipepper.io/form/xhot-burntorange-bannapepper-bd77d157-c186-4b9b-9e39-920efb45f22a?embed=true&theme=dark"
                    width="100%"
                    height="140"
                    style={{ border: "none", overflow: "hidden" }}
                    title="Newsletter Subscription"
                  ></iframe>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-term-cyan/10 text-center text-term-gray text-sm">
          <p className="flex items-center justify-center">
            © {new Date().getFullYear()} Waleed. Made with
            <Heart className="h-4 w-4 mx-1 text-term-cyan" /> and
            <Code className="h-4 w-4 mx-1 text-term-cyan" />
          </p>
        </div>
      </div>
    </footer>
  )
}

