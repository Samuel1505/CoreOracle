"use client"

import { useState } from "react"
import { FAQItem } from "./FAQItem"

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
            <FAQItem 
              key={index} 
              faq={faq} 
              index={index}
              isExpanded={expandedFaq === index}
              onToggle={() => setExpandedFaq(expandedFaq === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}