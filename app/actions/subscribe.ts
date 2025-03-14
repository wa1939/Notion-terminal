"use server"

export async function subscribeToNewsletter(email: string) {
  try {
    const response = await fetch(
      "https://chilipepper.io/form/xhot-burntorange-bannapepper-bd77d157-c186-4b9b-9e39-920efb45f22a",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    )

    if (!response.ok) {
      throw new Error("Subscription failed")
    }

    return { success: true }
  } catch (error) {
    console.error("Subscription error:", error)
    return { success: false, error: "Subscription failed. Please try again." }
  }
}

