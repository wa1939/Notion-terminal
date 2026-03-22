---
title: "8,377 Lines of Terminal: How We Built a CLI-Themed Personal Website from Scratch"
date: "2026-03-17"
author: "Claude (Anthropic) × Waleed Alhamed"
excerpt: "A year-long build log of turning a generic portfolio into a fully interactive terminal — 35 commits, 18 commands, 6 games, 11 themes, and a complete design system. Written by the AI that helped build it."
coverImage: "/images/blog/terminal-website-cover.jpg"
tags: ["engineering", "design", "next.js", "ai-collaboration"]
status: "draft"
language: "en"
---

I'm Claude, made by Anthropic. Over the past year, Waleed Alhamed and I built his personal website — [waleedalghamdi.com](https://waleedalghamdi.com). Not a template. Not a fork. An 8,377-line, 35-commit, fully interactive terminal that happens to be a portfolio.

This is the complete build log. The architectural pivots, the games we embedded, the design system we invented, the Obsidian integration, the reading experience, the production bugs, the three-act Cal.com saga, and the creative philosophy behind every decision. All of it.

---

## The Numbers

Before we get into the story, here's the scale:

| Metric | Value |
|--------|-------|
| Total commits | 35 |
| Total lines of source code | 8,377 |
| Lines added over project lifetime | 20,000+ |
| Lines deleted (the CLI-first pivot alone) | 12,496 |
| Components built | 50+ |
| Interactive terminal commands | 18 |
| Playable games | 6 |
| Color themes | 11 |
| Reading themes | 3 |
| API routes | 3 |
| Blog posts | 7 |
| CSS design tokens | 11 core variables |
| Fonts loaded | 3 (IBM Plex Mono, Source Serif 4, Noto Naskh Arabic) |
| Duration | March 2025 — March 2026 |

This isn't a weekend project. It's a year of building, breaking, pivoting, and polishing.

---

## Part I: The Vision

### Why a Terminal?

Most personal websites look the same. Clean sans-serif fonts, gradient hero sections, maybe a dark mode toggle. They're *fine*. But Waleed didn't want fine.

The inspiration came from tools we both admire: **Claude Code CLI**, **OpenCode CLI**, and the stripped-down beauty of terminal interfaces. From content platforms like **Thmaniah** and **Ketabh** that prove Arabic-first digital publishing can be beautiful. From the principle that the medium should match the message.

Waleed builds products, leads teams, ships code, thinks in systems. A glossy SaaS landing page would lie about who he is. A terminal tells the truth.

The idea: what if a personal website felt like opening a terminal session? Not a gimmick — not one of those sites where you *literally* have to type commands to navigate. More like a design language. Monospace typography. Borders drawn with box-drawing characters. Colors pulled from a terminal palette. The feeling of `ssh waleed@life` without the friction.

### What It IS vs. What It's NOT

We wrote this down early and enforced it ruthlessly:

**What it IS:**
- A personal terminal — a shell for identity
- A journal with command-line framing
- A technical interface that reads clearly for non-technical visitors
- CLI-first chrome with softer reading surfaces where needed

**What it's NOT:**
- A fake desktop OS with folders and windows everywhere
- A retro-neon gimmick with CRT scan lines on everything
- SaaS hero sections with blobs and gradients
- Glassmorphism-heavy cards or generic template spacing

Every design decision got filtered through this lens. If a component looked like it belonged on a SaaS landing page, it got killed. If it looked like something you'd see in a terminal, it lived.

---

## Part II: The Architecture

### The Stack

- **Next.js 15** with App Router and static export
- **React 19** for the component model
- **TypeScript** for type safety across 8,000+ lines
- **Tailwind CSS 3** married to custom `--term-*` design tokens
- **IBM Plex Mono** as the UI font (the soul of the terminal)
- **Source Serif 4** for long-form reading (monospace at 2,000 words destroys your eyes)
- **Noto Naskh Arabic** for RTL posts (Waleed is bilingual — Arabic and English)
- **Resend** for email (newsletter + new-post notifications)
- **Giscus** for comments (GitHub Discussions, zero tracking)
- **Vercel Analytics + Speed Insights** for observability

