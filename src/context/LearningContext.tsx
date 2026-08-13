import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { LessonStatus, StudentLesson } from '@/types/student'
import { studentLessons } from '@/data/studentLessons'
import { courseCurriculum } from '@/data/courseCurriculum'
import type { CurriculumModule } from '@/data/courseCurriculum'

interface CourseProgress {
  completed: number
  total: number
  progress: number
  remaining: number
}

interface LearningContextValue {
  statuses: Record<string, LessonStatus>
  getStatus: (id: string) => LessonStatus
  setStatus: (id: string, status: LessonStatus) => void
  toggleComplete: (id: string) => 'completed' | 'in-progress'
  getLesson: (id: string) => StudentLesson | undefined
  getCourseLessons: (slug: string) => StudentLesson[]
  getCourseModules: (slug: string) => CurriculumModule[]
  getCourseProgress: (slug: string) => CourseProgress
  getContinueLesson: (slug: string) => StudentLesson | undefined
  getRecommendedLesson: (slug: string, currentId: string) => StudentLesson | undefined
}

const LearningContext = createContext<LearningContextValue | null>(null)

const initialStatuses: Record<string, LessonStatus> = studentLessons.reduce(
  (acc, l) => {
    acc[l.id] = l.status
    return acc
  },
  {} as Record<string, LessonStatus>,
)

export function LearningProvider({ children }: { children: ReactNode }) {
  const [statuses, setStatuses] = useState<Record<string, LessonStatus>>(initialStatuses)

  const getStatus = useCallback((id: string) => statuses[id] ?? 'locked', [statuses])

  const setStatus = useCallback((id: string, status: LessonStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: status }))
  }, [])

  const toggleComplete = useCallback(
    (id: string): 'completed' | 'in-progress' => {
      const current = statuses[id]
      const next: LessonStatus =
        current === 'completed' ? 'in-progress' : 'completed'

      setStatuses((prev) => {
        const updated = { ...prev, [id]: next }

        // Unlock the next locked lesson when a lesson becomes completed.
        if (next === 'completed') {
          const lesson = studentLessons.find((l) => l.id === id)
          if (lesson) {
            const courseLessons = studentLessons
              .filter((l) => l.courseSlug === lesson.courseSlug)
              .sort((a, b) => a.order - b.order)
            const idx = courseLessons.findIndex((l) => l.id === id)
            const nextLesson = courseLessons[idx + 1]
            if (nextLesson && updated[nextLesson.id] === 'locked') {
              updated[nextLesson.id] = 'in-progress'
            }
          }
        }

        return updated
      })

      return next
    },
    [statuses],
  )

  const getLesson = useCallback((id: string) => studentLessons.find((l) => l.id === id), [])

  const getCourseLessons = useCallback(
    (slug: string) =>
      studentLessons
        .filter((l) => l.courseSlug === slug)
        .sort((a, b) => a.order - b.order),
    [],
  )

  const getCourseModules = useCallback(
    (slug: string) => courseCurriculum[slug] ?? [],
    [],
  )

  const getCourseProgress = useCallback(
    (slug: string): CourseProgress => {
      const lessons = studentLessons.filter((l) => l.courseSlug === slug)
      const total = lessons.length
      const completed = lessons.filter((l) => statuses[l.id] === 'completed').length
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0
      return { completed, total, progress, remaining: Math.max(total - completed, 0) }
    },
    [statuses],
  )

  const getContinueLesson = useCallback(
    (slug: string): StudentLesson | undefined => {
      const lessons = studentLessons
        .filter((l) => l.courseSlug === slug)
        .sort((a, b) => a.order - b.order)
      return (
        lessons.find((l) => statuses[l.id] === 'in-progress') ??
        lessons.find((l) => statuses[l.id] !== 'completed') ??
        lessons[0]
      )
    },
    [statuses],
  )

  const getRecommendedLesson = useCallback(
    (slug: string, currentId: string): StudentLesson | undefined => {
      const lessons = studentLessons
        .filter((l) => l.courseSlug === slug)
        .sort((a, b) => a.order - b.order)
      const idx = lessons.findIndex((l) => l.id === currentId)
      const next = idx >= 0 ? lessons[idx + 1] : undefined
      if (next && statuses[next.id] !== 'completed') return next
      return getContinueLesson(slug)
    },
    [statuses, getContinueLesson],
  )

  const value = useMemo<LearningContextValue>(
    () => ({
      statuses,
      getStatus,
      setStatus,
      toggleComplete,
      getLesson,
      getCourseLessons,
      getCourseModules,
      getCourseProgress,
      getContinueLesson,
      getRecommendedLesson,
    }),
    [
      statuses,
      getStatus,
      setStatus,
      toggleComplete,
      getLesson,
      getCourseLessons,
      getCourseModules,
      getCourseProgress,
      getContinueLesson,
      getRecommendedLesson,
    ],
  )

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
}

export function useLearning(): LearningContextValue {
  const ctx = useContext(LearningContext)
  if (!ctx) throw new Error('useLearning must be used within a LearningProvider')
  return ctx
}