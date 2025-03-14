import Link from "next/link"
import { ArrowLeft, Terminal } from "lucide-react"
import MinimalNav from "@/components/minimal-nav"
import TerminalFooter from "@/components/terminal-footer"
import BlogPostCard from "@/components/blog-post-card"
import SearchPosts from "@/components/search-posts"
import { getPosts } from "@/lib/notion"

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-term-black text-term-white font-mono flex flex-col">
      <MinimalNav />

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[url('/noise.png')] animate-noise" />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-term-gray hover:text-term-cyan transition-colors duration-200 group mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-term-green">$</span> cd ..
          </Link>

          <div className="mb-12">
            <div className="flex items-center mb-2">
              <span className="text-term-green">$</span>
              <span className="text-term-cyan ml-2">ls</span>
              <span className="text-term-white ml-2">posts/</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-term-cyan mb-4">Blog Posts</h1>
            <div className="h-[1px] w-16 bg-term-cyan mb-6" />
            <p className="text-term-gray max-w-2xl">
              Thoughts, tutorials, and insights on web development, design, and technology. All content is synced from
              my Notion workspace.
            </p>
          </div>

          <div className="mb-8">
            <SearchPosts />
          </div>

          <div className="bg-term-dark border border-term-cyan/20 p-6 mb-12 rounded-lg">
            <div className="bg-term-darker px-4 py-2 flex items-center justify-between border-b border-term-cyan/20 mb-6 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-term-gray flex items-center">
                <Terminal className="h-3 w-3 mr-2 text-term-cyan" />
                posts.sh
              </div>
              <div className="w-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-term-cyan/20 bg-term-darker rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-term-cyan">No posts found</h3>
                <p className="text-term-gray mb-4">There are no blog posts available at the moment.</p>
                <div className="flex justify-center">
                  <button className="px-4 py-2 bg-term-dark hover:bg-term-dark/80 text-term-cyan border border-term-cyan/30 rounded-md transition-colors duration-200">
                    Refresh
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}

