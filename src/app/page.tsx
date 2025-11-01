"use client"

import { useState } from "react"
import { Header } from "@/components/home/Header"
import { HeroSection } from "@/components/home/HeroSection"
import { LiveActivityFeed } from "@/components/home/LiveActivityFeed"
import { HowItWorks } from "@/components/home/HowItWorks"
import { CategoryShowcase } from "@/components/home/CategoryShowcase"
import { PlatformStats } from "@/components/home/PlatformStats"
import { FeaturedMarkets } from "@/components/home/FeaturedMarkets"
import { RewardsLeaderboard } from "@/components/home/RewardsLeaderboard"
import { TrustSecurity } from "@/components/home/TrustSecurity"
import { Testimonials } from "@/components/home/Testimonials"
import { Community } from "@/components/home/Community"
import { FAQ } from "@/components/home/FAQ"
import { FinalCTA } from "@/components/home/FinalCTA"
import { Footer } from "@/components/home/Footer"
import {
  featuredMarkets,
  categories,
  liveActivity,
  howItWorksSteps,
  leaderboard,
  testimonials,
  faqs,
} from "@/data"

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      <HeroSection featuredMarkets={featuredMarkets} />
      <LiveActivityFeed liveActivity={liveActivity} />
      <HowItWorks steps={howItWorksSteps} />
      <CategoryShowcase categories={categories} />
      <PlatformStats />
      <FeaturedMarkets 
        markets={featuredMarkets} 
        categories={categories} 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <RewardsLeaderboard leaderboard={leaderboard} />
      <TrustSecurity />
      <Testimonials testimonials={testimonials} />
      <Community />
      <FAQ faqs={faqs} />
      <FinalCTA />
      <Footer />
    </div>
  )
}