"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LeaderboardEntryProps {
  user: {
    rank: number
    user: string
    avatar: string
    earnings: string
    accuracy: string
  }
  index: number
}

export function LeaderboardEntry({ user, index }: LeaderboardEntryProps) {
  return (
    <motion.div 
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
  )
}