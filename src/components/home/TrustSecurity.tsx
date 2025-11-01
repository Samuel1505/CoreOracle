"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Lock, CheckCircle, Shield } from "lucide-react"

export function TrustSecurity() {
  const features = [
    {
      icon: Lock,
      title: "Smart Contract Security",
      description: "Audited by leading security firms with multi-sig protection",
    },
    {
      icon: CheckCircle,
      title: "Decentralized Oracle",
      description: "Fair market resolution using verified data sources",
    },
    {
      icon: Shield,
      title: "Non-Custodial",
      description: "You always maintain control of your funds",
    },
  ]

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
          <Badge className="mb-4 bg-success/20 text-success border-success/30 animate-pulse-glow px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Secure & Transparent
          </Badge>
          <h2 className="heading-xl text-text-primary mb-4">Built on Trust</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Your security is our priority
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div 
                key={index} 
                className="glass-card p-10 text-center hover-lift"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-7 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="heading-md text-text-primary mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}