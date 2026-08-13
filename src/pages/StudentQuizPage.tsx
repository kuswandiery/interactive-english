import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileQuestion, BookOpen } from 'lucide-react'
import { QuizCard } from '@/components/quiz/QuizCard'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { useQuiz } from '@/context/QuizContext'
import { getQuizzesByCourses } from '@/data/quizzes'
import { studentCourses } from '@/data/studentCourses'

export default function StudentQuizPage() {
  const navigate = useNavigate()
  const { getQuizStats } = useQuiz()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  const quizzes = getQuizzesByCourses(studentCourses.map((c) => c.slug))

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonCard className="h-40 w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-secondary lg:text-3xl">
          <FileQuestion className="h-8 w-8 text-primary" />
          Quizzes
        </h1>
        <p className="mt-1 text-muted">
          Test what you’ve learned. Each quiz is tied to one of your courses.
        </p>
      </section>

      {quizzes.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              stats={getQuizStats(quiz.id)}
              onStart={(id) => navigate(`/student/quiz/${id}`)}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No quizzes available"
          description="Quizzes will appear here once tied to your enrolled courses."
          actionLabel="Go to My Courses"
          actionTo="/student/courses"
        />
      )}
    </div>
  )
}