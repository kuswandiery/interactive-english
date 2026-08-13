import { ArrowRight, Clock, ListChecks, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Quiz, QuizStats } from '@/types/quiz'

interface QuizCardProps {
  quiz: Quiz
  stats: QuizStats
  onStart: (id: string) => void
}

export function QuizCard({ quiz, stats, onStart }: QuizCardProps) {
  const { attempts, bestScore, passed } = stats
  const completed = attempts > 0

  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <Badge variant="muted">{quiz.courseTitle}</Badge>
        {completed && (
          <Badge variant={passed ? 'success' : 'warning'}>
            {passed ? 'Passed' : 'Best'} {bestScore}%
          </Badge>
        )}
      </div>

      <h3 className="mt-3 font-heading text-lg font-semibold text-secondary">{quiz.title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{quiz.description}</p>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <ListChecks className="h-4 w-4" />
          {quiz.questions.length} questions
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {quiz.duration} min
        </span>
        <span>Pass: {quiz.passingScore}%</span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        {completed ? (
          <span className="text-xs text-muted">{attempts} attempt{attempts > 1 ? 's' : ''} taken</span>
        ) : (
          <span className="text-xs text-muted">Not attempted yet</span>
        )}
        <Button size="sm" onClick={() => onStart(quiz.id)}>
          {completed ? (
            <>
              <RotateCcw className="h-4 w-4" /> Retake
            </>
          ) : (
            <>
              Start Quiz <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}