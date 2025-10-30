"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  Users,
  Trophy,
  Shield,
  ArrowRight,
  Wallet,
  Zap,
  Target,
  DollarSign,
  BarChart,
  Lock,
  CheckCircle,
  Star,
  Award,
  Coins,
  Activity,
  Globe,
  Briefcase,
  Film,
  Cpu,
  ChevronRight,
  ChevronDown,
  Clock,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const featuredMarkets = [
    {
      id: 1,
      title: "Bitcoin Price Above $100,000 by End of 2024",
      category: "Crypto",
      totalVolume: "2,450 CORE",
      participants: 156,
      odds: { yes: 0.65, no: 0.35 },
      endDate: "Dec 31, 2024",
      trending: true,
    },
    {
      id: 2,
      title: "Manchester City to Win Premier League 2024/25",
      category: "Sports",
      totalVolume: "1,890 CORE",
      participants: 203,
      odds: { yes: 0.72, no: 0.28 },
      endDate: "May 25, 2025",
      trending: false,
    },
    {
      id: 3,
      title: "US Federal Reserve to Cut Rates in Q1 2025",
      category: "Finance",
      totalVolume: "3,120 CORE",
      participants: 89,
      odds: { yes: 0.58, no: 0.42 },
      endDate: "Mar 31, 2025",
      trending: true,
    },
    {
      id: 4,
      title: "Ethereum 2.0 Staking Rewards Above 5% in 2025",
      category: "Crypto",
      totalVolume: "1,650 CORE",
      participants: 124,
      odds: { yes: 0.48, no: 0.52 },
      endDate: "Dec 31, 2025",
      trending: false,
    },
    {
      id: 5,
      title: "Tesla Stock Price Above $300 by Q2 2025",
      category: "Finance",
      totalVolume: "2,890 CORE",
      participants: 178,
      odds: { yes: 0.55, no: 0.45 },
      endDate: "Jun 30, 2025",
      trending: true,
    },
    {
      id: 6,
      title: "Real Madrid to Win Champions League 2024/25",
      category: "Sports",
      totalVolume: "2,120 CORE",
      participants: 145,
      odds: { yes: 0.62, no: 0.38 },
      endDate: "May 31, 2025",
      trending: false,
    },
  ]

  const categories = [
    { id: "all", name: "All Markets", icon: Globe, color: "from-purple-500 to-blue-500" },
    { id: "crypto", name: "Crypto", icon: Coins, color: "from-orange-500 to-yellow-500" },
    { id: "sports", name: "Sports", icon: Trophy, color: "from-green-500 to-emerald-500" },
    { id: "finance", name: "Finance", icon: Briefcase, color: "from-blue-500 to-cyan-500" },
    { id: "politics", name: "Politics", icon: Users, color: "from-red-500 to-pink-500" },
    { id: "entertainment", name: "Entertainment", icon: Film, color: "from-purple-500 to-pink-500" },
    { id: "technology", name: "Technology", icon: Cpu, color: "from-cyan-500 to-blue-500" },
  ]

  const liveActivity = [
    {
      user: "CryptoWhale",
      avatar: "https://i.pravatar.cc/150?img=1",
      action: "predicted YES",
      market: "Bitcoin $100K",
      amount: "250 CORE",
      time: "2m ago",
      outcome: "pending",
    },
    {
      user: "SportsFan",
      avatar: "https://i.pravatar.cc/150?img=2",
      action: "won",
      market: "Premier League",
      amount: "180 CORE",
      time: "5m ago",
      outcome: "won",
    },
    {
      user: "TradeMaster",
      avatar: "https://i.pravatar.cc/150?img=3",
      action: "predicted NO",
      market: "Fed Rate Cut",
      amount: "320 CORE",
      time: "8m ago",
      outcome: "pending",
    },
    {
      user: "OracleKing",
      avatar: "https://i.pravatar.cc/150?img=4",
      action: "won",
      market: "ETH Staking",
      amount: "450 CORE",
      time: "12m ago",
      outcome: "won",
    },
  ]

  const howItWorksSteps = [
    {
      number: 1,
      title: "Connect Wallet",
      description: "Link your Web3 wallet to get started on CoreOracle",
      icon: Wallet,
    },
    {
      number: 2,
      title: "Browse Markets",
      description: "Explore prediction markets across multiple categories",
      icon: Target,
    },
    {
      number: 3,
      title: "Make Prediction",
      description: "Place your bet on YES or NO outcomes with CORE tokens",
      icon: Zap,
    },
    {
      number: 4,
      title: "Earn Rewards",
      description: "Win CORE tokens for accurate predictions and climb the leaderboard",
      icon: Trophy,
    },
  ]

  const leaderboard = [
    { rank: 1, user: "PredictionMaster", avatar: "https://i.pravatar.cc/150?img=5", earnings: "12,450 CORE", accuracy: "94.2%" },
    { rank: 2, user: "OracleQueen", avatar: "https://i.pravatar.cc/150?img=6", earnings: "10,890 CORE", accuracy: "92.8%" },
    { rank: 3, user: "CryptoSage", avatar: "https://i.pravatar.cc/150?img=7", earnings: "9,320 CORE", accuracy: "91.5%" },
    { rank: 4, user: "MarketGuru", avatar: "https://i.pravatar.cc/150?img=8", earnings: "8,750 CORE", accuracy: "90.3%" },
    { rank: 5, user: "FutureTeller", avatar: "https://i.pravatar.cc/150?img=9", earnings: "7,890 CORE", accuracy: "89.7%" },
  ]

  const testimonials = [
    {
      user: "Alex Thompson",
      avatar: "https://i.pravatar.cc/150?img=10",
      role: "Crypto Trader",
      content: "CoreOracle has transformed how I engage with prediction markets. The transparency and rewards are unmatched!",
      earnings: "5,200 CORE",
      rating: 5,
    },
    {
      user: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=11",
      role: "Sports Analyst",
      content: "I've been using CoreOracle for 6 months and my accuracy has improved significantly. The community is amazing!",
      earnings: "4,800 CORE",
      rating: 5,
    },
    {
      user: "Michael Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=12",
      role: "Finance Professional",
      content: "The best prediction market platform I've used. Smart contracts ensure everything is fair and transparent.",
      earnings: "6,100 CORE",
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: "What is CoreOracle?",
      answer: "CoreOracle is a decentralized prediction market platform built on Core Blockchain where users can make predictions on real-world events and earn CORE tokens for accurate predictions.",
    },
    {
      question: "How do I get started?",
      answer: "Simply connect your Web3 wallet, browse available markets, and place your first prediction. You'll need CORE tokens to participate in markets.",
    },
    {
      question: "How are payouts calculated?",
      answer: "Payouts are calculated based on the odds at the time of your prediction and the total pool size. Winners share the pool proportionally to their stake.",
    },
    {
      question: "What fees does CoreOracle charge?",
      answer: "CoreOracle charges a small 2% platform fee on winning predictions. There are no fees for losing predictions or market creation.",
    },
    {
      question: "How is market resolution determined?",
      answer: "Markets are resolved using decentralized oracle networks and verified data sources. The resolution process is transparent and recorded on-chain.",
    },
    {
      question: "Can I create my own markets?",
      answer: "Yes! Users can create custom prediction markets by staking CORE tokens. Market creators earn a percentage of the trading volume.",
    },
  ]

  const filteredMarkets =
    activeCategory === "all"
      ? featuredMarkets
      : featuredMarkets.filter((m) => m.category.toLowerCase() === activeCategory)

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Header */}
      <header className="border-b border-border bg-background-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary heading-md">CoreOracle</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/markets" className="text-text-secondary hover:text-text-primary transition-colors">
              Markets
            </Link>
            <Link href="/dashboard" className="text-text-secondary hover:text-text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-text-secondary hover:text-text-primary transition-colors">
              Leaderboard
            </Link>
          </nav>
          <appkit-button />
        </div>
      </header>

      {/* Hero Section with Animated Background */}
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

      {/* Live Activity Feed */}
      <section className="py-20 px-4 bg-background-card/30">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-success/20 text-success border-success/30 animate-pulse-glow">
              <Activity className="w-4 h-4 mr-2 animate-pulse-slow" />
              Live Activity
            </Badge>
            <h2 className="heading-xl text-text-primary mb-4">Real-Time Predictions</h2>
            <p className="body-lg text-text-secondary max-w-2xl mx-auto">
              See what other predictors are doing right now
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {liveActivity.map((activity, index) => (
              <motion.div 
                key={index} 
                className="glass-card p-5 hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-11 h-11 ring-2 ring-primary/20">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback>{activity.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-text-primary font-semibold text-sm">{activity.user}</p>
                      <p className="text-text-secondary text-xs">{activity.time}</p>
                    </div>
                  </div>
                  {activity.outcome === "won" && (
                    <Badge className="bg-success/20 text-success border-success/30 animate-pulse-glow">
                      <Trophy className="w-3 h-3 mr-1" />
                      Won
                    </Badge>
                  )}
                </div>
                <div className="mt-4 pl-14">
                  <p className="text-text-secondary text-sm">
                    {activity.action} on <span className="text-text-primary font-semibold">{activity.market}</span>
                  </p>
                  <p className="text-primary font-bold text-sm mt-1">{activity.amount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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

            {howItWorksSteps.map((step, index) => (
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

      {/* Market Categories Showcase */}
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

      {/* Enhanced Stats Dashboard */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-xl text-text-primary mb-4">Platform Statistics</h2>
            <p className="body-lg text-text-secondary max-w-2xl mx-auto">
              Join thousands of predictors worldwide
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="glass-card-intense p-10 text-center hover-lift"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ scale: 1.05 }}
            >
              <DollarSign className="w-14 h-14 text-primary mx-auto mb-5" />
              <div className="text-5xl font-bold text-text-primary mb-3 gradient-text">$2.4M</div>
              <div className="text-text-secondary font-medium mb-3">Total Volume</div>
              <div className="flex items-center justify-center text-success text-sm font-semibold">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% this week
              </div>
            </motion.div>
            <motion.div 
              className="glass-card-intense p-10 text-center hover-lift"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-14 h-14 text-secondary mx-auto mb-5" />
              <div className="text-5xl font-bold text-text-primary mb-3 gradient-text">15.4K</div>
              <div className="text-text-secondary font-medium mb-3">Active Users</div>
              <div className="flex items-center justify-center text-success text-sm font-semibold">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.3% this week
              </div>
            </motion.div>
            <motion.div 
              className="glass-card-intense p-10 text-center hover-lift"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <BarChart className="w-14 h-14 text-accent mx-auto mb-5" />
              <div className="text-5xl font-bold text-text-primary mb-3 gradient-text">847</div>
              <div className="text-text-secondary font-medium mb-3">Markets Created</div>
              <div className="flex items-center justify-center text-success text-sm font-semibold">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15 today
              </div>
            </motion.div>
            <motion.div 
              className="glass-card-intense p-10 text-center hover-lift"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Target className="w-14 h-14 text-warning mx-auto mb-5" />
              <div className="text-5xl font-bold text-text-primary mb-3 gradient-text">94.2%</div>
              <div className="text-text-secondary font-medium mb-3">Accuracy Rate</div>
              <div className="flex items-center justify-center text-success text-sm font-semibold">
                <CheckCircle className="w-4 h-4 mr-1" />
                Top performers
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Markets with Filters */}
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

          <Tabs defaultValue="all" className="max-w-6xl mx-auto" onValueChange={setActiveCategory}>
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

      {/* Rewards & Leaderboard Preview */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Rewards */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10">
                <h2 className="heading-lg text-text-primary mb-4">Earn Rewards</h2>
                <p className="text-text-secondary text-lg">
                  Climb the ranks and unlock exclusive rewards
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { tier: "Bronze", min: "0", icon: Award, color: "from-orange-700 to-orange-500" },
                  { tier: "Silver", min: "1,000", icon: Award, color: "from-gray-400 to-gray-300" },
                  { tier: "Gold", min: "5,000", icon: Award, color: "from-yellow-500 to-yellow-300" },
                  { tier: "Platinum", min: "10,000", icon: Award, color: "from-cyan-500 to-blue-500" },
                  { tier: "Diamond", min: "25,000", icon: Award, color: "from-purple-500 to-pink-500" },
                ].map((tier, index) => {
                  const Icon = tier.icon
                  return (
                    <motion.div 
                      key={tier.tier} 
                      className="glass-card p-5 hover-lift cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, x: 10 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <motion.div 
                            className={`w-14 h-14 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center shadow-lg`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-text-primary font-bold text-lg">{tier.tier} Tier</h3>
                            <p className="text-text-secondary text-sm">{tier.min}+ CORE earned</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-text-secondary" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10">
                <h2 className="heading-lg text-text-primary mb-4">Top Predictors</h2>
                <p className="text-text-secondary text-lg">
                  Compete with the best and earn your spot
                </p>
              </div>

              <div className="glass-card-intense p-7">
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <motion.div 
                      key={user.rank} 
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-background-card/50 transition-all cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.6)" }}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base shadow-lg ${
                            user.rank === 1 ? "bg-gradient-to-br from-yellow-500 to-yellow-300 text-white" :
                            user.rank === 2 ? "bg-gradient-to-br from-gray-400 to-gray-300 text-white" :
                            user.rank === 3 ? "bg-gradient-to-br from-orange-700 to-orange-500 text-white" :
                            "bg-background-card text-text-secondary"
                          }`}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.4 }}
                        >
                          {user.rank}
                        </motion.div>
                        <Avatar className="w-11 h-11 ring-2 ring-primary/20">
                          <AvatarImage src={user.avatar} alt={user.user} />
                          <AvatarFallback>{user.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-text-primary font-bold">{user.user}</p>
                          <p className="text-text-secondary text-sm">{user.accuracy} accuracy</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-primary font-bold text-lg">{user.earnings}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Link href="/leaderboard">
                  <Button className="w-full mt-8 gradient-primary hover-glow-intense font-semibold py-6 text-base">
                    View Full Leaderboard
                    <Trophy className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
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
            {[
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
            ].map((feature, index) => {
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

      {/* Success Stories Carousel */}
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

      {/* Community & Social Proof */}
      <section className="py-20 px-4 bg-background-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-xl text-text-primary mb-4">Join Our Community</h2>
            <p className="body-lg text-text-secondary max-w-2xl mx-auto">
              Connect with thousands of predictors worldwide
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { platform: "Discord", members: "12.5K", icon: Users },
              { platform: "Twitter", followers: "25.3K", icon: Activity },
              { platform: "Telegram", members: "8.9K", icon: Users },
              { platform: "Medium", readers: "15.2K", icon: Globe },
            ].map((social, index) => {
              const Icon = social.icon
              return (
                <div key={index} className="glass-card p-6 text-center hover-lift cursor-pointer">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-text-primary font-bold text-xl mb-1">{social.members}</p>
                  <p className="text-text-secondary text-sm">{social.platform}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-xl text-text-primary mb-4">Frequently Asked Questions</h2>
            <p className="body-lg text-text-secondary max-w-2xl mx-auto">
              Everything you need to know about CoreOracle
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card overflow-hidden">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-background-card/50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="text-text-primary font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-secondary transition-transform ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <Separator className="mb-4 bg-border" />
                    <p className="text-text-secondary">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="heading-xl text-text-primary mb-6">Ready to Start Predicting?</h2>
          <p className="body-lg text-text-secondary mb-10 max-w-2xl mx-auto">
            Join thousands of users earning rewards for accurate predictions on CoreOracle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/markets">
              <Button size="lg" className="gradient-primary text-lg px-10 py-6 hover-glow">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 border-border text-text-secondary hover:bg-background-card bg-transparent"
              >
                View Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-text-secondary">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-success mr-2" />
              <span>No KYC Required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-success mr-2" />
              <span>Instant Payouts</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-success mr-2" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-text-primary">CoreOracle</span>
              </div>
              <p className="text-text-secondary text-sm">
                The leading decentralized prediction market on Core Blockchain
              </p>
            </div>
            <div>
              <h4 className="text-text-primary font-semibold mb-4">Markets</h4>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li><Link href="/markets" className="hover:text-text-primary transition-colors">All Markets</Link></li>
                <li><Link href="/markets?category=crypto" className="hover:text-text-primary transition-colors">Crypto</Link></li>
                <li><Link href="/markets?category=sports" className="hover:text-text-primary transition-colors">Sports</Link></li>
                <li><Link href="/markets?category=finance" className="hover:text-text-primary transition-colors">Finance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-text-primary font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li><Link href="/docs" className="hover:text-text-primary transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-text-primary transition-colors">API</Link></li>
                <li><Link href="/blog" className="hover:text-text-primary transition-colors">Blog</Link></li>
                <li><Link href="/support" className="hover:text-text-primary transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-text-primary font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li><a href="#" className="hover:text-text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Medium</a></li>
              </ul>
            </div>
          </div>
          <Separator className="mb-8 bg-border" />
          <div className="flex flex-col md:flex-row items-center justify-between text-text-secondary text-sm">
            <p>&copy; 2024 CoreOracle. Built on Core Blockchain.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}