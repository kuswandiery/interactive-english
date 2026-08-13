import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/dashboard/EmptyState'
import {
  QuizQuestion,
  QuizProgress,
  QuizQuestionDots,
  QuizTimer,
} from '@/components/quiz'
import { useQuiz } from '@/context/QuizContext'
import { useToast } from '@/components/ui/Toast'
import { getQuizById } from '@/data/quizzes'
import type { QuizAnswer, QuizResult } from '@/types/quiz'

export default function QuizPlayerPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const toast = useToast()
  const { recordAttempt } = useQuiz()

  const quiz = getQuizById(quizId ?? '')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [startedAt, setStartedAt] = useState<string | null>(null)

  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const [confirmAbort, setConfirmAbort] = useState(false)

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (!quiz) return
      setAnswers((prev) => {
        const existing = prev.find((a) => a.questionId === quiz.questions[current].id)
        if (existing) {
          return prev.map((a) =>
            a.questionId === quiz.questions[current].id ? { ...a, selected: optionIndex } : a,
          )
        }
        return [...prev, { questionId: quiz.questions[current].id, selected: optionIndex }]
      })
    },
    [quiz, current],
  )

  useEffect(() => {
    setStartedAt(prev => prev ?? new Date().toISOString())
    return () => {
      setStartedAt(null)
      setAnswers([])
      setCurrent(0)
    }
  }, [quizId])

  if (!quiz) {
    return (
      <div className="space-y-6">
        <EmptyState
          icon={FileQuestion}
          title="Quiz not found"
          description="We couldn’t find that quiz. It may have been removed."
          actionLabel="Back to Quizzes"
          actionTo="/student/quiz"
        />
      </div>
    )
  }

  const submitQuiz = (type: 'submit' | 'timeout') => {
    if (!quiz || !startedAt) return
    const total = quiz.questions.length
    const correct = quiz.questions.filter(
      (q) => answers.find((a) => a.questionId === q.id)?.selected === q.correctAnswer,
    ).length
    const skipped = quiz.questions.filter(
      (q) => answers.find((a) => a.questionId === q.id) === undefined,
    ).length
    const score = total > 0 ? Math.round((correct / total) * 100) : 0
    const passed = score >= quiz.passingScore

    const result: QuizResult = {
      quizId: quiz.id,
      score,
      correct,
      wrong: total - correct - skipped,
      skipped,
      total,
      passed,
      answers,
      date: new Date().toISOString(),
    }
    recordAttempt(result, quiz)
    if (type === 'timeout') toast.warning('Time is up!', 'Your quiz was submitted automatically.')
    navigate(`/student/quiz/${quiz.id}/result`, {
      replace: true,
      state: { result },
    })
  }

  const handleSubmitClick = () => {
    const unanswered = quiz.questions.some(
      (q) => answers.find((a) => a.questionId === q.id) === undefined,
    )
    if (unanswered) {
      setConfirmSubmit(true)
      return
    }
    submitQuiz('submit')
  }

  const onCurrentAnswer = answers.find(
    (a) => a.questionId === quiz.questions[current].id,
  )?.selected ?? null

  const answeredFlags = quiz.questions.map(
    (q) => answers.find((a) => a.questionId === q.id) !== undefined,
  )
  const answeredCount = answeredFlags.filter(Boolean).length

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold text-secondary">{quiz.title}</h1>
          <p className="text-sm text-muted">
            {quiz.courseTitle} · {quiz.questions.length} questions · {quiz.duration} min
          </p>
        </div>
        <div className="flex items-center gap-3">
          <QuizTimer minutes={quiz.duration} onTimeout={() => submitQuiz('timeout')} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (startedAt && answeredCount > 0) setConfirmAbort(true)
              else navigate('/student/quiz')
            }}
          >
            Quit
          </Button>
        </div>
      </header>

      <Card className="p-6">
        <QuizProgress current={current} total={quiz.questions.length} />
        <div className="mt-5">
          <QuizQuestion
            question={quiz.questions[current]}
            index={current}
            selected={onCurrentAnswer}
            onSelect={handleSelect}
          />
        </div>
      </Card>

      <Card padding="sm">
        <QuizQuestionDots
          total={quiz.questions.length}
          answered={answeredFlags}
          current={current}
          onJump={(i) => setCurrent(i)}
        />
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="outline"
            disabled={current === 0}
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          <span className="text-sm text-muted">
            {answeredCount} of {quiz.questions.length} answered
          </span>
          {current < quiz.questions.length - 1 ? (
            <Button onClick={() => setCurrent((c) => Math.min(quiz.questions.length - 1, c + 1))}>
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmitClick}>
              <CheckCircle2 className="h-4 w-4" /> Submit Quiz
            </Button>
          )}
        </div>
      </Card>

      <Modal
        open={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
        title="You have unanswered questions"
        description={`${quiz.questions.length - answeredCount} question(s) have no answer. You can go back, or submit anyway and they will be marked as skipped.`}
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmSubmit(false)}>
              Go Back
            </Button>
            <Button onClick={() => { setConfirmSubmit(false); submitQuiz('submit') }}>
              Submit Anyway
            </Button>
          </>
        }
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {quiz.questions.map((q, i) => {
            const has = answers.find((a) => a.questionId === q.id) !== undefined
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => { setCurrent(i); setConfirmSubmit(false) }}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-left text-sm ${
                  has
                    ? 'border-slate-200 text-muted'
                    : 'border-error/40 bg-error/5 font-medium text-error'
                }`}
              >
                <span className="w-4 font-semibold">{i + 1}</span>
                <span className="truncate">{has ? 'Answered' : 'Unanswered'}</span>
              </button>
            )
          })}
        </div>
      </Modal>

      <Modal
        open={confirmAbort}
        onClose={() => setConfirmAbort(false)}
        title="Abort quiz?"
        description="You have attempted questions but haven't submitted. Your progress will be lost if you quit now."
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmAbort(false)}>
              Keep Going
            </Button>
            <Button variant="danger" onClick={() => navigate('/student/quiz')}>
              Quit Quiz
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          Any questions you answered will not count toward your results unless you submit.
        </p>
      </Modal>
    </div>
  )
}