# Design Handoff

This file is the visual and UX handoff for future design iteration work.

Use it when asking another AI or designer to improve the interface without losing the current product identity.

## Core Idea

This website is not meant to feel like:

- a generic startup landing page
- a fake desktop operating system in the browser
- a pure retro-neon gimmick
- a modern editorial site with tiny CLI garnish

It is meant to feel like:

- a personal terminal
- a journal with command-line framing
- a technical interface that still reads clearly for non-technical visitors
- a CLI-first shell with softer reading surfaces where needed

Short version:

- shell = terminal
- reading = calmer
- structure = dense but readable
- mood = thoughtful, technical, authored by a human

## What We Changed

We intentionally moved the repo toward a CLI-first system.

Key changes:

- removed the earlier generic/polished-product direction
- restored a darker, more terminal-native shell language
- made navigation, metadata, archive rows, and footer feel command-line based
- kept article bodies more readable by shifting long-form text into serif typography
- reduced heavy glass, gradients, and decorative UI noise
- removed large unused UI/dependency surface so the active design system is clearer

## Current Design System

### Visual language

- mono-heavy shell chrome
- dark terminal palette
- thin borders and framed sections
- command/file metaphors instead of card-heavy marketing layout
- subtle atmosphere only; no loud glitch overload

### Typography

- UI chrome: `IBM Plex Mono`
- reading surface: `Source Serif 4`

Mono is used for:

- nav
- prompts
- labels
- metadata
- archive rows
- footer/status bars

Serif is used for:

- article body content only

### Palette

Defined in `tailwind.config.ts`.

Active colors:

- `term-black`
- `term-darker`
- `term-dark`
- `term-cyan`
- `term-cyan-bright`
- `term-blue`
- `term-white`
- `term-gray`
- `term-green`
- `term-amber`
- `term-line`

### Reusable shell classes

Defined in `app/globals.css`.

- `.cli-frame`
- `.cli-panel`
- `.cli-topline`
- `.cli-rule`
- `.cli-link`
- `.cli-table-row`
- `.cli-table-row--active`
- `.cli-soft-copy`
- `.cli-statusbar`
- `.post-content`

## Route Intent

### `/`

Purpose:

- first impression
- identity
- command interface
- proof of writing/activity

Current structure:

- terminal top bar/nav
- ASCII wordmark
- profile info rows
- portrait block
- small proof/skill area
- interactive terminal
- recent entries list

What should stay:

- ASCII identity
- terminal framing
- recent writing visibility
- interactive prompt

What can improve:

- stronger visual hierarchy
- more authored spacing rhythm
- better balance between portrait, metadata, and terminal
- more memorable composition without becoming a fake OS

### `/blog`

Purpose:

- searchable archive
- quick discovery
- terminal-style journal index

Current structure:

- command/file framing
- search as a command action
- list/table archive instead of big marketing cards

What should stay:

- archive should feel like an index, not a card wall
- search should remain simple and direct
- metadata should stay dense and useful

What can improve:

- row rhythm
- topic labeling
- stronger featured/active entry treatment
- more elegant mobile scanning

### `/blog/[slug]`

Purpose:

- keep terminal shell around the article
- let article text breathe

Current structure:

- file-style top bar
- metadata block
- article body with serif reading surface
- TOC panel
- related entries
- comments section

What should stay:

- terminal framing around article metadata
- calmer reading mode for content
- TOC and related posts

What can improve:

- stronger separation between shell chrome and reading area
- more editorial image/caption rhythm
- better end-of-article sequence

### `/about`

Purpose:

- dossier / resume file
- dense but readable credibility page

What should stay:

- file-like framing
- structured information blocks
- not a corporate About page

What can improve:

- hierarchy of summary vs experience
- more elegance in the experience table
- stronger rhythm between profile, links, and skills

### `/contact`

Purpose:

- low-friction contact route
- direct and simple

What should stay:

- email-first clarity
- direct booking link
- terminal framing without overcomplication

What can improve:

- CTA emphasis
- information grouping
- more distinctive but still minimal composition

## What Must Not Be Lost

If another model iterates on the UI, do not lose these:

- CLI-first shell identity
- mono-heavy top-level chrome
- dark terminal palette
- dense but intentional information layout
- article body readability with serif content
- command language in navigation and archive/search flows

## Anti-Patterns

Do not move the site toward:

- fake desktop OS / folders / windows everywhere
- SaaS hero sections with blobs and gradients
- glassmorphism-heavy cards
- purple cyberpunk overload
- excessive animations/glitch effects
- giant rounded cards and generic template spacing
- making the blog look like a modern magazine with all terminal identity removed

## Good Iteration Targets

These are good places to improve next:

1. homepage composition and hierarchy
2. nav and footer polish
3. archive row rhythm and mobile behavior
4. article shell vs reading balance
5. stronger authored details that make the site feel less AI-generated

## Practical Guidance For Gemini Or Another Designer

When iterating:

- improve composition before adding new effects
- prefer layout rhythm over decorative tricks
- keep shell patterns consistent across routes
- use asymmetry carefully to make the homepage feel more authored
- make the blog easier to scan without making it generic
- keep non-technical usability intact; commands should be additive, not required

## Useful Files

- `app/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `components/minimal-nav.tsx`
- `components/interactive-terminal.tsx`
- `components/terminal-footer.tsx`
- `components/search-posts.tsx`
- `components/table-of-contents.tsx`
- `app/globals.css`
- `tailwind.config.ts`
- `app/fonts.ts`

## Current Status

The current design is intentionally cleaner and more coherent than the original mixed repo state, but it is still an intermediate version.

It is good enough to hand off for visual iteration, not the final aesthetic endpoint.
