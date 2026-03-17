# AI Context - Notion-terminal

This is the primary repo context file for future AI sessions.

For design-specific iteration guidance, also read `docs/DESIGN_HANDOFF.md`.

## Project Snapshot

- Stack: Next.js App Router, React 19, TypeScript, Tailwind CSS.
- Purpose: personal site + journal with a CLI-first shell and a Notion-backed blog.
- Identity: terminal-style navigation, command language, mono-heavy UI chrome, calmer serif reading surfaces inside articles.
- Theme mode: effectively dark-first. `next-themes` exists, but the active UI is designed around the dark terminal palette.

## Active Architecture

- Global shell: `app/layout.tsx`
  - loads `app/globals.css`
  - mounts `ThemeProvider`
  - mounts Vercel Analytics + Speed Insights
  - loads font variables from `app/fonts.ts`
- Core routes:
  - `app/page.tsx`
  - `app/about/page.tsx`
  - `app/blog/page.tsx`
  - `app/blog/[slug]/page.tsx`
  - `app/contact/page.tsx`
- Shared shell components:
  - `components/minimal-nav.tsx`
  - `components/terminal-footer.tsx`
  - `components/interactive-terminal.tsx`

## Current Product Shape

- `/` is a CLI-style landing page with:
  - top terminal nav
  - identity block with ASCII wordmark
  - compact profile table
  - command console
  - recent journal entries
- `/blog` is a searchable archive presented more like a terminal index than a card-heavy marketing page.
- `/blog/[slug]` keeps the terminal shell for metadata and navigation, but the post body uses a calmer reading surface.
- `/about` is a dossier/resume page with a denser terminal layout.
- `/contact` is intentionally simple and avoids the heavier inline booking embed approach.

## Data Layer

Primary file: `lib/notion.ts`

- `getPosts(limit?)`
  - returns published posts from Notion
  - falls back to `mockPosts` when env/config is missing or API calls fail
- `getPostBySlug(slug, language = "en")`
  - fetches a single post and its block content
  - falls back to mock content when needed

Additional helper used by the redesign:

- `lib/format-post-date.ts`
  - normalizes post date rendering across home, archive, cards, and article pages

## Blog Rendering Pipeline

- Route: `app/blog/[slug]/page.tsx`
- Renderer: `components/notion-render.tsx`
- Block primitives: `components/atoms/index.tsx`
- TOC: `components/table-of-contents.tsx`
- Comments: `components/terminal-comment-section.tsx`

## Source Of Truth Files

Treat these as the first files to inspect before making route/UI changes:

- `app/layout.tsx`
- `app/fonts.ts`
- `app/globals.css`
- `tailwind.config.ts`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/contact/page.tsx`
- `components/minimal-nav.tsx`
- `components/interactive-terminal.tsx`
- `components/terminal-footer.tsx`
- `components/search-posts.tsx`
- `components/blog-post-card.tsx`
- `components/table-of-contents.tsx`
- `components/terminal-comment-section.tsx`
- `lib/notion.ts`

## Current Known Gaps

- Build hardening is improved, but not complete:
  - `npm run lint`, `npm run typecheck`, and `npm run build` now all pass
  - `next.config.mjs` adds a few security headers, but there is still no CSP or HSTS
- The active global CSS has been reduced to the current CLI-first system, but route shell duplication still exists across pages.
- Comments depend on Giscus env vars; without them, the app intentionally falls back to a mail link.

## AI Working Rules

- Preserve the CLI-first identity unless explicitly asked to redesign again.
- Keep navigation destinations consistent: `/`, `/blog`, `/about`, `/contact`.
- Keep article bodies readable; terminal styling belongs to shell chrome, metadata, and navigation more than to long-form paragraphs.
- Preserve Notion mock fallback behavior for local/dev resilience.

## Validation Commands

- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run check`
- `node scripts/check-env.js`
- `node scripts/test-notion.js`
