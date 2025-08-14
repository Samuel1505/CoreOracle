"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { TrendingUp, Wallet, Trophy, Clock, DollarSign, Target, Activity } from "lucide-react"
import Link from "next/link"
import { ethers } from 'ethers';
import PrizePoolPredictionABI from "../../app/abi/PrizePoolPrediction-abi.json";
import {PrizePredictionContract} from "../../app/abi/index";

export default function DashboardPage() {
  const [userAddress, setUserAddress] = useState("")
  const [userStats, setUserStats] = useState({
    totalBets: 0,
    activeBets: 0,
    winRate: 0,
    totalEarnings: "0",
    currentBalance: "0",
    rank: 0,
    totalUsers: 15420,
  })
  type Bet = {
    id: number;
    title: any;
    outcome: any;
    amount: string;
    currentOdds: string;
    potentialPayout: string;
    status: string;
    timeLeft: string;
    resolved: any;
    claimed: any;
    payout: string;
    timestamp: number;
  };

  const [activeBets, setActiveBets] = useState<Bet[]>([])
  const [historyBets, setHistoryBets] = useState<Bet[]>([])
  type RecentActivity = {
    type: string;
    payout?: string;
    market: any;
    outcome: any;
    amount: string;
    time: string;
  };
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [achievements, setAchievements] = useState([
    { name: "First Bet", description: "Placed your first prediction", earned: false },
    { name: "Lucky Streak", description: "Won 5 bets in a row", earned: false },
    { name: "High Roller", description: "Placed a bet over 100 CORE", earned: false },
    { name: "Oracle", description: "Achieved 80% win rate", earned: false },
  ])

  useEffect(() => {
    async function fetchData() {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
      const contract = new ethers.Contract(PrizePredictionContract.address, PrizePoolPredictionABI, provider);

      const stats = await contract.getUserStats(address);
      const rank = Number(await contract.getUserRank(address, "accuracy"));
      const balance = ethers.formatEther(await provider.getBalance(address));

      const ids = await contract.getUserParticipatedPredictions(address);
      const bets = [];
      const claimEvents = await contract.queryFilter(contract.filters.PrizesClaimed(null, address));
      type ClaimsMap = { [predictionId: string]: string };
      const claims: ClaimsMap = {};
      for (const event of claimEvents) {
        if ("args" in event && event.args) {
          claims[event.args.predictionId.toString()] = ethers.formatEther(event.args.amount);
        }
      }

      for (const id of ids) {
        const pred = await contract.getPrediction(id);
        const userPred = await contract.getUserPrediction(id, address);
        const optionStats = await contract.getAllOptionStats(id);
        const pot = await contract.calculatePotentialWinnings(id);
        const option = Number(userPred.option);
        const resolved = pred.resolved;
        const timeLeftMs = Number(pred.endTime) * 1000 - Date.now();
        const timeLeft = timeLeftMs > 0 ? `${Math.floor(timeLeftMs / 86400000)} days` : 'Ended';
        const currentOdds = (Number(optionStats.percentages[option]) / 100).toFixed(0) + '%';
        const potentialPayout = ethers.formatEther(pot[option]) + ' CORE';
        const amount = ethers.formatEther(pred.entryFee) + ' CORE';
        const status = resolved 
          ? (option == Number(pred.winningOption) ? 'won' : 'lost')
          : (Number(optionStats.percentages[option]) > 5000 ? 'winning' : 'losing');
        const claimed = userPred.claimed;
        const payout = claims[id] ? claims[id] + ' CORE' : '';
        const timestamp = Number(userPred.timestamp);
        bets.push({
          id: Number(id),
          title: pred.question,
          outcome: pred.options[option],
          amount,
          currentOdds,
          potentialPayout,
          status,
          timeLeft,
          resolved,
          claimed,
          payout,
          timestamp,
        });
      }
      bets.sort((a, b) => b.timestamp - a.timestamp);

      const active = bets.filter(b => !b.resolved);
      const history = bets.filter(b => b.resolved);

      setActiveBets(active);
      setHistoryBets(history);

      const recent = bets.slice(0, 5).map(b => ({
        type: "bet_placed",
        market: b.title,
        outcome: b.outcome,
        amount: b.amount,
        time: `${Math.floor((Date.now() / 1000 - b.timestamp) / 3600)} hours ago`,
        ...(b.resolved && b.status === 'won' && b.payout ? { type: 'bet_won', payout: b.payout } : {}),
      }));
      setRecentActivity(recent);

      setUserStats({
        totalBets: Number(stats.totalPredictions),
        activeBets: active.length,
        winRate: Number(stats.accuracyPercentage) / 100,
        totalEarnings: ethers.formatEther(stats.totalWinnings),
        currentBalance: balance,
        rank,
        totalUsers: 15420, // Static, as no way to fetch
      });

      setAchievements([
        { name: "First Bet", description: "Placed your first prediction", earned: Number(stats.totalPredictions) > 0 },
        { name: "Lucky Streak", description: "Won 5 bets in a row", earned: Number(stats.longestStreak) >= 5 },
        { name: "High Roller", description: "Placed a bet over 100 CORE", earned: false }, // Can't check easily
        { name: "Oracle", description: "Achieved 80% win rate", earned: Number(stats.accuracyPercentage) >= 8000 },
      ]);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-black-500 to-blue-500 rounded-lg flex items-center justify-center">
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
          <Button className="bg-blue-600 hover:bg-blue-700">
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
            <TabsTrigger value="active" className="data-[state=active]:bg-blue-600">
              Active Bets ({activeBets.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-600">
              Bet History
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-600">
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Bets */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Your Active Bets</h3>
                {activeBets.length === 0 ? (
                  <p className="text-slate-400">No active bets</p>
                ) : (
                  activeBets.map((bet) => (
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
                  ))
                )}
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {recentActivity.length === 0 ? (
                        <p className="text-slate-400">No recent activity</p>
                      ) : (
                        recentActivity.map((activity, index) => (
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
                                  +{(
                                    activity.payout
                                      ? (Number.parseFloat(activity.payout.split(" ")[0]) -
                                         Number.parseFloat(activity.amount.split(" ")[0]))
                                      : 0
                                  ).toFixed(2)} CORE
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {historyBets.length === 0 ? (
                <p className="text-slate-400">No bet history</p>
              ) : (
                historyBets.map((bet) => (
                  <Card key={bet.id} className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge
                          className={bet.status === "won" ? "bg-green-600" : "bg-red-600"}
                        >
                          {bet.status.toUpperCase()}
                        </Badge>
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
                          <span className="text-slate-300">Outcome</span>
                          <span className="text-white">{bet.status === "won" ? "Won" : "Lost"}</span>
                        </div>
                        {bet.status === "won" && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">Payout</span>
                            <span className="text-green-400 font-semibold">
                              {bet.claimed ? bet.payout : 'Not claimed'}
                            </span>
                          </div>
                        )}
                        {bet.status === "won" && !bet.claimed && (
                          <Button
                            onClick={async () => {
                              const provider = new ethers.BrowserProvider(window.ethereum as any);
                              const signer = await provider.getSigner();
                              const contract = new ethers.Contract(PrizePredictionContract.address, PrizePoolPredictionABI, signer);
                              const tx = await contract.claimPrize(bet.id);
                              await tx.wait();
                              // Refresh data
                              window.location.reload();
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            Claim Prize
                          </Button>
                        )}
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
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className={`bg-slate-800/50 border-slate-700 ${achievement.earned ? "ring-2 ring-blue-500/50" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned ? "bg-blue-600" : "bg-slate-700"
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