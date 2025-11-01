"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: LucideIcon
  color: string
}

interface CategoryShowcaseProps {
  categories: Category[]
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section className="py-24 px-4 bg-background-card/30">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-xl text-text-primary mb-4">Explore Categories</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Predict outcomes across diverse markets
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.slice(1).map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                className="glass-card p-7 text-center hover-lift cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.08, y: -5 }}
              >
                <motion.div 
                  className={`w-18 h-18 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-9 h-9 text-white" />
                </motion.div>
                <h3 className="text-text-primary font-semibold text-base">{category.name}</h3>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}