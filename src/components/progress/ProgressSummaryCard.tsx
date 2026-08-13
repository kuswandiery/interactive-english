import type { LucideIcon } from 'lucide-react'
import { PlayCircle, Layers, Clock, Flame } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { ProgressSummary } from '@/types/progress'

interface SummaryStat {
  icon: LucideIcon
  label: string
  value: string
  unit?: string
}

export function ProgressSummaryCard({ summary }: { summary: ProgressSummary }) {
  const stats: SummaryStat[] = [
    { icon: PlayCircle, label: 'Lessons Completed', value: String(summary.completedLessons), unit: `/${summary.totalLessons}` },
    { icon: Layers, label: 'Active Courses', value: String(summary.activeCourses) },
    { icon: Clock, label: 'Study Hours', value: String(summary.studyHours), unit: 'h' },
    { icon: Flame, label: 'Learning Streak', value: String(summary.streakDays), unit: 'd' },
  ]

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-secondary">Overall Progress</h3>
        <span className="font-heading text-3xl font-bold text-primary">{summary.overallProgress}%</span>
      </div>
      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500 transition-all"
          style={{ width: `${Math.min(summary.overallProgress, 100)}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-muted">
        {summary.completedLessons} of {summary.totalLessons} lessons completed across{' '}
        {summary.activeCourses} active courses.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, unit }) => (
          <div key={label} className="rounded-md bg-surface px-3 py-3 text-center">
            <Icon className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-1 font-heading text-xl font-bold text-secondary">
              {value}
              {unit && <span className="ml-0.5 text-xs font-normal text-muted">{unit}</span>}
            </p>
            <p className="text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}