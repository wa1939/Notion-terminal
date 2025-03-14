// This script tests the connection to the Notion API
require("dotenv").config({ path: ".env.local" })
const { Client } = require("@notionhq/client")

// Check if environment variables are set
const NOTION_API_KEY = process.env.NOTION_API_KEY
const POST_DATABASE_ID = process.env.POST_DATABASE_ID

if (!NOTION_API_KEY) {
  console.error("❌ NOTION_API_KEY is not set in your environment variables")
  process.exit(1)
}

if (!POST_DATABASE_ID) {
  console.error("❌ POST_DATABASE_ID is not set in your environment variables")
  process.exit(1)
}

console.log("✅ Environment variables are set")

// Initialize Notion client
const notion = new Client({ auth: NOTION_API_KEY })

async function testNotionConnection() {
  try {
    console.log("Testing connection to Notion API...")

    // Test database access
    console.log(`Querying database ${POST_DATABASE_ID}...`)
    const response = await notion.databases.query({
      database_id: POST_DATABASE_ID,
      page_size: 1,
    })

    console.log(`✅ Successfully connected to Notion API`)
    console.log(`✅ Found ${response.results.length} results in the database`)

    if (response.results.length > 0) {
      console.log("Sample data from first result:")
      console.log("- ID:", response.results[0].id)
      console.log("- Created time:", response.results[0].created_time)
      console.log("- Last edited time:", response.results[0].last_edited_time)

      // Print property names
      console.log("- Properties:")
      const properties = response.results[0].properties
      Object.keys(properties).forEach((key) => {
        console.log(`  - ${key} (${properties[key].type})`)
      })
    }

    console.log("\n✅ Notion API test completed successfully")
  } catch (error) {
    console.error("❌ Error connecting to Notion API:", error.message)

    if (error.code === "unauthorized") {
      console.error("  This usually means your NOTION_API_KEY is invalid or has expired")
    } else if (error.code === "object_not_found") {
      console.error("  This usually means your POST_DATABASE_ID is invalid or you don't have access to it")
    }

    console.error("\nFull error:", error)
  }
}

testNotionConnection()

