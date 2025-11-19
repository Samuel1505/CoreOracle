import { RefreshCw, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

interface TransactionStatusProps {
  status: "idle" | "pending" | "success" | "error"
  message: string
}

export function TransactionStatus({ status, message }: TransactionStatusProps) {
  if (status === "idle") return null

  const statusConfig = {
    pending: {
      bg: "bg-blue-600/10",
      border: "border-blue-600/30",
      text: "text-blue-300",
      icon: <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
    },
    success: {
      bg: "bg-green-600/10",
      border: "border-green-600/30",
      text: "text-green-300",
      icon: <CheckCircle2 className="w-5 h-5 text-green-400" />
    },
    error: {
      bg: "bg-red-600/10",
      border: "border-red-600/30",
      text: "text-red-300",
      icon: <XCircle className="w-5 h-5 text-red-400" />
    }
  }

  const config = statusConfig[status]

  return (
    <div className={`p-4 rounded-lg border ${config.bg} ${config.border} animate-fade-in`}>
      <div className="flex items-center space-x-3">
        {config.icon}
        <div className="flex-1">
          <p className={`text-sm font-medium ${config.text}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}