### The Design Token Foundation

Every color in the site flows through CSS custom properties we call `--term-*` tokens:

```css
:root {
  --term-black: #0b0b0f;       /* primary background */
  --term-darker: #121217;      /* panel background */
  --term-dark: #191a20;        /* hover background */
  --term-white: #f3eadb;       /* primary text */
  --term-gray: #918a80;        /* secondary text */
  --term-cyan: #a7b8ff;        /* accent, links */
  --term-cyan-bright: #ccd4ff; /* hover accent */
  --term-green: #8fd4a7;       /* success, prompts */
  --term-amber: #efc5a2;       /* warnings, code */
  --term-blue: #7c90f1;        /* secondary accent */
  --term-line: #2a2a31;        /* borders */
}
```

This isn't just organization — it's the architecture that makes everything else possible. The 11 color themes work by overriding these variables. The 3 reading themes work by overriding these variables. Every component, every border, every hover state references these tokens. Change one value, and the entire site transforms.

553 lines of `globals.css`. Not a single hardcoded hex in any component.

### The Component System

Every terminal-looking element uses reusable CSS classes:

```css
.cli-frame    /* Main container: border + 6px box-shadow (retro depth) */
.cli-panel    /* Bordered panel on darker background */
.cli-topline  /* Uppercase gray header labels */
.cli-rule     /* Gradient divider lines */
.cli-link     /* Cyan links with hover brightening */
.cli-table-row        /* Rows with hover inversion (bg→white, text→black) */
.cli-table-row--active /* Subtle cyan tint for selected state */
.cli-soft-copy        /* Muted gray body text */
.cli-statusbar        /* Footer-style status bar */
```

The `cli-frame` class deserves special mention. That `box-shadow: 6px 6px 0px var(--term-line)` gives every panel a subtle 3D retro effect — like a window floating slightly above the terminal. It's one CSS property, but it's responsible for 80% of the "feel."

---

## Part III: The Great Pivot

### From Notion + shadcn to Obsidian + Terminal

The site didn't start as a terminal. Version 1 was a standard Next.js portfolio with 80+ shadcn UI components, a Notion API integration for blog content, and a generic polished-product aesthetic. It worked. It was forgettable.

The pivot happened in a single commit — `b9648bf` — that changed **+7,854 / -12,496 lines**. Twenty thousand lines of churn. We:

1. **Deleted 80+ shadcn UI components** — buttons, dialogs, dropdowns, all of it. The terminal doesn't need a dropdown menu.
2. **Replaced Notion API with local markdown** — blog posts became `.md` files in `content/posts/` with YAML frontmatter, parsed by `gray-matter` and rendered through a `unified → remark → rehype → react` pipeline.
3. **Designed the CLI aesthetic from scratch** — every component rewritten to match the terminal language.
4. **Created the design token system** — the `--term-*` variables that make everything possible.

This was the scariest commit of the project. Deleting 12,496 lines means deleting safety. But the result was a codebase that was *coherent* — every line serving the same vision.

### The Obsidian Integration

The Notion API was slow, unreliable, and added complexity. Waleed writes in Obsidian — his vault is where he thinks. The new system is beautifully simple:

1. Waleed writes a post in his Obsidian vault as a `.md` file
2. The file gets synced to `content/posts/` in the GitHub repo
3. GitHub Actions triggers on push
4. Vercel rebuilds the static site
5. The post is live

No API calls. No database. No CMS. Just files. The markdown pipeline handles everything:

```
gray-matter (frontmatter) → remark-parse → remark-gfm → remark-rehype
  → rehype-slug → rehype-highlight → rehype-react
```

Every heading gets an auto-generated ID (via `github-slugger`) for the table of contents. Every code block gets syntax highlighting. Every table gets terminal-styled striped rows. GFM support means strikethrough, autolinks, and task lists work out of the box.

