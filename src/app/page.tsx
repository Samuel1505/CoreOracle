"use client"

import { useState } from "react"
import { Wallet, Target, Zap, Trophy, Globe, Coins, Briefcase, Film, Cpu, Users } from "lucide-react"
import { Header } from "@/components/home/Header"
import { HeroSection } from "@/components/home/HeroSection"
import { LiveActivityFeed } from "@/components/home/LiveActivityFeed"
import { HowItWorks } from "@/components/home/HowItWorks"
import { CategoryShowcase } from "@/components/home/CategoryShowcase"
import { PlatformStats } from "@/components/home/PlatformStats"
import { FeaturedMarkets } from "@/components/home/FeaturedMarkets"
import { RewardsLeaderboard } from "@/components/home/RewardsLeaderboard"
import { TrustSecurity } from "@/components/home/TrustSecurity"
import { Testimonials } from "@/components/home/Testimonials"
import { Community } from "@/components/home/Community"
import { FAQ } from "@/components/home/FAQ"
import { FinalCTA } from "@/components/home/FinalCTA"
import { Footer } from "@/components/home/Footer"

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all")

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

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      <HeroSection featuredMarkets={featuredMarkets} />
      <LiveActivityFeed liveActivity={liveActivity} />
      <HowItWorks steps={howItWorksSteps} />
      <CategoryShowcase categories={categories} />
      <PlatformStats />
      <FeaturedMarkets 
        markets={featuredMarkets} 
        categories={categories} 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <RewardsLeaderboard leaderboard={leaderboard} />
      <TrustSecurity />
      <Testimonials testimonials={testimonials} />
      <Community />
      <FAQ faqs={faqs} />
      <FinalCTA />
      <Footer />
    </div>
  )
}