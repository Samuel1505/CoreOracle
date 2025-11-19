import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export function MarketCardSkeleton() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-5 w-20 bg-slate-700" />
          <Skeleton className="h-4 w-16 bg-slate-700" />
        </div>
        <Skeleton className="h-6 w-full bg-slate-700 mb-2" />
        <Skeleton className="h-4 w-32 bg-slate-700" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24 bg-slate-700" />
            <Skeleton className="h-4 w-20 bg-slate-700" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-20 bg-slate-700 rounded-lg" />
            <Skeleton className="h-20 bg-slate-700 rounded-lg" />
          </div>
          <Skeleton className="h-10 w-full bg-slate-700 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}