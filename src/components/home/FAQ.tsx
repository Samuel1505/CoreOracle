"use client"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  faqs: FAQItem[]
}

export function FAQ({ faqs }: FAQProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-text-primary mb-4">Frequently Asked Questions</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need to know about CoreOracle
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card overflow-hidden">
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-background-card/50 transition-colors"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <span className="text-text-primary font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-text-secondary transition-transform ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-6">
                  <Separator className="mb-4 bg-border" />
                  <p className="text-text-secondary">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}