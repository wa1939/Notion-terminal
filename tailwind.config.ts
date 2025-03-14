import type { Config } from "tailwindcss"
const shadcnConfig = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      ...shadcnConfig.theme.extend,
      colors: {
        // Retro Synthwave Colors
        "retro-black": "#0D001A", // Darker purple-black
        "retro-dark": "#1A0B2E", // Dark purple
        "retro-purple": "#2D1B69", // Deep purple
        "retro-blue": "#0090B4", // Cyan blue
        "retro-cyan": "#64E4FF", // Bright cyan
        "retro-pink": "#FF2975", // Neon pink
        "retro-orange": "#FF8A3D", // Neon orange
        "retro-yellow": "#FFE53D", // Neon yellow
        "retro-green": "#00F5D4", // Neon turquoise
        "retro-light": "#E0E0FF", // Light purple-white
        ...shadcnConfig.theme.extend.colors,
        // Ultra minimal color scheme
        "term-black": "#0C0C0C", // Terminal background
        "term-darker": "#161616", // Slightly lighter black
        "term-dark": "#1E1E1E", // Even lighter black
        "term-cyan": "#00B4D8", // Bright cyan
        "term-blue": "#0077B6", // Darker cyan
        "term-white": "#E5E5E5", // Off white
        "term-gray": "#666666", // Muted text
        "term-green": "#2DD4BF", // Terminal green
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Menlo", "Monaco", "Courier New", "monospace"],
      },
      backgroundImage: {
        "retro-grid": `radial-gradient(circle at center, rgba(100, 228, 255, 0.1) 0%, transparent 70%),
                       linear-gradient(to right, rgba(100, 228, 255, 0.1) 1px, transparent 1px),
                       linear-gradient(to bottom, rgba(100, 228, 255, 0.1) 1px, transparent 1px)`,
        "retro-glow": "linear-gradient(to right, #0D001A, #2D1B69, #0D001A)",
        "retro-conic": "conic-gradient(from 0deg at 50% 50%, #FF2975, #64E4FF, #00F5D4, #FF2975)",
        "retro-radial": "radial-gradient(circle at 50% 50%, rgba(100, 228, 255, 0.15), rgba(13, 0, 26, 0))",
      },
      boxShadow: {
        "neon-cyan": "0 0 5px rgba(100, 228, 255, 0.5), 0 0 20px rgba(0, 144, 180, 0.3)",
        "neon-pink": "0 0 5px rgba(255, 41, 117, 0.5), 0 0 20px rgba(255, 41, 117, 0.3)",
        "neon-glow":
          "0 0 10px rgba(100, 228, 255, 0.3), 0 0 20px rgba(0, 144, 180, 0.2), 0 0 30px rgba(0, 144, 180, 0.1)",
        "retro-black": "0 0 30px rgba(13, 0, 26, 0.8)",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "33%": { transform: "translate(-5px, 2px)" },
          "66%": { transform: "translate(5px, -2px)" },
        },
        scan: {
          "0%, 100%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(100%)" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        noise: {
          "0%, 100%": { opacity: "0.9" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "text-fade": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        hologram: {
          "0%, 100%": {
            "text-shadow":
              "0 0 10px rgba(100, 228, 255, 0.8), 0 0 20px rgba(100, 228, 255, 0.8), 0 0 30px rgba(100, 228, 255, 0.8)",
            opacity: "1",
          },
          "50%": {
            "text-shadow":
              "0 0 5px rgba(100, 228, 255, 0.4), 0 0 10px rgba(100, 228, 255, 0.4), 0 0 15px rgba(100, 228, 255, 0.4)",
            opacity: "0.8",
          },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        type: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        delete: {
          "0%": { width: "100%" },
          "100%": { width: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "33%": { opacity: "0.9" },
          "66%": { opacity: "0.95" },
        },
        "vhs-glitch": {
          "0%, 100%": {
            "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            transform: "translate(0)",
          },
          "20%": {
            "clip-path": "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
            transform: "translate(-2px)",
          },
          "40%": {
            "clip-path": "polygon(0 0, 100% 5%, 100% 100%, 0 95%)",
            transform: "translate(2px)",
          },
          "60%": {
            "clip-path": "polygon(0 2%, 100% 0, 100% 98%, 0 100%)",
            transform: "translate(-1px)",
          },
          "80%": {
            "clip-path": "polygon(0 0, 100% 2%, 100% 100%, 0 98%)",
            transform: "translate(1px)",
          },
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        glitch: "glitch 2s infinite",
        scan: "scan 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        noise: "noise 0.2s infinite",
        float: "float 6s ease-in-out infinite",
        "text-fade": "text-fade 2s ease-in-out infinite",
        hologram: "hologram 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 12s linear infinite",
        type: "type 3s steps(30, end)",
        delete: "delete 2s steps(30, end)",
        flicker: "flicker 2s linear infinite",
        "vhs-glitch": "vhs-glitch 2s infinite",
        "matrix-rain": "matrix-rain 20s linear infinite",
      },
      typography: {
        invert: {
          css: {
            "--tw-prose-body": "var(--term-gray, #b5b9b6)",
            "--tw-prose-headings": "var(--term-cyan, #64E4FF)",
            "--tw-prose-lead": "var(--term-gray, #b5b9b6)",
            "--tw-prose-links": "var(--term-cyan, #64E4FF)",
            "--tw-prose-bold": "var(--term-white, #E5E5E5)",
            "--tw-prose-counters": "var(--term-gray, #b5b9b6)",
            "--tw-prose-bullets": "var(--term-cyan, #64E4FF)",
            "--tw-prose-hr": "var(--term-dark, #1E1E1E)",
            "--tw-prose-quotes": "var(--term-gray, #b5b9b6)",
            "--tw-prose-quote-borders": "var(--term-cyan, #64E4FF)",
            "--tw-prose-captions": "var(--term-gray, #b5b9b6)",
            "--tw-prose-code": "var(--term-cyan, #64E4FF)",
            "--tw-prose-pre-code": "var(--term-gray, #b5b9b6)",
            "--tw-prose-pre-bg": "var(--term-darker, #161616)",
            "--tw-prose-th-borders": "var(--term-dark, #1E1E1E)",
            "--tw-prose-td-borders": "var(--term-dark, #1E1E1E)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), ...shadcnConfig.plugins],
} satisfies Config

export default config

