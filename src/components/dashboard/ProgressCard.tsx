import { PlayCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface ProgressCardData {
  course: string
  progress: number
  completedLessons: number
  totalLessons: number
}

export function ProgressCard({ course, progress, completedLessons, totalLessons }: ProgressCardData) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading font-semibold text-secondary">{course}</h3>
        <span className="shrink-0 text-sm font-bold text-primary">{progress}%</span>
      </div>

      <div className="mt-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted">
          {completedLessons} of {totalLessons} lessons completed
        </p>
      </div>

      <Button className="mt-5">
        <PlayCircle className="h-4 w-4" />
        Continue Learning
      </Button>
    </Card>
  )
}