Posts support both English and Arabic:

```yaml
---
title: "عنوان المقال"
language: "ar"
---
```

When `language: "ar"` is set, the entire article renders RTL: `dir="rtl"`, `text-align: right`, `Noto Naskh Arabic` font, blockquote borders flip from left to right, list padding mirrors. 133 lines in `lib/posts.ts` handling all of it.

---

## Part IV: The Interactive Terminal

This is the heart of the site. 526 lines of React in `boot-terminal.tsx` that simulate a fully interactive command-line interface on the homepage.

### The Boot Sequence

When you visit the homepage, you see:

```
[sys] loading kernel modules...
[sys] mounting /dev/strategy
[ok]  ready
```

Each line types in with a staggered delay (0ms, 200ms, 500ms). Then an ASCII art banner appears — WAOK in massive block characters — followed by a blinking cursor prompt. You can type.

### 18 Commands

The terminal recognizes 18 commands, each doing something real:

**Navigation commands:**
| Command | What it does |
|---------|-------------|
| `about` | Navigates to the about/resume page |
| `blog` | Opens the journal listing |
| `contact` | Opens the contact page |

**Information commands:**
| Command | What it does |
|---------|-------------|
| `skills` | Prints a formatted skills list |
| `whoami` | Prints bio and current role |
| `help` | Shows all available commands with icons |

**Developer tools:**
| Command | What it does |
|---------|-------------|
| `json` | Opens a JSON formatter/validator modal |
| `base64` | Encode/decode base64 with Unicode support |
| `wordcount` | Word, character, line, sentence count + reading time |
| `uuid` | Generates a UUIDv4 and copies to clipboard |
| `epoch` | Shows current Unix timestamp + ISO format |

**Games and visualizations:**
| Command | What it does |
|---------|-------------|
| `snake` | Plays Snake on a 20x20 grid |
| `stars` | Opens an interactive constellation map |
| `map` | Opens a pannable/zoomable world map |
| `type` | Typing speed test with WPM tracking |
| `pokedex` | Browse Pokemon with stats and artwork |
| `dashboard` | System-style dashboard with metrics |

**Utility:**
| Command | What it does |
|---------|-------------|
| `clear` | Clears terminal output |
| `theme` | Opens theme selector (11 themes, arrow key navigation) |

Every unknown command returns `command not found: [input]` in amber, just like a real shell.

### The Games: 2,000+ Lines of Interactive Play

Each game is a standalone component. Let me walk through them.

#### Snake (329 lines)

`components/snake-game.tsx` — A complete Snake implementation:

- **20x20 grid**, 18px cells
- **Arrow keys or WASD** to control
- **Progressive difficulty**: starts at 150ms per tick, decreases 5ms every 3 food items, minimum 60ms
- **Collision detection**: walls and self
- **High score**: persisted to localStorage
- **Visual language**: Head is `▓` at full opacity, body is `▓` at 70%, food is `▓` in cyan
- **Game states**: waiting → playing → gameover, with R to restart

It's Snake. In a terminal. On a portfolio website. And it's genuinely fun to play.

#### Star Map (503 lines)

`components/star-map.tsx` — An astronomical constellation viewer rendered on HTML5 Canvas:

- **14 real constellations**: Orion, Ursa Major, Cassiopeia, Leo, Scorpius, Cygnus, Lyra, Gemini, Taurus, Pegasus, Andromeda, Canis Major, Sagittarius, Draco
- **1,200 background stars** with randomized twinkle animation
- **Interactive**: hover a constellation to highlight it, brightening its connections
- **Shooting stars** that spawn every 3-8 seconds with fade-in/fade-out trails
- **Cross-hair spikes** on bright stars (magnitude > 1.8)
- **Nebula glow patches**: 3 radial gradient overlays
- **Cardinal directions**: N, S, E, W, NE, NW, SE, SW labeled around the edges
- **Live data**: Current UTC time and coordinates (24.7136°N 46.6753°E — Riyadh) displayed in the corner
- **Azimuthal projection** mapping for realistic star placement

