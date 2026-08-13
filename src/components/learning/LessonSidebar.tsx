import { useEffect, useState } from 'react'
import { CheckCircle2, PlayCircle, Lock, ListVideo, X } from 'lucide-react'
import type { LessonStatus } from '@/types/student'
import { useLearning } from '@/context/LearningContext'
import { cn } from '@/utils'

interface LessonSidebarProps {
  courseSlug: string
  activeLessonId: string
  onSelect: (lessonId: string) => void
}

function statusIcon(status: LessonStatus) {
  if (status === 'completed') return CheckCircle2
  if (status === 'in-progress') return PlayCircle
  return Lock
}

function CurriculumList({
  courseSlug,
  activeLessonId,
  onSelect,
}: LessonSidebarProps) {
  const { getCourseModules, getCourseLessons, getStatus } = useLearning()
  const modules = getCourseModules(courseSlug)
  const lessons = getCourseLessons(courseSlug)

  if (modules.length === 0) {
    return <p className="px-1 text-sm text-muted">No lessons available for this course.</p>
  }

  return (
    <div className="space-y-5">
      {modules.map((module) => {
        const moduleLessons = module.lessonIds
          .map((id) => lessons.find((l) => l.id === id))
          .filter((l): l is NonNullable<typeof l> => Boolean(l))

        return (
          <section key={module.id}>
            <h3 className="mb-2 pl-1 text-xs font-semibold uppercase tracking-wide text-muted">
              {module.title}
            </h3>
            <ul className="space-y-1.5">
              {moduleLessons.map((lesson) => {
                const status = getStatus(lesson.id)
                const isActive = lesson.id === activeLessonId
                const Icon = statusIcon(status)
                return (
                  <li key={lesson.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(lesson.id)}
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
                        <Icon className="h-4 w-4" />
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
          </section>
        )
      })}
    </div>
  )
}

export function LessonSidebar({ courseSlug, activeLessonId, onSelect }: LessonSidebarProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Open curriculum"
        className="mb-4 flex w-full items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-secondary lg:hidden"
      >
        <ListVideo className="h-5 w-5 text-primary" /> Course Curriculum
      </button>

      {/* Desktop static sidebar */}
      <aside aria-label="Course curriculum" className="hidden lg:block">
        <div className="rounded-md border border-slate-200 bg-surface p-4">
          <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-secondary">
            Course Curriculum
          </h2>
          <CurriculumList courseSlug={courseSlug} activeLessonId={activeLessonId} onSelect={onSelect} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50"
            aria-hidden="true"
            onClick={close}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-base font-semibold text-secondary">
                Course Curriculum
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close curriculum"
                className="flex h-8 w-8 items-center justify-center rounded-md text-secondary hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <CurriculumList
              courseSlug={courseSlug}
              activeLessonId={activeLessonId}
              onSelect={(id) => {
                onSelect(id)
                close()
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}