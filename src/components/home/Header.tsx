import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-background-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-text-primary heading-md">CoreOracle</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/markets" className="text-text-secondary hover:text-text-primary transition-colors">
            Markets
          </Link>
          <Link href="/dashboard" className="text-text-secondary hover:text-text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/leaderboard" className="text-text-secondary hover:text-text-primary transition-colors">
            Leaderboard
          </Link>
        </nav>
        <appkit-button />
      </div>
    </header>
  )
}