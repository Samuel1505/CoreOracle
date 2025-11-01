"use client"

import { motion } from "framer-motion"
import { DollarSign, Users, BarChart, Target, TrendingUp, CheckCircle } from "lucide-react"

export function PlatformStats() {
  const stats = [
    {
      icon: DollarSign,
      value: "$2.4M",
      label: "Total Volume",
      trend: "+12.5% this week",
      color: "text-primary"
    },
    {
      icon: Users,
      value: "15.4K",
      label: "Active Users",
      trend: "+8.3% this week",
      color: "text-secondary"
    },
    {
      icon: BarChart,
      value: "847",
      label: "Markets Created",
      trend: "+15 today",
      color: "text-accent"
    },
    {
      icon: Target,
      value: "94.2%",
      label: "Accuracy Rate",
      trend: "Top performers",
      color: "text-warning",
      trendIcon: CheckCircle
    }
  ]

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-xl text-text-primary mb-4">Platform Statistics</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Join thousands of predictors worldwide
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const TrendIcon = stat.trendIcon || TrendingUp
            return (
              <motion.div 
                key={index}
                className="glass-card-intense p-10 text-center hover-lift"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className={`w-14 h-14 ${stat.color} mx-auto mb-5`} />
                <div className="text-5xl font-bold text-text-primary mb-3 gradient-text">{stat.value}</div>
                <div className="text-text-secondary font-medium mb-3">{stat.label}</div>
                <div className="flex items-center justify-center text-success text-sm font-semibold">
                  <TrendIcon className="w-4 h-4 mr-1" />
                  {stat.trend}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}