import { Card } from '@/components/ui/Card'

interface ProgressItem {
  title: string
  progress: number
  completedLessons: number
  totalLessons: number
}

interface ProgressOverviewProps {
  overall: number
  items: ProgressItem[]
}

export function ProgressOverview({ overall, items }: ProgressOverviewProps) {
  return (
    <Card className="h-full flex-col">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-secondary">Overall Progress</h3>
        <span className="font-heading text-2xl font-bold text-primary">{overall}%</span>
      </div>

      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500 transition-all"
          style={{ width: `${Math.min(overall, 100)}%` }}
        />
      </div>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.title}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-secondary">{item.title}</span>
              <span className="text-muted">
                {item.completedLessons}/{item.totalLessons} · {item.progress}%
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(item.progress, 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}