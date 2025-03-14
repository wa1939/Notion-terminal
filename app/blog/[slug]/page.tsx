import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Eye, Clock, Terminal } from "lucide-react"
import MinimalNav from "@/components/minimal-nav"
import TerminalFooter from "@/components/terminal-footer"
import { getPostBySlug, getPosts } from "@/lib/notion"
import { notFound } from "next/navigation"
import NotionRender from "@/components/notion-render"
import TableOfContents from "@/components/table-of-contents"
import TerminalCommentSection from "@/components/terminal-comment-section"
import BlogPostCard from "@/components/blog-post-card"

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts
  const allPosts = await getPosts()
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-term-black text-term-white font-mono flex flex-col">
      <MinimalNav />

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[url('/noise.png')] animate-noise" />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-term-gray hover:text-term-cyan transition-colors duration-200 group mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-term-green">$</span> cd ../blog
          </Link>

          <article className="bg-term-dark border border-term-cyan/20 mb-12 rounded-lg overflow-hidden">
            <div className="bg-term-darker px-4 py-2 flex items-center justify-between border-b border-term-cyan/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-term-gray flex items-center">
                <Terminal className="h-3 w-3 mr-2 text-term-cyan" />
                {post.slug}.md
              </div>
              <div className="w-4"></div>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-term-cyan">{post.title}</h1>

                <div className="flex flex-wrap gap-4 text-sm text-term-gray mb-6">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="mr-1 h-4 w-4" />
                    <span>{post.views || 0} views</span>
                  </div>
                </div>

                {post.coverImage && (
                  <div className="border border-term-cyan/20 mb-8 relative overflow-hidden rounded-lg max-w-4xl mx-auto">
                    <Image
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      width={1200}
                      height={630}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-term-cyan/5 mix-blend-overlay"></div>
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="w-full h-px bg-term-cyan/20 animate-scan"></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:grid lg:grid-cols-[1fr,250px] lg:gap-8">
                <div className="prose prose-invert prose-term max-w-none post-content">
                  <NotionRender contents={post.contents} />

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="text-term-cyan font-bold">Tags: </span>
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium bg-term-darker border border-term-cyan/30 text-term-cyan rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:block">
                  <TableOfContents contents={post.contents} />
                </div>
              </div>
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <span className="text-term-green">$</span>
                <span className="text-term-cyan ml-2">find</span>
                <span className="text-term-white ml-2">./related-posts</span>
              </div>

              <div className="bg-term-dark border border-term-cyan/20 p-6 rounded-lg">
                <div className="bg-term-darker px-4 py-2 flex items-center justify-between border-b border-term-cyan/20 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-term-gray flex items-center">
                    <Terminal className="h-3 w-3 mr-2 text-term-cyan" />
                    related-posts.sh
                  </div>
                  <div className="w-4"></div>
                </div>

                <h2 className="text-xl font-bold mb-6 text-term-cyan">Related Posts</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogPostCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center mb-6">
              <span className="text-term-green">$</span>
              <span className="text-term-cyan ml-2">node</span>
              <span className="text-term-white ml-2">comments.js</span>
            </div>

            <TerminalCommentSection />
          </div>
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}

