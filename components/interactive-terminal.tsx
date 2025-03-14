"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Command {
  input: string
  output: React.ReactNode
}

export default function InteractiveTerminal() {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<Command[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Available commands
  const commands = {
    help: () => (
      <div className="pl-4 space-y-1">
        <p>Available commands:</p>
        <p>
          <span className="text-term-cyan">help</span> - Show this help message
        </p>
        <p>
          <span className="text-term-cyan">about</span> - Learn about me
        </p>
        <p>
          <span className="text-term-cyan">blog</span> - Read my blog posts
        </p>
        <p>
          <span className="text-term-cyan">contact</span> - Get in touch
        </p>
        <p>
          <span className="text-term-cyan">skills</span> - View my skills
        </p>
        <p>
          <span className="text-term-cyan">my_story</span> - Read my personal story
        </p>
        <p>
          <span className="text-term-cyan">what_i_do</span> - See what I can offer professionally
        </p>
        <p>
          <span className="text-term-cyan">clear</span> - Clear the terminal
        </p>
      </div>
    ),
    about: () => {
      router.push("/about")
      return <p>Navigating to about page...</p>
    },
    blog: () => {
      router.push("/blog")
      return <p>Navigating to blog page...</p>
    },
    contact: () => {
      router.push("/contact")
      return <p>Navigating to contact page...</p>
    },
    skills: () => (
      <div className="pl-4 space-y-1">
        <p>My skills include:</p>
        <p>
          • <span className="text-term-cyan">Frontend</span>: React, Next.js, TypeScript
        </p>
        <p>
          • <span className="text-term-cyan">Backend</span>: Node.js, Express, AWS
        </p>
        <p>
          • <span className="text-term-cyan">Design</span>: UI/UX, Figma
        </p>
        <p>
          • <span className="text-term-cyan">Other</span>: Technical consulting, Project management
        </p>
      </div>
    ),
    my_story: () => (
      <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
        <h2 className="text-xl font-bold text-term-cyan">Who I Am Today, And How I Got Here</h2>

        <blockquote className="border-l-2 border-term-cyan pl-3 italic text-term-gray">
          <p>Curiosity was always my playground.</p>
        </blockquote>

        <h3 className="text-lg font-bold text-term-cyan">Here's the story:</h3>

        <p>
          Ever since I was a kid, I've been known as{" "}
          <strong className="text-term-white font-bold">"Waleed the Breaker."</strong> Why? Because I couldn't resist
          taking apart every toy to see what was inside. I was always curious about how things worked, and that
          curiosity hasn't gone away.
        </p>

        <p>
          In school, <strong className="text-term-white font-bold">physics was my thing</strong>. I loved it because it
          was all about understanding concepts, not just memorizing facts. Biology? Not so much – too much memorization
          without really grasping the <em className="italic">why</em> behind it all. Tech has always been a big part of
          my life. From a young age, I was all about learning programming, editing – anything tech-related. When it was
          time for college, I had a tough choice: Mechanical Engineering, Physics, or Computer Engineering. I went with
          Mechanical Engineering because I've always been fascinated by how machines work, from cars to planes. But as I
          got further into my studies at the University of Jeddah, I realized engineering wasn't just about gears and
          engines—it was about learning to think critically, solve problems, and approach challenges in innovative ways.
          That's what led me to shift into management consulting, where I focus on helping organizations and people
          reach their goals.
        </p>

        <p>
          Over the years, I've worked on more than <strong className="text-term-white font-bold">25</strong> major
          projects for <strong className="text-term-white font-bold">top-tier clients</strong> across the Middle East.
          But it's never been just about completing projects—it's about the impact, transformation, and evolution they
          bring.
        </p>

        <p>
          Outside of work, I'm all about learning new things—whether it's from podcasts, tech news, or talking to
          interesting people. I'm not much for dreaming—I prefer setting solid goals centered on{" "}
          <strong className="text-term-white font-bold">making people's lives easier</strong> and leaving a positive
          mark. When I'm not working, I love to travel, meet new people, and tackle challenges—especially the kind that
          make me think. I'm into everything from strategy and tech to marketing and finance. And yes, I'm pretty
          ambitious!
        </p>

        <p>
          So, that's a bit about me. <strong className="text-term-white font-bold">I'm Waleed Alghamdi</strong>, and I
          believe in sharing knowledge, helping others, and doing whatever it takes to simplify life for the people
          around me.
        </p>
      </div>
    ),
    what_i_do: () => (
      <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
        <h2 className="text-xl font-bold text-term-cyan">What I Do</h2>

        <div className="space-y-4">
          <div>
            <p className="font-bold text-term-white">🌐 Change Management & Organizational Culture</p>
            <p className="text-term-gray pl-5">
              I spearhead projects to revolutionize organizational culture, focusing on creating dynamic and positive
              changes in premier companies across the Middle East.
            </p>
          </div>

          <div>
            <p className="font-bold text-term-white">📊 Business Analysis & Strategy</p>
            <p className="text-term-gray pl-5">
              I strategize and implement business solutions to enhance operational efficiency and drive growth in
              competitive environments.
            </p>
          </div>

          <div>
            <p className="font-bold text-term-white">🚀 Client Relationships & Business Development</p>
            <p className="text-term-gray pl-5">
              I specialize in building and enhancing client relationships, steering business development, and refining
              client journey and sales processes.
            </p>
          </div>

          <div>
            <p className="font-bold text-term-white">🏢 HR Consultation</p>
            <p className="text-term-gray pl-5">
              I develop versatile HR strategies, encompassing comprehensive operating models tailored to meet a wide
              range of organizational needs—from strategic planning to employee engagement initiatives.
            </p>
          </div>

          <div>
            <p className="font-bold text-term-white">🔎 Customer Development</p>
            <p className="text-term-gray pl-5">
              I help businesses pinpoint the right problems to solve, ensuring they create solutions that customers
              truly want to buy, all while gaining deeper insights into customer preferences.
            </p>
          </div>

          <div>
            <p className="font-bold text-term-white">💡 Digital Transformation</p>
            <p className="text-term-gray pl-5">
              I guide organizations through modernizing their processes and culture with advanced digital tools and
              technologies, delivering tangible improvements in efficiency, innovation, and customer engagement.
            </p>
          </div>

          <div>
            <p className="font-bold text-term-white">✅ Project Management & Product Management</p>
            <p className="text-term-gray pl-5">
              I lead cross-functional teams to deliver projects on time and within scope, while overseeing the entire
              product lifecycle—from ideation and roadmap planning to execution and market launch—ensuring strategic
              alignment and measurable success.
            </p>
          </div>
        </div>
      </div>
    ),
    clear: () => {
      // Return null as we handle clearing in the handleSubmit function
      return null
    },
  }

  // Process command input
  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (trimmedCmd === "") {
      return <span>&nbsp;</span>
    }

    if (trimmedCmd in commands) {
      return commands[trimmedCmd as keyof typeof commands]()
    }

    if (trimmedCmd.startsWith("cd ")) {
      const path = trimmedCmd.substring(3).trim()
      if (path === "~" || path === "/") {
        router.push("/")
        return <p>Navigating to home...</p>
      }
      if (path === "about" || path === "./about") {
        router.push("/about")
        return <p>Navigating to about page...</p>
      }
      if (path === "blog" || path === "./blog") {
        router.push("/blog")
        return <p>Navigating to blog page...</p>
      }
      if (path === "contact" || path === "./contact") {
        router.push("/contact")
        return <p>Navigating to contact page...</p>
      }
    }

    return (
      <p>
        Command not found: {trimmedCmd}. Type <span className="text-term-cyan">help</span> for available commands.
      </p>
    )
  }

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (input.trim() === "") return

    const trimmedInput = input.trim().toLowerCase()

    // Special handling for clear command
    if (trimmedInput === "clear") {
      setCommandHistory([])
      setInput("")
      setHistoryIndex(-1)
      return
    }

    const newCommand: Command = {
      input,
      output: processCommand(input),
    }

    setCommandHistory([...commandHistory, newCommand])
    setInput("")
    setHistoryIndex(-1)
  }

  // Handle keyboard navigation through command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory])

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Add welcome message on first render
  useEffect(() => {
    setCommandHistory([
      {
        input: "",
        output: (
          <div className="space-y-1">
            <p>Welcome to my interactive terminal!</p>
            <p>
              Type <span className="text-term-cyan">help</span> to see available commands.
            </p>
          </div>
        ),
      },
    ])
  }, [])

  return (
    <div className="bg-term-dark border border-term-cyan/30 rounded-md overflow-hidden" onClick={focusInput}>
      {/* Terminal header */}
      <div className="bg-term-darker px-4 py-2 flex items-center justify-between border-b border-term-cyan/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-term-gray">terminal@waok:~</div>
        <div className="w-4"></div>
      </div>

      {/* Terminal content */}
      <div ref={terminalRef} className="p-4 h-64 overflow-y-auto font-mono text-sm">
        {commandHistory.map((cmd, i) => (
          <div key={i} className="mb-2">
            {cmd.input && (
              <div className="flex">
                <span className="text-term-green mr-2">$</span>
                <span>{cmd.input}</span>
              </div>
            )}
            <div className="text-term-white mt-1">{cmd.output}</div>
          </div>
        ))}

        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-term-green mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-term-white"
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}

