# Active Vs Legacy Code Map

## Definitely Active

### Routes

- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/contact/page.tsx`
- `app/blog/loading.tsx`

### Shared components in active route flow

- `components/minimal-nav.tsx`
- `components/interactive-terminal.tsx`
- `components/live-clock.tsx`
- `components/terminal-footer.tsx`
- `components/search-posts.tsx`
- `components/blog-post-card.tsx`
- `components/table-of-contents.tsx`
- `components/terminal-comment-section.tsx`
- `components/notion-render.tsx`
- `components/atoms/index.tsx`
- `components/theme-provider.tsx`

### Active style/config/data files

- `app/fonts.ts`
- `app/globals.css`
- `tailwind.config.ts`
- `next.config.mjs`
- `lib/notion.ts`
- `lib/format-post-date.ts`

## Still Likely Legacy Or Not In Active Flow

- `lib/notion-simple.ts`
- `app/actions/subscribe.ts`
- `app/actions/newsletter.ts`

## Important Drift To Remember

- Most of the old unused UI surface has already been removed.
- The remaining legacy drift is now mostly integration/helper code rather than inactive component trees.

## Safe Cleanup Strategy

1. Confirm active imports from `app/*` first.
2. Remove unused legacy UI in small batches.
3. Run `npm run build` after each cleanup batch.
4. Update docs immediately when the active set changes.
