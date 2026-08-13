export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Quiz {
  id: string
  courseSlug: string
  courseTitle: string
  title: string
  description: string
  duration: number
  passingScore: number
  questions: QuizQuestion[]
}

export interface QuizAnswer {
  questionId: string
  selected: number
}

export interface QuizResult {
  quizId: string
  score: number
  correct: number
  wrong: number
  skipped: number
  total: number
  passed: boolean
  answers: QuizAnswer[]
  date: string
}

export interface QuizStats {
  attempts: number
  bestScore: number
  lastScore: number | null
  passed: boolean
}