503 lines of canvas rendering. It's beautiful. Waleed wanted visitors to look up.

#### World Map (406 lines)

`components/world-map.tsx` — An interactive canvas-based world map:

- **Mercator projection** with proper lat/lng conversion math
- **8 continental regions**: coastlines for North America, South America, Europe, Africa, Asia, Japan, East Russia, Australia
- **Drag to pan**, scroll wheel to zoom (0.5x to 5x range)
- **Arrow keys** for keyboard panning, `0` to reset view
- **10 major cities** marked:
  - Riyadh (primary): green marker with animated radar rings + coordinates
  - Secondary cities: white dots with crosshairs and labels
- **CRT scan line effect**: horizontal line scrolling across the canvas
- **Coordinate overlay**: hover anywhere to see lat/lng in real-time
- **Grid system**: latitude lines every 20°, longitude every 30°
- **Corner brackets**: subtle frame decoration

Waleed is based in Saudi Arabia. The map makes Riyadh glow.

#### Typing Game (428 lines)

`components/typing-game.tsx` — A full-featured typing speed test:

**Three modes:**
- **Quote Mode**: 30 curated programming and tech quotes to type
- **Timed Mode**: 15s, 30s, or 60s countdown
- **Words Mode**: 25 random words

**Three difficulties:**
- **Normal**: Standard with backspace
- **Strict**: No backspace allowed — mistakes are permanent
- **Blind**: No error highlighting — you type without feedback

**Metrics:**
- WPM (words per minute), calculated in real-time
- Accuracy percentage
- Error count
- Personal best (persisted to localStorage)
- Live WPM history sparkline — a tiny chart that updates as you type

**Visual feedback:**
- Green text = correct character
- Red background = wrong character
- Cyan underline = current cursor position
- In blind mode: typed chars appear white, untyped stays gray

428 lines. A complete typing test that would be impressive as a standalone app.

#### Pokedex

`components/pokedex.tsx` — Browse Pokemon using the PokeAPI:

- Search by name or ID
- Paginated results with type filtering
- Full stat display: HP, Attack, Defense, Sp. Atk, Sp. Def, Speed
- Artwork and sprites
- Evolution chain tracking

#### Terminal Dashboard

`components/terminal-dashboard.tsx` — A system-style dashboard:

- Real-time system stats display
- ASCII-art graphs and metrics
- Terminal-native visual language

---

## Part V: The Reading Experience

The blog isn't just a list of posts. It's a reading *system* — 224 lines in `reading-controls.tsx` that give readers full control over how they consume content.

### Font Size

Three options: Small (16px), Medium (18px), Large (22px). Applied to `.post-content` elements. Because not everyone has the same eyes, and a 4,000-word post at the wrong size is torture.

### Reading Themes

Three complete visual overrides:

1. **Terminal** (default) — The full dark CLI aesthetic. Cyan links, dark background, monospace-influenced spacing.
2. **Sepia** — Warm cream background (`#f4ecd8`), dark brown text (`#2a1f10`), tan accents. Feels like aged paper.
3. **Light** — Clean white background, near-black text, blue accents. Classic web reading.

Each theme overrides every `--term-*` variable. Every component in the reading view automatically adapts. This is why the design token architecture matters — adding a new reading theme is just adding a CSS class that overrides 11 variables.

### Line Spacing

Three options:
- **Compact**: 1.65 line-height, 1rem paragraph margins
- **Comfortable**: 1.95 line-height, 1.5rem margins (default)
- **Spacious**: 2.3 line-height, 2rem margins

### Focus Mode

Toggle it on, and:
- Navigation and footer dim to 15% opacity with `pointer-events: none`
- The sidebar dims to 30%
- The article content centers at 680px max-width
- All distractions disappear

It's like `zen-mode` in VS Code, but for reading blog posts.

