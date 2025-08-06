"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Search, Users, Clock, TrendingUp, Wallet } from "lucide-react"
import Link from "next/link"

export default function MarketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("volume")

  const markets = [
    {
      id: 1,
      title: "Bitcoin Price Above $100,000 by End of 2024",
      category: "Crypto",
      totalVolume: "2,450 CORE",
      participants: 156,
      odds: { yes: 0.65, no: 0.35 },
      endDate: "Dec 31, 2024",
      timeLeft: "45 days",
      status: "active",
    },
    {
      id: 2,
      title: "Manchester City to Win Premier League 2024/25",
      category: "Sports",
      totalVolume: "1,890 CORE",
      participants: 203,
      odds: { yes: 0.72, no: 0.28 },
      endDate: "May 25, 2025",
      timeLeft: "156 days",
      status: "active",
    },
    {
      id: 3,
      title: "US Federal Reserve to Cut Rates in Q1 2025",
      category: "Finance",
      totalVolume: "3,120 CORE",
      participants: 89,
      odds: { yes: 0.58, no: 0.42 },
      endDate: "Mar 31, 2025",
      timeLeft: "120 days",
      status: "active",
    },
    {
      id: 4,
      title: "Ethereum 2.0 Staking Rewards Above 5% in 2024",
      category: "Crypto",
      totalVolume: "1,650 CORE",
      participants: 134,
      odds: { yes: 0.43, no: 0.57 },
      endDate: "Dec 31, 2024",
      timeLeft: "45 days",
      status: "active",
    },
    {
      id: 5,
      title: "Tesla Stock Price Above $300 by Q2 2025",
      category: "Finance",
      totalVolume: "2,890 CORE",
      participants: 178,
      odds: { yes: 0.51, no: 0.49 },
      endDate: "Jun 30, 2025",
      timeLeft: "187 days",
      status: "active",
    },
    {
      id: 6,
      title: "World Cup 2026 Winner: Brazil",
      category: "Sports",
      totalVolume: "980 CORE",
      participants: 67,
      odds: { yes: 0.38, no: 0.62 },
      endDate: "Jul 19, 2026",
      timeLeft: "567 days",
      status: "active",
    },
  ]

  const filteredMarkets = markets.filter((market) => {
    const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || market.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CorePredict</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/markets" className="text-white font-semibold">
              Markets
            </Link>
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-slate-300 hover:text-white transition-colors">
              Leaderboard
            </Link>
          </nav>
          <Button className="bg-green-600 hover:bg-green-700">
            <Wallet className="w-4 h-4 mr-2" />
            Connected
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Prediction Markets</h1>
          <p className="text-slate-300">Discover and bet on various prediction markets</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="volume">Volume</SelectItem>
                <SelectItem value="participants">Participants</SelectItem>
                <SelectItem value="ending">Ending Soon</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Market Tabs */}
        <Tabs defaultValue="active" className="mb-8">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="active" className="data-[state=active]:bg-purple-600">
              Active Markets ({filteredMarkets.length})
            </TabsTrigger>
            <TabsTrigger value="ending" className="data-[state=active]:bg-purple-600">
              Ending Soon
            </TabsTrigger>
            <TabsTrigger value="resolved" className="data-[state=active]:bg-purple-600">
              Resolved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map((market) => (
                <Card
                  key={market.id}
                  className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                        {market.category}
                      </Badge>
                      <div className="flex items-center text-slate-400 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {market.timeLeft}
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg leading-tight">{market.title}</CardTitle>
                    <CardDescription className="text-slate-400">Ends: {market.endDate}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-slate-300 text-sm">
                          <Users className="w-4 h-4 mr-1" />
                          {market.participants} participants
                        </div>
                        <span className="text-white font-semibold">{market.totalVolume}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3 text-center">
                          <div className="text-green-400 font-semibold text-sm">YES</div>
                          <div className="text-white text-lg font-bold">{(market.odds.yes * 100).toFixed(0)}%</div>
                        </div>
                        <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3 text-center">
                          <div className="text-red-400 font-semibold text-sm">NO</div>
                          <div className="text-white text-lg font-bold">{(market.odds.no * 100).toFixed(0)}%</div>
                        </div>
                      </div>
                      <Link href={`/markets/${market.id}`}>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">Place Bet</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ending" className="mt-6">
            <div className="text-center py-12">
              <p className="text-slate-400">Markets ending in the next 7 days will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="resolved" className="mt-6">
            <div className="text-center py-12">
              <p className="text-slate-400">Resolved markets will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
