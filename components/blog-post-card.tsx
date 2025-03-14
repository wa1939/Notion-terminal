import Link from "next/link"
import Image from "next/image"
import { Calendar, Eye, Clock } from "lucide-react"
import type { Post } from "@/lib/notion"

interface BlogPostCardProps {
  post: Post
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="bg-term-darker border border-term-cyan/20 hover:border-term-cyan/40 transition-colors group rounded-lg overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="p-2">
          {post.coverImage ? (
            <div className="relative border border-term-cyan/20 mb-4 overflow-hidden rounded-lg">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                width={400}
                height={225}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-term-cyan/5 mix-blend-overlay"></div>
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-full h-px bg-term-cyan/20 animate-scan"></div>
              </div>
            </div>
          ) : (
            <div className="w-full h-48 bg-term-dark border border-term-cyan/20 flex items-center justify-center mb-4 rounded-lg">
              <span className="text-term-cyan font-mono">No Image</span>
            </div>
          )}

          <div className="p-3">
            <div className="flex items-center text-xs text-term-gray mb-2">
              <Calendar className="mr-1 h-3 w-3" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>

            <h3 className="text-lg font-bold mb-2 line-clamp-2 text-term-cyan group-hover:text-term-cyan-bright transition-colors">
              {post.title}
            </h3>

            <p className="line-clamp-3 text-sm mb-4 text-term-gray">{post.excerpt}</p>

            <div className="flex items-center justify-between text-xs text-term-gray">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{post.views || 0} views</span>
              </div>
            </div>

            <div className="mt-4 text-term-cyan text-sm font-bold flex items-center">
              <span className="text-term-green mr-1">$</span> cat post.md
              <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

