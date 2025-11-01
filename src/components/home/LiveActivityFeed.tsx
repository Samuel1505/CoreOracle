"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Activity, Trophy } from "lucide-react"

interface ActivityItem {
  user: string
  avatar: string
  action: string
  market: string
  amount: string
  time: string
  outcome: string
}

interface LiveActivityFeedProps {
  liveActivity: ActivityItem[]
}

export function LiveActivityFeed({ liveActivity }: LiveActivityFeedProps) {
  return (
    <section className="py-20 px-4 bg-background-card/30">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-success/20 text-success border-success/30 animate-pulse-glow">
            <Activity className="w-4 h-4 mr-2 animate-pulse-slow" />
            Live Activity
          </Badge>
          <h2 className="heading-xl text-text-primary mb-4">Real-Time Predictions</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            See what other predictors are doing right now
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {liveActivity.map((activity, index) => (
            <motion.div 
              key={index} 
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
          ))}
        </div>
      </div>
    </section>
  )
}