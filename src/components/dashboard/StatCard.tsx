import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/utils'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number
  unit?: string
  trend?: number
  trendDirection?: 'up' | 'down'
}

export function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  trendDirection = 'up',
}: StatCardProps) {
  const hasTrend = typeof trend === 'number'
  const TrendingIcon = hasTrend && trendDirection === 'down' ? TrendingDown : TrendingUp

  return (
    <Card className="flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm text-muted">{label}</p>
        <p className="font-heading text-2xl font-bold text-secondary">
          {value.toLocaleString()}
          {unit && <span className="ml-0.5 text-sm font-normal text-muted">{unit}</span>}
        </p>
        {hasTrend && (
          <span
            className={cn(
              'mt-0.5 flex items-center gap-1 text-xs font-medium',
              trendDirection === 'down' ? 'text-error' : 'text-success',
            )}
          >
            <TrendingIcon className="h-3.5 w-3.5" />
            {trend}%
          </span>
        )}
      </div>
    </Card>
  )
}