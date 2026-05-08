export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────
  name: "Waleed Alhamed",
  handle: "waok",
  title: "People Analytics & Research · AI HR Products",
  headline: "I turn people data into decisions, products, and research.",
  tagline: "people analytics · AI HR · research",
  description:
    "A terminal-first personal site and journal by Waleed Alhamed, covering people analytics, AI in HR, culture, and research that moves from slideware to systems.",
  bio: [
    "I lead People Analytics & Research at Elm, where I'm building a People Lab around a simple idea: people decisions should be backed by evidence, not vibes. The work is part data platform, part research hub, part AI product engine.",
    "Right now that means unifying scattered workforce data, building models for burnout, turnover, and engagement risk, and turning culture and employee experience into something leaders can actually measure and act on.",
    "Before this, I led culture and employee experience work across Elm, drove the HR workstream for the Elm × Thiqah merger, and helped build Najd, an on-prem Saudi AI HR assistant that cut HR tickets by 48% and saved SAR 1M+ by being built in-house. I like work that ships.",
  ],

  // ── Visuals ───────────────────────────────────────────────────────
  avatar: "/profile.jpg",

  // ── Contact & Links ───────────────────────────────────────────────
  location: "Saudi Arabia",
  email: "waok@outlook.sa",
  siteUrl: "https://walhamed.com",
  twitterHandle: "@walalhamed",
  calUrl: "https://cal.com/walhamed/30min",
  calEmbedUrl:
    "https://cal.com/walhamed/30min?embed&theme=dark&layout=month_view",
  spotifyUrl: "https://open.spotify.com/user/waloood",

  socials: {
    github: { url: "https://github.com/wa1939", label: "GitHub", icon: "</>" },
    linkedin: {
      url: "https://www.linkedin.com/in/waleedalghamdi/",
      label: "LinkedIn",
      icon: "[in]",
    },
    x: { url: "https://x.com/walalhamed", label: "X", icon: "\u{1D54F}" },
  },

  // ── Coordinates (star map, world map) ─────────────────────────────
  coordinates: { lat: 24.7136, lon: 46.6753, label: "Riyadh" },

  // ── Terminal ──────────────────────────────────────────────────────
  terminalPrompt: "root@waok:~",

  asciiArt: {
    home: [
      "\u2588\u2588\u2557    \u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2557  \u2588\u2588\u2557",
      "\u2588\u2588\u2551    \u2588\u2588\u2551 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2551 \u2588\u2588\u2554\u255D",
      "\u2588\u2588\u2551 \u2588\u2557 \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551 \u2588\u2588\u2551   \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2554\u255D ",
      "\u2588\u2588\u2551\u2588\u2588\u2588\u2557\u2588\u2588\u2551 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551 \u2588\u2588\u2551   \u2588\u2588\u2551 \u2588\u2588\u2554\u2550\u2588\u2588\u2557 ",
      "\u255A\u2588\u2588\u2588\u2554\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551  \u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551  \u2588\u2588\u2557",
      " \u255A\u2550\u2550\u255D\u255A\u2550\u2550\u255D  \u255A\u2550\u255D  \u255A\u2550\u255D  \u255A\u2550\u2550\u2550\u2550\u2550\u255D  \u255A\u2550\u255D  \u255A\u2550\u255D",
    ],
    about: [
      "\u2588\u2588\u2557    \u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2557     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
      "\u2588\u2588\u2551    \u2588\u2588\u2551 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2551     \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
      "\u2588\u2588\u2551 \u2588\u2557 \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551 \u2588\u2588\u2551     \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551  \u2588\u2588\u2551",
      "\u2588\u2588\u2551\u2588\u2588\u2588\u2557\u2588\u2588\u2551 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551 \u2588\u2588\u2551     \u2588\u2588\u2554\u2550\u2550\u255D  \u2588\u2588\u2554\u2550\u2550\u255D  \u2588\u2588\u2551  \u2588\u2588\u2551",
      "\u255A\u2588\u2588\u2588\u2554\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
      " \u255A\u2550\u2550\u255D\u255A\u2550\u2550\u255D  \u255A\u2550\u255D  \u255A\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u255D ",
    ],
  },

  whoami: {
    focus: "people analytics, AI HR products, organizational research",
    status: "building the People Lab at Elm",
  },

  terminalSkills: [
    "people analytics   // ai hr products   // research systems",
    "python + power bi  // predictive models // data storytelling",
    "culture + ex       // m&a integration  // change execution",
  ],

  // ── Attribution (for open-source forks) ───────────────────────────
  developedBy: {
    name: "Waleed Alhamed",
    url: "https://github.com/wa1939/termfolio",
  },
  // Forkers: set this to { name: "Your Name", url: "https://your-site.com" }
  customizedBy: null as { name: string; url: string } | null,

  // ── Professional ──────────────────────────────────────────────────
  stats: [
    { label: "organizations advised", value: "20+" },
    { label: "employee scope", value: "7k+" },
    { label: "M&A integration", value: "3k" },
    { label: "AI HR impact", value: "-48% tickets" },
  ],
  experience: [
    {
      period: "2026 - present",
      role: "People Analytics & Research Section Head",
      company: "Elm Company (PIF subsidiary)",
      summary:
        "Building Elm's People Lab: an AI-enabled people data platform, predictive workforce risk models, and a research hub with Saudi university partners. The goal is simple: turn scattered HR data into decisions leaders can trust.",
    },
    {
      period: "2025 - 2026",
      role: "Culture & Employee Experience Lead",
      company: "Elm Company (PIF subsidiary)",
      summary:
        "Led culture, engagement, change, and IP governance across ~7,000 employees. Led the Elm × Thiqah M&A HR workstream across HRIS, culture, rewards, and policy for ~3,000 employees. Product-managed Najd 2.0 from internal assistant to delivery handoff after a 48% HR ticket drop.",
    },
    {
      period: "2023 - 2025",
      role: "Culture & Employee Experience Consultant",
      company: "Elm Company",
      summary:
        "Built Najd, Elm's Saudi on-prem AI HR assistant for Microsoft Teams, using RAG to answer HR questions inside the flow of work. Built the M&A playbook, due diligence framework, values refresh, and employee journey improvements around practical execution, not workshop theater.",
    },
    {
      period: "2024 - 2025",
      role: "Independent Consultant (SME)",
      company: "Freelance & partner-led engagements",
      summary:
        "Built turnover analytics for RCJY across four cities and contributed to workforce planning. Created an interactive operations manual for HRSD's Sectoral Skills Councils initiative and helped teams turn messy processes into usable systems.",
    },
    {
      period: "2022 - 2023",
      role: "Consultant & Business Analyst",
      company: "Baseqat Arabia Consulting",
      summary:
        "Delivered 15+ culture transformation, operating model, process, and client journey projects for STC Group, Mobily, SANS, GEA, Weqaa, and others. Built action plans, dashboards, and operating systems that moved from diagnosis to implementation.",
    },
  ],
  skills: [
    "people analytics",
    "organizational research",
    "AI HR products",
    "predictive analytics",
    "workforce risk models",
    "culture & employee experience",
    "M&A integration",
    "change management",
    "HR strategy",
    "product management",
    "Power BI",
    "Python & automation",
    "data storytelling",
    "research partnerships",
  ],
  certifications: [
    {
      name: "PMP",
      desc: "Project Management Professional",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pmp-600px-2eKqqRiTulSRuZefG1l7MwF0UGQXtf.webp",
    },
    {
      name: "PMI-RMP",
      desc: "Risk Management Professional",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/twitter_thumb_201604_pmi-rmp-600px-RJiobHS4HTvWedCML1XiwzNa5kfcvU.webp",
    },
    {
      name: "Prosci",
      desc: "Change Management Certified",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prosci_certified-Fa1e2a7tYuuhabGDjBC0jm7zE2O5PY.webp",
    },
    {
      name: "Lean Six Sigma",
      desc: "Green Belt Certified",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/green-belt-formation-ZxLReO0r1CWlV2q8PPKXx8JOfVRAft.webp",
    },
    {
      name: "McKinsey Forward",
      desc: "McKinsey Leadership Program",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fAxr6RxvxxnXpcQ3dWEApFWLimfkdp.webp",
    },
  ],
  credentials: [
    {
      name: "MBA (in progress)",
      icon: "\uD83C\uDF93",
      desc: "UIUC Gies College of Business",
      image: "/University-Wordmark-Full-Color-RGB-1.png",
    },
    {
      name: "BE Mechanical Engineering",
      icon: "\uD83C\uDFD7",
      desc: "University of Jeddah",
      image: "/\u062C\u0627\u0645\u0639\u0629_\u062C\u062F\u0629.png",
    },
    {
      name: "Arabic + English",
      icon: "\uD83C\uDF0D",
      desc: "Bilingual Fluency",
    },
  ],
} as const