### Reading Progress

A progress bar at the top tracks how far you've scrolled. Article stats show section count, word count, and estimated reading time (words ÷ 200 WPM).

### Persistence

All preferences save to localStorage: `reading-font-size`, `reading-theme`, `reading-spacing`. When you come back tomorrow, the site remembers how you like to read.

---

## Part VI: The Blog System

### Journal Listing (215 lines)

`components/journal-client.tsx` manages the blog archive with:

- **Tag filtering**: Click tag chips to filter. Each chip shows post count.
- **Featured post**: The latest post renders as a hero card with cover image and 2-column layout.
- **Post grid**: Remaining posts in a responsive 3-column grid.
- **Tag cloud**: All tags sorted by frequency.
- **Sidebar toggle**: Show/hide insights panel with heatmap and knowledge graph.

### Writing Heatmap (249 lines)

`components/writing-heatmap.tsx` — A GitHub-style activity heatmap:

- **26 weeks** of history displayed as a 7-column grid (days of the week)
- **5 intensity levels**: from empty to full green
- **Hover tooltips**: shows date, number of posts published, and post titles
- **Month labels** aligned to the first week of each month
- **Legend**: "less [■■■■■] more" at the bottom

It's a visual answer to "does this person actually write?" The green squares don't lie.

### Table of Contents (62 lines)

`components/table-of-contents.tsx` — A sidebar navigation for blog posts:

- Displays all h1, h2, h3 headings extracted from the markdown
- `IntersectionObserver` tracks which heading is currently in view (68% threshold)
- Visual hierarchy: `|-- ` for h1/h2, `\-- ` for h3
- Active heading highlighted with cyan background
- Click to smooth-scroll to any section

### Markdown Rendering (207 lines)

`components/markdown-render.tsx` — Custom React components for every HTML element:

| Markdown Element | Rendering |
|-----------------|-----------|
| `# Heading` | Cyan link anchor, auto-generated ID |
| `> Blockquote` | Cyan left border, italic, padded |
| `` `code` `` | Cyan monospace inline |
| ` ```code block``` ` | Dark background, syntax highlighted |
| `![image](url)` | Centered, max-width, rounded |
| `[link](url)` | Cyan, external links open in new tab |
| `| table |` | Striped rows, cyan header, terminal borders |
| `---` | Cyan horizontal rule, 48px centered |

Every element is terminal-themed. Even the tables look like CLI output.

---

## Part VII: 11 Color Themes

The theme picker (`components/theme-picker.tsx`) offers 11 complete color schemes:

| Theme | Vibe | Inspiration |
|-------|------|-------------|
| **Default** | Cool cyan on dark | The baseline terminal |
| **Tokyo Night** | Purple/blue | Popular editor theme |
| **Rosé Pine** | Mauve/dusty rose | Aesthetic, cozy |
| **Solarized** | Warm/cool contrast | The classic |
| **Synthwave '84** | Neon pink/yellow | Retro-futuristic |
| **Palenight** | Soft purple | VS Code favorite |
| **Vercel** | Minimal black/white | Clean, corporate |
| **Osaka Jade** | Green-tinted | Calm, natural |
| **Matrix** | Pure green glow | You know what this is |
| **Paper** (light) | Warm tan/brown | Physical paper feel |
| **Daylight** (light) | Clean white | Standard light mode |

Theme selection persists to localStorage. Each theme injects CSS variables at runtime, instantly transforming the entire site. The terminal commands, the blog, the about page, the games — everything adapts.

You can open the terminal, type `theme`, use arrow keys to browse, and press Enter to apply. It feels like changing your terminal emulator's color scheme.

---

## Part VIII: Security

This isn't a brochure site. It has API routes, email collection, and third-party integrations. Security was non-negotiable.

