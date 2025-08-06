"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Progress } from "../../../components/ui/progress"
import { Separator } from "../../../components/ui/separator"
import { TrendingUp, Users, Clock, ArrowLeft, Info, DollarSign, Wallet } from "lucide-react"
import Link from "next/link"

export default function MarketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [marketId, setMarketId] = useState<string>("")
  const [betAmount, setBetAmount] = useState("")
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no" | null>(null)
  const [isPlacingBet, setIsPlacingBet] = useState(false)

  // Resolve the params Promise
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setMarketId(resolvedParams.id)
    }
    resolveParams()
  }, [params])

  // Mock market data - in real app, fetch based on marketId
  const market = {
    id: 1,
    title: "Bitcoin Price Above $100,000 by End of 2024",
    description:
      "This market resolves to YES if Bitcoin (BTC) trades above $100,000 USD on any major exchange (Coinbase, Binance, Kraken) before December 31, 2024, 11:59 PM UTC. The market will resolve based on publicly verifiable price data from these exchanges.",
    category: "Crypto",
    totalVolume: "2,450 CORE",
    participants: 156,
    odds: { yes: 0.65, no: 0.35 },
    endDate: "Dec 31, 2024",
    timeLeft: "45 days",
    status: "active",
    createdBy: "0x1234...5678",
    createdAt: "Nov 15, 2024",
    resolutionSource: "CoinGecko API, Coinbase Pro API",
    minBet: "1 CORE",
    maxBet: "1000 CORE",
  }

  const recentBets = [
    { user: "0x1234...5678", outcome: "YES", amount: "50 CORE", odds: "65%", time: "2 mins ago" },
    { user: "0x9876...4321", outcome: "NO", amount: "25 CORE", odds: "35%", time: "5 mins ago" },
    { user: "0x5555...1111", outcome: "YES", amount: "100 CORE", odds: "64%", time: "8 mins ago" },
    { user: "0x7777...9999", outcome: "NO", amount: "75 CORE", odds: "36%", time: "12 mins ago" },
  ]

  const handlePlaceBet = async () => {
    if (!selectedOutcome || !betAmount) return

    setIsPlacingBet(true)
    // Simulate bet placement
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsPlacingBet(false)
    setBetAmount("")
    setSelectedOutcome(null)
    alert("Bet placed successfully!")
  }

  const potentialPayout =
    betAmount && selectedOutcome ? (Number.parseFloat(betAmount) / market.odds[selectedOutcome]).toFixed(2) : "0"

  // Show loading state while params are being resolved
  if (!marketId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
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
        {/* Back Button */}
        <Link href="/markets" className="inline-flex items-center text-slate-300 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Markets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Header */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                    {market.category}
                  </Badge>
                  <div className="flex items-center text-slate-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {market.timeLeft} left
                  </div>
                </div>
                <CardTitle className="text-2xl text-white leading-tight">{market.title}</CardTitle>
                <CardDescription className="text-slate-300 text-base">{market.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-slate-400 text-sm">Total Volume</div>
                    <div className="text-white font-semibold text-lg">{market.totalVolume}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Participants</div>
                    <div className="text-white font-semibold text-lg flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {market.participants}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Ends</div>
                    <div className="text-white font-semibold text-lg">{market.endDate}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Created</div>
                    <div className="text-white font-semibold text-lg">{market.createdAt}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Odds */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Current Odds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-6 text-center">
                    <div className="text-green-400 font-semibold text-lg mb-2">YES</div>
                    <div className="text-white text-3xl font-bold mb-2">{(market.odds.yes * 100).toFixed(0)}%</div>
                    <Progress value={market.odds.yes * 100} className="h-2" />
                  </div>
                  <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-6 text-center">
                    <div className="text-red-400 font-semibold text-lg mb-2">NO</div>
                    <div className="text-white text-3xl font-bold mb-2">{(market.odds.no * 100).toFixed(0)}%</div>
                    <Progress value={market.odds.no * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Details */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="details" className="data-[state=active]:bg-purple-600">
                  Details
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600">
                  Recent Activity
                </TabsTrigger>
                <TabsTrigger value="rules" className="data-[state=active]:bg-purple-600">
                  Rules
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Resolution Source</Label>
                        <p className="text-white">{market.resolutionSource}</p>
                      </div>
                      <Separator className="bg-slate-700" />
                      <div>
                        <Label className="text-slate-300">Created By</Label>
                        <p className="text-white font-mono">{market.createdBy}</p>
                      </div>
                      <Separator className="bg-slate-700" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-300">Min Bet</Label>
                          <p className="text-white">{market.minBet}</p>
                        </div>
                        <div>
                          <Label className="text-slate-300">Max Bet</Label>
                          <p className="text-white">{market.maxBet}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {recentBets.map((bet, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge variant={bet.outcome === "YES" ? "default" : "destructive"} className="text-xs">
                              {bet.outcome}
                            </Badge>
                            <span className="text-white font-mono text-sm">{bet.user}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">{bet.amount}</div>
                            <div className="text-slate-400 text-sm">{bet.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rules" className="mt-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="space-y-4 text-slate-300">
                      <div className="flex items-start space-x-2">
                        <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Resolution Criteria</h4>
                          <p>
                            This market will resolve to YES if Bitcoin trades above $100,000 on any of the specified
                            exchanges before the end date.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Data Sources</h4>
                          <p>Price data will be sourced from CoinGecko API and Coinbase Pro API for verification.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Dispute Period</h4>
                          <p>
                            There is a 24-hour dispute period after initial resolution where users can challenge the
                            outcome.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Betting Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 sticky top-4">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Place Your Bet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Outcome Selection */}
                <div>
                  <Label className="text-slate-300 mb-2 block">Select Outcome</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedOutcome === "yes" ? "default" : "outline"}
                      className={`${
                        selectedOutcome === "yes"
                          ? "bg-green-600 hover:bg-green-700"
                          : "border-green-600 text-green-400 hover:bg-green-600/20"
                      }`}
                      onClick={() => setSelectedOutcome("yes")}
                    >
                      YES {(market.odds.yes * 100).toFixed(0)}%
                    </Button>
                    <Button
                      variant={selectedOutcome === "no" ? "default" : "outline"}
                      className={`${
                        selectedOutcome === "no"
                          ? "bg-red-600 hover:bg-red-700"
                          : "border-red-600 text-red-400 hover:bg-red-600/20"
                      }`}
                      onClick={() => setSelectedOutcome("no")}
                    >
                      NO {(market.odds.no * 100).toFixed(0)}%
                    </Button>
                  </div>
                </div>

                {/* Bet Amount */}
                <div>
                  <Label htmlFor="betAmount" className="text-slate-300 mb-2 block">
                    Bet Amount (CORE)
                  </Label>
                  <Input
                    id="betAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    min="1"
                    max="1000"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-1">
                    <span>Min: {market.minBet}</span>
                    <span>Max: {market.maxBet}</span>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {["10", "25", "50", "100"].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount(amount)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      {amount}
                    </Button>
                  ))}
                </div>

                {/* Potential Payout */}
                {betAmount && selectedOutcome && (
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Potential Payout:</span>
                      <span className="text-white font-semibold">{potentialPayout} CORE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Potential Profit:</span>
                      <span className="text-green-400 font-semibold">
                        {(Number.parseFloat(potentialPayout) - Number.parseFloat(betAmount)).toFixed(2)} CORE
                      </span>
                    </div>
                  </div>
                )}

                {/* Place Bet Button */}
                <Button
                  onClick={handlePlaceBet}
                  disabled={!selectedOutcome || !betAmount || isPlacingBet}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  {isPlacingBet ? "Placing Bet..." : "Place Bet"}
                </Button>

                <p className="text-xs text-slate-400 text-center">
                  By placing a bet, you agree to the market rules and terms of service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}