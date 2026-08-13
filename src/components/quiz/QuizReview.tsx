import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { Quiz, QuizAnswer } from '@/types/quiz'

interface QuizReviewProps {
  quiz: Quiz
  answers: QuizAnswer[]
}

export function QuizReview({ quiz, answers }: QuizReviewProps) {
  return (
    <ol className="space-y-4">
      {quiz.questions.map((question, index) => {
        const answer = answers.find((a) => a.questionId === question.id)
        const selected = answer?.selected ?? null
        const isCorrect = selected === question.correctAnswer
        const isSkipped = selected === null

        return (
          <li key={question.id} className="rounded-md border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-secondary">
                <span className="mr-1 text-primary">{index + 1}.</span> {question.question}
              </p>
              {isSkipped ? (
                <Badge variant="muted">
                  <MinusCircle className="h-3.5 w-3.5" /> Skipped
                </Badge>
              ) : isCorrect ? (
                <Badge variant="success">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                </Badge>
              ) : (
                <Badge variant="error">
                  <XCircle className="h-3.5 w-3.5" /> Incorrect
                </Badge>
              )}
            </div>

            <ul className="mt-3 space-y-1.5">
              {question.options.map((option, i) => {
                const isThisCorrect = i === question.correctAnswer
                const isThisSelected = i === selected
                return (
                  <li
                    key={i}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                      isThisCorrect
                        ? 'bg-success/10 text-success'
                        : isThisSelected
                          ? 'bg-error/10 text-error'
                          : 'text-muted'
                    }`}
                  >
                    <span className="w-4 shrink-0 font-semibold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span
                      className={
                        isThisCorrect || isThisSelected
                          ? 'font-medium text-secondary'
                          : undefined
                      }
                    >
                      {option}
                    </span>
                    {isThisCorrect && (
                      <span className="ml-auto flex items-center gap-1 text-xs font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Correct answer
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>

            <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-sm text-muted">
              <span className="font-semibold text-secondary">Why?</span> {question.explanation}
            </p>
          </li>
        )
      })}
    </ol>
  )
}