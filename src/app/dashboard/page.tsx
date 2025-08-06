"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { TrendingUp, Wallet, Trophy, Clock, DollarSign, Target, Activity } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [userStats] = useState({
    totalBets: 47,
    activeBets: 12,
    winRate: 68.2,
    totalEarnings: "1,247.50",
    currentBalance: "892.30",
    rank: 156,
    totalUsers: 15420,
  })

  const activeBets = [
    {
      id: 1,
      title: "Bitcoin Price Above $100,000 by End of 2024",
      outcome: "YES",
      amount: "50 CORE",
      currentOdds: "65%",
      potentialPayout: "76.92 CORE",
      status: "winning",
      timeLeft: "45 days",
    },
    {
      id: 2,
      title: "Manchester City to Win Premier League 2024/25",
      outcome: "YES",
      amount: "25 CORE",
      currentOdds: "72%",
      potentialPayout: "34.72 CORE",
      status: "winning",
      timeLeft: "156 days",
    },
    {
      id: 3,
      title: "Tesla Stock Price Above $300 by Q2 2025",
      outcome: "NO",
      amount: "30 CORE",
      currentOdds: "49%",
      potentialPayout: "61.22 CORE",
      status: "losing",
      timeLeft: "187 days",
    },
  ]

  const recentActivity = [
    {
      type: "bet_placed",
      market: "Bitcoin Price Above $100,000",
      outcome: "YES",
      amount: "50 CORE",
      time: "2 hours ago",
    },
    {
      type: "bet_won",
      market: "Ethereum Price Above $4,000",
      outcome: "YES",
      amount: "75 CORE",
      payout: "120 CORE",
      time: "1 day ago",
    },
    {
      type: "bet_placed",
      market: "Tesla Stock Above $300",
      outcome: "NO",
      amount: "30 CORE",
      time: "3 days ago",
    },
  ]

  const achievements = [
    { name: "First Bet", description: "Placed your first prediction", earned: true },
    { name: "Lucky Streak", description: "Won 5 bets in a row", earned: true },
    { name: "High Roller", description: "Placed a bet over 100 CORE", earned: false },
    { name: "Oracle", description: "Achieved 80% win rate", earned: false },
  ]

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
            <Link href="/dashboard" className="text-white font-semibold">
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
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-300">Track your predictions and earnings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Bets</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalBets}</p>
                </div>
                <Target className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Win Rate</p>
                  <p className="text-2xl font-bold text-white">{userStats.winRate}%</p>
                </div>
                <Trophy className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalEarnings} CORE</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Current Balance</p>
                  <p className="text-2xl font-bold text-white">{userStats.currentBalance} CORE</p>
                </div>
                <Wallet className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="active" className="data-[state=active]:bg-purple-600">
              Active Bets ({activeBets.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-600">
              Bet History
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600">
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Bets */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Your Active Bets</h3>
                {activeBets.map((bet) => (
                  <Card key={bet.id} className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={bet.status === "winning" ? "default" : "destructive"}
                          className={bet.status === "winning" ? "bg-green-600" : "bg-red-600"}
                        >
                          {bet.status === "winning" ? "Winning" : "Losing"}
                        </Badge>
                        <div className="flex items-center text-slate-400 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {bet.timeLeft}
                        </div>
                      </div>
                      <CardTitle className="text-white text-base leading-tight">{bet.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Your Bet</span>
                          <span className="text-white font-semibold">
                            {bet.outcome} - {bet.amount}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Current Odds</span>
                          <span className="text-white">{bet.currentOdds}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Potential Payout</span>
                          <span className="text-green-400 font-semibold">{bet.potentialPayout}</span>
                        </div>
                        <Link href={`/markets/${bet.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          >
                            View Market
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg">
                          <div className="flex-shrink-0">
                            {activity.type === "bet_placed" && (
                              <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                                <Target className="w-4 h-4 text-blue-400" />
                              </div>
                            )}
                            {activity.type === "bet_won" && (
                              <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                                <Trophy className="w-4 h-4 text-green-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">
                              {activity.type === "bet_placed" && "Bet Placed"}
                              {activity.type === "bet_won" && "Bet Won"}
                            </div>
                            <div className="text-slate-300 text-sm">
                              {activity.market} - {activity.outcome}
                            </div>
                            <div className="text-slate-400 text-xs">{activity.time}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">
                              {activity.type === "bet_won" ? activity.payout : activity.amount}
                            </div>
                            {activity.type === "bet_won" && (
                              <div className="text-green-400 text-sm">
                                +
                                {(
                                  Number.parseFloat(activity.payout!.split(" ")[0]) -
                                  Number.parseFloat(activity.amount.split(" ")[0])
                                ).toFixed(0)}{" "}
                                CORE
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">Your betting history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className={`bg-slate-800/50 border-slate-700 ${achievement.earned ? "ring-2 ring-purple-500/50" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned ? "bg-purple-600" : "bg-slate-700"
                        }`}
                      >
                        <Trophy className={`w-6 h-6 ${achievement.earned ? "text-white" : "text-slate-400"}`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${achievement.earned ? "text-white" : "text-slate-400"}`}>
                          {achievement.name}
                        </h4>
                        <p className="text-slate-400 text-sm">{achievement.description}</p>
                        {achievement.earned && <Badge className="mt-2 bg-purple-600">Earned</Badge>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
