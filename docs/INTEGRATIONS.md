# Integrations And Environment Variables

## Integration Map

- Notion CMS
  - Files: `lib/notion.ts`, `scripts/test-notion.js`, `scripts/check-env.js`
  - Purpose: blog/journal content source
- Giscus comments
  - File: `components/terminal-comment-section.tsx`
  - Purpose: comments on post pages
- Vercel analytics
  - File: `app/layout.tsx`
  - Purpose: Analytics and Speed Insights

The current active redesign does not use the earlier footer newsletter/embed flow or the heavier inline Cal embed flow as part of the main UX.

## Environment Variables

| Variable | Used In | Required For Current Live Routes | Notes |
| --- | --- | --- | --- |
| `NOTION_API_KEY` | `lib/notion.ts`, `scripts/test-notion.js`, `scripts/check-env.js` | Yes, for real content | Missing value triggers mock post fallback. |
| `POST_DATABASE_ID` | `lib/notion.ts`, `scripts/test-notion.js`, `scripts/check-env.js` | Yes, for real content | Missing value triggers mock post fallback. |
| `SETTING_DATABASE_ID` | `lib/notion.ts`, `scripts/check-env.js` | No | Helper-only, not wired to active UI. |
| `NAVIGATION_DATABASE_ID` | `lib/notion.ts`, `scripts/check-env.js` | No | Helper-only, not wired to active UI. |
| `NEXT_PUBLIC_GISCUS_REPO` | `components/terminal-comment-section.tsx`, `scripts/check-env.js` | Yes, for live comments | Missing values trigger graceful fallback messaging. |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | `components/terminal-comment-section.tsx`, `scripts/check-env.js` | Yes | Same as above. |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | `components/terminal-comment-section.tsx`, `scripts/check-env.js` | Yes | Same as above. |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | `components/terminal-comment-section.tsx`, `scripts/check-env.js` | Yes | Same as above. |

## Current Fallback Behavior

- Notion
  - if credentials are missing or calls fail, `lib/notion.ts` returns mock posts
- Comments
  - if Giscus env vars are missing, `components/terminal-comment-section.tsx` shows a fallback mail-contact message instead of a broken widget

## Scripts

- `node scripts/check-env.js`
- `node scripts/test-notion.js`

## Current Risks

- `next.config.mjs` no longer ignores TypeScript and ESLint failures during builds.
- `next.config.mjs` now adds basic hardening headers, but there is still no CSP or HSTS.
- `app/actions/subscribe.ts` still exists in the repo and may need hardening if revived later.
- The repo still includes unused packages and older integration paths that should be reviewed before production hardening.
