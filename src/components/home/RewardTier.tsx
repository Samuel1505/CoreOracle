"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface RewardTierProps {
  tier: {
    tier: string
    min: string
    icon: LucideIcon
    color: string
  }
  index: number
}

export function RewardTier({ tier, index }: RewardTierProps) {
  const Icon = tier.icon

  return (
    <motion.div 
      className="glass-card p-5 hover-lift cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, x: 10 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div 
            className={`w-14 h-14 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center shadow-lg`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h3 className="text-text-primary font-bold text-lg">{tier.tier} Tier</h3>
            <p className="text-text-secondary text-sm">{tier.min}+ CORE earned</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-text-secondary" />
      </div>
    </motion.div>
  )
}