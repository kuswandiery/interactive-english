import { Link } from 'react-router-dom'
import { Clock, PlayCircle, Sparkles } from 'lucide-react'
import type { StudentLesson } from '@/types/student'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface RecommendedLessonCardProps {
  lesson: StudentLesson
}

export function RecommendedLessonCard({ lesson }: RecommendedLessonCardProps) {
  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent">
          <Sparkles className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Recommended next lesson
          </p>
          <h3 className="mt-0.5 font-heading text-lg font-semibold text-secondary">
            {lesson.title}
          </h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-muted">
            <Clock className="h-4 w-4" /> {lesson.duration} · {lesson.courseTitle}
          </p>
        </div>
      </div>
      <Link to={`/student/learn/${lesson.courseSlug}/${lesson.id}`} className="shrink-0">
        <Button>
          <PlayCircle className="h-4 w-4" /> Continue
        </Button>
      </Link>
    </Card>
  )
}