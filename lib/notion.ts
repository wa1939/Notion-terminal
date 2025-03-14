import { Client } from "@notionhq/client"

// Use the environment variables
const NOTION_API_KEY = process.env.NOTION_API_KEY || ""
const POST_DATABASE_ID = process.env.POST_DATABASE_ID || ""
const SETTING_DATABASE_ID = process.env.SETTING_DATABASE_ID || ""
const NAVIGATION_DATABASE_ID = process.env.NAVIGATION_DATABASE_ID || ""

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
  contents?: any[] // Add this to store Notion blocks
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

// Export individual functions directly
export async function getPosts(limit?: number) {
  try {
    if (!NOTION_API_KEY || !POST_DATABASE_ID) {
      console.warn("Notion API key or database ID not set, using mock data")
      // Return mock data if API key or database ID is not set
      const sortedPosts = [...mockPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      return limit ? sortedPosts.slice(0, limit) : sortedPosts
    }

    // Query the Notion database for published posts
    const response = await notion.databases.query({
      database_id: POST_DATABASE_ID,
      filter: {
        and: [
          {
            property: "status",
            status: {
              equals: "Published",
            },
          },
          {
            property: "published",
            date: { before: new Date().toISOString() },
          },
        ],
      },
      sorts: [
        {
          property: "published",
          direction: "descending",
        },
      ],
    })

    // Convert Notion response to our Post format
    const posts = await convertNotionDatabaseToPosts(response.results)

    // Return all posts or limit if specified
    return limit ? posts.slice(0, limit) : posts
  } catch (error) {
    console.error("Error fetching posts from Notion:", error)
    // Fallback to mock data in case of error
    const sortedPosts = [...mockPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return limit ? sortedPosts.slice(0, limit) : sortedPosts
  }
}

export async function getPostBySlug(slug: string, language = "en") {
  try {
    if (!NOTION_API_KEY || !POST_DATABASE_ID) {
      console.warn("Notion API key or database ID not set, using mock data")
      // Return mock data if API key or database ID is not set
      const post = mockPosts.find((post) => post.slug === slug)
      if (!post) return null

      return {
        ...post,
        contents: [
          // Mock content block
          {
            type: "paragraph",
            paragraph: { rich_text: [{ type: "text", text: { content: "This is a mock content block." } }] },
          },
        ],
      }
    }

    // Query the Notion database for a specific post by slug
    const response = await notion.databases.query({
      database_id: POST_DATABASE_ID,
      filter: {
        and: [
          {
            property: "published",
            date: { before: new Date().toISOString() },
          },
          {
            property: "slug",
            rich_text: { equals: slug },
          },
          {
            property: "language",
            select: { equals: language },
          },
        ],
      },
    })

    if (response.results.length === 0) {
      return null
    }

    // Convert Notion response to our Post format
    const posts = await convertNotionDatabaseToPosts(response.results)
    const post = posts[0]

    // Get the content blocks for the post
    post.contents = await getChildren(post.id)

    return post
  } catch (error) {
    console.error("Error fetching post by slug from Notion:", error)
    // Fallback to mock data in case of error
    const post = mockPosts.find((post) => post.slug === slug)
    if (!post) return null

    return {
      ...post,
      contents: [
        // Mock content block
        {
          type: "paragraph",
          paragraph: { rich_text: [{ type: "text", text: { content: "This is a mock content block." } }] },
        },
      ],
    }
  }
}

export async function updateViewsBySlug(slug: string, language = "en") {
  try {
    if (!NOTION_API_KEY || !POST_DATABASE_ID) {
      console.warn("Notion API key or database ID not set, skipping view update")
      return { success: true }
    }

    // Query the Notion database for a specific post by slug
    const response = await notion.databases.query({
      database_id: POST_DATABASE_ID,
      filter: {
        and: [
          {
            property: "published",
            date: { before: new Date().toISOString() },
          },
          {
            property: "slug",
            rich_text: { equals: slug },
          },
          {
            property: "language",
            select: { equals: language },
          },
        ],
      },
    })

    if (response.results.length === 0) {
      return { success: false }
    }

    const post = response.results[0]

    // Get current views and increment
    let views = getProperties(post.properties.views)
    views = views ? views + 1 : 1

    // Update the post with the new view count
    return await notion.pages.update({
      page_id: post.id,
      properties: {
        views: {
          number: views,
        },
      },
    })
  } catch (error) {
    console.error("Error updating views for post:", error)
    return { success: false }
  }
}

export async function getTags() {
  try {
    if (!NOTION_API_KEY || !POST_DATABASE_ID) {
      console.warn("Notion API key or database ID not set, using mock data")
      // Extract unique tags from mock posts
      const allTags = mockPosts.flatMap((post) => post.tags)
      return [...new Set(allTags)]
    }

    // Get the database schema to extract tag options
    const response = await notion.databases.retrieve({
      database_id: POST_DATABASE_ID,
    })

    const tags_raw = response.properties.tags
    const tags = tags_raw.multi_select.options.map((x) => x.name) || []

    return tags
  } catch (error) {
    console.error("Error fetching tags from Notion:", error)
    // Fallback to mock data
    const allTags = mockPosts.flatMap((post) => post.tags)
    return [...new Set(allTags)]
  }
}

export async function getPostsByTag(tag: string) {
  try {
    if (!NOTION_API_KEY || !POST_DATABASE_ID) {
      console.warn("Notion API key or database ID not set, using mock data")
      return mockPosts.filter((post) => post.tags.includes(tag))
    }

    // Query the Notion database for posts with a specific tag
    const response = await notion.databases.query({
      database_id: POST_DATABASE_ID,
      filter: {
        and: [
          {
            property: "status",
            status: {
              equals: "Published",
            },
          },
          {
            property: "published",
            date: { before: new Date().toISOString() },
          },
          {
            property: "tags",
            multi_select: {
              contains: tag,
            },
          },
        ],
      },
      sorts: [
        {
          property: "published",
          direction: "descending",
        },
      ],
    })

    // Convert Notion response to our Post format
    return await convertNotionDatabaseToPosts(response.results)
  } catch (error) {
    console.error("Error fetching posts by tag from Notion:", error)
    // Fallback to mock data
    return mockPosts.filter((post) => post.tags.includes(tag))
  }
}

export async function getNotionOptions() {
  try {
    if (!NOTION_API_KEY || !SETTING_DATABASE_ID || !NAVIGATION_DATABASE_ID) {
      console.warn("Notion API key or database IDs not set, using mock data")
      return {
        settings: {
          siteTitle: "Retro Portfolio",
          siteDescription: "A retro-styled portfolio and blog",
          siteUrl: "https://retro-portfolio.com",
        },
        navigation: [
          { id: "1", title: "Home", url: "/", children: [] },
          { id: "2", title: "About", url: "/about", children: [] },
          { id: "3", title: "Blog", url: "/blog", children: [] },
          { id: "4", title: "Contact", url: "/contact", children: [] },
        ],
      }
    }

    // Get settings and navigation
    const settings = await getSettings()
    const navigation = await getNavigation()

    return {
      settings,
      navigation,
    }
  } catch (error) {
    console.error("Error fetching Notion options:", error)
    return {
      settings: {
        siteTitle: "Retro Portfolio",
        siteDescription: "A retro-styled portfolio and blog",
        siteUrl: "https://retro-portfolio.com",
      },
      navigation: [
        { id: "1", title: "Home", url: "/", children: [] },
        { id: "2", title: "About", url: "/about", children: [] },
        { id: "3", title: "Blog", url: "/blog", children: [] },
        { id: "4", title: "Contact", url: "/contact", children: [] },
      ],
    }
  }
}

// Helper functions
async function getSettings() {
  try {
    // Query the settings database
    const response = await notion.databases.query({
      database_id: SETTING_DATABASE_ID,
    })

    // Convert to key-value pairs
    const settings = response.results.reduce((acc: any, item: any) => {
      const key = getProperties(item.properties.name).content
      const value = getProperties(item.properties.value).content
      acc[key] = value
      return acc
    }, {})

    return settings
  } catch (error) {
    console.error("Error fetching settings from Notion:", error)
    return {
      siteTitle: "Retro Portfolio",
      siteDescription: "A retro-styled portfolio and blog",
      siteUrl: "https://retro-portfolio.com",
    }
  }
}

async function getNavigation() {
  try {
    // Query the navigation database
    const response = await notion.databases.query({
      database_id: NAVIGATION_DATABASE_ID,
    })

    // Convert and sort navigation items
    let navigation = response.results
      .sort((a, b) => {
        const aParent = getProperties(a.properties.parent)?.id || null
        const bParent = getProperties(b.properties.parent)?.id || null

        if (aParent === bParent || (!aParent && !bParent)) {
          const aIndex = getProperties(a.properties.index)
          const bIndex = getProperties(b.properties.index)
          return aIndex - bIndex
        } else {
          if (aParent && bParent) {
            return aParent.localeCompare(bParent)
          } else {
            return aParent ? 1 : -1
          }
        }
      })
      .map((item) => {
        const id = item.id
        const title = getProperties(item.properties.title).content
        const index = getProperties(item.properties.index)
        const url = getProperties(item.properties.url).content
        const parent = getProperties(item.properties.parent)?.id || null
        const children: any[] = []

        return {
          id,
          title,
          index,
          url,
          parent,
          children,
        }
      })

    // Build the navigation hierarchy
    navigation = navigation.reduce((acc: any[], item: any) => {
      const parentObj = item.parent ? navigation.filter((el) => el.id === item.parent) : []

      if (parentObj.length) {
        parentObj[0].children.push(item)
      } else {
        acc.push(item)
      }
      return acc
    }, [])

    return navigation
  } catch (error) {
    console.error("Error fetching navigation from Notion:", error)
    return [
      { id: "1", title: "Home", url: "/", children: [] },
      { id: "2", title: "About", url: "/about", children: [] },
      { id: "3", title: "Blog", url: "/blog", children: [] },
      { id: "4", title: "Contact", url: "/contact", children: [] },
    ]
  }
}

async function getChildren(id: string) {
  try {
    // Get child blocks for a page
    const response = await notion.blocks.children.list({
      block_id: id,
    })

    const results = response.results

    // Recursively get children of children
    for (const i in results) {
      const item = results[i]
      if (item.has_children) {
        const children = await getChildren(item.id)
        results[i].children = children
      }
    }

    return results
  } catch (error) {
    console.error("Error fetching children from Notion:", error)
    return []
  }
}

async function convertNotionDatabaseToPosts(notionDatabase: any) {
  try {
    return await Promise.all(
      notionDatabase.map(async (post: any) => {
        // Simplified approach without notion-to-md
        // Estimate reading time based on content length
        const description = getProperties(post.properties.description)?.content || ""
        const estimatedReadingTime = Math.ceil(description.split(" ").length / 200) || 1

        return {
          id: post.id,
          title: getProperties(post.properties.title)?.content ?? "Untitled",
          slug: getProperties(post.properties.slug)?.content ?? "untitled",
          date: getProperties(post.properties.published) ?? new Date().toISOString(),
          author: getProperties(post.properties.authors)?.name ?? "Anonymous",
          excerpt: getProperties(post.properties.description)?.content ?? "",
          content: description, // Using description as content for simplicity
          coverImage: getProperties(post.cover)?.url ?? null,
          tags: getProperties(post.properties.tags, true)?.map((x: any) => x.name) || [],
          readingTime: estimatedReadingTime,
          views: getProperties(post.properties.views) || 0,
          language: getProperties(post.properties.language)?.name || "en",
        }
      }),
    )
  } catch (error) {
    console.error("Error converting Notion database to posts:", error)
    return []
  }
}

// For backward compatibility, also export the Notion object
const Notion = {
  getPosts,
  getPostBySlug,
  updateViewsBySlug,
  getTags,
  getPostsByTag,
  getNotionOptions,
}

export default Notion

