import type { LucideIcon } from 'lucide-react'
import { TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface AdminStatCardProps {
  icon: LucideIcon
  label: string
  value: number
  prefix?: string
  trend?: number
  format?: (n: number) => string
}

export function AdminStatCard({ icon: Icon, label, value, prefix, trend, format }: AdminStatCardProps) {
  const display = format ? format(value) : value.toLocaleString()
  const hasTrend = typeof trend === 'number'

  return (
    <Card className="flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm text-muted">{label}</p>
        <p className="font-heading text-2xl font-bold text-secondary">
          {prefix && <span className="mr-0.5 text-sm font-normal text-muted">{prefix}</span>}
          {display}
        </p>
        {hasTrend && (
          <span className="flex items-center gap-1 text-xs font-medium text-success">
            <TrendingUp className="h-3.5 w-3.5" />
            {trend}% vs last month
          </span>
        )}
      </div>
    </Card>
  )
}