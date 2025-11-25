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
    const gmail = google.gmail({ version: 'v1', auth: authClient })

    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread',
      maxResults: 5,
    })

    const messages = response.data.messages || []
    
    const subjects = await Promise.all(messages.map(async (msg) => {
        if (!msg.id) return null
        const detail = await gmail.users.messages.get({
            userId: 'me',
            id: msg.id
        })
        const headers = detail.data.payload?.headers
        const subject = headers?.find(h => h.name === 'Subject')?.value
        return { id: msg.id, subject: subject || "(No Subject)" }
    }))

    return NextResponse.json(subjects.filter(Boolean))
  } catch (error) {
    console.error("Gmail API Error:", error)
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 })
  }
}
