import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Clock, Users } from "lucide-react"
import Link from "next/link"

type MarketCardProps = {
  id: number
  title: string
  category: string
  totalVolume: string
  participants: number
  odds: { yes: number; no: number }
  endDate: string
  timeLeft: string
  status: string
}

export function MarketCard({ 
  id, 
  title, 
  category, 
  totalVolume, 
  participants, 
  odds, 
  endDate, 
  timeLeft,
  status 
}: MarketCardProps) {
  const isResolved = status === "resolved"
  const badgeColor = isResolved ? "bg-blue-600/20 text-blue-300" : "bg-purple-600/20 text-purple-300"
  
  return (
    <Card className="glass-card hover-lift transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className={badgeColor}>
            {category}
          </Badge>
          <div className="flex items-center text-slate-400 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {isResolved ? "Resolved" : timeLeft}
          </div>
        </div>
        <CardTitle className="text-white text-lg leading-tight group-hover:text-purple-300 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-400">Ends: {endDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-slate-300 text-sm">
              <Users className="w-4 h-4 mr-1" />
              {participants} participants
            </div>
            <span className="text-white font-semibold">{totalVolume}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3 text-center transition-all group-hover:bg-green-600/30">
              <div className="text-green-400 font-semibold text-sm">YES</div>
              <div className="text-white text-lg font-bold">{(odds.yes * 100).toFixed(0)}%</div>
            </div>
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3 text-center transition-all group-hover:bg-red-600/30">
              <div className="text-red-400 font-semibold text-sm">NO</div>
              <div className="text-white text-lg font-bold">{(odds.no * 100).toFixed(0)}%</div>
            </div>
          </div>
          <Link href={`/markets/${id}`}>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-all">
              {isResolved ? "View Details" : "Place Bet"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}