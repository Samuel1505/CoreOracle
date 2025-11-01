"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Trophy, ChevronRight } from "lucide-react"

interface LeaderboardUser {
  rank: number
  user: string
  avatar: string
  earnings: string
  accuracy: string
}

interface RewardsLeaderboardProps {
  leaderboard: LeaderboardUser[]
}

export function RewardsLeaderboard({ leaderboard }: RewardsLeaderboardProps) {
  const tiers = [
    { tier: "Bronze", min: "0", icon: Award, color: "from-orange-700 to-orange-500" },
    { tier: "Silver", min: "1,000", icon: Award, color: "from-gray-400 to-gray-300" },
    { tier: "Gold", min: "5,000", icon: Award, color: "from-yellow-500 to-yellow-300" },
    { tier: "Platinum", min: "10,000", icon: Award, color: "from-cyan-500 to-blue-500" },
    { tier: "Diamond", min: "25,000", icon: Award, color: "from-purple-500 to-pink-500" },
  ]

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Rewards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10">
              <h2 className="heading-lg text-text-primary mb-4">Earn Rewards</h2>
              <p className="text-text-secondary text-lg">
                Climb the ranks and unlock exclusive rewards
              </p>
            </div>

            <div className="space-y-4">
              {tiers.map((tier, index) => {
                const Icon = tier.icon
                return (
                  <motion.div 
                    key={tier.tier} 
                    className="glass-card p-5 hover-lift cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, x: 10 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className={`w-14 h-14 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-text-primary font-bold text-lg">{tier.tier} Tier</h3>
                          <p className="text-text-secondary text-sm">{tier.min}+ CORE earned</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-text-secondary" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10">
              <h2 className="heading-lg text-text-primary mb-4">Top Predictors</h2>
              <p className="text-text-secondary text-lg">
                Compete with the best and earn your spot
              </p>
            </div>

            <div className="glass-card-intense p-7">
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <motion.div 
                    key={user.rank} 
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-background-card/50 transition-all cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.6)" }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base shadow-lg ${
                          user.rank === 1 ? "bg-gradient-to-br from-yellow-500 to-yellow-300 text-white" :
                          user.rank === 2 ? "bg-gradient-to-br from-gray-400 to-gray-300 text-white" :
                          user.rank === 3 ? "bg-gradient-to-br from-orange-700 to-orange-500 text-white" :
                          "bg-background-card text-text-secondary"
                        }`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.4 }}
                      >
                        {user.rank}
                      </motion.div>
                      <Avatar className="w-11 h-11 ring-2 ring-primary/20">
                        <AvatarImage src={user.avatar} alt={user.user} />
                        <AvatarFallback>{user.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-text-primary font-bold">{user.user}</p>
                        <p className="text-text-secondary text-sm">{user.accuracy} accuracy</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold text-lg">{user.earnings}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/leaderboard">
                <Button className="w-full mt-8 gradient-primary hover-glow-intense font-semibold py-6 text-base">
                  View Full Leaderboard
                  <Trophy className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}