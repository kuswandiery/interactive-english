import { Users, BookOpen, UserRound, BadgeCheck } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { statistics } from '@/data/statistics'

const icons = {
  students: Users,
  courses: BookOpen,
  tutors: UserRound,
  rating: BadgeCheck,
} as const

export function StatisticsSection() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="container-page grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((stat) => (
          <StatCard
            key={stat.id}
            icon={icons[stat.id as keyof typeof icons] ?? Users}
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            trend={stat.trend}
          />
        ))}
      </div>
    </section>
  )
}