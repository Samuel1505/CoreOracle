"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

interface Market {
  id: number
  title: string
  category: string
  totalVolume: string
  participants: number
  odds: { yes: number; no: number }
  endDate: string
  trending: boolean
}

interface HeroSectionProps {
  featuredMarkets: Market[]
}

export function HeroSection({ featuredMarkets }: HeroSectionProps) {
  return (
    <section className="relative py-40 px-4 overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 opacity-40">
        <motion.div 
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-accent rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="mb-8 bg-primary/20 text-primary border-primary/30 px-5 py-2.5 text-sm animate-pulse-glow">
              <Sparkles className="w-4 h-4 mr-2" />
              Built on Core Blockchain
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="heading-hero text-text-primary mb-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Predict. Compete.
            <br />
            <span className="gradient-text">Earn Rewards.</span>
          </motion.h1>
          
          <motion.p 
            className="body-lg text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Join the most advanced decentralized prediction market on Core Blockchain. Make predictions on crypto,
            sports, finance, and more. Earn CORE tokens for accurate predictions and build your winning streak.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/markets">
              <Button size="lg" className="gradient-primary text-lg px-10 py-7 hover-glow-intense font-semibold">
                Launch App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 border-border text-text-secondary hover:bg-background-card bg-transparent hover-lift"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Preview Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featuredMarkets.slice(0, 3).map((market, index) => (
            <motion.div
              key={market.id}
              className="glass-card p-5 hover-lift cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.15 }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">{market.category}</Badge>
              <p className="text-text-primary text-sm font-semibold mb-4 line-clamp-2 leading-tight">{market.title}</p>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Volume</span>
                <span className="text-primary font-bold">{market.totalVolume}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}