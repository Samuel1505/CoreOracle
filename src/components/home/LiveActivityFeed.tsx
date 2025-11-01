"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"
import { ActivityItem } from "./ActivityItem"

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
            <ActivityItem key={index} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}