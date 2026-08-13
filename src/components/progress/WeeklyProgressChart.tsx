import { Card } from '@/components/ui/Card'
import type { WeeklyActivityDay } from '@/types/progress'

interface WeeklyProgressChartProps {
  data: WeeklyActivityDay[]
  highlightToday?: boolean
}

export function WeeklyProgressChart({ data, highlightToday = true }: WeeklyProgressChartProps) {
  const max = Math.max(...data.map((d) => d.minutes), 1)
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

  return (
    <Card>
      <h3 className="font-heading text-lg font-semibold text-secondary">Weekly Activity</h3>
      <p className="text-sm text-muted">Minutes studied this week</p>

      <div className="mt-6 flex h-48 items-end justify-between gap-2">
        {data.map((d, i) => {
          const height = Math.max(Math.round((d.minutes / max) * 100), 4)
          const isToday = highlightToday && i === todayIndex
          return (
            <div key={d.day} className="flex flex-1 flex-col items-center">
              <div className="flex h-40 w-full items-end">
                <div
                  className={`w-full rounded-t-md transition-all ${
                    isToday ? 'bg-primary' : 'bg-primary/40 hover:bg-primary/60'
                  }`}
                  style={{ height: `${height}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className={`mt-2 text-xs ${isToday ? 'font-bold text-primary' : 'text-muted'}`}>
                {d.day}
              </span>
            </div>
          )
        })}
      </div>

      <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
        {data.map((d, i) => (
          <li key={d.day} className="flex items-center justify-between">
            <span className="text-muted">
              {d.day}
              {i === todayIndex ? ' (Today)' : ''}
            </span>
            <span className="font-medium text-secondary">
              {d.minutes} min · {d.lessons} lesson{d.lessons !== 1 ? 's' : ''}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}