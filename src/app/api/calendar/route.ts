import { auth } from "@/auth"
import { getGoogleAuth } from "@/lib/google"
import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const authClient = await getGoogleAuth(session.user.id)
    const calendar = google.calendar({ version: 'v3', auth: authClient })

    const now = new Date()
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    })

    return NextResponse.json(response.data.items)
  } catch (error) {
    console.error("Calendar API Error:", error)
    return NextResponse.json({ error: "Failed to fetch calendar" }, { status: 500 })
  }
}
