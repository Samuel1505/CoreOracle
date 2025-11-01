"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

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
            <motion.div 
              key={index} 
              className="glass-card p-7 hover-lift"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center space-x-4 mb-5">
                <Avatar className="w-14 h-14 ring-2 ring-primary/30">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.user} />
                  <AvatarFallback>{testimonial.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-text-primary font-bold">{testimonial.user}</p>
                  <p className="text-text-secondary text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-warning fill-warning" />
                ))}
              </div>
              <p className="text-text-secondary mb-5 italic leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <span className="text-text-secondary text-sm font-medium">Total Earned</span>
                <span className="text-primary font-bold text-lg">{testimonial.earnings}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}