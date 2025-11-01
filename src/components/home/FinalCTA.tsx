import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-10"></div>
      <div className="container mx-auto text-center relative z-10">
        <h2 className="heading-xl text-text-primary mb-6">Ready to Start Predicting?</h2>
        <p className="body-lg text-text-secondary mb-10 max-w-2xl mx-auto">
          Join thousands of users earning rewards for accurate predictions on CoreOracle
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/markets">
            <Button size="lg" className="gradient-primary text-lg px-10 py-6 hover-glow">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 border-border text-text-secondary hover:bg-background-card bg-transparent"
            >
              View Dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center space-x-8 text-text-secondary">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-success mr-2" />
            <span>No KYC Required</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-success mr-2" />
            <span>Instant Payouts</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-success mr-2" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  )
}