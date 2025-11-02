import { MarketCardSkeleton } from "../../components/markets/MarketCardSkeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-10 w-64 bg-slate-800 rounded-lg animate-pulse mb-2" />
          <div className="h-6 w-96 bg-slate-800 rounded-lg animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <MarketCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}