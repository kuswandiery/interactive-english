import { Card } from '@/components/ui/Card'
import { cn } from '@/utils'

interface MonthlyActivityItem {
  month: string
  label: string
  minutes: number
}

interface MonthlyProgressChartProps {
  data: MonthlyActivityItem[]
}

export function MonthlyProgressChart({ data }: MonthlyProgressChartProps) {
  const max = Math.max(...data.map((d) => d.minutes), 1)

  return (
    <Card>
      <h3 className="font-heading text-lg font-semibold text-secondary">Monthly Activity</h3>
      <p className="text-sm text-muted">Study hours over the past year</p>

      <div className="mt-6 flex h-48 items-end gap-1.5">
        {data.map((d) => {
          const height = Math.max(Math.round((d.minutes / max) * 100), 6)
          return (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-40 w-full items-end">
                <div
                  className="w-full rounded-t-sm bg-gradient-to-t from-primary to-blue-400 transition-all hover:from-primary hover:to-blue-500"
                  style={{ height: `${height}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-[10px] text-muted">{d.label}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
        <span className="text-muted">
          Total:{' '}
          <span className="font-semibold text-secondary">
            {Math.round(data.reduce((s, d) => s + d.minutes, 0) / 60)} hours
          </span>
        </span>
        <span className="text-muted">
          Peak:{' '}
          <span className={cn('font-semibold text-secondary')}>
            {Math.max(...data.map((d) => d.minutes))} min
          </span>
        </span>
      </div>
    </Card>
  )
}