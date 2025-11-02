"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Search, RefreshCw } from "lucide-react"
import Link from "next/link"
import { MarketCard } from "../../components/markets/MarketCard"
import { MarketCardSkeleton } from "../../components/markets/MarketCardSkeleton"
import { EmptyState } from "../../components/markets/EmptyState"
import { Header } from "../../components/layout/Header"
import { ethers } from 'ethers';
import PrizePoolPredictionABI from "../../app/abi/PrizePoolPrediction-abi.json";
import {PrizePredictionContract} from "../../app/abi/index";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label"

type Market = {
  id: number;
  title: string;
  category: string;
  totalVolume: string;
  volumeNumeric: number;
  participants: number;
  odds: { yes: number; no: number };
  endDate: string;
  timeLeft: string;
  timeLeftMs: number;
  endTime: number;
  status: string;
  resolved: boolean;
  active: boolean;
};

export default function MarketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("volume")
  const [markets, setMarkets] = useState<Market[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [entryFee, setEntryFee] = useState("")
  const [initialPrize, setInitialPrize] = useState("")
  const [endTime, setEndTime] = useState("")
  const [resolutionTime, setResolutionTime] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  // Extract fetchMarkets into a separate function to avoid duplication
  const fetchMarkets = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }
      if (!window.ethereum) {
        console.log("No ethereum wallet detected");
        return;
      }

      console.log("Fetching markets...");
      console.log("Contract address:", PrizePredictionContract.address);
      
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      
      // Check if we're connected to the right network
      const network = await provider.getNetwork();
      console.log("Connected to network:", network.name, network.chainId);
      
      const contract = new ethers.Contract(PrizePredictionContract.address, PrizePoolPredictionABI, provider);
      
      // Check if contract exists at this address
      const code = await provider.getCode(PrizePredictionContract.address);
      if (code === '0x') {
        console.error("No contract found at address:", PrizePredictionContract.address);
        return;
      }
      
      console.log("Contract found, calling predictionCounter...");
      const counter = await contract.predictionCounter();
      console.log("Prediction counter:", counter.toString());
      
      const fetched = [];
      for (let i = 1; i <= Number(counter); i++) {
        console.log(`Fetching prediction ${i}...`);
        const pred = await contract.getPrediction(i);
        const stats = await contract.getAllOptionStats(i);
        if (pred.options.length !== 2) continue; // Assume binary markets only for this UI
        const totalParts = Number(pred.totalParticipants);
        let odds = { yes: 0.5, no: 0.5 };
        if (totalParts > 0) {
          const yesCount = Number(stats.counts[0]);
          odds.yes = yesCount / totalParts;
          odds.no = 1 - odds.yes;
        }
        const endTime = Number(pred.endTime);
        const endDate = new Date(endTime * 1000).toLocaleDateString();
        const timeLeftMs = endTime * 1000 - Date.now();
        const timeLeft = timeLeftMs > 0 ? `${Math.floor(timeLeftMs / (86400 * 1000))} days` : 'Ended';
        const prizePoolWei = pred.prizePool;
        const volumeNumeric = parseFloat(ethers.formatEther(prizePoolWei));
        const totalVolume = `${volumeNumeric.toFixed(2)} ETH`;
        fetched.push({
          id: Number(pred.id),
          title: pred.question,
          category: "General", // No category in contract, default to General
          totalVolume,
          volumeNumeric,
          participants: totalParts,
          odds,
          endDate,
          timeLeft,
          timeLeftMs,
          endTime,
          status: pred.resolved ? "resolved" : (timeLeftMs > 0 && pred.active ? "active" : "inactive"),
          resolved: pred.resolved,
          active: pred.active,
        });
      }
      console.log("Fetched markets:", fetched);
      setMarkets(fetched);
    } catch (error) {
      console.error("Error fetching markets:", error);
      // Don't throw the error, just log it so the app doesn't crash
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  const filteredMarkets = markets.filter((market) => {
    const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || market.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    if (sortBy === "volume") {
      return b.volumeNumeric - a.volumeNumeric;
    } else if (sortBy === "participants") {
      return b.participants - a.participants;
    } else if (sortBy === "ending") {
      return a.endTime - b.endTime;
    } else if (sortBy === "newest") {
      return b.id - a.id;
    }
    return 0;
  })

  const activeMarkets = sortedMarkets.filter(market => market.status === "active")
  const endingMarkets = sortedMarkets.filter(market => market.status === "active" && market.timeLeftMs < 7 * 86400 * 1000)
  const resolvedMarkets = sortedMarkets.filter(market => market.resolved)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!window.ethereum) {
      console.error("Wallet not connected")
      return
    }
    
    setIsCreating(true)
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum as any)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(PrizePredictionContract.address, PrizePoolPredictionABI, signer)
      const options = ["Yes", "No"]
      const entryFeeWei = ethers.parseEther(entryFee || "0")
      const initialPrizeWei = ethers.parseEther(initialPrize || "0")
      const endUnix = Math.floor(new Date(endTime).getTime() / 1000)
      const resUnix = Math.floor(new Date(resolutionTime).getTime() / 1000)
      
      const tx = await contract.createPrediction(question, options, entryFeeWei, endUnix, resUnix, { value: initialPrizeWei })
      
      console.log("Transaction submitted:", tx.hash)
      
      // Wait for transaction to be mined
      const receipt = await tx.wait()
      console.log("Transaction confirmed:", receipt.hash)
      
      // Close dialog and reset form
      setIsOpen(false)
      setQuestion("")
      setEntryFee("")
      setInitialPrize("")
      setEndTime("")
      setResolutionTime("")
      
      // Add a small delay to ensure blockchain state is updated
      setTimeout(() => {
        console.log("Refetching markets after creation...");
        fetchMarkets()
      }, 3000) // 3 second delay to be safe
      
    } catch (err) {
      console.error("Transaction failed:", err)
      // You might want to show an error message to the user here
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Prediction Markets</h1>
            <p className="text-slate-300">Discover and bet on various prediction markets</p>
          </div>
          <Button
            onClick={() => fetchMarkets(true)}
            disabled={isRefreshing}
            variant="outline"
            className="border-slate-700 text-white hover:bg-slate-800"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
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

        {/* Create New Prediction Button */}
        <div className="flex justify-end mb-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-purple-700" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create New Prediction"}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 text-white">
              <DialogHeader>
                <DialogTitle>Create Prediction</DialogTitle>
                <DialogDescription>Fill in the details for your new prediction market.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <Label htmlFor="question">Question</Label>
                  <Input 
                    id="question" 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    className="bg-slate-700 text-white" 
                    required 
                    disabled={isCreating}
                  />
                </div>
                <div>
                  <Label htmlFor="entryFee">Entry Fee (ETH)</Label>
                  <Input 
                    id="entryFee" 
                    type="number" 
                    step="0.01" 
                    min="0.01" 
                    value={entryFee} 
                    onChange={(e) => setEntryFee(e.target.value)} 
                    className="bg-slate-700 text-white" 
                    required 
                    disabled={isCreating}
                  />
                </div>
                <div>
                  <Label htmlFor="initialPrize">Initial Prize Pool (ETH)</Label>
                  <Input 
                    id="initialPrize" 
                    type="number" 
                    step="0.01" 
                    min="0.01" 
                    value={initialPrize} 
                    onChange={(e) => setInitialPrize(e.target.value)} 
                    className="bg-slate-700 text-white" 
                    required 
                    disabled={isCreating}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input 
                    id="endTime" 
                    type="datetime-local" 
                    value={endTime} 
                    onChange={(e) => setEndTime(e.target.value)} 
                    className="bg-slate-700 text-white" 
                    required 
                    disabled={isCreating}
                  />
                </div>
                <div>
                  <Label htmlFor="resolutionTime">Resolution Time</Label>
                  <Input 
                    id="resolutionTime" 
                    type="datetime-local" 
                    value={resolutionTime} 
                    onChange={(e) => setResolutionTime(e.target.value)} 
                    className="bg-slate-700 text-white" 
                    required 
                    disabled={isCreating}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Market Tabs */}
        <Tabs defaultValue="active" className="mb-8">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="active" className="data-[state=active]:bg-blue-600">
              Active Markets ({activeMarkets.length})
            </TabsTrigger>
            <TabsTrigger value="ending" className="data-[state=active]:bg-blue-600">
              Ending Soon ({endingMarkets.length})
            </TabsTrigger>
            <TabsTrigger value="resolved" className="data-[state=active]:bg-blue-600">
              Resolved ({resolvedMarkets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <MarketCardSkeleton key={i} />
                ))}
              </div>
            ) : activeMarkets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeMarkets.map((market) => (
                  <MarketCard key={market.id} {...market} />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="No Active Markets"
                description="There are no active prediction markets at the moment. Check back later or create your own!"
              />
            )}
          </TabsContent>

          <TabsContent value="ending" className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <MarketCardSkeleton key={i} />
                ))}
              </div>
            ) : endingMarkets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {endingMarkets.map((market) => (
                  <MarketCard key={market.id} {...market} />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="No Markets Ending Soon"
                description="There are no markets ending in the next 7 days."
              />
            )}
          </TabsContent>

          <TabsContent value="resolved" className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <MarketCardSkeleton key={i} />
                ))}
              </div>
            ) : resolvedMarkets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resolvedMarkets.map((market) => (
                  <MarketCard key={market.id} {...market} />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="No Resolved Markets"
                description="There are no resolved markets yet."
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}