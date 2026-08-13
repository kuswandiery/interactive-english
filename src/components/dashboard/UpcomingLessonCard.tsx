import { Calendar, Clock, PlayCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface UpcomingLessonCardProps {
  title: string
  course: string
  date: string
  time: string
  onStart?: () => void
}

export function UpcomingLessonCard({ title, course, date, time, onStart }: UpcomingLessonCardProps) {
  return (
    <Card className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Calendar className="h-5 w-5" />
        </span>
        <div>
          <h4 className="font-heading font-semibold text-secondary">{title}</h4>
          <p className="text-sm text-muted">{course}</p>
          <p className="mt-1 flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {time}
            </span>
          </p>
        </div>
      </div>
      {onStart && (
        <Button variant="outline" size="sm" onClick={onStart}>
          <PlayCircle className="h-4 w-4" /> Start
        </Button>
      )}
    </Card>
  )
}