import type React from "react"
import type { Metadata } from "next"
import { Pridi } from "next/font/google"
import { headers } from 'next/headers'
import ContextProvider from "../context/index"
import "./globals.css"

const pridi = Pridi({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-pridi",
})

export const metadata: Metadata = {
  title: "CoreOracle",
  description: "Predict the Future, Earn Rewards.",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en">
      <body className={`${pridi.variable} font-sans`}>
        <ContextProvider cookies={cookies}>
          {children}
        </ContextProvider>

      </body>
    </html>
  )
}