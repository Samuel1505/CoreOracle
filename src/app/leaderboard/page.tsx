"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, Trophy, Medal, Award, Crown, Wallet, Users, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import PrizePoolPredictionABI from "../../app/abi/PrizePoolPrediction-abi.json";
import {PrizePredictionContract} from "../../app/abi/index";
import { ethers } from 'ethers'

type Leader = {
  rank: number
  address: string
  winRate?: string
  totalEarnings: string
  totalBets: number
  streak: number
  badge: string
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("all-time")
  const [accuracyLeaders, setAccuracyLeaders] = useState<Leader[]>([])
  const [winningsLeaders, setWinningsLeaders] = useState<Leader[]>([])
  const [participationLeaders, setParticipationLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeaderboards()
  }, [])

  async function fetchLeaderboards() {
    setLoading(true)
    setError(null)
    
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to view leaderboards")
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any)
      const contract = new ethers.Contract(
        PrizePredictionContract.address,
        PrizePoolPredictionABI,
        provider
      )

      // Fetch all three leaderboards in parallel
      const [accuracyData, winningsData, participationData] = await Promise.all([
        fetchAccuracyLeaderboard(contract),
        fetchWinningsLeaderboard(contract),
        fetchParticipationLeaderboard(contract)
      ])

      setAccuracyLeaders(accuracyData)
      setWinningsLeaders(winningsData)
      setParticipationLeaders(participationData)
    } catch (err) {
      console.error("Error fetching leaderboards:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch leaderboard data")
    } finally {
      setLoading(false)
    }
  }

  async function fetchAccuracyLeaderboard(contract: ethers.Contract): Promise<Leader[]> {
    try {
      const [accUsers, accPercentages, accTotalPreds] = await contract.getAccuracyLeaderboard()
      
      if (!accUsers || accUsers.length === 0) {
        return []
      }

      // Batch fetch user stats
      const statsPromises = accUsers.map((user: string) => 
        contract.getUserStats(user).catch(() => null)
      )
      const allStats = await Promise.all(statsPromises)

      const accData: Leader[] = []
      for (let i = 0; i < accUsers.length; i++) {
        const stats = allStats[i]
        if (!stats) continue

        const winRate = Number(accPercentages[i]) / 100
        accData.push({
          rank: i + 1,
          address: accUsers[i],
          winRate: winRate.toFixed(1),
          totalEarnings: ethers.formatEther(stats.totalWinnings || "0"),
          totalBets: Number(stats.totalPredictions || 0),
          streak: Number(stats.currentStreak || 0),
          badge: getBadgeForAccuracy(winRate)
        })
      }
      return accData
    } catch (err) {
      console.error("Error fetching accuracy leaderboard:", err)
      return []
    }
  }

  async function fetchWinningsLeaderboard(contract: ethers.Contract): Promise<Leader[]> {
    try {
      const [winUsers, winTotals, winStreaks] = await contract.getWinningsLeaderboard()
      
      if (!winUsers || winUsers.length === 0) {
        return []
      }

      // Batch fetch user stats
      const statsPromises = winUsers.map((user: string) => 
        contract.getUserStats(user).catch(() => null)
      )
      const allStats = await Promise.all(statsPromises)

      const winData: Leader[] = []
      for (let i = 0; i < winUsers.length; i++) {
        const stats = allStats[i]
        if (!stats) continue

        const totalEarnings = Number(ethers.formatEther(winTotals[i] || "0"))
        winData.push({
          rank: i + 1,
          address: winUsers[i],
          totalEarnings: totalEarnings.toFixed(4),
          totalBets: Number(stats.totalPredictions || 0),
          streak: Number(winStreaks[i] || 0),
          badge: getBadgeForWinnings(totalEarnings)
        })
      }
      return winData
    } catch (err) {
      console.error("Error fetching winnings leaderboard:", err)
      return []
    }
  }

  async function fetchParticipationLeaderboard(contract: ethers.Contract): Promise<Leader[]> {
    try {
      // Add block range limit to prevent timeout
      const currentBlock = await contract.runner?.provider?.getBlockNumber()
      const fromBlock = Math.max(0, (currentBlock || 0) - 10000) // Last ~10k blocks
      
      const events = await contract.queryFilter(
        contract.filters.PredictionSubmitted(),
        fromBlock,
        "latest"
      )

      const userCounts: {[key: string]: number} = {}
      for (const event of events) {
        // Safer type checking
        if (event.args && Array.isArray(event.args) && event.args.length > 0) {
          const user = event.args[0]
          if (typeof user === "string") {
            userCounts[user] = (userCounts[user] || 0) + 1
          }
        }
      }

      const sortedUsers = Object.entries(userCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(e => e[0])

      if (sortedUsers.length === 0) {
        return []
      }

      // Batch fetch user stats
      const statsPromises = sortedUsers.map(addr => 
        contract.getUserStats(addr).catch(() => null)
      )
      const allStats = await Promise.all(statsPromises)

      const partData: Leader[] = []
      for (let i = 0; i < sortedUsers.length; i++) {
        const addr = sortedUsers[i]
        const stats = allStats[i]
        if (!stats) continue

        partData.push({
          rank: i + 1,
          address: addr,
          totalEarnings: ethers.formatEther(stats.totalWinnings || "0"),
          totalBets: userCounts[addr],
          streak: Number(stats.currentStreak || 0),
          badge: getBadgeForParticipation(userCounts[addr])
        })
      }
      return partData
    } catch (err) {
      console.error("Error fetching participation leaderboard:", err)
      return []
    }
  }

  const getBadgeForAccuracy = (winRate: number) => {
    if (winRate >= 90) return "Legendary"
    if (winRate >= 80) return "Expert"
    if (winRate >= 70) return "Advanced"
    return "Novice"
  }

  const getBadgeForWinnings = (earnings: number) => {
    if (earnings >= 20) return "Whale"
    if (earnings >= 10) return "High Roller"
    return "Investor"
  }

  const getBadgeForParticipation = (bets: number) => {
    if (bets >= 100) return "Legendary"
    if (bets >= 50) return "Expert"
    if (bets >= 20) return "Advanced"
    return "Novice"
  }

  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

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

  const renderLeaderCard = (predictor: Leader, showWinRate: boolean = false) => (
    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-8 h-8">{getRankIcon(predictor.rank)}</div>
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-purple-600 text-white">
            {shortenAddress(predictor.address).slice(2,4).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-white font-semibold">{shortenAddress(predictor.address)}</div>
        </div>
      </div>
      <div className="flex items-center space-x-6 text-right">
        {showWinRate && predictor.winRate && (
          <div>
            <div className="text-white font-semibold">{predictor.winRate}%</div>
            <div className="text-slate-400 text-sm">Win Rate</div>
          </div>
        )}
        <div>
          <div className="text-green-400 font-semibold">{predictor.totalEarnings} CORE</div>
          <div className="text-slate-400 text-sm">Earnings</div>
        </div>
        <Badge className={`${getBadgeColor(predictor.badge)} text-white`}>{predictor.badge}</Badge>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-black-500 to-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CoreOracle</span>
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
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Wallet className="w-4 h-4 mr-2" />
            Connected
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-slate-300">Top predictors and highest earners on CoreOracle</p>
        </div>

        {/* Error State */}
        {error && (
          <Alert className="mb-6 bg-red-900/20 border-red-900">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-300">Loading leaderboards...</p>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Timeframe Selection */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-slate-800 rounded-lg p-1">
                {["all-time", "monthly", "weekly"].map((period) => (
                  <Button
                    key={period}
                    variant={timeframe === period ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeframe(period)}
                    className={timeframe === period ? "bg-blue-600" : "text-slate-300 hover:text-white"}
                    disabled={period !== "all-time"}
                    title={period !== "all-time" ? "Coming soon" : ""}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1).replace("-", " ")}
                  </Button>
                ))}
              </div>
            </div>

            {/* Leaderboard Tabs */}
            <Tabs defaultValue="accuracy" className="space-y-6">
              <TabsList className="bg-slate-800 border-slate-700 grid w-full grid-cols-3">
                <TabsTrigger value="accuracy" className="data-[state=active]:bg-blue-600">
                  <Trophy className="w-4 h-4 mr-2" />
                  Top Predictors
                </TabsTrigger>
                <TabsTrigger value="earnings" className="data-[state=active]:bg-blue-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Top Earners
                </TabsTrigger>
                <TabsTrigger value="participation" className="data-[state=active]:bg-blue-600">
                  <Users className="w-4 h-4 mr-2" />
                  Most Active
                </TabsTrigger>
              </TabsList>

              <TabsContent value="accuracy">
                {accuracyLeaders.length === 0 ? (
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="py-12 text-center text-slate-400">
                      No predictions yet. Be the first!
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {/* Top 3 only if we have them */}
                    {accuracyLeaders.length >= 3 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {accuracyLeaders.slice(0, 3).map((predictor, index) => (
                          <Card
                            key={predictor.rank}
                            className={`bg-slate-800/50 border-slate-700 ${
                              index === 0 ? "ring-2 ring-yellow-500/50" :
                              index === 1 ? "ring-2 ring-gray-400/50" :
                              "ring-2 ring-amber-600/50"
                            }`}
                          >
                            <CardHeader className="text-center pb-3">
                              <div className="flex justify-center mb-2">{getRankIcon(predictor.rank)}</div>
                              <CardTitle className="text-white text-lg">{shortenAddress(predictor.address)}</CardTitle>
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
                    )}

                    {/* Rest of leaderboard */}
                    {accuracyLeaders.length > 3 && (
                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                          <CardTitle className="text-white">Full Leaderboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {accuracyLeaders.slice(3).map(predictor => renderLeaderCard(predictor, true))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="earnings">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Top Earners</CardTitle>
                    <CardDescription className="text-slate-400">
                      Users with the highest total earnings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {winningsLeaders.length === 0 ? (
                      <div className="py-12 text-center text-slate-400">
                        No earnings yet. Start predicting to appear here!
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {winningsLeaders.map(earner => (
                          <div key={earner.rank} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center justify-center w-8 h-8">{getRankIcon(earner.rank)}</div>
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-indigo-600 text-white">
                                  {shortenAddress(earner.address).slice(2,4).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-white font-semibold">{shortenAddress(earner.address)}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6 text-right">
                              <div>
                                <div className="text-green-400 font-bold text-lg">{earner.totalEarnings} CORE</div>
                                <div className="text-slate-400 text-sm">Total Earnings</div>
                              </div>
                              <div>
                                <div className="text-white font-semibold">{earner.totalBets}</div>
                                <div className="text-slate-400 text-sm">Bets</div>
                              </div>
                              <Badge className={`${getBadgeColor(earner.badge)} text-white`}>{earner.badge}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="participation">
                {participationLeaders.length === 0 ? (
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="py-12 text-center text-slate-400">
                      No predictions yet. Be the most active!
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {participationLeaders.length >= 3 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {participationLeaders.slice(0, 3).map((predictor, index) => (
                          <Card
                            key={predictor.rank}
                            className={`bg-slate-800/50 border-slate-700 ${
                              index === 0 ? "ring-2 ring-yellow-500/50" :
                              index === 1 ? "ring-2 ring-gray-400/50" :
                              "ring-2 ring-amber-600/50"
                            }`}
                          >
                            <CardHeader className="text-center pb-3">
                              <div className="flex justify-center mb-2">{getRankIcon(predictor.rank)}</div>
                              <CardTitle className="text-white text-lg">{shortenAddress(predictor.address)}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center space-y-3">
                              <div>
                                <div className="text-2xl font-bold text-white">{predictor.totalBets}</div>
                                <div className="text-slate-400 text-sm">Predictions</div>
                              </div>
                              <div>
                                <div className="text-xl font-semibold text-green-400">{predictor.totalEarnings} CORE</div>
                                <div className="text-slate-400 text-sm">Total Earnings</div>
                              </div>
                              <Badge className={`${getBadgeColor(predictor.badge)} text-white`}>{predictor.badge}</Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {participationLeaders.length > 3 && (
                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                          <CardTitle className="text-white">Full Leaderboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {participationLeaders.slice(3).map(predictor => renderLeaderCard(predictor))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
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
          </>
        )}
      </div>
    </div>
  )
}