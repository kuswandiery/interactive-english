import type { QuizResult } from '@/types/quiz'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle2, XCircle, RefreshCw, ArrowLeft } from 'lucide-react'

interface QuizResultCardProps {
  result: QuizResult
  onRetake: () => void
  onBack: () => void
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function QuizResultCard({ result, onRetake, onBack }: QuizResultCardProps) {
  const { score, correct, wrong, skipped, total, passed } = result

  return (
    <Card className="mx-auto max-w-xl">
      <div className="flex flex-col items-center text-center">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full ${
            passed ? 'bg-success/15 text-success' : 'bg-error/15 text-error'
          }`}
        >
          <span className="font-heading text-3xl font-bold">{score}%</span>
        </div>
        <h2 className="mt-4 font-heading text-2xl font-bold text-secondary">
          {passed ? 'Congratulations, you passed!' : 'Keep practicing!'}
        </h2>
        <p className="mt-1 max-w-sm text-sm text-muted">
          {passed
            ? 'Great job on completing this quiz. Your score exceeds the passing threshold.'
            : 'You didn’t quite reach the passing score this time. Review the explanations and try again.'}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-md bg-slate-50 p-3 text-center">
          <p className="text-2xl font-bold text-success">{correct}</p>
          <p className="text-xs text-muted">Correct</p>
        </div>
        <div className="rounded-md bg-slate-50 p-3 text-center">
          <p className="text-2xl font-bold text-error">{wrong}</p>
          <p className="text-xs text-muted">Incorrect</p>
        </div>
        <div className="rounded-md bg-slate-50 p-3 text-center">
          <p className="text-2xl font-bold text-muted">{skipped}</p>
          <p className="text-xs text-muted">Skipped</p>
        </div>
        <div className="rounded-md bg-slate-50 p-3 text-center">
          <p className="text-2xl font-bold text-secondary">{total}</p>
          <p className="text-xs text-muted">Questions</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
        <Badge variant={passed ? 'success' : 'error'}>
          {passed ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <XCircle className="h-3.5 w-3.5" />
          )}
          {passed ? 'Passed' : 'Not passed'}
        </Badge>
        <span>Attempted {formatDate(result.date)}</span>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Back to Quizzes
        </Button>
        <Button onClick={onRetake}>
          <RefreshCw className="h-4 w-4" /> Retake Quiz
        </Button>
      </div>
    </Card>
  )
}