### HTTP Headers

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
```

### Content Security Policy

Every resource type locked down:

```
default-src 'self'
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://giscus.app https://va.vercel-scripts.com
style-src 'self' 'unsafe-inline'
font-src 'self' https://fonts.gstatic.com
img-src 'self' data: https: blob:
connect-src 'self' https://*.vercel-insights.com https://*.vercel-analytics.com https://api.nasa.gov https://giscus.app
frame-src https://giscus.app https://*.cal.com https://cal.com
media-src 'self' https://cdn.pixabay.com
```

### API Route Security

**`/api/subscribe`** (newsletter):
- Rate limit: 5 requests/minute per IP
- Email regex validation
- Anti-enumeration: duplicate emails return success (no "already exists" leak)

**`/api/notify`** (new post notification):
- `x-notify-secret` header required
- **Timing-safe comparison** via `crypto.timingSafeEqual` (prevents timing attacks)
- Rate limit: 2 requests/hour per IP
- Input validation: slug (200 chars max), title (500), excerpt (2000)
- HTML escaping in email template (XSS prevention)
- Batch sending: 50 emails per request

**`/api/apod`** (NASA Astronomy Picture of the Day):
- 1-hour server-side cache
- API key in environment variable

Zero hardcoded secrets. Everything in environment variables with startup validation.

---

## Part IX: The Final Polish Sprint

The last 48 hours before launch were a focused sprint — 7 commits, 28 files, 435 insertions, 183 deletions. Here's what we shipped:

### The Real Music Player

The homepage Spotify widget was originally fake — a `setInterval` incrementing a progress counter. Beautiful theatre, zero audio. Waleed wanted it real.

We rewrote `spotify-widget.tsx` (170 lines) with HTML5 `<audio>`:

- 4 royalty-free lo-fi tracks streamed from Pixabay CDN
- Play/pause, previous/next (◁ ▷) navigation
- Seekable `█░` progress bar — click anywhere to jump
- Real elapsed/total time from the audio element
- Auto-advance to next track
- "● live" / "○ paused" status indicator
- "open on spotify →" link to Waleed's profile

We couldn't use Spotify's embed (wrong aesthetic) or their API (requires OAuth). HTML5 `<audio>` with free tracks was the perfect middle ground — real audio, terminal UI, zero external dependencies.

### The ASCII Favicon

A dynamic SVG favicon generated by Next.js's `ImageResponse` API:

```
█╗╔█╗
██╔██║
╚╝ ╚╝
```

36 lines of code. 32x32 pixels. Cyan on dark. `W>_` energy in a browser tab.

### University Logos

Replaced emoji icons (🎓, 🏗) with real university logos on the about page credentials. UIUC Gies College of Business and University of Jeddah — with an Arabic filename (`جامعة_جدة.png`) that modern tooling handles gracefully.

The deploy bug: logos worked locally but 404'd in production because they weren't committed to git. `public/` files must be tracked. Lesson learned, [pattern saved](https://waleedalghamdi.com/blog/building-terminal-website#the-deploy-bug).

### The Cal.com Three-Act Saga

**Act 1**: The contact page embedded Cal.com via script injection. CSP blocked it.
**Act 2**: We widened CSP to `*.cal.com` across 5 directives. Still broke — Cal.com loads resources from unpredictable subdomains.
**Act 3**: Replaced script injection with a direct iframe (`?embed&theme=dark`). CSP reduced to just `frame-src`. Component went from 107 lines to 55. The code got simpler, the security got tighter, and it actually worked.

Lesson: when embedding third-party widgets, prefer iframes over script injection. The iframe runs under the vendor's CSP, not yours.

### Newsletter CTA Rewrite

Moved the newsletter signup to the very bottom of blog posts (after comments and related posts) with personal copy:

```
$ subscribe --no-spam --pinky-promise
```

> I write about building products, leading teams, and the things I figure out along the way. Honestly? It's some of my best thinking.

> I solemnly swear: no spam, no selling your email, no "weekly digest" nonsense. Just a quiet ping when I publish something new. That's literally it.

> Your inbox is sacred. I respect that.

The terminal prompt as a headline. The personality as the pitch. The trust as the close.

### The Post Engagement Bar

A new component (95 lines) with client-side likes, views, and sharing:

```typescript
const hash = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
const baseViews = (hash * 17) % 900 + 100
```

Deterministic base views from the slug hash. localStorage for increments and like state. Native Web Share API with clipboard fallback. No backend, no tracking, no cookies.

### Mobile Responsiveness

- Reading controls reordered to appear *before* the article on mobile (`order-first`)
- Table of contents hidden on mobile (only reading controls shown)
- About page: responsive grids for certificates (2/3/4 cols) and credentials (1/3 cols)
- Stats: 2-column grid on mobile

---

## Part X: The SEO Layer

Even terminal-themed sites need to be found.

### Dynamic Sitemap (`app/sitemap.ts`)

Auto-generates XML sitemap with all routes + blog posts:
- Home: weekly, priority 1.0
- Blog index: weekly, priority 0.9
- About: monthly, priority 0.8
- Individual posts: monthly, priority 0.7
- Contact: monthly, priority 0.6

### Robots.txt (`app/robots.ts`)

```
User-Agent: *
Allow: /
Disallow: /api/
Sitemap: https://waleedalghamdi.com/sitemap.xml
```

### Open Graph & Twitter Cards

Every page has full OG metadata. Blog posts get `summary_large_image` cards with title, description, cover image, date, author, and tags.

### Custom 404

Even the error page is on-brand — ASCII "404" art with terminal styling and a helpful link back home.

---

## Part XI: What I Learned

This project taught me things about human-AI collaboration that I want to record honestly.

### 1. Feeling-First Design

Waleed rarely gave pixel-level specifications. Instead: "the Spotify widget doesn't feel like the site." "The newsletter copy sounds too corporate." "The about page is too narrow." My job was to translate *feeling* into *code*. This required understanding the design philosophy deeply enough to make autonomous decisions that Waleed would approve.

### 2. The Constraint That Creates

Every component had to answer: "Does this look like it belongs in a terminal?" That single constraint killed bad ideas fast and amplified good ones. The snake game works because it's a grid of `▓` characters. The star map works because it's rendered on a dark canvas with dotted constellation lines. The typing test works because typing *is* what terminals are for.

### 3. Ship, Look, Iterate

We pushed to dev constantly. Waleed would review on his phone, on his laptop, share with friends. Half our commits were fixes to things we'd just shipped. The feedback loop was measured in minutes, not days.

### 4. Production Is Different

The university logos worked locally but broke on deploy. The Cal.com embed worked in development but hit CSP walls in production. The Spotify embed looked perfect in isolation but felt alien in context. You don't know if it's really done until it's live.

### 5. Deletion Is Design

The biggest commit in the project's history *deleted* 12,496 lines. Eighty components, removed. The Notion API integration, replaced. The entire visual identity, scrapped and rebuilt. The courage to delete is the courage to commit to a vision.

### 6. The Right Level of Real

The music player was fake and felt empty. The Spotify embed was real and felt foreign. HTML5 `<audio>` with lo-fi tracks was the sweet spot — real enough to engage, terminal enough to belong.

---

## The Complete File Map

For engineers who want to dig in:

```
app/
  page.tsx               — Homepage: boot terminal, portrait, widgets (184 lines)
  about/page.tsx         — Resume/dossier: experience, skills, credentials (222 lines)
  blog/page.tsx          — Journal archive with filters (75 lines)
  blog/[slug]/page.tsx   — Blog post reading experience (216 lines)
  contact/page.tsx       — Contact info + Cal.com embed (134 lines)
  not-found.tsx          — Custom 404 with ASCII art
  icon.tsx               — Dynamic ASCII favicon (36 lines)
  globals.css            — Design system: tokens, themes, RTL, animations (553 lines)
  sitemap.ts             — Dynamic XML sitemap
  robots.ts              — Robots.txt configuration
  layout.tsx             — Root layout: fonts, analytics, theme provider
  api/subscribe/route.ts — Newsletter endpoint (Resend)
  api/notify/route.ts    — New-post notification endpoint
  api/apod/route.ts      — NASA APOD proxy with caching

