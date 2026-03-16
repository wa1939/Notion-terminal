import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Buttondown integration (if API key is configured)
    const apiKey = process.env.BUTTONDOWN_API_KEY
    if (apiKey) {
      const res = await fetch("https://api.buttondown.email/v1/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, type: "regular" }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        if (res.status === 409) {
          return NextResponse.json({ message: "Already subscribed!" })
        }
        return NextResponse.json(
          { error: data.detail || "Subscription failed" },
          { status: res.status }
        )
      }
    }

    return NextResponse.json({ message: "Subscribed successfully!" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
