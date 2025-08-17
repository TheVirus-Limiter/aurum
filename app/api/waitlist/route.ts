import { type NextRequest, NextResponse } from "next/server"
import { addWaitlistEntry, findWaitlistEntry, getWaitlistStats } from "@/lib/waitlist-store"

export async function POST(request: NextRequest) {
  try {
    const { email, whoAreYou, ageRange } = await request.json()

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Check if email already exists
    const existingEntry = findWaitlistEntry(email)
    if (existingEntry) {
      return NextResponse.json({ error: "This email is already on our waitlist" }, { status: 409 })
    }

    // Add to waitlist
    const newEntry = addWaitlistEntry({
      email: email.toLowerCase(),
      whoAreYou: whoAreYou || undefined,
      ageRange: ageRange || undefined,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
    })

    try {
      const emailData = {
        to: "rehanraj102928390@gmail.com",
        subject: "New Aurum Sleep Waitlist Signup",
        html: `
          <h2>New Aurum Sleep Waitlist Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Who are you:</strong> ${whoAreYou || "Not specified"}</p>
          <p><strong>Age range:</strong> ${ageRange || "Not specified"}</p>
          <p><strong>Position in line:</strong> #${newEntry.position}</p>
          <p><strong>Signup time:</strong> ${new Date(newEntry.timestamp).toLocaleString()}</p>
          <p><strong>Total signups:</strong> ${getWaitlistStats().totalSignups}</p>
        `,
      }

      // Use Formspree (free service, no API key needed)
      const emailResponse = await fetch("https://formspree.io/f/xdkogkpv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      if (emailResponse.ok) {
        console.log("[Aurum Sleep] Email notification sent successfully")
      } else {
        console.log("[Aurum Sleep] Email service response:", await emailResponse.text())
      }
    } catch (emailError) {
      console.log("[Aurum Sleep] Email notification failed:", emailError)
    }

    // Log for demo purposes
    console.log(`[Aurum Sleep Waitlist] New signup: ${email} at ${newEntry.timestamp}`)
    console.log(`[Aurum Sleep Waitlist] Total signups: ${getWaitlistStats().totalSignups}`)

    return NextResponse.json(
      {
        message: "Successfully joined the waitlist!",
        position: newEntry.position,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[Aurum Sleep Waitlist] Error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(getWaitlistStats())
}
