"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
}

export default function TypingAnimation({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
}: TypingAnimationProps) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const currentWord = words[wordIndex]

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, delayBetweenWords)
      return
    }

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      } else {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1))
        }, deletingSpeed)
      }
    } else {
      if (text === currentWord) {
        setIsWaiting(true)
      } else {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1))
        }, typingSpeed)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, wordIndex, isDeleting, isWaiting, words, typingSpeed, deletingSpeed, delayBetweenWords])

  return (
    <div className="inline-flex items-center">
      <span className="text-term-cyan">{text}</span>
      <span className="inline-block w-2 h-5 bg-term-cyan ml-1 animate-blink"></span>
    </div>
  )
}

