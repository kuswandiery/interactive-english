import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronUp, FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { QuizResultCard, QuizReview } from '@/components/quiz'
import { useQuiz } from '@/context/QuizContext'
import { getQuizById } from '@/data/quizzes'
import type { QuizResult } from '@/types/quiz'
import { cn } from '@/utils'

export default function QuizResultPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { getBestResult } = useQuiz()
  const [showReview, setShowReview] = useState(false)

  const quiz = getQuizById(quizId ?? '')
  const stateResult = (location.state as { result?: QuizResult } | null)?.result
  const result: QuizResult | undefined = stateResult ?? getBestResult(quizId ?? '')

  useEffect(() => {
    if (!result) {
      const t = window.setTimeout(() => navigate('/student/quiz', { replace: true }), 500)
      return () => window.clearTimeout(t)
    }
  }, [result, navigate])

  if (!quiz || !result) {
    return (
      <EmptyState
        icon={FileQuestion}
        title="No result found"
        description="Complete a quiz to see your results here."
        actionLabel="Browse Quizzes"
        actionTo="/student/quiz"
      />
    )
  }

  return (
    <div className="space-y-6">
      <QuizResultCard
        result={result}
        onRetake={() => navigate(`/student/quiz/${quiz.id}`, { replace: true })}
        onBack={() => navigate('/student/quiz')}
      />

      <Card className="mx-auto max-w-xl" padding="none">
        <button
          type="button"
          onClick={() => setShowReview((v) => !v)}
          aria-expanded={showReview}
          className="flex w-full items-center justify-between px-6 py-4 text-left"
        >
          <span className="font-heading text-lg font-semibold text-secondary">
            Review Answers & Explanations
          </span>
          {showReview ? (
            <ChevronUp className="h-5 w-5 text-muted" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted" />
          )}
        </button>
        <div className={cn('px-6 pb-6', !showReview && 'hidden')}>
          <QuizReview quiz={quiz} answers={result.answers} />
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(`/student/quiz/${quiz.id}`, { replace: true })}
            >
              Retake Quiz
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}