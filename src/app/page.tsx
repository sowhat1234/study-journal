import { auth } from "@/auth"
import { LoginButton } from "@/components/login-button"
import { Sidebar } from "@/components/sidebar"
import { getGoogleAuth } from "@/lib/google"
import { google } from "googleapis"
import { DashboardWidgets } from "@/components/dashboard-widgets"

export default async function Page() {
  const session = await auth()

  if (!session?.user) {
    return <LoginButton />
  }

  // Fetch data
  let calendarEvents: any[] = []
  let emails: any[] = []

  try {
      if (session.user.id) {
        const authClient = await getGoogleAuth(session.user.id)
        
        // Fetch Calendar
        const calendar = google.calendar({ version: 'v3', auth: authClient })
        const now = new Date()
        const calRes = await calendar.events.list({
            calendarId: 'primary',
            timeMin: now.toISOString(),
            maxResults: 5,
            singleEvents: true,
            orderBy: 'startTime',
        })
        calendarEvents = calRes.data.items || []

        // Fetch Gmail
        const gmail = google.gmail({ version: 'v1', auth: authClient })
        const gmailRes = await gmail.users.messages.list({
            userId: 'me',
            q: 'is:unread',
            maxResults: 5,
        })
        const messages = gmailRes.data.messages || []
        
        const subjects = await Promise.all(messages.map(async (msg) => {
            if (!msg.id) return null
            try {
                const detail = await gmail.users.messages.get({
                    userId: 'me',
                    id: msg.id
                })
                const headers = detail.data.payload?.headers
                const subject = headers?.find(h => h.name === 'Subject')?.value
                return { id: msg.id, subject: subject || "(No Subject)" }
            } catch (e) {
                return null
            }
        }))
        emails = subjects.filter(Boolean)
      }

  } catch (e) {
      console.error("Error fetching google data", e)
  }

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="mb-8 text-3xl font-bold">Welcome back, {session.user.name?.split(' ')[0]}</h1>
        <DashboardWidgets calendarEvents={calendarEvents} emails={emails} />
      </main>
    </div>
  )
}
