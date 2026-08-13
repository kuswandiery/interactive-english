export type LessonStatus = 'completed' | 'in-progress' | 'locked'

export interface StudentCourse {
  id: string
  slug: string
  title: string
  level: string
  category: string
  tutor: string
  completedLessons: number
  totalLessons: number
  lastLesson: string
  nextLesson: string
  enrolledDate: string
}

export interface StudentLesson {
  id: string
  courseId: string
  courseSlug: string
  courseTitle: string
  moduleTitle: string
  title: string
  duration: string
  description: string
  status: LessonStatus
  order: number
}

export type ActivityType = 'lesson' | 'quiz' | 'course' | 'certificate'

export interface StudentActivity {
  id: string
  title: string
  description: string
  date: string
  type: ActivityType
}