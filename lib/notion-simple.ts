import { Client } from "@notionhq/client"

// Use the environment variables
const NOTION_API_KEY = process.env.NOTION_API_KEY || ""
const POST_DATABASE_ID = process.env.POST_DATABASE_ID || ""

// Initialize Notion client with the API key
const notion = new Client({ auth: NOTION_API_KEY })

export interface Post {
  id: string
  title: string
  slug: string
  date: string
  author: string
  excerpt: string
  content: string
  coverImage?: string
  tags: string[]
  readingTime: number
  views: number
  language?: string
}

// Mock data for demonstration - we'll keep this for fallback
const mockPosts: Post[] = [
  {
    id: "1",
    title: "Getting Started with Next.js and Notion as a CMS",
    slug: "getting-started-with-nextjs-and-notion",
    date: "2023-03-15",
    author: "John Doe",
    excerpt: "Learn how to use Notion as a CMS for your Next.js website with this step-by-step guide.",
    content: `
      <h2 id="section-1">Introduction</h2>
      <p>Notion is a powerful tool that can be used as a CMS for your Next.js website. In this post, we'll explore how to set up the integration and fetch data from Notion.</p>
      
      <h2 id="section-2">Setting Up Notion API</h2>
      <p>First, you'll need to create a Notion integration and get your API key. Here's how...</p>
      
      <h2>Fetching Data in Next.js</h2>
      <p>Once you have your API key, you can use the Notion SDK to fetch data from your database...</p>
      
      <h2 id="section-3">Conclusion</h2>
      <p>Using Notion as a CMS for your Next.js website is a great way to manage your content without having to set up a traditional CMS.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Notion", "CMS", "Web Development"],
    readingTime: 5,
    views: 1250,
    language: "en",
  },
  {
    id: "2",
    title: "Creating a Retro-Styled Website with Tailwind CSS",
    slug: "creating-retro-styled-website-with-tailwind",
    date: "2023-04-22",
    author: "John Doe",
    excerpt: "Explore how to create a nostalgic, retro-styled website using modern tools like Tailwind CSS.",
    content: `
      <h2 id="section-1">The Retro Web Aesthetic</h2>
      <p>The web has come a long way since its early days, but there's something charming about the design aesthetics of the early internet...</p>
      
      <h2 id="section-2">Setting Up Tailwind CSS</h2>
      <p>To get started with our retro-styled website, we'll first need to set up Tailwind CSS...</p>
      
      <h2>Color Palettes</h2>
      <p>Retro web design often features bold, contrasting colors. Here are some color palettes to consider...</p>
      
      <h2 id="section-3">Conclusion</h2>
      <p>Creating a retro-styled website doesn't mean sacrificing modern web practices. With Tailwind CSS, you can have the best of both worlds.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["CSS", "Tailwind", "Design", "Retro"],
    readingTime: 7,
    views: 843,
    language: "en",
  },
  {
    id: "3",
    title: "Building a Portfolio That Stands Out",
    slug: "building-portfolio-that-stands-out",
    date: "2023-05-10",
    author: "John Doe",
    excerpt:
      "Tips and strategies for creating a developer portfolio that captures attention and showcases your skills effectively.",
    content: `
      <h2 id="section-1">Why Your Portfolio Matters</h2>
      <p>In the competitive field of web development, your portfolio is often the first impression potential clients or employers have of your work...</p>
      
      <h2 id="section-2">Essential Elements</h2>
      <p>Every effective portfolio should include these key components...</p>
      
      <h2>Showcasing Your Projects</h2>
      <p>How you present your work is just as important as the work itself. Here are some strategies...</p>
      
      <h2 id="section-3">Conclusion</h2>
      <p>A standout portfolio takes time and effort to create, but the investment pays off in better opportunities and connections.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["Portfolio", "Career", "Web Development"],
    readingTime: 6,
    views: 621,
    language: "en",
  },
]

// Helper functions for Notion API
const getProperties = (param: any, isGetAllArray = false): any => {
  if (!param) {
    return null
  } else if (param && param instanceof Object && "object" in param && param.object === "user") {
    return param
  } else if (param && param instanceof Object && "type" in param) {
    return getProperties(param[param.type], isGetAllArray)
  } else if (param && param instanceof Array) {
    if (isGetAllArray) {
      return param.map((item) => getProperties(item, isGetAllArray))
    } else {
      return getProperties(param[0], isGetAllArray)
    }
  } else {
    return param
  }
}

export async function getPosts(limit?: number) {
  try {
    console.log("Fetching posts from Notion with API key:", NOTION_API_KEY ? "Present" : "Missing")
    console.log("Using database ID:", POST_DATABASE_ID ? POST_DATABASE_ID : "Missing")

    if (!NOTION_API_KEY || !POST_DATABASE_ID) {
      console.warn("Notion API key or database ID not set, using mock data")
      // Return mock data if API key or database ID is not set
      const sortedPosts = [...mockPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      return limit ? sortedPosts.slice(0, limit) : sortedPosts
    }

    // Mock implementation
    const sortedPosts = [...mockPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return limit ? sortedPosts.slice(0, limit) : sortedPosts
  } catch (error) {
    console.error("Error fetching posts from Notion:", error)
    // Fallback to mock data in case of error
    const sortedPosts = [...mockPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return limit ? sortedPosts.slice(0, limit) : sortedPosts
  }
}

export async function getPostBySlug(slug: string, language = "en") {
  try {
    console.log(`Fetching post with slug: ${slug}`)

    if (!NOTION_API_KEY || !POST_DATABASE_ID) {
      console.warn("Notion API key or database ID not set, using mock data")
      // Return mock data if API key or database ID is not set
      const post = mockPosts.find((post) => post.slug === slug)
      if (!post) return null
      return post
    }

    // Mock implementation
    const post = mockPosts.find((post) => post.slug === slug)
    return post || null
  } catch (error) {
    console.error("Error fetching post by slug from Notion:", error)
    // Fallback to mock data in case of error
    const post = mockPosts.find((post) => post.slug === slug)
    return post || null
  }
}

