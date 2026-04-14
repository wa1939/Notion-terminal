---
banner: "![[blog-banner.png]]"
---
---
banner: "![[blog-banner.png]]"
---

# Website Blog

> Posts in this folder sync to [walhamed.com](https://www.walhamed.com/blog) when you set `status: "published"` and push via Git.

## Quick Actions

```button
name New Blog Post
type command
action Templater: Create new note from template
color blue
```

## Workflow

1. Click **New Blog Post** above (or create a new `.md` file in this folder)
2. Templater auto-fills the frontmatter (title, slug, date)
3. Write your post
4. When ready, change `status: "draft"` → `status: "published"`
5. Push via Obsidian Git (Ctrl+P → "Obsidian Git: Commit and push")
6. GitHub Action syncs published posts to the website — live in ~2 minutes

## Adding Images

1. Drop images into `Website Blog/attachments/`
2. Reference them in your post like this:
   ```
   ![Alt text](/images/blog/my-image.jpg)
   ```
3. The sync action copies `attachments/*` → `public/images/blog/` on the website
4. Use the **exact filename** — the path prefix `/images/blog/` is added automatically by the sync

**Example:** If you drop `hackathon-team.jpg` into `attachments/`, use:
```
![Team photo](/images/blog/hackathon-team.jpg)
```

## Editing Posts

Just edit the `.md` file directly in Obsidian, save, and push. Changes go live in ~2 minutes.

- **Edit text**: Open the post, change anything, push
- **Change status**: Set `status: "draft"` to unpublish, `status: "published"` to go live
- **Update images**: Replace files in `attachments/` with the same name, or add new ones

## Status Guide

| Status | Meaning |
|--------|---------|
| `draft` | Work in progress — not visible on site |
| `published` | Live on walhamed.com |

## Posts

```dataview
TABLE status, date, tags
FROM "Website Blog"
WHERE file.name != "Website Blog"
SORT date DESC
```
