import { useEffect, useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton'
import {
  ProgressSummaryCard,
  AchievementCard,
  WeeklyProgressChart,
  MonthlyProgressChart,
} from '@/components/progress'
import {
  mockProgressSummary,
  mockAchievements,
  mockWeeklyActivity,
  mockMonthlyActivity,
} from '@/data/progress'

export default function StudentProgressPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-72" />
        <SkeletonCard className="h-44 w-full" />
        <div className="grid gap-6 lg:grid-cols-2">
          <SkeletonCard className="h-80 w-full" />
          <SkeletonCard className="h-80 w-full" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-secondary lg:text-3xl">
          <BarChart3 className="h-8 w-8 text-primary" />
          Student Progress
        </h1>
        <p className="mt-1 text-muted">Track your learning journey, achievements, and study habits.</p>
      </section>

      <section>
        <ProgressSummaryCard summary={mockProgressSummary} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <WeeklyProgressChart data={mockWeeklyActivity} />
        <MonthlyProgressChart data={mockMonthlyActivity} />
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-secondary">Achievements</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockAchievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      </section>
    </div>
  )
}