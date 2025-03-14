"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SubscribePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [hasSubscribed, setHasSubscribed] = useState(false)

  useEffect(() => {
    // Check if user has already subscribed
    const subscribed = localStorage.getItem("subscribed")
    if (subscribed) return

    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the email to your backend
    console.log("Subscribing email:", email)

    // Save subscription status
    localStorage.setItem("subscribed", "true")
    setHasSubscribed(true)

    // Close popup after 2 seconds
    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-md w-full retro-border">
        <div className="retro-content relative overflow-hidden">
          <div className="scanline"></div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 border-2 border-violet-700 rounded-none text-violet-400"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>

          {!hasSubscribed ? (
            <>
              <h2 className="text-2xl font-bold mb-2 text-violet-400 animate-glow">Stay Updated!</h2>
              <p className="mb-4 text-violet-200">
                Subscribe to my newsletter to get notified when I publish new blog posts.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block font-bold mb-1 text-violet-300">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border-2 border-violet-700 bg-indigo-900 text-violet-100 rounded-none"
                    placeholder="your.email@example.com"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-violet-700 hover:bg-violet-800 text-white border-2 border-violet-900 rounded-none"
                >
                  Subscribe
                </Button>
              </form>

              <p className="text-sm mt-4 text-violet-400">I respect your privacy. Unsubscribe at any time.</p>
            </>
          ) : (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-2 text-violet-400 animate-glow">Thank You!</h2>
              <p className="text-violet-200">You've successfully subscribed to my newsletter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

