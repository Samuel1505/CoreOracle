import { TrendingUp } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

interface EmptyStateProps {
  title?: string
  description?: string
  showCreateButton?: boolean
}

export function EmptyState({ 
  title = "No Markets Found", 
  description = "There are no prediction markets matching your criteria.",
  showCreateButton = true 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center mb-6">
        <TrendingUp className="w-10 h-10 text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-center mb-6 max-w-md">{description}</p>
      {showCreateButton && (
        <Link href="/markets">
          <Button className="bg-purple-600 hover:bg-purple-700">
            View All Markets
          </Button>
        </Link>
      )}
    </div>
  )
}