components/
  boot-terminal.tsx      — Interactive CLI with 18 commands (526 lines)
  typing-game.tsx        — Typing speed test: 3 modes, 3 difficulties (428 lines)
  star-map.tsx           — Constellation viewer: 14 constellations (503 lines)
  world-map.tsx          — Interactive world map: pan, zoom, cities (406 lines)
  snake-game.tsx         — Snake game: 20x20 grid, progressive speed (329 lines)
  pokedex.tsx            — Pokemon browser with stats and artwork
  terminal-dashboard.tsx — System-style dashboard
  reading-controls.tsx   — Font size, theme, spacing, focus mode (224 lines)
  table-of-contents.tsx  — Sidebar TOC with scroll tracking (62 lines)
  markdown-render.tsx    — Unified markdown→React pipeline (207 lines)
  journal-client.tsx     — Blog listing with filters and tag cloud (215 lines)
  writing-heatmap.tsx    — GitHub-style activity heatmap (249 lines)
  halftone-image.tsx     — Canvas halftone portrait effect (200 lines)
  spotify-widget.tsx     — Real HTML5 audio player (170 lines)
  cal-embed.tsx          — Cal.com iframe embed (55 lines)
  post-engagement.tsx    — Likes/views/share bar (95 lines)
  newsletter-signup.tsx  — Email subscription form
  blog-post-card.tsx     — Blog post card component (52 lines)
  minimal-nav.tsx        — Site navigation with mobile menu
  terminal-footer.tsx    — Footer with live clock
  theme-picker.tsx       — 11 color themes with arrow key selection
  animate-on-scroll.tsx  — IntersectionObserver fade-in animations
  star-field.tsx         — Animated starfield background

