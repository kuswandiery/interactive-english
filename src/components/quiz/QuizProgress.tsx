import { cn } from '@/utils'

interface QuizProgressProps {
  current: number
  total: number
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-secondary">
          Question {Math.min(current + 1, total)} of {total}
        </span>
        <span className="text-muted">{pct}% complete</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  )
}

interface QuizQuestionDotsProps {
  total: number
  answered: boolean[]
  current: number
  onJump?: (index: number) => void
}

export function QuizQuestionDots({ total, answered, current, onJump }: QuizQuestionDotsProps) {
  return (
    <nav aria-label="Question navigation" className="flex flex-wrap gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const isCurrent = i === current
        const isAnswered = answered[i]
        return (
          <button
            key={i}
            type="button"
            onClick={() => onJump?.(i)}
            aria-current={isCurrent ? 'step' : undefined}
            aria-label={`Question ${i + 1}${isAnswered ? ', answered' : ', not answered'}`}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold transition',
              isCurrent && 'bg-primary text-white ring-2 ring-primary/30',
              !isCurrent && isAnswered && 'bg-success/20 text-success',
              !isCurrent && !isAnswered && 'bg-slate-100 text-muted hover:bg-slate-200',
            )}
          >
            {i + 1}
          </button>
        )
      })}
    </nav>
  )
}