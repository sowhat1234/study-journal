import Link from "next/link"
import { Home, Calendar, Mail, BookOpen } from "lucide-react"

const links = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Email", href: "/email", icon: Mail },
  { name: "Journal", href: "/journal", icon: BookOpen },
]

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card px-4 py-8">
      <div className="mb-8 px-4 text-2xl font-bold text-primary">Deep Work</div>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <link.icon className="h-5 w-5" />
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
