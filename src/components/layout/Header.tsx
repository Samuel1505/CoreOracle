import { TrendingUp, Wallet } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">CoreOracle</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/markets" className="text-slate-300 hover:text-white transition-colors">
            Markets
          </Link>
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/leaderboard" className="text-slate-300 hover:text-white transition-colors">
            Leaderboard
          </Link>
        </nav>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Wallet className="w-4 h-4 mr-2" />
          Connected
        </Button>
      </div>
    </header>
  )
}