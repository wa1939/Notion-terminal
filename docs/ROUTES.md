# Routes Reference

## Shared Frame

- Global app shell: `app/layout.tsx`
- Global CSS: `app/globals.css`
- Shared nav: `components/minimal-nav.tsx`
- Shared footer: `components/terminal-footer.tsx`

## `/` - Home

- File: `app/page.tsx`
- Role:
  - CLI-first landing page
  - ASCII identity block
  - compact profile/info rows
  - interactive terminal prompt
  - recent journal entries list
- Key dependencies:
  - `components/minimal-nav.tsx`
  - `components/live-clock.tsx`
  - `components/interactive-terminal.tsx`
  - `components/terminal-footer.tsx`
  - `lib/notion.ts`

## `/blog` - Journal Archive

- File: `app/blog/page.tsx`
- Role:
  - searchable post archive
  - terminal-style list/index view
- Key dependencies:
  - `components/search-posts.tsx`
  - `lib/notion.ts`
  - `lib/format-post-date.ts`
- Notable behavior:
  - consumes `?q=` and filters archive results
  - falls back to mock data if Notion is not configured

## `/blog/[slug]` - Journal Entry

- File: `app/blog/[slug]/page.tsx`
- Role:
  - renders full Notion post
  - keeps shell metadata and TOC in terminal style
  - shifts body copy into a more readable article surface
- Key dependencies:
  - `components/notion-render.tsx`
  - `components/table-of-contents.tsx`
  - `components/terminal-comment-section.tsx`
  - `components/blog-post-card.tsx`
  - `lib/notion.ts`
  - `lib/format-post-date.ts`

## `/about` - Dossier

- File: `app/about/page.tsx`
- Role:
  - profile summary
  - experience table/timeline
  - skills and credentials
- Key behavior:
  - behaves like a structured resume text file, not a marketing page

## `/contact` - Contact Channel

- File: `app/contact/page.tsx`
- Role:
  - simple contact page
  - direct email and external booking link
- Key behavior:
  - intentionally avoids the heavier embedded-calendar approach in the active redesign

## Navigation Contract

These routes are referenced in multiple places and should remain aligned:

- `components/minimal-nav.tsx`
- `components/interactive-terminal.tsx`
- `components/terminal-footer.tsx`

If route labels or destinations change, update all three.
