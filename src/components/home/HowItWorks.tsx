"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

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
            <motion.div 
              key={step.number} 
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
          ))}
        </div>
      </div>
    </section>
  )
}