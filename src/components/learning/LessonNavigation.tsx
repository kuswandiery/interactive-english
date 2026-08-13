import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface LessonNavigationProps {
  prevLabel?: string
  nextLabel?: string
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
}

export function LessonNavigation({
  prevLabel = 'Previous',
  nextLabel = 'Next',
  onPrev,
  onNext,
  canPrev,
  canNext,
}: LessonNavigationProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" onClick={onPrev} disabled={!canPrev}>
        <ChevronLeft className="h-4 w-4" /> {prevLabel}
      </Button>
      <Button onClick={onNext} disabled={!canNext}>
        {nextLabel} <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}