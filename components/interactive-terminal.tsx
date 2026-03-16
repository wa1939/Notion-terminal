"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Entry = {
  input: string
  output: React.ReactNode
}

const suggestions = ["help", "about", "blog", "contact", "skills", "whoami"] as const

export default function InteractiveTerminal() {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [entries, setEntries] = useState<Entry[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const aliases = useMemo(
    () => ({
      journal: "blog",
      writing: "blog",
      posts: "blog",
      resume: "about",
      cv: "about",
      email: "contact",
      hire: "contact",
      "show me your work": "blog",
      "tell me about yourself": "whoami",
    }),
    [],
  )

  const commands = useMemo(
    () => ({
      help: () => (
        <div className="space-y-1 pl-4 text-term-gray">
          <p>available commands</p>
          <p>
            <span className="text-term-cyan">about</span>
            {" // open the dossier"}
          </p>
          <p>
            <span className="text-term-cyan">blog</span>
            {" // browse the journal"}
          </p>
          <p>
            <span className="text-term-cyan">contact</span>
            {" // open contact options"}
          </p>
          <p>
            <span className="text-term-cyan">skills</span>
            {" // show working set"}
          </p>
          <p>
            <span className="text-term-cyan">whoami</span>
            {" // read the short story"}
          </p>
          <p>
            <span className="text-term-cyan">clear</span>
            {" // clear previous commands"}
          </p>
        </div>
      ),
      about: () => {
        router.push("/about")
        return <p className="text-term-gray">opening dossier...</p>
      },
      blog: () => {
        router.push("/blog")
        return <p className="text-term-gray">opening journal archive...</p>
      },
      contact: () => {
        router.push("/contact")
        return <p className="text-term-gray">opening contact channel...</p>
      },
      skills: () => (
        <div className="space-y-1 pl-4 text-term-gray">
          <p>working set</p>
          <p>- strategy execution</p>
          <p>- change management</p>
          <p>- culture transformation</p>
          <p>- product thinking</p>
          <p>- python and ai integration</p>
          <p>- dashboards, analysis, and decision support</p>
        </div>
      ),
      whoami: () => (
        <div className="space-y-3 pl-4 text-term-gray">
          <p>
            I started in engineering, moved into consulting, and kept following the same question: how do you make complex things usable for real people?
          </p>
          <p>
            That question pulled me into systems, culture, digital transformation, product thinking, and AI-enabled internal tools.
          </p>
          <Link href="/about" className="cli-link inline-block">
            read the longer version
          </Link>
        </div>
      ),
    }),
    [router],
  )

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [entries])

  const historyInputs = entries.map((entry) => entry.input)

  const resolveCommand = (raw: string) => {
    const normalized = raw.trim().toLowerCase()
    if (!normalized) return <span>&nbsp;</span>

    const mapped = aliases[normalized as keyof typeof aliases] ?? normalized

    if (mapped === "clear") {
      return null
    }

    if (mapped in commands) {
      return commands[mapped as keyof typeof commands]()
    }

    if (mapped.startsWith("cd ")) {
      const destination = mapped.replace(/^cd\s+/, "").trim()
      if (destination === "~" || destination === "/") {
        router.push("/")
        return <p className="text-term-gray">returning home...</p>
      }
      if (destination === "about") {
        router.push("/about")
        return <p className="text-term-gray">opening dossier...</p>
      }
      if (destination === "blog" || destination === "posts") {
        router.push("/blog")
        return <p className="text-term-gray">opening journal archive...</p>
      }
      if (destination === "contact") {
        router.push("/contact")
        return <p className="text-term-gray">opening contact channel...</p>
      }
    }

    return (
      <p className="text-term-gray">
        command not found: <span className="text-term-white">{normalized}</span>. type <span className="text-term-cyan">help</span> for available commands.
      </p>
    )
  }

  const runCommand = (value: string) => {
    if (value.toLowerCase() === "clear") {
      setEntries([])
      setInput("")
      setHistoryIndex(-1)
      return
    }

    const output = resolveCommand(value)
    if (output !== null) {
      setEntries((current) => [...current, { input: value, output }])
    }

    setInput("")
    setHistoryIndex(-1)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const value = input.trim()
    if (!value) return
    runCommand(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault()
      if (historyInputs.length === 0) return

      const nextIndex = Math.min(historyIndex + 1, historyInputs.length - 1)
      setHistoryIndex(nextIndex)
      setInput(historyInputs[historyInputs.length - 1 - nextIndex])
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      if (historyIndex <= 0) {
        setHistoryIndex(-1)
        setInput("")
        return
      }

      const nextIndex = historyIndex - 1
      setHistoryIndex(nextIndex)
      setInput(historyInputs[historyInputs.length - 1 - nextIndex])
    }
  }

  return (
    <div className="cli-frame overflow-hidden">
      <div className="flex items-center justify-between border-b border-term-line px-4 py-3 text-xs uppercase tracking-[0.16em] text-term-gray bg-term-dark">
        <div>[ root@waok:~ ]</div>
        <div>/bin/sh</div>
      </div>

      <div ref={bodyRef} className="max-h-[26rem] overflow-y-auto px-4 py-4 text-sm leading-7">
        <div className="space-y-3 border-b border-term-line pb-4 text-term-gray">
          <p>
            <span className="text-term-white">welcome.</span> You can click around this site, or use the prompt below if you want a more command-line way in.
          </p>
          <p>
            try <span className="text-term-cyan">about</span>, <span className="text-term-cyan">blog</span>, <span className="text-term-cyan">contact</span>, or plain language like <span className="text-term-cyan">show me your work</span>.
          </p>
        </div>

        <div className="space-y-4 py-4">
          {entries.map((entry, index) => (
            <div key={`${entry.input}-${index}`} className="space-y-1.5">
              <div className="flex items-start gap-3 text-term-white">
                <span className="text-term-green">$</span>
                <span>{entry.input}</span>
              </div>
              <div>{entry.output}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-term-line pt-4">
          <label htmlFor="interactive-terminal" className="sr-only">
            Terminal command input
          </label>
          <div className="flex items-center gap-3 text-term-white">
            <span className="text-term-green">$</span>
            <input
              id="interactive-terminal"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, 100))}
              onKeyDown={handleKeyDown}
              placeholder="help, about, blog, contact, skills"
              className="min-w-0 flex-1 bg-transparent text-term-white outline-none placeholder:text-term-gray"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  runCommand(suggestion)
                  inputRef.current?.focus()
                }}
                className="border border-term-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-term-gray transition-colors hover:border-term-cyan/40 hover:text-term-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
