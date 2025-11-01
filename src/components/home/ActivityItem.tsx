"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy } from "lucide-react"

interface ActivityItemProps {
  activity: {
    user: string
    avatar: string
    action: string
    market: string
    amount: string
    time: string
    outcome: string
  }
  index: number
}

export function ActivityItem({ activity, index }: ActivityItemProps) {
  return (
    <motion.div 
      className="glass-card p-5 hover-lift"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-11 h-11 ring-2 ring-primary/20">
            <AvatarImage src={activity.avatar} alt={activity.user} />
            <AvatarFallback>{activity.user[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-text-primary font-semibold text-sm">{activity.user}</p>
            <p className="text-text-secondary text-xs">{activity.time}</p>
          </div>
        </div>
        {activity.outcome === "won" && (
          <Badge className="bg-success/20 text-success border-success/30 animate-pulse-glow">
            <Trophy className="w-3 h-3 mr-1" />
            Won
          </Badge>
        )}
      </div>
      <div className="mt-4 pl-14">
        <p className="text-text-secondary text-sm">
          {activity.action} on <span className="text-text-primary font-semibold">{activity.market}</span>
        </p>
        <p className="text-primary font-bold text-sm mt-1">{activity.amount}</p>
      </div>
    </motion.div>
  )
}