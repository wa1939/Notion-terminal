import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import MinimalNav from "@/components/minimal-nav"
import TerminalFooter from "@/components/terminal-footer"
import TableOfContents from "@/components/table-of-contents"
import MarkdownRender from "@/components/markdown-render"
import TerminalCommentSection from "@/components/terminal-comment-section"
import BlogPostCard from "@/components/blog-post-card"
import ReadingControls from "@/components/reading-controls"
import NewsletterSignup from "@/components/newsletter-signup"
import { formatPostDate } from "@/lib/format-post-date"
import { getPostBySlug, getAllPosts } from "@/lib/posts"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://waleedalghamdi.com"

  return {
    title: `${post.title} — Waleed Alhamed`,
    description: post.excerpt || `Read ${post.title} on Waleed Alhamed's journal.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "Waleed Alhamed",
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@walalhamed",
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const relatedPosts = allPosts.filter((candidate) => candidate.id !== post.id && candidate.tags.some((tag: string) => post.tags.includes(tag))).slice(0, 2)

  return (
    <div className="min-h-screen bg-[var(--term-black)] text-[var(--term-white)] font-mono flex flex-col">
      <MinimalNav />
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[url('/noise.png')] animate-noise" />

      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-[var(--term-gray)] transition-colors hover:text-[var(--term-cyan)]">
            ← back to journal
          </Link>

          <article className="cli-frame overflow-hidden rounded-xl">
            <div className="flex items-center justify-between border-b border-[var(--term-line)] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[var(--term-gray)]">
              <span>{post.slug}.md</span>
              <span>journal entry</span>
            </div>

            <div className="grid gap-8 p-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:p-6">
              <div className="space-y-8">
                <header className="space-y-5 border-b border-[var(--term-line)] pb-6">
                  {/* Cover Image - Full Width, Rounded */}
                  {post.coverImage && (
                    <div className="rounded-xl overflow-hidden border border-[var(--term-line)]">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        width={1200}
                        height={680}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, index: number) => (
                      <span key={`${tag}-${index}`} className="text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-[var(--term-line)] text-[var(--term-cyan)]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h1
                    className={`text-3xl font-bold tracking-tight text-[var(--term-white)] md:text-4xl leading-tight${post.language === "ar" ? " font-arabic text-right" : ""}`}
                    dir={post.language === "ar" ? "rtl" : undefined}
                    lang={post.language === "ar" ? "ar" : undefined}
                  >
                    {post.title}
                  </h1>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 text-xs text-[var(--term-gray)]">
                    <span>📅 {formatPostDate(post.date)}</span>
                    <span>✍ {post.author}</span>
                    <span>⏱ {post.readingTime} min read</span>
                  </div>

                  {post.excerpt && <p className="text-sm leading-7 text-[var(--term-gray)] max-w-3xl">{post.excerpt}</p>}
                </header>

                <div className="border-y-[3px] border-double border-[var(--term-line)] py-1.5 my-8 text-center text-[10px] uppercase tracking-[0.3em] text-[var(--term-gray)]">
                  begin document parsing
                </div>

                <div
                  className={`post-content max-w-[65ch] mx-auto text-base${post.language === "ar" ? " font-arabic" : ""}`}
                  dir={post.language === "ar" ? "rtl" : undefined}
                  lang={post.language === "ar" ? "ar" : undefined}
                >
                  <MarkdownRender content={post.content} />
                </div>

                <div className="mt-16 flex flex-wrap items-center justify-center gap-2 border-t border-[var(--term-line)] pt-8 text-xs uppercase tracking-[0.14em] text-[var(--term-gray)] max-w-[65ch] mx-auto">
                  <span className="mr-2">tags:</span>
                  {post.tags.map((tag: string, index: number) => (
                    <span key={`${tag}-${index}`} className="border border-[var(--term-line)] px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-y-[3px] border-double border-[var(--term-line)] py-1.5 my-8 text-center text-[10px] uppercase tracking-[0.3em] text-[var(--term-gray)]">
                  eof
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-4">
                <ReadingControls headings={post.headings} wordCount={post.content.split(/\s+/).filter(Boolean).length} />
                <TableOfContents headings={post.headings} />
              </aside>
            </div>
          </article>

          <section className="mt-10 max-w-[65ch] mx-auto">
            <div className="text-sm text-[var(--term-gray)] mb-3">
              <span className="text-[var(--term-green)]">$</span> <span className="text-[var(--term-cyan)]">cat</span> subscribe.txt
            </div>
            <p className="text-sm text-[var(--term-gray)] mb-4">Enjoyed this post? Get notified of new ones.</p>
            <NewsletterSignup />
          </section>

          <section className="mt-10 space-y-5">
            <div className="text-sm text-[var(--term-gray)]">
              <span className="text-[var(--term-green)]">$</span> <span className="text-[var(--term-cyan)]">node</span> comments.js
            </div>
            <TerminalCommentSection />
          </section>

          {relatedPosts.length > 0 && (
            <section className="mt-10 space-y-5">
              <div className="text-sm text-[var(--term-gray)]">
                <span className="text-[var(--term-green)]">$</span> <span className="text-[var(--term-cyan)]">find</span> ./related-posts
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}
