import { NextResponse } from "next/server"
import { getWaitlistStats } from "@/lib/waitlist-store"

export async function GET() {
  try {
    const stats = getWaitlistStats()
    return NextResponse.json({
      entries: stats.entries,
      total: stats.totalSignups,
    })
  } catch (error) {
    console.error("Error fetching waitlist data:", error)
    return NextResponse.json(
      {
        entries: [],
        total: 0,
        error: "Failed to fetch waitlist data",
      },
      { status: 500 },
    )
  }
}
