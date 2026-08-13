import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { Quiz, QuizResult, QuizStats } from '@/types/quiz'

interface QuizContextValue {
  getQuizStats: (quizId: string) => QuizStats
  getAttempts: (quizId: string) => QuizResult[]
  getLastResult: (quizId: string) => QuizResult | undefined
  getBestResult: (quizId: string) => QuizResult | undefined
  recordAttempt: (result: QuizResult, quiz: Quiz) => QuizStats
}

const QuizContext = createContext<QuizContextValue | null>(null)

const EMPTY_STATS: QuizStats = { attempts: 0, bestScore: 0, lastScore: null, passed: false }

export function QuizProvider({ children }: { children: ReactNode }) {
  const [resultsByQuiz, setResultsByQuiz] = useState<Record<string, QuizResult[]>>({})

  const getAttempts = useCallback(
    (quizId: string) => resultsByQuiz[quizId] ?? [],
    [resultsByQuiz],
  )

  const getQuizStats = useCallback(
    (quizId: string): QuizStats => {
      const attempts = resultsByQuiz[quizId] ?? []
      if (attempts.length === 0) return EMPTY_STATS
      const bestScore = Math.max(...attempts.map((a) => a.score))
      const last = attempts[attempts.length - 1]
      return {
        attempts: attempts.length,
        bestScore,
        lastScore: last.score,
        passed: bestScore >= 0 && attempts.some((a) => a.passed),
      }
    },
    [resultsByQuiz],
  )

  const getLastResult = useCallback(
    (quizId: string) => {
      const attempts = resultsByQuiz[quizId] ?? []
      return attempts.length > 0 ? attempts[attempts.length - 1] : undefined
    },
    [resultsByQuiz],
  )

  const getBestResult = useCallback(
    (quizId: string) => {
      const attempts = resultsByQuiz[quizId] ?? []
      if (attempts.length === 0) return undefined
      return attempts.reduce((best, a) => (a.score > best.score ? a : best), attempts[0])
    },
    [resultsByQuiz],
  )

  const recordAttempt = useCallback((result: QuizResult, quiz: Quiz): QuizStats => {
    let stats: QuizStats = EMPTY_STATS
    setResultsByQuiz((prev) => {
      const existing = prev[quiz.id] ?? []
      const next = [...existing, result]
      const bestScore = Math.max(...next.map((a) => a.score))
      const last = next[next.length - 1]
      stats = {
        attempts: next.length,
        bestScore,
        lastScore: last.score,
        passed: next.some((a) => a.passed),
      }
      return { ...prev, [quiz.id]: next }
    })
    return stats
  }, [])

  const value: QuizContextValue = {
    getQuizStats,
    getAttempts,
    getLastResult,
    getBestResult,
    recordAttempt,
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export function useQuiz() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuiz must be used within a QuizProvider')
  return ctx
}