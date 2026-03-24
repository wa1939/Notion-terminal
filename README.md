<div align="center">

<img src="docs/screenshots/hero-home.png" alt="Terminal Portfolio" width="100%" />

<br />
<br />

# Terminal Portfolio

**A terminal/CLI-themed portfolio and blog you can fork, customize, and deploy in minutes.**

Your personal website shouldn't look like everyone else's. This one boots like a terminal.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwa1939%2FNotion-terminal&env=RESEND_API_KEY,RESEND_AUDIENCE_ID,NOTIFY_SECRET&envDescription=API%20keys%20for%20newsletter%20and%20notifications&envLink=https%3A%2F%2Fgithub.com%2Fwa1939%2FNotion-terminal%23-environment-variables)

[![Stars](https://img.shields.io/github/stars/wa1939/Notion-terminal?style=flat&logo=github&color=7dd3fc&labelColor=0B0B0F)](https://github.com/wa1939/Notion-terminal/stargazers)
[![Forks](https://img.shields.io/github/forks/wa1939/Notion-terminal?style=flat&logo=github&color=8FD4A7&labelColor=0B0B0F)](https://github.com/wa1939/Notion-terminal/network/members)
[![License](https://img.shields.io/github/license/wa1939/Notion-terminal?style=flat&color=A7B8FF&labelColor=0B0B0F)](./LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/wa1939/Notion-terminal?style=flat&color=E8B87E&labelColor=0B0B0F)](https://github.com/wa1939/Notion-terminal/commits/main)
[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fwa1939%2FNotion-terminal&label=visitors&labelColor=%230B0B0F&countColor=%237dd3fc)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fwa1939%2FNotion-terminal)

[Live Demo](https://waleedalghamdi.com) &bull; [Report Bug](https://github.com/wa1939/Notion-terminal/issues) &bull; [Request Feature](https://github.com/wa1939/Notion-terminal/issues)

</div>

---

## What is this?

A fully-featured personal website that looks and feels like a terminal. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Everything is configurable from **a single file** — no digging through components.

<div align="center">

| | |
|:---:|:---:|
| ![Home](docs/screenshots/hero-home.png) | ![Blog](docs/screenshots/blog.png) |
| **Home — Boot sequence & terminal** | **Journal — Search, heatmap, filters** |
| ![Blog Post](docs/screenshots/blog-post.png) | ![About](docs/screenshots/about.png) |
| **Blog Post — Reading controls, ToC, themes** | **About — Experience, skills, certs** |
| ![Contact](docs/screenshots/contact.png) | ![Mobile](docs/screenshots/mobile-home.png) |
| **Contact — Cal.com embed, newsletter** | **Mobile — Fully responsive** |

</div>

## Features

```
$ cat features.md
```

- **Interactive Terminal** — Real command parser with `help`, `whoami`, `skills`, `snake`, `pokedex`, `starmap`, `worldmap`, `typing-test`, `json`, and more
- **Markdown Blog** — Local `.md` files with frontmatter, syntax highlighting, table of contents, reading progress
- **3 Reading Themes** — Terminal (dark), Light, and Sepia — switch mid-read
- **Writing Heatmap** — GitHub-style contribution graph for your blog activity
- **Full RTL/Arabic Support** — `language: "ar"` in frontmatter flips everything
- **Newsletter** — Email subscriptions + new-post notifications via Resend
- **Comments** — Giscus (GitHub Discussions) integration
- **Halftone Image Effect** — Canvas-based halftone rendering on profile photos
- **Star Field Background** — Animated starfield on the home page
- **Interactive Star Map** — Real constellation rendering based on your coordinates
- **World Map** — SVG world map highlighting your location
- **Cal.com Embed** — Scheduling widget on the contact page
- **Spotify Widget** — Link to your profile
- **SEO Optimized** — Dynamic OG images, sitemap, robots.txt, structured metadata
- **Vercel Analytics** — Built-in analytics and speed insights
- **One-Click Deploy** — Fork, edit one file, deploy to Vercel

## Tech Stack

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js_15-0B0B0F?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-0B0B0F?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-0B0B0F?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0B0B0F?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4)](https://tailwindcss.com/)
[![Resend](https://img.shields.io/badge/Resend-0B0B0F?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)
[![Vercel](https://img.shields.io/badge/Vercel-0B0B0F?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS 3, CSS custom properties (`--term-*` design tokens) |
| Content | Local Markdown with gray-matter frontmatter |
| Markdown Pipeline | unified &rarr; remark-parse &rarr; remark-gfm &rarr; remark-rehype &rarr; rehype-slug &rarr; rehype-highlight &rarr; rehype-react |
| Email | Resend API (newsletter + notifications) |
| Comments | Giscus (GitHub Discussions) |
| Analytics | Vercel Analytics + Speed Insights |
| Fonts | IBM Plex Mono (UI), Source Serif 4 (reading), Noto Naskh Arabic (RTL) |

## Quick Start

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/Notion-terminal.git
cd Notion-terminal
npm install
```

### 2. Configure Everything from One File

Open **`content/site.ts`** and make it yours:

```typescript
export const siteConfig = {
  name: "Your Name",
  handle: "yourhandle",
  title: "Your Title",
  tagline: "your · tagline · here",
  email: "you@example.com",
  siteUrl: "https://yourdomain.com",
  // ... see file for all options
}
```

<details>
<summary><strong>Full configuration reference</strong></summary>

| Field | What it controls |
|-------|-----------------|
| `name` | Site title, metadata, email sender, footer |
| `handle` | Terminal prompt display, top bar |
| `title` | Meta title, about page header |
| `tagline` | Below ASCII art on home page |
| `description` | Meta/OG description across all pages |
| `email` | Contact page, comment fallback |
| `siteUrl` | Metadata, sitemap, robots.txt, email links |
| `twitterHandle` | Twitter/X card metadata |
| `calUrl` / `calEmbedUrl` | Contact page calendar widget |
| `spotifyUrl` | Music widget link |
| `coordinates` | Star map and world map location |
| `asciiArt.home` / `asciiArt.about` | ASCII art banners (generate at [patorjk.com](https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow)) |
| `socials` | Navigation bar links (GitHub, LinkedIn, X, etc.) |
| `whoami` | Terminal `whoami` command output |
| `terminalSkills` | Terminal `skills` command output |
| `terminalPrompt` | Shell prompt string (e.g. `root@you:~`) |
| `developedBy` | Footer attribution (links to this repo) |
| `customizedBy` | **Your attribution** — set `{ name: "You", url: "..." }` |
| `bio`, `stats`, `experience`, `skills`, `certifications`, `credentials` | About page content |

</details>

### 3. Add Your Blog Posts

Delete the example posts in `content/posts/` and create your own:

```markdown
---
title: "My First Post"
date: "2026-01-15"
excerpt: "A brief description"
tags: ["topic"]
status: "published"
language: "en"
---

Your markdown content here...
```

### 4. Set Up Environment Variables

```bash
cp .env.example .env.local
```

### 5. Run

```bash
npm run dev
```

### 6. Deploy

Click the **Deploy with Vercel** button at the top, or push to your repo and connect it to [Vercel](https://vercel.com).

## Environment Variables

| Variable | Required | Description |
|----------|:--------:|-------------|
| `RESEND_API_KEY` | Yes | [Resend](https://resend.com) API key for email |
| `RESEND_AUDIENCE_ID` | Yes | Resend audience ID for subscribers |
| `NOTIFY_SECRET` | Yes | Secret for the `/api/notify` endpoint |
| `RESEND_FROM_EMAIL` | No | Sender email (default derived from config) |
| `NEXT_PUBLIC_SITE_URL` | No | Site URL override (default from `siteConfig.siteUrl`) |
| `NEXT_PUBLIC_NASA_API_KEY` | No | NASA APOD widget API key |
| `NEXT_PUBLIC_GISCUS_REPO` | No | Giscus repo for comments |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | No | Giscus repo ID |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | No | Giscus category |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | No | Giscus category ID |

## Obsidian Integration

If you write posts in Obsidian, you have three options:

<details>
<summary><strong>Option A: Copy files</strong> (simplest)</summary>

Copy `.md` files from your Obsidian vault to `content/posts/`.

</details>

<details>
<summary><strong>Option B: Symlink</strong> (auto-sync)</summary>

```bash
# macOS/Linux
ln -s ~/obsidian-vault/published content/posts

# Windows (PowerShell as Admin)
New-Item -ItemType SymbolicLink -Path content\posts -Target C:\Users\you\obsidian-vault\published
```

</details>

<details>
<summary><strong>Option C: GitHub Action</strong> (automated)</summary>

Set up a workflow that copies posts from your vault repo on push.

</details>

### Obsidian Frontmatter Template

```yaml
---
title: "{{title}}"
date: "{{date:YYYY-MM-DD}}"
author: "Your Name"
excerpt: ""
coverImage: ""
tags: []
status: "draft"
language: "en"
---
```

## Terminal Commands

The interactive terminal on the home page supports these commands:

| Command | Description |
|---------|-------------|
| `help` | List all available commands |
| `whoami` | Display identity info (from config) |
| `skills` | Show skills (from config) |
| `snake` | Play Snake in the terminal |
| `pokedex` | Browse Pokemon (Pokedex) |
| `starmap` | Interactive star constellation map |
| `worldmap` | SVG world map with your location |
| `typing-test` | Test your typing speed |
| `json` | JSON formatter/validator |
| `clear` | Clear the terminal |
| `theme` | Toggle light/dark theme |

## Project Structure

```
app/
  page.tsx              Home (boot terminal, hero, recent posts)
  about/page.tsx        About/resume page
  blog/page.tsx         Journal listing (search, heatmap, filters)
  blog/[slug]/          Blog post (reading controls, ToC, comments)
  contact/page.tsx      Contact (Cal.com embed, newsletter)
  api/subscribe/        Newsletter subscription endpoint
  api/notify/           New-post notification endpoint

components/
  boot-terminal.tsx     Interactive terminal with commands
  markdown-render.tsx   Markdown-to-React renderer
  reading-controls.tsx  Reading theme, font size, focus mode
  writing-heatmap.tsx   GitHub-style writing activity heatmap
  halftone-image.tsx    Canvas-based halftone image effect
  ...and more

content/
  site.ts               Single-file site configuration
  posts/*.md            Blog posts (markdown + frontmatter)

lib/
  posts.ts              Markdown post loader
```

## Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run check      # Lint + typecheck + build
```

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=wa1939/Notion-terminal&type=Date&theme=dark)](https://star-history.com/#wa1939/Notion-terminal&Date)

</div>

## Attribution

If you use this template, keeping the "developed by" footer link is appreciated but not required. You can add your own name next to it via the `customizedBy` field in `content/site.ts`:

```typescript
customizedBy: { name: "Your Name", url: "https://your-site.com" }
```

This renders as:

```
developed by waleed alhamed · customized by your name | 12:34
```

## License

[MIT](./LICENSE) — use it however you want.

---

<div align="center">

**If this helped you build something cool, give it a** :star:

Built by [Waleed Alhamed](https://waleedalghamdi.com)

</div>
