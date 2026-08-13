import { Clock, PlayCircle, Flame, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface LearningStatsProps {
  learningHours: string
  lessonsCompleted: number
  streak: number
  activeCourses: number
}

export function LearningStats({
  learningHours,
  lessonsCompleted,
  streak,
  activeCourses,
}: LearningStatsProps) {
  const items = [
    { label: 'Total learning hours', value: learningHours, icon: Clock, color: 'bg-primary/10 text-primary' },
    { label: 'Lessons completed', value: String(lessonsCompleted), icon: PlayCircle, color: 'bg-success/15 text-success' },
    { label: 'Current streak', value: `${streak} days`, icon: Flame, color: 'bg-accent/15 text-accent' },
    { label: 'Active courses', value: String(activeCourses), icon: BookOpen, color: 'bg-error/15 text-error' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.label} className="flex items-center gap-3">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${item.color}`}
            >
              <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-muted">{item.label}</p>
              <p className="font-heading text-xl font-bold text-secondary">{item.value}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}