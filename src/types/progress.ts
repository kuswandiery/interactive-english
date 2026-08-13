export interface ProgressSummary {
  overallProgress: number
  completedLessons: number
  totalLessons: number
  activeCourses: number
  studyHours: number
  streakDays: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: 'flame' | 'target' | 'trophy' | 'book' | 'clock' | 'star' | 'medal' | 'rocket'
  unlocked: boolean
  progress: number
}

export interface WeeklyActivityDay {
  day: string
  minutes: number
  lessons: number
}