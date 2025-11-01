"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Clock } from "lucide-react"

interface MarketCardProps {
  market: {
    id: number
    title: string
    category: string
    totalVolume: string
    participants: number
    odds: { yes: number; no: number }
    endDate: string
    trending: boolean
  }
  index: number
}

export function MarketCard({ market, index }: MarketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="glass-card border-border hover:glass-card-hover transition-all h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
              {market.category}
            </Badge>
            <div className="flex items-center space-x-2">
              {market.trending && (
                <Badge className="bg-danger/20 text-danger border-danger/30 animate-pulse-glow">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Hot
                </Badge>
              )}
              <div className="flex items-center text-text-secondary text-sm">
                <Users className="w-4 h-4 mr-1" />
                {market.participants}
              </div>
            </div>
          </div>
          <CardTitle className="text-text-primary text-lg leading-tight mb-2">
            {market.title}
          </CardTitle>
          <CardDescription className="text-text-secondary flex items-center text-sm">
            <Clock className="w-3 h-3 mr-1" />
            Ends: {market.endDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary text-sm">Total Volume</span>
              <span className="text-primary font-bold">{market.totalVolume}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <motion.div 
                className="bg-success/20 border border-success/30 rounded-xl p-4 text-center cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-success font-bold text-sm mb-1">YES</div>
                <div className="text-text-primary text-xl font-bold">
                  {(market.odds.yes * 100).toFixed(0)}%
                </div>
              </motion.div>
              <motion.div 
                className="bg-danger/20 border border-danger/30 rounded-xl p-4 text-center cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-danger font-bold text-sm mb-1">NO</div>
                <div className="text-text-primary text-xl font-bold">
                  {(market.odds.no * 100).toFixed(0)}%
                </div>
              </motion.div>
            </div>
            <Link href={`/markets/${market.id}`}>
              <Button className="w-full gradient-primary hover-glow-intense font-semibold py-6">
                Place Bet
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}