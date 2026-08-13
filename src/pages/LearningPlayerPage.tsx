import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, Clock, CheckCircle2, BookX, BookOpen, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { VideoPlayer } from '@/components/learning/VideoPlayer'
import { LessonSidebar } from '@/components/learning/LessonSidebar'
import { LessonNavigation } from '@/components/learning/LessonNavigation'
import { RecommendedLessonCard } from '@/components/learning/RecommendedLessonCard'
import { LearningStats } from '@/components/learning/LearningStats'
import { useToast } from '@/components/ui/Toast'
import { useLearning } from '@/context/LearningContext'
import { studentCourses } from '@/data/studentCourses'

export default function LearningPlayerPage() {
  const { courseSlug = '', lessonId = '' } = useParams<{
    courseSlug: string
    lessonId: string
  }>()
  const navigate = useNavigate()
  const toast = useToast()
  const {
    getLesson,
    getCourseProgress,
    getCourseLessons,
    getStatus,
    toggleComplete,
    getContinueLesson,
    getRecommendedLesson,
    getCourseModules,
  } = useLearning()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 350)
    return () => window.clearTimeout(t)
  }, [])

  const course = studentCourses.find((c) => c.slug === courseSlug)
  const lesson = getLesson(lessonId)
  const validLesson = lesson && lesson.courseSlug === courseSlug ? lesson : undefined

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-72" />
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Skeleton className="h-[500px] w-full" />
          <div className="space-y-4">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <EmptyState
        icon={BookX}
        title="Course not found"
        description="The course you are looking for does not exist or you are not enrolled in it."
        actionLabel="Go to My Courses"
        actionTo="/student/courses"
      />
    )
  }

  if (!validLesson) {
    return (
      <EmptyState
        icon={BookX}
        title="Lesson not found"
        description="The lesson you are looking for could not be found in this course."
        actionLabel="Back to Course"
        actionTo={`/student/lessons?course=${courseSlug}`}
      />
    )
  }

  const status = getStatus(validLesson.id)
  const progress = getCourseProgress(courseSlug)
  const lessons = getCourseLessons(courseSlug)
  const index = lessons.findIndex((l) => l.id === validLesson.id)
  const prevLesson = index > 0 ? lessons[index - 1] : undefined
  const nextLesson = index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined
  const hasModules = getCourseModules(courseSlug).length > 0

  const recommended =
    getRecommendedLesson(courseSlug, validLesson.id) ??
    (getContinueLesson(courseSlug) ?? undefined)

  const handleToggleComplete = () => {
    const now = toggleComplete(validLesson.id)
    if (now === 'completed') {
      toast.success('Lesson completed successfully.', validLesson.title)
    } else {
      toast.info('Lesson marked as in progress.', validLesson.title)
    }
  }

  const goToLesson = (id: string) =>
    navigate(`/student/learn/${courseSlug}/${id}`)

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted">
        <Link to="/student/courses" className="hover:text-primary">
          My Courses
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link to={`/student/learn/${courseSlug}`} className="hover:text-primary">
          {course.title}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="truncate text-secondary">{validLesson.title}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <LessonSidebar
          courseSlug={courseSlug}
          activeLessonId={validLesson.id}
          onSelect={goToLesson}
        />

        <section aria-label="Lesson content" className={hasModules ? '' : 'lg:col-span-2'}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{course.level}</Badge>
            <Badge
              variant={
                status === 'completed' ? 'success' : status === 'in-progress' ? 'primary' : 'muted'
              }
            >
              {status === 'completed'
                ? 'Completed'
                : status === 'in-progress'
                  ? 'In Progress'
                  : 'Locked'}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted">
              <Clock className="h-4 w-4" /> {validLesson.duration} · Estimated duration
            </span>
          </div>

          <h1 className="mt-3 font-heading text-2xl font-bold text-secondary sm:text-3xl">
            {validLesson.title}
          </h1>
          <p className="mt-1 text-sm text-muted">{validLesson.moduleTitle}</p>

          <div className="mt-5">
            <VideoPlayer title={validLesson.title} status={status} />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-secondary">Course progress</span>
              <span className="font-bold text-primary">{progress.progress}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${Math.min(progress.progress, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted">
              {progress.completed} of {progress.total} lessons completed · {progress.remaining}{' '}
              remaining
            </p>
          </div>

          <Card className="mt-5 p-5">
            <div className="flex items-center gap-2 text-primary">
              <FileText className="h-5 w-5" />
              <h2 className="font-heading font-semibold text-secondary">About this lesson</h2>
            </div>
            <p className="mt-2 text-muted">{validLesson.description}</p>
            <div className="mt-4">
              <Button
                variant={status === 'completed' ? 'outline' : 'primary'}
                onClick={handleToggleComplete}
              >
                <CheckCircle2 className="h-4 w-4" />
                {status === 'completed' ? 'Mark as In Progress' : 'Mark as Completed'}
              </Button>
            </div>
          </Card>

          <div className="mt-5">
            {hasModules ? (
              <LessonNavigation
                onPrev={() => prevLesson && goToLesson(prevLesson.id)}
                onNext={() => nextLesson && goToLesson(nextLesson.id)}
                canPrev={Boolean(prevLesson)}
                canNext={Boolean(nextLesson)}
              />
            ) : (
              <p className="text-sm text-muted">This course has no other lessons in the curriculum.</p>
            )}
          </div>
        </section>
      </div>

      {recommended && (
        <section className="mt-2">
          <RecommendedLessonCard lesson={recommended} />
        </section>
      )}

      {!recommended && (
        <section className="mt-2">
          <EmptyState
            icon={BookOpen}
            title="No recommended lessons"
            description="You have completed all available lessons in this course."
          />
        </section>
      )}

      <section className="mt-4" aria-label="Learning statistics">
        <LearningStats
          learningHours="12.5h"
          lessonsCompleted={progress.completed}
          streak={7}
          activeCourses={studentCourses.length}
        />
      </section>
    </div>
  )
}