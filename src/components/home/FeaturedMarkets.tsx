"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { MarketCard } from "./MarketCard"

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

interface Category {
  id: string
  name: string
  icon: LucideIcon
  color: string
}

interface FeaturedMarketsProps {
  markets: Market[]
  categories: Category[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function FeaturedMarkets({ markets, categories, activeCategory, onCategoryChange }: FeaturedMarketsProps) {
  const filteredMarkets = activeCategory === "all"
    ? markets
    : markets.filter((m) => m.category.toLowerCase() === activeCategory)

  return (
    <section className="py-24 px-4 bg-background-card/30">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-xl text-text-primary mb-4">Featured Markets</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Trending prediction markets with high activity
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="max-w-6xl mx-auto" onValueChange={onCategoryChange}>
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 mb-10 bg-background-card/50 p-1.5 rounded-2xl">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="text-xs md:text-sm rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map((market, index) => (
                <MarketCard key={market.id} market={market} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/markets">
            <Button size="lg" variant="outline" className="border-border text-text-secondary hover:bg-background-card hover-lift px-8 py-6">
              View All Markets
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}