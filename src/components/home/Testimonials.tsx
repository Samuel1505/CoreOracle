"use client"

import { motion } from "framer-motion"
import { TestimonialCard } from "./TestimonialCard"

interface Testimonial {
  user: string
  avatar: string
  role: string
  content: string
  earnings: string
  rating: number
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
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
          <h2 className="heading-xl text-text-primary mb-4">Success Stories</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Hear from our top predictors
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}