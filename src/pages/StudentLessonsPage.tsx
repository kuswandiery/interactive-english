import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  PlayCircle,
  FileText,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lock,
  BookX,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { useToast } from '@/components/ui/Toast'
import { useLearning } from '@/context/LearningContext'
import { studentLessons } from '@/data/studentLessons'
import { cn } from '@/utils'

export default function StudentLessonsPage() {
  const [params] = useSearchParams()
  const toast = useToast()
  const courseFilter = params.get('course') ?? ''
  const { getStatus, toggleComplete, getCourseLessons } = useLearning()

  const [selectedId, setSelectedId] = useState<string>(() => {
    const pool = studentLessons
    if (courseFilter) {
      const match = pool.find((l) => l.courseSlug === courseFilter)
      if (match) return match.id
    }
    return pool.find((l) => l.status === 'in-progress')?.id ?? pool[0]?.id ?? ''
  })

  const selected = studentLessons.find((l) => l.id === selectedId)
  const selectedStatus = selected ? getStatus(selected.id) : undefined

  const list = useMemo(() => {
    const base = courseFilter
      ? getCourseLessons(courseFilter)
      : [...studentLessons].sort((a, b) => a.order - b.order)
    return base
  }, [courseFilter, getCourseLessons])

  const currentIndex = list.findIndex((l) => l.id === selectedId)
  const prevLesson = currentIndex > 0 ? list[currentIndex - 1] : undefined
  const nextLesson =
    currentIndex >= 0 && currentIndex < list.length - 1 ? list[currentIndex + 1] : undefined

  const toggle = () => {
    if (!selected) return
    const now = toggleComplete(selected.id)
    toast.success(
      now === 'completed'
        ? 'Lesson completed successfully.'
        : 'Lesson marked as in progress.',
      selected.title,
    )
  }

  if (studentLessons.length === 0) {
    return (
      <EmptyState
        icon={BookX}
        title="No lessons yet"
        description="You have no lessons yet. Enroll in a course to start learning."
        actionLabel="Browse Courses"
        actionTo="/courses"
      />
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="font-heading text-2xl font-bold text-secondary">Lessons</h1>
        <p className="mt-1 text-muted">
          {courseFilter
            ? 'Lessons for your selected course.'
            : 'Continue where you left off or review completed lessons.'}
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside>
          <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-muted">
            Lesson List
          </h2>
          <ul className="space-y-2">
            {list.map((lesson) => {
              const status = getStatus(lesson.id)
              const isActive = lesson.id === selectedId
              return (
                <li key={lesson.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(lesson.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-md border px-3 py-2.5 text-left transition',
                      isActive
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 bg-white hover:border-slate-300',
                      status === 'locked' && 'opacity-60',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                        status === 'completed'
                          ? 'bg-success/15 text-success'
                          : status === 'in-progress'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-slate-100 text-slate-400',
                      )}
                    >
                      {status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : status === 'in-progress' ? (
                        <PlayCircle className="h-4 w-4" />
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-secondary">
                        {lesson.title}
                      </span>
                      <span className="block text-xs text-muted">{lesson.duration}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <section aria-label="Lesson player">
          {selected && selectedStatus ? (
            <Card className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{selected.courseTitle}</Badge>
                <Badge
                  variant={
                    selectedStatus === 'completed'
                      ? 'success'
                      : selectedStatus === 'in-progress'
                        ? 'primary'
                        : 'muted'
                  }
                >
                  {selectedStatus === 'completed'
                    ? 'Completed'
                    : selectedStatus === 'in-progress'
                      ? 'In Progress'
                      : 'Locked'}
                </Badge>
              </div>

              <h2 className="mt-3 font-heading text-2xl font-bold text-secondary">
                {selected.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{selected.moduleTitle}</p>

              <div className="mt-5 flex aspect-video items-center justify-center rounded-md bg-gradient-to-br from-primary/15 to-primary/5">
                <button
                  type="button"
                  aria-label={`Play ${selected.title}`}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105"
                >
                  <PlayCircle className="h-8 w-8" />
                </button>
                <span className="sr-only">
                  Video placeholder{selectedStatus === 'locked' ? ' · locked' : ''}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-sm text-muted">
                  <FileText className="h-4 w-4" /> {selected.duration} · Downloadable material
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={toggle}>
                    <CheckCircle2 className="h-4 w-4" />
                    {selectedStatus === 'completed'
                      ? 'Mark as In Progress'
                      : 'Mark as Completed'}
                  </Button>
                  <Link to={`/student/learn/${selected.courseSlug}/${selected.id}`}>
                    <Button>
                      <PlayCircle className="h-4 w-4" /> Open
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                {prevLesson ? (
                  <Button variant="outline" onClick={() => setSelectedId(prevLesson.id)}>
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>
                ) : (
                  <Button variant="outline" disabled>
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>
                )}
                {nextLesson ? (
                  <Button onClick={() => setSelectedId(nextLesson.id)}>
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button disabled>
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <EmptyState
              icon={BookOpen}
              title="Select a lesson"
              description="Choose a lesson from the list to start learning."
            />
          )}
        </section>
      </div>

      <p className="text-xs text-muted">
        Video is a placeholder. Real video streaming is implemented in Phase 12.
      </p>
    </div>
  )
}