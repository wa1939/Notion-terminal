console.log("Checking environment variables...")

const requiredVars = [
  "NOTION_API_KEY",
  "POST_DATABASE_ID",
  "SETTING_DATABASE_ID",
  "NAVIGATION_DATABASE_ID",
  "NEXT_PUBLIC_GISCUS_REPO",
  "NEXT_PUBLIC_GISCUS_REPO_ID",
  "NEXT_PUBLIC_GISCUS_CATEGORY",
  "NEXT_PUBLIC_GISCUS_CATEGORY_ID",
]

let allPresent = true

requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Missing environment variable: ${varName}`)
    allPresent = false
  } else {
    console.log(`✅ Found environment variable: ${varName}`)
  }
})

if (allPresent) {
  console.log("All required environment variables are set!")
} else {
  console.error("Some required environment variables are missing. Please check your .env.local file.")
}

