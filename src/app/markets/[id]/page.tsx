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
import { ethers } from 'ethers'
import PrizePoolPredictionABI from "../../../app/abi/PrizePoolPrediction-abi.json"
import { PrizePredictionContract } from "../../../app/abi/index"

type Market = {
  id: number
  title: string
  category: string
  totalVolume: string
  volumeNumeric: number
  participants: number
  odds: { yes: number; no: number }
  endDate: string
  timeLeft: string
  timeLeftMs: number
  endTime: number
  resolutionTime: number
  status: string
  resolved: boolean
  active: boolean
  entryFee: string
  entryFeeNumeric: number
  createdBy: string
  options: string[]
  prizePool: string
}

type RecentBet = {
  user: string
  outcome: string
  amount: string
  odds: string
  time: string
  blockNumber: number
}

export default function MarketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [marketId, setMarketId] = useState<string>("")
  const [market, setMarket] = useState<Market | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [recentBets, setRecentBets] = useState<RecentBet[]>([])
  
  // Betting state
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

  // Fetch market data when marketId is available
  useEffect(() => {
    if (marketId) {
      fetchMarketData()
    }
  }, [marketId])

  const fetchMarketData = async () => {
    try {
      setLoading(true)
      setError("")

      if (!window.ethereum) {
        setError("No ethereum wallet detected")
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any)
      const contract = new ethers.Contract(PrizePredictionContract.address, PrizePoolPredictionABI, provider)
      
      // Check if contract exists
      const code = await provider.getCode(PrizePredictionContract.address)
      if (code === '0x') {
        setError("Contract not found at address")
        return
      }

      // Fetch prediction data
      const pred = await contract.getPrediction(parseInt(marketId))
      const stats = await contract.getAllOptionStats(parseInt(marketId))
      
      if (!pred || pred.options.length !== 2) {
        setError("Market not found or not a binary market")
        return
      }

      const totalParts = Number(pred.totalParticipants)
      let odds = { yes: 0.5, no: 0.5 }
      if (totalParts > 0) {
        const yesCount = Number(stats.counts[0])
        odds.yes = yesCount / totalParts
        odds.no = 1 - odds.yes
      }

      const endTime = Number(pred.endTime)
      const resolutionTime = Number(pred.resolutionTime)
      const endDate = new Date(endTime * 1000).toLocaleDateString()
      const timeLeftMs = endTime * 1000 - Date.now()
      const timeLeft = timeLeftMs > 0 ? `${Math.floor(timeLeftMs / (86400 * 1000))} days` : 'Ended'
      
      const prizePoolWei = pred.prizePool
      const entryFeeWei = pred.entryFee
      const volumeNumeric = parseFloat(ethers.formatEther(prizePoolWei))
      const entryFeeNumeric = parseFloat(ethers.formatEther(entryFeeWei))
      const totalVolume = `${volumeNumeric.toFixed(2)} CORE`
      const entryFee = `${entryFeeNumeric.toFixed(4)} CORE`

      const marketData: Market = {
        id: Number(pred.id),
        title: pred.question,
        category: "General", // Default category since not stored in contract
        totalVolume,
        volumeNumeric,
        participants: totalParts,
        odds,
        endDate,
        timeLeft,
        timeLeftMs,
        endTime,
        resolutionTime,
        status: pred.resolved ? "resolved" : (timeLeftMs > 0 && pred.active ? "active" : "inactive"),
        resolved: pred.resolved,
        active: pred.active,
        entryFee,
        entryFeeNumeric,
        createdBy: pred.creator,
        options: pred.options,
        prizePool: totalVolume
      }

      setMarket(marketData)
      
      // Fetch recent bets/activities
      await fetchRecentBets(contract, parseInt(marketId))
      
    } catch (err) {
      console.error("Error fetching market data:", err)
      setError("Failed to load market data")
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentBets = async (contract: ethers.Contract, predictionId: number) => {
    try {
      // Get recent bet events - you may need to adjust this based on your contract events
      const provider = contract.runner?.provider
      if (!provider) return

      // Try to get recent blocks (last 100 blocks or so)
      const currentBlock = await provider.getBlockNumber()
      const fromBlock = Math.max(0, currentBlock - 1000) // Last ~1000 blocks
      
      // If your contract emits events for bets, filter for them
      // This is a placeholder - adjust based on your actual events
      const filter = contract.filters.BetPlaced?.(predictionId)
      if (filter) {
        const events = await contract.queryFilter(filter, fromBlock, currentBlock)
        
        const bets: RecentBet[] = []
        for (const event of events.slice(-10)) { // Get last 10 bets
          if ("args" in event && event.args) {
            const block = await provider.getBlock(event.blockNumber)
            const timeAgo = Math.floor((Date.now() - (block?.timestamp || 0) * 1000) / 60000) // minutes ago
            
            bets.push({
              user: `${event.args[0]?.substring(0, 6)}...${event.args[0]?.substring(38)}`,
              outcome: event.args[1] === 0 ? "YES" : "NO",
              amount: `${parseFloat(ethers.formatEther(event.args[2] || 0)).toFixed(2)} CORE`,
              odds: event.args[1] === 0 ? `${(market?.odds.yes || 0.5) * 100}%` : `${(market?.odds.no || 0.5) * 100}%`,
              time: timeAgo < 60 ? `${timeAgo} mins ago` : `${Math.floor(timeAgo / 60)} hours ago`,
              blockNumber: event.blockNumber
            })
          }
        }
        
        setRecentBets(bets.reverse()) // Most recent first
      }
    } catch (err) {
      console.error("Error fetching recent bets:", err)
      // Don't set error state, just log it as this is not critical
    }
  }

  const handlePlaceBet = async () => {
    if (!selectedOutcome || !market) return

    setIsPlacingBet(true)
    
    try {
      if (!window.ethereum) {
        throw new Error("Wallet not connected")
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(PrizePredictionContract.address, PrizePoolPredictionABI, signer)
      
      // Use the correct function name and parameters
      const optionIndex = selectedOutcome === "yes" ? 0 : 1
      const entryFeeWei = ethers.parseEther(market.entryFeeNumeric.toString())
      
      // Call submitPrediction instead of placeBet
      // Parameters: (uint256 predictionId, uint256 selectedOption)
      // The entry fee should be sent as value
      const tx = await contract.submitPrediction(market.id, optionIndex, {
        value: entryFeeWei // Only send the entry fee as value
      })
      
      console.log("Bet transaction submitted:", tx.hash)
      
      // Wait for transaction to be mined
      const receipt = await tx.wait()
      console.log("Bet transaction confirmed:", receipt.hash)
      
      // Reset form
      setBetAmount("")
      setSelectedOutcome(null)
      
      // Refresh market data
      setTimeout(() => {
        fetchMarketData()
      }, 2000)
      
      alert("Prediction submitted successfully!")
      
    } catch (err) {
      console.error("Bet placement failed:", err)
      alert(`Failed to submit prediction: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsPlacingBet(false)
    }
  }

  // Show loading state while params are being resolved
  if (!marketId || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading market data...</div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400 text-center">
          <h2 className="text-xl mb-2">Error Loading Market</h2>
          <p>{error}</p>
          <Link href="/markets">
            <Button className="mt-4">Back to Markets</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Show not found state
  if (!market) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-xl mb-2">Market Not Found</h2>
          <p>The requested market could not be found.</p>
          <Link href="/markets">
            <Button className="mt-4">Back to Markets</Button>
          </Link>
        </div>
      </div>
    )
  }

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
            <Link href="/leaderboard" className="text-slate-300 hover:text-white transition-colors">
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
                <CardDescription className="text-slate-300 text-base">
                  Market ID: #{market.id} | Entry Fee: {market.entryFee}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-slate-400 text-sm">Prize Pool</div>
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
                    <div className="text-slate-400 text-sm">Status</div>
                    <div className={`font-semibold text-lg capitalize ${
                      market.status === 'active' ? 'text-green-400' : 
                      market.status === 'resolved' ? 'text-blue-400' : 'text-yellow-400'
                    }`}>
                      {market.status}
                    </div>
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
                    <div className="text-green-400 font-semibold text-lg mb-2">{market.options[0] || "YES"}</div>
                    <div className="text-white text-3xl font-bold mb-2">{(market.odds.yes * 100).toFixed(0)}%</div>
                    <Progress value={market.odds.yes * 100} className="h-2" />
                  </div>
                  <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-6 text-center">
                    <div className="text-red-400 font-semibold text-lg mb-2">{market.options[1] || "NO"}</div>
                    <div className="text-white text-3xl font-bold mb-2">{(market.odds.no * 100).toFixed(0)}%</div>
                    <Progress value={market.odds.no * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Details */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="details" className="data-[state=active]:bg-blue-600">
                  Details
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-blue-600">
                  Recent Activity
                </TabsTrigger>
                <TabsTrigger value="rules" className="data-[state=active]:bg-blue-600">
                  Rules
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Market Creator</Label>
                        <p className="text-white font-mono">{market.createdBy}</p>
                      </div>
                      <Separator className="bg-slate-700" />
                      <div>
                        <Label className="text-slate-300">Resolution Time</Label>
                        <p className="text-white">{new Date(market.resolutionTime * 1000).toLocaleString()}</p>
                      </div>
                      <Separator className="bg-slate-700" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-300">Entry Fee</Label>
                          <p className="text-white">{market.entryFee}</p>
                        </div>
                        <div>
                          <Label className="text-slate-300">Market Active</Label>
                          <p className={market.active ? "text-green-400" : "text-red-400"}>
                            {market.active ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                      <Separator className="bg-slate-700" />
                      <div>
                        <Label className="text-slate-300">Available Options</Label>
                        <div className="flex gap-2 mt-1">
                          {market.options.map((option, index) => (
                            <Badge key={index} variant="secondary" className="bg-slate-700 text-white">
                              {option}
                            </Badge>
                          ))}
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
                      {recentBets.length > 0 ? (
                        recentBets.map((bet, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Badge 
                                variant={bet.outcome === "YES" ? "default" : "destructive"} 
                                className="text-xs"
                              >
                                {bet.outcome}
                              </Badge>
                              <span className="text-white font-mono text-sm">{bet.user}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-semibold">{bet.amount}</div>
                              <div className="text-slate-400 text-sm">{bet.time}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-slate-400 py-8">
                          No recent activity found
                        </div>
                      )}
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
                          <h4 className="text-white font-semibold mb-1">Prediction Rules</h4>
                          <p>
                            To participate, pay the entry fee of {market.entryFee} and select your prediction option. Your entry fee goes to the prize pool.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Resolution</h4>
                          <p>
                            This market will be resolved by the creator or through the platform's resolution mechanism after the end time.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Payouts</h4>
                          <p>
                            Winners will receive their proportional share of the prize pool. All participants who chose the winning option split the total prize pool equally.
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
                  Make Your Prediction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {market.status === 'active' ? (
                  <>
                    {/* Outcome Selection */}
                    <div>
                      <Label className="text-slate-300 mb-2 block">Select Your Prediction</Label>
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
                          {market.options[0]} {(market.odds.yes * 100).toFixed(0)}%
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
                          {market.options[1]} {(market.odds.no * 100).toFixed(0)}%
                        </Button>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    {selectedOutcome && (
                      <div className="bg-slate-700/50 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Entry Fee:</span>
                          <span className="text-white">{market.entryFee}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Selected Option:</span>
                          <span className="text-white">{selectedOutcome === "yes" ? market.options[0] : market.options[1]}</span>
                        </div>
                        <Separator className="bg-slate-600" />
                        <div className="flex justify-between text-sm font-semibold">
                          <span className="text-slate-300">Total Cost:</span>
                          <span className="text-white">{market.entryFee}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Potential Share:</span>
                          <span className="text-green-400 font-semibold">
                            {selectedOutcome === "yes" 
                              ? `${(market.odds.yes * 100).toFixed(1)}% of prize pool`
                              : `${(market.odds.no * 100).toFixed(1)}% of prize pool`
                            }
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Submit Prediction Button */}
                    <Button
                      onClick={handlePlaceBet}
                      disabled={!selectedOutcome || isPlacingBet}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isPlacingBet ? "Submitting Prediction..." : "Submit Prediction"}
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-400 mb-4">
                      {market.status === 'resolved' ? 'This market has been resolved' : 'This market is not active'}
                    </p>
                    <Link href="/markets">
                      <Button variant="outline">View Other Markets</Button>
                    </Link>
                  </div>
                )}

                <p className="text-xs text-slate-400 text-center">
                  By submitting a prediction, you agree to the market rules and terms of service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}