import type React from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import StarField from "@/components/star-field"
import { readingSerif, uiMono } from "@/app/fonts"
import "./globals.css"

export const metadata = {
  title: "Waleed Alghamdi",
  description: "A terminal-first personal site and journal by Waleed Alghamdi, covering strategy, systems, and digital transformation.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${uiMono.variable} ${readingSerif.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <StarField />
          {children}
        </ThemeProvider>

        {/* Analytics components placed outside of ThemeProvider */}
        <Analytics debug={false} />
        <SpeedInsights debug={false} />
      </body>
    </html>
  )
}

