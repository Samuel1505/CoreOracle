"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Trophy, Shield, ArrowRight, Wallet } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
 
  const featuredMarkets = [
    {
      id: 1,
      title: "Bitcoin Price Above $100,000 by End of 2024",
      category: "Crypto",
      totalVolume: "2,450 CORE",
      participants: 156,
      odds: { yes: 0.65, no: 0.35 },
      endDate: "Dec 31, 2024",
    },
    {
      id: 2,
      title: "Manchester City to Win Premier League 2024/25",
      category: "Sports",
      totalVolume: "1,890 CORE",
      participants: 203,
      odds: { yes: 0.72, no: 0.28 },
      endDate: "May 25, 2025",
    },
    {
      id: 3,
      title: "US Federal Reserve to Cut Rates in Q1 2025",
      category: "Finance",
      totalVolume: "3,120 CORE",
      participants: 89,
      odds: { yes: 0.58, no: 0.42 },
      endDate: "Mar 31, 2025",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-black-500 to-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CorePredict</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/markets" className="text-slate-300 hover:text-white transition-colors">
              Markets
            </Link>
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-slate-300 hover:text-white transition-colors">
              Leaderboard
            </Link>
          </nav>
          
          <appkit-button />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Predict the Future,
            <span className="bg-gradient-to-r from-black-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Earn Rewards
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Join the most advanced decentralized prediction market on Core Blockchain. Make predictions on crypto,
            sports, politics, and more. Earn CORE tokens for accurate predictions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/markets">
              <Button size="lg" className="bg-blue-600 hover:bg-purple-700 text-lg px-8 py-3">
                Explore Markets
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$2.4M</div>
              <div className="text-slate-400">Total Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">15,420</div>
              <div className="text-slate-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">847</div>
              <div className="text-slate-400">Markets Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">94.2%</div>
              <div className="text-slate-400">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Markets */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Markets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMarkets.map((market) => (
              <Card
                key={market.id}
                className="bg-black-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                      {market.category}
                    </Badge>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {market.participants}
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg leading-tight">{market.title}</CardTitle>
                  <CardDescription className="text-slate-400">Ends: {market.endDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Total Volume</span>
                      <span className="text-white font-semibold">{market.totalVolume}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3 text-center">
                        <div className="text-green-400 font-semibold">YES</div>
                        <div className="text-white text-lg">{(market.odds.yes * 100).toFixed(0)}%</div>
                      </div>
                      <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3 text-center">
                        <div className="text-red-400 font-semibold">NO</div>
                        <div className="text-white text-lg">{(market.odds.no * 100).toFixed(0)}%</div>
                      </div>
                    </div>
                    <Link href={`/markets/${market.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-purple-700">Place Bet</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose CorePredict?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure & Transparent</h3>
              <p className="text-slate-400">
                Built on Core Blockchain with smart contracts ensuring fair and transparent outcomes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">High Rewards</h3>
              <p className="text-slate-400">Earn CORE tokens for accurate predictions with competitive reward rates.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Competitive</h3>
              <p className="text-slate-400">
                Compete with other predictors on leaderboards and earn additional rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-8 px-4">
        <div className="container mx-auto text-center text-slate-400">
          <p>&copy; 2024 CorePredict. Built on Core Blockchain.</p>
        </div>
      </footer>
    </div>
  )
}
