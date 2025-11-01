"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, Trophy } from "lucide-react"
import { RewardTier } from "./RewardTier"
import { LeaderboardEntry } from "./LeaderboardEntry"

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
              {tiers.map((tier, index) => (
                <RewardTier key={tier.tier} tier={tier} index={index} />
              ))}
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
                  <LeaderboardEntry key={user.rank} user={user} index={index} />
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