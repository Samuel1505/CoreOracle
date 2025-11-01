"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  testimonial: {
    user: string
    avatar: string
    role: string
    content: string
    earnings: string
    rating: number
  }
  index: number
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div 
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
  )
}