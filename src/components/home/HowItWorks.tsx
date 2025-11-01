"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { StepCard } from "./StepCard"

interface Step {
  number: number
  title: string
  description: string
  icon: LucideIcon
}

interface HowItWorksProps {
  steps: Step[]
}

export function HowItWorks({ steps }: HowItWorksProps) {
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
          <h2 className="heading-xl text-text-primary mb-4">How It Works</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Get started in 4 simple steps
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 rounded-full"></div>

          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}