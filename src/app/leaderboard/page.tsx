"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { TrendingUp, Trophy, Medal, Award, Crown, Wallet } from "lucide-react"
import Link from "next/link"

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("all-time")

  const topPredictors = [
    {
      rank: 1,
      address: "0x1234...5678",
      username: "CryptoOracle",
      totalEarnings: "15,420.50",
      winRate: 89.2,
      totalBets: 156,
      streak: 12,
      badge: "Legendary",
    },
    {
      rank: 2,
      address: "0x9876...4321",
      username: "MarketMaster",
      totalEarnings: "12,890.25",
      winRate: 85.7,
      totalBets: 203,
      streak: 8,
      badge: "Expert",
    },
    {
      rank: 3,
      address: "0x5555...1111",
      username: "PredictPro",
      totalEarnings: "11,245.75",
      winRate: 82.4,
      totalBets: 189,
      streak: 15,
      badge: "Expert",
    },
    {
      rank: 4,
      address: "0x7777...9999",
      username: "FutureSeeker",
      totalEarnings: "9,876.30",
      winRate: 78.9,
      totalBets: 145,
      streak: 5,
      badge: "Advanced",
    },
    {
      rank: 5,
      address: "0x3333...7777",
      username: "TrendSpotter",
      totalEarnings: "8,654.20",
      winRate: 76.3,
      totalBets: 167,
      streak: 3,
      badge: "Advanced",
    },
  ]

  const topEarners = [
    {
      rank: 1,
      address: "0x1111...2222",
      username: "WhalePredictor",
      totalEarnings: "25,890.75",
      totalVolume: "45,230.50",
      biggestWin: "2,450.00",
      badge: "Whale",
    },
    {
      rank: 2,
      address: "0x2222...3333",
      username: "HighRoller",
      totalEarnings: "18,765.25",
      totalVolume: "38,920.80",
      biggestWin: "1,890.50",
      badge: "High Roller",
    },
    {
      rank: 3,
      address: "0x4444...5555",
      username: "BigBetter",
      totalEarnings: "16,543.90",
      totalVolume: "32,100.25",
      biggestWin: "1,650.75",
      badge: "High Roller",
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="text-slate-400 font-bold text-lg">#{rank}</span>
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Legendary":
        return "bg-purple-600"
      case "Expert":
        return "bg-blue-600"
      case "Advanced":
        return "bg-green-600"
      case "Whale":
        return "bg-indigo-600"
      case "High Roller":
        return "bg-red-600"
      default:
        return "bg-slate-600"
    }
  }

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
            <Link href="/markets" className="text-slate-300 hover:text-white transition-colors">
              Markets
            </Link>
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-white font-semibold">
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
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-slate-300">Top predictors and highest earners on CorePredict</p>
        </div>

        {/* Timeframe Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-slate-800 rounded-lg p-1">
            {["all-time", "monthly", "weekly"].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeframe(period)}
                className={timeframe === period ? "bg-purple-600" : "text-slate-300 hover:text-white"}
              >
                {period.charAt(0).toUpperCase() + period.slice(1).replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="accuracy" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700 grid w-full grid-cols-2">
            <TabsTrigger value="accuracy" className="data-[state=active]:bg-purple-600">
              <Trophy className="w-4 h-4 mr-2" />
              Top Predictors
            </TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Top Earners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accuracy" className="space-y-4">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {topPredictors.slice(0, 3).map((predictor, index) => (
                <Card
                  key={predictor.rank}
                  className={`bg-slate-800/50 border-slate-700 ${
                    index === 0
                      ? "ring-2 ring-yellow-500/50"
                      : index === 1
                        ? "ring-2 ring-gray-400/50"
                        : "ring-2 ring-amber-600/50"
                  }`}
                >
                  <CardHeader className="text-center pb-3">
                    <div className="flex justify-center mb-2">{getRankIcon(predictor.rank)}</div>
                    <CardTitle className="text-white text-lg">{predictor.username}</CardTitle>
                    <CardDescription className="font-mono text-slate-400">{predictor.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-white">{predictor.winRate}%</div>
                      <div className="text-slate-400 text-sm">Win Rate</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-green-400">{predictor.totalEarnings} CORE</div>
                      <div className="text-slate-400 text-sm">Total Earnings</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <div className="text-white font-semibold">{predictor.totalBets}</div>
                        <div className="text-slate-400">Bets</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{predictor.streak}</div>
                        <div className="text-slate-400">Streak</div>
                      </div>
                    </div>
                    <Badge className={`${getBadgeColor(predictor.badge)} text-white`}>{predictor.badge}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Rest of the leaderboard */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Full Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPredictors.slice(3).map((predictor) => (
                    <div
                      key={predictor.rank}
                      className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8">{getRankIcon(predictor.rank)}</div>
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-purple-600 text-white">
                            {predictor.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-white font-semibold">{predictor.username}</div>
                          <div className="text-slate-400 text-sm font-mono">{predictor.address}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-right">
                        <div>
                          <div className="text-white font-semibold">{predictor.winRate}%</div>
                          <div className="text-slate-400 text-sm">Win Rate</div>
                        </div>
                        <div>
                          <div className="text-green-400 font-semibold">{predictor.totalEarnings} CORE</div>
                          <div className="text-slate-400 text-sm">Earnings</div>
                        </div>
                        <Badge className={`${getBadgeColor(predictor.badge)} text-white`}>{predictor.badge}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Top Earners</CardTitle>
                <CardDescription className="text-slate-400">Users with the highest total earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEarners.map((earner) => (
                    <div key={earner.rank} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8">{getRankIcon(earner.rank)}</div>
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-indigo-600 text-white">
                            {earner.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-white font-semibold">{earner.username}</div>
                          <div className="text-slate-400 text-sm font-mono">{earner.address}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-right">
                        <div>
                          <div className="text-green-400 font-bold text-lg">{earner.totalEarnings} CORE</div>
                          <div className="text-slate-400 text-sm">Total Earnings</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{earner.totalVolume} CORE</div>
                          <div className="text-slate-400 text-sm">Volume</div>
                        </div>
                        <div>
                          <div className="text-yellow-400 font-semibold">{earner.biggestWin} CORE</div>
                          <div className="text-slate-400 text-sm">Biggest Win</div>
                        </div>
                        <Badge className={`${getBadgeColor(earner.badge)} text-white`}>{earner.badge}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Rewards Section */}
        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Monthly Rewards
            </CardTitle>
            <CardDescription className="text-slate-400">
              Top performers earn additional CORE token rewards each month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-600/20 border border-yellow-600/30 rounded-lg">
                <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">1st Place</div>
                <div className="text-yellow-400 font-semibold">1,000 CORE</div>
              </div>
              <div className="text-center p-4 bg-gray-600/20 border border-gray-600/30 rounded-lg">
                <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">2nd Place</div>
                <div className="text-gray-400 font-semibold">500 CORE</div>
              </div>
              <div className="text-center p-4 bg-amber-600/20 border border-amber-600/30 rounded-lg">
                <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">3rd Place</div>
                <div className="text-amber-600 font-semibold">250 CORE</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
