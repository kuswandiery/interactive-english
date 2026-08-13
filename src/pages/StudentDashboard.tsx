import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  BookOpen,
  PlayCircle,
  LayoutDashboard,
  FileQuestion,
  CalendarX,
  BellOff,
  ListChecks,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StatCard } from '@/components/dashboard/StatCard'
import { CurrentCourseCard } from '@/components/dashboard/CurrentCourseCard'
import { UpcomingLessonCard } from '@/components/dashboard/UpcomingLessonCard'
import { ActivityCard } from '@/components/dashboard/ActivityCard'
import { ProgressOverview } from '@/components/dashboard/ProgressOverview'
import { QuickActionCard } from '@/components/dashboard/QuickActionCard'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { CourseCard } from '@/components/course/CourseCard'
import { QuizCard } from '@/components/quiz'
import { useAuth } from '@/context/AuthContext'
import { useLearning } from '@/context/LearningContext'
import { useQuiz } from '@/context/QuizContext'
import { studentCourses } from '@/data/studentCourses'
import { studentActivities } from '@/data/studentActivities'
import { courses } from '@/data/courses'
import { getQuizzesByCourses } from '@/data/quizzes'

const upcomingLessons = [
  {
    title: 'Lesson 15: Asking for Directions',
    course: 'General English',
    date: 'Tomorrow',
    time: '9:00 AM',
  },
  {
    title: 'Lesson 10: Extended Speaking',
    course: 'English Conversation',
    date: 'Thu, Aug 20',
    time: '4:00 PM',
  },
  {
    title: 'Lesson 7: Negotiation Skills',
    course: 'Business English',
    date: 'Sat, Aug 22',
    time: '10:30 AM',
  },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { getCourseProgress, getContinueLesson } = useLearning()
  const { getQuizStats } = useQuiz()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  const overallProgress = useMemo(() => {
    const results = studentCourses.map((c) => getCourseProgress(c.slug))
    const total = results.reduce((sum, r) => sum + r.completed, 0)
    const all = results.reduce((sum, r) => sum + r.total, 0)
    if (all <= 0) return 0
    return Math.round((total / all) * 100)
  }, [getCourseProgress])

  const totalCompleted = useMemo(
    () => studentCourses.reduce((sum, c) => sum + getCourseProgress(c.slug).completed, 0),
    [getCourseProgress],
  )
  const totalLessons = useMemo(
    () => studentCourses.reduce((sum, c) => sum + getCourseProgress(c.slug).total, 0),
    [getCourseProgress],
  )

  const perCourseProgress = useMemo(
    () =>
      studentCourses.map((c) => {
        const p = getCourseProgress(c.slug)
        return {
          title: c.title,
          completedLessons: p.completed,
          totalLessons: p.total,
          progress: p.progress,
        }
      }),
    [getCourseProgress],
  )

  const recommended = useMemo(
    () => courses.filter((c) => !studentCourses.some((s) => s.slug === c.slug)).slice(0, 3),
    [],
  )

  const myQuizzes = useMemo(() => getQuizzesByCourses(studentCourses.map((c) => c.slug)), [])
  const quizStats = useMemo(
    () => myQuizzes.map((q) => ({ quiz: q, stats: getQuizStats(q.id) })),
    [myQuizzes, getQuizStats],
  )
  const quizzesTaken = quizStats.filter((q) => q.stats.attempts > 0)
  const quizzesPassed = quizStats.filter((q) => q.stats.passed).length

  const firstName = user?.name?.split(' ')[0] ?? 'Student'

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-3 w-96 max-w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-72 w-full lg:col-span-2" />
          <Skeleton className="h-72 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="font-heading text-2xl font-bold text-secondary lg:text-3xl">
          Welcome back, {firstName}!
        </h1>
        <p className="mt-1 text-muted">
          Keep up the great work. {totalLessons - totalCompleted} lessons remaining to reach your
          weekly goal.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Learning statistics">
        <StatCard icon={BookOpen} label="Enrolled Courses" value={studentCourses.length} />
        <StatCard icon={PlayCircle} label="Lessons Completed" value={totalCompleted} />
        <StatCard icon={ListChecks} label="Quizzes Taken" value={quizzesTaken.length} />
        <StatCard icon={FileQuestion} label="Quizzes Passed" value={quizzesPassed} />
      </section>

      <section aria-label="Quick actions">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionCard
            icon={LayoutDashboard}
            label="Browse Courses"
            description="Explore new English courses."
            to="/courses"
          />
          <QuickActionCard
            icon={PlayCircle}
            label="Resume Lesson"
            description="Continue your current lesson."
            to="/student/lessons"
          />
          <QuickActionCard
            icon={FileQuestion}
            label="Take a Quiz"
            description="Test your knowledge."
            to="/student/quiz"
          />
          <QuickActionCard
            icon={GraduationCap}
            label="View Certificates"
            description="See your achievements."
            to="/student"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3" aria-label="Courses and progress">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-secondary">Current Courses</h2>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {studentCourses.length > 0 ? (
              studentCourses.map((c) => {
                const continueLesson = getContinueLesson(c.slug)
                return (
                  <CurrentCourseCard
                    key={c.id}
                    slug={c.slug}
                    title={c.title}
                    level={c.level}
                    category={c.category}
                    tutor={c.tutor}
                    completedLessons={getCourseProgress(c.slug).completed}
                    totalLessons={getCourseProgress(c.slug).total}
                    lastLesson={c.lastLesson}
                    continueTo={
                      continueLesson
                        ? `/student/learn/${c.slug}/${continueLesson.id}`
                        : undefined
                    }
                  />
                )
              })
            ) : (
              <EmptyState
                icon={BookOpen}
                title="No courses enrolled"
                description="You haven't enrolled in any courses yet. Explore the catalog to get started."
                actionLabel="Explore Courses"
                actionTo="/courses"
              />
            )}
          </div>
        </div>

        <ProgressOverview overall={overallProgress} items={perCourseProgress} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-secondary">Upcoming Lessons</h2>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingLessons.length > 0 ? (
              upcomingLessons.map((l) => (
                <UpcomingLessonCard
                  key={l.title}
                  title={l.title}
                  course={l.course}
                  date={l.date}
                  time={l.time}
                />
              ))
            ) : (
              <EmptyState
                icon={CalendarX}
                title="No upcoming lessons"
                description="You have no scheduled lessons. Check back later."
              />
            )}
          </div>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-secondary">Recent Activity</h2>
          {studentActivities.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {studentActivities.map((a) => (
                <ActivityCard
                  key={a.id}
                  title={a.title}
                  description={a.description}
                  date={a.date}
                  type={a.type}
                />
              ))}
            </ul>
          ) : (
            <div className="mt-4">
              <EmptyState
                icon={BellOff}
                title="No activities yet"
                description="Your recent activity will appear here."
              />
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold text-secondary">Your Quizzes</h2>
          <Link to="/student/quiz">
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </Link>
        </div>
        {quizStats.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quizStats.map(({ quiz, stats }) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                stats={stats}
                onStart={(id) => navigate(`/student/quiz/${id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              icon={FileQuestion}
              title="No quizzes yet"
              description="Quizzes tied to your courses will appear here."
            />
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold text-secondary">
            Recommended for You
          </h2>
          <Button variant="ghost" size="sm">
            Browse all
          </Button>
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((c) => (
            <CourseCard
              key={c.id}
              id={c.id}
              slug={c.slug}
              title={c.title}
              level={c.level}
              shortDescription={c.shortDescription}
              tutor={c.tutor}
              lessons={c.lessons}
              duration={c.duration}
              rating={c.rating}
              reviewCount={c.reviewCount}
              price={c.price}
              originalPrice={c.originalPrice}
              category={c.category}
              popular={c.popular}
            />
          ))}
        </div>
      </section>
    </div>
  )
}