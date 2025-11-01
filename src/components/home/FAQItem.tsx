"use client"

import { Separator } from "@/components/ui/separator"
import { ChevronDown } from "lucide-react"

interface FAQItemProps {
  faq: {
    question: string
    answer: string
  }
  index: number
  isExpanded: boolean
  onToggle: () => void
}

export function FAQItem({ faq, isExpanded, onToggle }: FAQItemProps) {
  return (
    <div className="glass-card overflow-hidden">
      <button
        className="w-full p-6 text-left flex items-center justify-between hover:bg-background-card/50 transition-colors"
        onClick={onToggle}
      >
        <span className="text-text-primary font-semibold">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-text-secondary transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6">
          <Separator className="mb-4 bg-border" />
          <p className="text-text-secondary">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}