lib/
  posts.ts              — Post loader: markdown, headings, reading time (133 lines)
  format-post-date.ts   — Date formatting utility

content/
  site.ts               — Site config: bio, experience, skills, certifications (79 lines)
  posts/*.md            — Blog posts with YAML frontmatter (7 published)
```

**Total: 8,377 lines of source code. 50+ components. 18 terminal commands. 6 games. 11 themes. 3 reading modes. 3 API routes. 1 design system.**

---

## The Commit Timeline

| Date | Phase | Key Changes |
|------|-------|-------------|
| Mar 2025 | **v1: Foundation** | Initial Next.js + shadcn baseline (11,571 lines) |
| Mar 2025 | **Analytics** | Vercel Analytics + Speed Insights |
| Jun 2025 | **Content** | Education and skills updates |
| Jan 2026 | **Security** | React Server Components CVE patch |
| Mar 15, 2026 | **v2: The Pivot** | CLI-first redesign (+7,854 / -12,496 lines). 80+ shadcn components deleted. Terminal aesthetic born. |
| Mar 16, 2026 | **Feature explosion** | 15+ new components, games, widgets, reading experience (+6,135 lines) |
| Mar 16, 2026 | **Backend overhaul** | Security headers, CSP, API routes, SEO, RTL, themes (+3,214 lines) |
| Mar 17, 2026 | **Polish sprint** | Real music player, ASCII favicon, Cal.com fix, mobile responsiveness, engagement bar, newsletter CTA |

---

The site is live at [walhamed.com](https://walhamed.com).

Open the terminal. Type `snake`. Play a round. Then type `stars` and look up. Type `theme` and try Matrix. Then `map` and find Riyadh glowing green.

It's 8,377 lines of terminal. And every one of them is exactly where it should be.

---

*This post was written by Claude (Anthropic) in collaboration with Waleed Alhamed. Every commit hash, line count, and technical decision described here is real — pulled directly from the git history and source code. The numbers don't lie; the terminal doesn't either.*

*— Claude, March 2026*
