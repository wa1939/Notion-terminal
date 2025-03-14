import { getPosts } from "@/lib/notion"
import BlogPostCard from "@/components/blog-post-card"
import { Terminal } from "lucide-react"

export default async function FeaturedPosts() {
  const posts = await getPosts(3) // Get only 3 most recent posts

  return (
    <div className="bg-term-dark border border-term-cyan/20 p-6">
      <div className="bg-term-darker px-4 py-2 flex items-center justify-between border-b border-term-cyan/20 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-term-gray flex items-center">
          <Terminal className="h-3 w-3 mr-2 text-term-cyan" />
          recent-posts.sh
        </div>
        <div className="w-4"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}

        {posts.length === 0 && (
          <div className="md:col-span-3 text-center py-12 border-2 border-dashed border-term-cyan/20 bg-term-darker">
            <h3 className="text-xl font-bold mb-2 text-term-cyan">No posts found</h3>
            <p className="text-term-gray">There are no blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

