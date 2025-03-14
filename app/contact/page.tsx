"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, MapPin, Phone, Calendar } from "lucide-react"
import MinimalNav from "@/components/minimal-nav"
import TerminalFooter from "@/components/terminal-footer"

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // This function will be called after the component mounts
  // to safely add the Cal.com script to the page
  useEffect(() => {
    if (!mounted) return

    // Create a script element for Cal.com
    const calScript = document.createElement("script")
    calScript.innerHTML = `
      (function (C, A, L) { 
        let p = function (a, ar) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          } 
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");
      
      // Initialize Cal
      window.Cal && window.Cal("init", "30min", {origin:"https://cal.com"});
      
      // Give the script time to load before configuring
      setTimeout(() => {
        if (window.Cal && window.Cal.ns && window.Cal.ns["30min"]) {
          window.Cal.ns["30min"]("inline", {
            elementOrSelector:"#my-cal-inline",
            config: {"layout":"month_view"},
            calLink: "waleedalghamdi/30min",
          });
          
          window.Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        }
      }, 1000);
    `

    // Add the script to the document
    document.body.appendChild(calScript)

    // Clean up function
    return () => {
      if (calScript.parentNode) {
        calScript.parentNode.removeChild(calScript)
      }
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-term-black text-term-white font-mono flex flex-col">
      <MinimalNav />

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[url('/noise.png')] animate-noise" />

      {/* Main content */}
      <main className="relative pt-20 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          {/* Back navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-term-gray hover:text-term-cyan transition-colors duration-200 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-term-green">$</span> cd ..
            </Link>
          </div>

          {/* Terminal-style header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center mb-2">
              <span className="text-term-green">$</span>
              <span className="text-term-cyan ml-2">ping</span>
              <span className="text-term-white ml-2">me</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-term-cyan mb-4">Get in Touch</h1>
            <div className="h-[1px] w-16 bg-term-cyan mb-6" />
            <p className="text-term-gray max-w-2xl">
              Have a question or want to work together? Book a time with me using the calendar below or reach out via
              email.
            </p>
          </motion.div>

          {/* Contact grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Cal.com booking widget */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-term-dark border border-term-cyan/20 rounded-md p-6"
            >
              <h2 className="text-xl font-bold text-term-cyan mb-6 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Time with Me
              </h2>

              {/* Cal.com inline embed container */}
              <div
                id="my-cal-inline"
                className="bg-term-darker border border-term-cyan/10 rounded-md w-full min-h-[700px] relative"
              ></div>
            </motion.div>

            {/* Contact info and availability */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Contact information */}
              <div className="bg-term-dark border border-term-cyan/20 rounded-md p-6">
                <h2 className="text-xl font-bold text-term-cyan mb-6 flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-term-cyan mr-3 mt-1" />
                    <div>
                      <h3 className="text-term-white font-bold">Email</h3>
                      <p className="text-term-gray">
                        <a href="mailto:waok@outlook.sa" className="hover:text-term-cyan transition-colors">
                          waok@outlook.sa
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-term-cyan mr-3 mt-1" />
                    <div>
                      <h3 className="text-term-white font-bold">Location</h3>
                      <p className="text-term-gray">Saudi Arabia</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-term-cyan mr-3 mt-1" />
                    <div>
                      <h3 className="text-term-white font-bold">Phone</h3>
                      <p className="text-term-gray">Available upon request</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct booking link as fallback */}
              <div className="bg-term-dark border border-term-cyan/20 rounded-md p-6">
                <h2 className="text-xl font-bold text-term-cyan mb-4">Direct Booking</h2>
                <p className="text-term-gray mb-4">
                  If you prefer, you can also book a meeting directly through my Cal.com page:
                </p>
                <a
                  href="https://cal.com/waleedalghamdi/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 bg-term-darker hover:bg-term-darker/80 text-term-cyan border border-term-cyan/30 rounded-md transition-colors duration-200 hover:border-term-cyan/60"
                >
                  Book a 30-minute meeting
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}

