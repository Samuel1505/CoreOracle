import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { TrendingUp } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-card/50 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">CoreOracle</span>
            </div>
            <p className="text-text-secondary text-sm">
              The leading decentralized prediction market on Core Blockchain
            </p>
          </div>
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Markets</h4>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li><Link href="/markets" className="hover:text-text-primary transition-colors">All Markets</Link></li>
              <li><Link href="/markets?category=crypto" className="hover:text-text-primary transition-colors">Crypto</Link></li>
              <li><Link href="/markets?category=sports" className="hover:text-text-primary transition-colors">Sports</Link></li>
              <li><Link href="/markets?category=finance" className="hover:text-text-primary transition-colors">Finance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li><Link href="/docs" className="hover:text-text-primary transition-colors">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-text-primary transition-colors">API</Link></li>
              <li><Link href="/blog" className="hover:text-text-primary transition-colors">Blog</Link></li>
              <li><Link href="/support" className="hover:text-text-primary transition-colors">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li><a href="#" className="hover:text-text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Telegram</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Medium</a></li>
            </ul>
          </div>
        </div>
        <Separator className="mb-8 bg-border" />
        <div className="flex flex-col md:flex-row items-center justify-between text-text-secondary text-sm">
          <p>&copy; 2024 CoreOracle. Built on Core Blockchain.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}