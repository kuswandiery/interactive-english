import type { ProgressSummary, Achievement, WeeklyActivityDay } from '@/types/progress'

/**
 * MOCK PROGRESS DATA
 *
 * This is mock data and will be replaced in Phase 12.
 * Values are kept consistent with the mock student courses and lessons.
 */
export const mockProgressSummary: ProgressSummary = {
  overallProgress: 42,
  completedLessons: 10,
  totalLessons: 20,
  activeCourses: 3,
  studyHours: 28,
  streakDays: 6,
}

export const mockAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson.',
    icon: 'rocket',
    unlocked: true,
    progress: 100,
  },
  {
    id: 'ten-lessons',
    title: 'Keen Learner',
    description: 'Complete 10 lessons.',
    icon: 'book',
    unlocked: true,
    progress: 100,
  },
  {
    id: 'week-streak',
    title: 'On Fire',
    description: 'Study 7 days in a row.',
    icon: 'flame',
    unlocked: true,
    progress: 86,
  },
  {
    id: 'quiz-champion',
    title: 'Quiz Champion',
    description: 'Pass a quiz with 90% or higher.',
    icon: 'trophy',
    unlocked: false,
    progress: 75,
  },
  {
    id: 'certificate-earner',
    title: 'Graduate',
    description: 'Earn your first certificate.',
    icon: 'medal',
    unlocked: false,
    progress: 55,
  },
  {
    id: 'study-goal',
    title: 'Goal Setter',
    description: 'Reach your weekly study goal.',
    icon: 'target',
    unlocked: false,
    progress: 40,
  },
]

export const mockWeeklyActivity: WeeklyActivityDay[] = [
  { day: 'Mon', minutes: 30, lessons: 2 },
  { day: 'Tue', minutes: 15, lessons: 1 },
  { day: 'Wed', minutes: 45, lessons: 3 },
  { day: 'Thu', minutes: 20, lessons: 1 },
  { day: 'Fri', minutes: 60, lessons: 4 },
  { day: 'Sat', minutes: 35, lessons: 2 },
  { day: 'Sun', minutes: 50, lessons: 3 },
]

export const mockMonthlyActivity = [
  { month: 'Jan', minutes: 120, label: 'Jan' },
  { month: 'Feb', minutes: 180, label: 'Feb' },
  { month: 'Mar', minutes: 240, label: 'Mar' },
  { month: 'Apr', minutes: 160, label: 'Apr' },
  { month: 'May', minutes: 300, label: 'May' },
  { month: 'Jun', minutes: 260, label: 'Jun' },
  { month: 'Jul', minutes: 340, label: 'Jul' },
  { month: 'Aug', minutes: 280, label: 'Aug' },
  { month: 'Sep', minutes: 200, label: 'Sep' },
  { month: 'Oct', minutes: 320, label: 'Oct' },
  { month: 'Nov', minutes: 260, label: 'Nov' },
  { month: 'Dec', minutes: 400, label: 'Dec' },
]