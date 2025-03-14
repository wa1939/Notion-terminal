"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Terminal,
  Code,
  Server,
  Cpu,
  Award,
  BookOpen,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Clock,
} from "lucide-react"
import MinimalNav from "@/components/minimal-nav"
import TerminalFooter from "@/components/terminal-footer"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
          <div className="mb-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center mb-2">
                <span className="text-term-green">$</span>
                <span className="text-term-cyan ml-2">cat</span>
                <span className="text-term-white ml-2">resume.md</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-term-cyan mb-4">About Me</h1>
              <div className="h-[1px] w-16 bg-term-cyan mb-6" />
            </motion.div>
          </div>

          {/* Main grid layout */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left column - Profile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                {/* Profile image */}
                <div className="relative w-48 h-48 mx-auto">
                  {/* Water drop shape */}
                  <div
                    className="absolute inset-0"
                    style={{
                      borderRadius: "60% 40% 50% 50% / 40% 50% 50% 60%",
                      transform: "rotate(-45deg)",
                      overflow: "hidden",
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
                  </div>

                  {/* Water drop highlight */}
                  <div className="absolute top-[15%] left-[20%] w-[15%] h-[15%] bg-white/20 rounded-full blur-sm" />
                </div>

                {/* Profile info */}
                <div className="text-center">
                  <h2 className="text-xl font-bold text-term-white">Waleed Alghamdi</h2>
                  <p className="text-term-cyan">Senior Culture & Employee Experience Consultant</p>
                </div>

                {/* Contact info */}
                <div className="bg-term-dark border border-term-cyan/20 p-4 rounded-md">
                  <h3 className="text-term-cyan mb-3 font-bold">Contact Info</h3>
                  <div className="space-y-2 text-term-gray">
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-term-cyan" />
                      <a href="mailto:waok@outlook.sa" className="hover:text-term-cyan transition-colors">
                        waok@outlook.sa
                      </a>
                    </p>
                    <p>Location: Saudi Arabia</p>
                    <p>Languages: Arabic, English</p>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://github.com/wa1939"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-term-dark hover:bg-term-darker text-term-cyan border border-term-cyan/30 rounded transition-colors duration-200"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/waleedalghamdi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-term-dark hover:bg-term-darker text-term-cyan border border-term-cyan/30 rounded transition-colors duration-200"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href="https://x.com/waleedpy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-term-dark hover:bg-term-darker text-term-cyan border border-term-cyan/30 rounded transition-colors duration-200"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </div>

                {/* Download CV */}
                <a
                  href="https://file.notion.so/f/f/56a823ad-c36a-4a73-8857-b6e908259d81/ff4edff1-2438-424f-9689-6ee34c85b7b7/Waleed_H._Alghamdi_CV.pdf?table=block&id=1931d9ba-32c9-8083-9867-d7a88633de7e&spaceId=56a823ad-c36a-4a73-8857-b6e908259d81&expirationTimestamp=1741953600000&signature=GaDGb5ZB8FCSJTulhliMs2CvU3OAOBbHmAAPt3JwJdE&downloadName=Waleed+H.+Alghamdi+CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 bg-term-darker hover:bg-term-darker/80 text-term-cyan border border-term-cyan/30 rounded-md transition-colors duration-200 hover:border-term-cyan/60"
                >
                  Download CV
                </a>
              </div>
            </motion.div>

            {/* Right column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 space-y-10"
            >
              {/* Bio section */}
              <section className="space-y-4">
                <div className="flex items-center mb-2">
                  <Terminal className="text-term-cyan mr-2 h-5 w-5" />
                  <h2 className="text-xl font-bold text-term-cyan">Professional Summary</h2>
                </div>
                <div className="bg-term-dark border border-term-cyan/20 p-5 rounded-md space-y-4 text-term-gray">
                  <p>
                    Competent Consultant with a strong background in Project Management, Product Management, Business
                    Analysis, Organizational Development, Operational Excellence, Strategic Planning, Change Management,
                    and Culture Transformation. Certified as a Project Management Professional (PMP), Certified as a
                    Risk Management Professional (PMI-RMP), Prosci® Certified Change Practitioner, and Certified Change
                    Culture Leader.
                  </p>
                  <p>
                    I have successfully led over 15 culture transformation projects for top-tier clients in the Middle
                    East. Passionate about integrating AI and innovative technologies to enhance business processes.
                  </p>
                </div>
              </section>

              {/* Experience section */}
              <section className="space-y-4">
                <div className="flex items-center mb-2">
                  <Server className="text-term-cyan mr-2 h-5 w-5" />
                  <h2 className="text-xl font-bold text-term-cyan">Experience</h2>
                </div>
                <div className="bg-term-dark border border-term-cyan/20 p-5 rounded-md space-y-6">
                  <div className="border-l-2 border-term-cyan/30 pl-4">
                    <h3 className="text-term-white font-bold">Senior Culture & Employee Experience Consultant</h3>
                    <p className="text-term-cyan text-sm mb-2">Elm Company (PIF subsidiary) | Oct 2023 - Present</p>
                    <ul className="space-y-2 text-term-gray list-disc pl-5">
                      <li>
                        <strong className="text-term-white">Led the Innovative "Najd" Project:</strong> Directed a
                        cross-functional team to develop Najd, Elm's first fully Saudi, on-premise AI chatbot integrated
                        with Microsoft Teams, tailored to local business needs and managing HR information through a RAG
                        system.
                      </li>
                      <li>
                        <strong className="text-term-white">Achieved Significant Impact:</strong> Saved approximately
                        SAR 1 million by building the solution internally, transformed Najd into a marketable product
                        generating new revenue streams, and streamlined client operations with a user-friendly
                        interface.
                      </li>
                      <li>
                        Designed and implemented the M&A Playbook, covering all aspects of mergers and acquisitions to
                        ensure seamless integration and alignment with company objectives.
                      </li>
                      <li>
                        Developed a comprehensive due diligence assessment framework tailored to Elm's specific needs,
                        enhancing the accuracy and efficiency of acquisition evaluations.
                      </li>
                      <li>
                        Refined Elm's values and identified core and leadership competencies, aligning them with the
                        company's strategic culture goals.
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-term-cyan/30 pl-4">
                    <h3 className="text-term-white font-bold">Consultant</h3>
                    <p className="text-term-cyan text-sm mb-2">Baseqat Arabia Consulting | Sep 2023 - Oct 2023</p>
                    <ul className="space-y-2 text-term-gray list-disc pl-5">
                      <li>
                        Led all Denison organizational culture projects in MENA, focusing on improving workplace
                        dynamics and fostering positive change.
                      </li>
                      <li>
                        Led projects to evaluate leadership competencies for major clients in Saudi Arabia, ensuring
                        alignment with organizational culture and strategic goals.
                      </li>
                      <li>
                        Revisited and fixed processes to improve overall employee and organizational experience,
                        ensuring sustained cultural alignment and operational efficiency.
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-term-cyan/30 pl-4">
                    <h3 className="text-term-white font-bold">Business Analyst</h3>
                    <p className="text-term-cyan text-sm mb-2">Baseqat Arabia Consulting | Jul 2022 - Sep 2023</p>
                    <ul className="space-y-2 text-term-gray list-disc pl-5">
                      <li>
                        Led 15+ organizational culture transformation projects for top-tier Middle East firms (STC
                        Group, Mobily, SANS, GEA, and more) in partnership with Denison Consulting company.
                      </li>
                      <li>
                        Crafted tailored change culture action plans for diverse organizations, optimizing employee
                        adoption and minimizing resistance.
                      </li>
                      <li>
                        Designed HR strategy and operating model for Weqaa Center's separation from Ministry of
                        Environment, Water, and Agriculture.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Freelance section */}
              <section className="space-y-4">
                <div className="flex items-center mb-2">
                  <Code className="text-term-cyan mr-2 h-5 w-5" />
                  <h2 className="text-xl font-bold text-term-cyan">Freelance & SME Engagements</h2>
                </div>
                <div className="bg-term-dark border border-term-cyan/20 p-5 rounded-md space-y-6">
                  <div className="border-l-2 border-term-cyan/30 pl-4">
                    <h3 className="text-term-white font-bold">Senior Consultant</h3>
                    <p className="text-term-cyan text-sm mb-2">
                      HR Leaders Consulting & Baseqat Arabia Consulting | Jan 2024 - Dec 2024
                    </p>
                    <p className="text-term-white mb-1">Royal Commission for Jubail and Yanbu (RCJY):</p>
                    <ul className="space-y-2 text-term-gray list-disc pl-5">
                      <li>
                        Developed a Power BI dashboard to analyze employee turnover across four cities, identifying key
                        challenges and data-driven solutions.
                      </li>
                      <li>Contributed to manpower planning strategies to address workforce gaps.</li>
                      <li>
                        Provided SME insights on multiple strategic projects, focusing on process optimization and
                        cultural transformation initiatives.
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-term-cyan/30 pl-4">
                    <h3 className="text-term-white font-bold">Senior Consultant (SME)</h3>
                    <p className="text-term-cyan text-sm mb-2">Cornerstone Consulting | Nov 2024 - Jan 2025</p>
                    <ul className="space-y-2 text-term-gray list-disc pl-5">
                      <li>
                        Created an interactive operations manual for the Sectoral skills councils (SSC) initiative under
                        HRSD, enhancing user engagement and reducing implementation time.
                      </li>
                      <li>
                        Optimized processes by capturing and resolving workflow bottlenecks, delivering tangible
                        improvements in organizational output.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Skills section */}
              <section className="space-y-4">
                <div className="flex items-center mb-2">
                  <Cpu className="text-term-cyan mr-2 h-5 w-5" />
                  <h2 className="text-xl font-bold text-term-cyan">Skills</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-term-dark border border-term-cyan/20 p-4 rounded-md">
                    <h3 className="text-term-cyan mb-3 font-bold">Professional</h3>
                    <ul className="space-y-2 text-term-gray">
                      <li className="flex items-center">
                        <span className="text-term-green mr-2">•</span>
                        Project Management
                      </li>
                      <li className="flex items-center">
                        <span className="text-term-green mr-2">•</span>
                        Change Culture
                      </li>
                      <li className="flex items-center">
                        <span className="text-term-green mr-2">•</span>
                        Change Management
                      </li>
                      <li className="flex items-center">
                        <span className="text-term-green mr-2">•</span>
                        Analytical Skills
                      </li>
                      <li className="flex items-center">
                        <span className="text-term-green mr-2">•</span>
                        Problem Solving
                      </li>
                    </ul>
                  </div>
                  <div className="bg-term-dark border border-term-cyan/20 p-4 rounded-md">
                    <h3 className="text-term-cyan mb-3 font-bold">Technical</h3>
                    <ul className="space-y-2 text-term-gray">
                      <li className="flex items-center">
                        <span className="text-term-green mr-2">•</span>
                        Python and AI Integration
                      </li>
                      <li className="flex items-center">
                        <span className="text-term-green mr-2">•</span>
                        Data Analysis
                      </li>
                      <li className="flex items-center">
                        <span className="text-term-green mr-2">•</span>
                        Advanced Microsoft Excel & PPT
                      </li>
                      <li className="flex items-center">
                        <span className="text-term-green mr-2">•</span>
                        Business Development
                      </li>
                      <li className="flex items-center">
                        <span className="text-term-green mr-2">•</span>
                        Communication
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Certifications section */}
              <section className="space-y-4">
                <div className="flex items-center mb-2">
                  <Award className="text-term-cyan mr-2 h-5 w-5" />
                  <h2 className="text-xl font-bold text-term-cyan">Certifications</h2>
                </div>

                {/* Certification badges row */}
                <div className="flex flex-nowrap justify-center gap-4 mb-6 overflow-x-auto pb-2">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pmp-600px-2eKqqRiTulSRuZefG1l7MwF0UGQXtf.webp"
                      alt="PMP Certification"
                      width={120}
                      height={120}
                      className="hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/twitter_thumb_201604_pmi-rmp-600px-RJiobHS4HTvWedCML1XiwzNa5kfcvU.webp"
                      alt="PMI-RMP Certification"
                      width={120}
                      height={120}
                      className="hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prosci_certified-Fa1e2a7tYuuhabGDjBC0jm7zE2O5PY.webp"
                      alt="Prosci Certification"
                      width={120}
                      height={120}
                      className="hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/green-belt-formation-ZxLReO0r1CWlV2q8PPKXx8JOfVRAft.webp"
                      alt="Lean Six Sigma Green Belt"
                      width={120}
                      height={120}
                      className="hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fAxr6RxvxxnXpcQ3dWEApFWLimfkdp.webp"
                      alt="McKinsey Forward Program"
                      width={120}
                      height={120}
                      className="hover:scale-105 transition-transform rounded-xl"
                    />
                  </div>

                  {/* Coming Soon Badge */}
                  <div className="flex-shrink-0">
                    <div className="relative w-[120px] h-[120px] flex items-center justify-center bg-term-darker border border-term-cyan/30 rounded-xl hover:scale-105 transition-transform group">
                      <div className="absolute inset-0 bg-term-cyan/5 rounded-xl animate-pulse"></div>
                      <div className="text-center z-10">
                        <Clock className="h-10 w-10 mx-auto mb-2 text-term-cyan/70 group-hover:text-term-cyan transition-colors" />
                        <p className="text-term-cyan font-bold">Coming Soon</p>
                        <p className="text-term-gray text-xs mt-1">More certifications</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-term-dark border border-term-cyan/20 p-5 rounded-md">
                  <ul className="space-y-3 text-term-gray">
                    <li className="flex items-center">
                      <span className="text-term-green mr-2">•</span>
                      Certified Project Management Professional (PMP®)
                    </li>
                    <li className="flex items-center">
                      <span className="text-term-green mr-2">•</span>
                      PMI Risk Management Professional (PMI-RMP)
                    </li>
                    <li className="flex items-center">
                      <span className="text-term-green mr-2">•</span>
                      Prosci® Certified Change Practitioner
                    </li>
                    <li className="flex items-center">
                      <span className="text-term-green mr-2">•</span>
                      Certified Change Culture Consultant - Denison
                    </li>
                    <li className="flex items-center">
                      <span className="text-term-green mr-2">•</span>
                      Lean Six Sigma Green Belt - Kaizen Institute Global
                    </li>
                    <li className="flex items-center">
                      <span className="text-term-green mr-2">•</span>
                      Strategic Innovation - University of Illinois
                    </li>
                    <li className="flex items-center">
                      <span className="text-term-green mr-2">•</span>
                      Design-Led Strategy - The University of Sydney Business School
                    </li>
                    <li className="flex items-center">
                      <span className="text-term-green mr-2">•</span>
                      McKinsey Forward Program - McKinsey & Company
                    </li>
                  </ul>
                </div>
              </section>

              {/* Education section */}
              <section className="space-y-4">
                <div className="flex items-center mb-2">
                  <BookOpen className="text-term-cyan mr-2 h-5 w-5" />
                  <h2 className="text-xl font-bold text-term-cyan">Education</h2>
                </div>
                <div className="bg-term-dark border border-term-cyan/20 p-5 rounded-md">
                  <div className="border-l-2 border-term-cyan/30 pl-4">
                    <h3 className="text-term-white font-bold">Bachelor of Engineering - BE, Mechanical Engineering</h3>
                    <p className="text-term-cyan text-sm">University of Jeddah</p>
                  </div>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}

