"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Clock, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

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
                <motion.div
                  key={market.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-card border-border hover:glass-card-hover transition-all h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">{market.category}</Badge>
                        <div className="flex items-center space-x-2">
                          {market.trending && (
                            <Badge className="bg-danger/20 text-danger border-danger/30 animate-pulse-glow">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                          <div className="flex items-center text-text-secondary text-sm">
                            <Users className="w-4 h-4 mr-1" />
                            {market.participants}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-text-primary text-lg leading-tight mb-2">{market.title}</CardTitle>
                      <CardDescription className="text-text-secondary flex items-center text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        Ends: {market.endDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-text-secondary text-sm">Total Volume</span>
                          <span className="text-primary font-bold">{market.totalVolume}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <motion.div 
                            className="bg-success/20 border border-success/30 rounded-xl p-4 text-center cursor-pointer"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-success font-bold text-sm mb-1">YES</div>
                            <div className="text-text-primary text-xl font-bold">{(market.odds.yes * 100).toFixed(0)}%</div>
                          </motion.div>
                          <motion.div 
                            className="bg-danger/20 border border-danger/30 rounded-xl p-4 text-center cursor-pointer"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-danger font-bold text-sm mb-1">NO</div>
                            <div className="text-text-primary text-xl font-bold">{(market.odds.no * 100).toFixed(0)}%</div>
                          </motion.div>
                        </div>
                        <Link href={`/markets/${market.id}`}>
                          <Button className="w-full gradient-primary hover-glow-intense font-semibold py-6">Place Bet</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
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