"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StepCardProps {
  step: {
    number: number
    title: string
    description: string
    icon: LucideIcon
  }
  index: number
}

export function StepCard({ step, index }: StepCardProps) {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <motion.div 
        className="glass-card p-8 text-center hover-lift relative z-10"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div 
          className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 relative"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <step.icon className="w-12 h-12 text-white" />
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg">
            {step.number}
          </div>
        </motion.div>
        <h3 className="heading-md text-text-primary mb-3">{step.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
      </motion.div>
    </motion.div>
  )
}