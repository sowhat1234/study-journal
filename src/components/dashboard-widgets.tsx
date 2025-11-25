"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardWidgets({ calendarEvents, emails }: { calendarEvents: any[], emails: any[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
                {calendarEvents.length === 0 ? (
                    <p className="text-muted-foreground">No upcoming events.</p>
                ) : (
                    <ul className="space-y-2">
                        {calendarEvents.map((event: any) => (
                            <li key={event.id} className="border-b pb-2 last:border-0 last:pb-0">
                                <div className="font-medium truncate">{event.summary}</div>
                                <div className="text-xs text-muted-foreground">
                                    {event.start?.dateTime 
                                        ? new Date(event.start.dateTime).toLocaleString() 
                                        : event.start?.date}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Unread Emails</CardTitle>
            </CardHeader>
             <CardContent>
                {emails.length === 0 ? (
                    <p className="text-muted-foreground">No unread emails.</p>
                ) : (
                    <ul className="space-y-2">
                        {emails.map((email: any) => (
                            <li key={email.id} className="truncate border-b pb-2 last:border-0 last:pb-0">
                                {email.subject}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Focus Timer</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="text-4xl font-bold tabular-nums">25:00</div>
                    <div className="text-sm text-muted-foreground">Ready to focus?</div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
