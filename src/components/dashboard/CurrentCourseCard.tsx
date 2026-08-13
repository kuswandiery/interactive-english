import { Link } from 'react-router-dom'
import { PlayCircle, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

function getProgress(completed: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((completed / total) * 100)
}

interface CurrentCourseCardProps {
  slug: string
  title: string
  level: string
  category: string
  tutor: string
  completedLessons: number
  totalLessons: number
  lastLesson: string
  continueTo?: string
}

export function CurrentCourseCard({
  slug,
  title,
  level,
  category,
  tutor,
  completedLessons,
  totalLessons,
  lastLesson,
  continueTo,
}: CurrentCourseCardProps) {
  const progress = getProgress(completedLessons, totalLessons)

  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-secondary">{title}</h3>
          <p className="text-sm text-muted">{tutor}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="outline">{level}</Badge>
          <span className="text-xs text-muted">{category}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-secondary">Course progress</span>
          <span className="font-bold text-primary">{progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          {completedLessons} of {totalLessons} lessons completed · {totalLessons - completedLessons}{' '}
          remaining
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-md bg-surface px-3 py-2 text-sm text-secondary">
        <BookOpen className="h-4 w-4 shrink-0 text-primary" />
        <span className="truncate">Last lesson: {lastLesson}</span>
      </div>

      <Link
        to={continueTo ?? `/student/lessons?course=${slug}`}
        className="mt-5 block"
      >
        <Button className="w-full">
          <PlayCircle className="h-4 w-4" /> Continue Learning
        </Button>
      </Link>
    </Card>
  )
}