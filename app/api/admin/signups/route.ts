import { NextResponse } from "next/server"

// In a real app, this would connect to a database
// For demo purposes, we'll return mock data
export async function GET() {
  try {
    // This would typically fetch from your database
    // For now, returning empty array since we don't have persistent storage
    const signups = []

    return NextResponse.json({
      signups,
      total: signups.length,
    })
  } catch (error) {
    console.error("Failed to fetch signups:", error)
    return NextResponse.json({ error: "Failed to fetch signups" }, { status: 500 })
  }
}
