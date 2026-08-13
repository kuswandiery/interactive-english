import type { StudentCourse } from '@/types/student'

/**
 * MOCK STUDENT DATA
 *
 * This is mock data and will be replaced in Phase 12.
 *
 * Courses the demo student has enrolled in. `completedLessons` and
 * `totalLessons` are kept in sync with the mock lesson list so the progress
 * calculation is consistent across the dashboard and the learning player.
 */
export const studentCourses: StudentCourse[] = [
  {
    id: 'general-english',
    slug: 'general-english',
    title: 'General English',
    level: 'Beginner',
    category: 'General English',
    tutor: 'Sarah Johnson',
    completedLessons: 5,
    totalLessons: 8,
    lastLesson: 'Lesson 5: Talking About Your Day',
    nextLesson: 'Lesson 6: Ordering Food & Asking Directions',
    enrolledDate: 'Jan 12, 2026',
  },
  {
    id: 'english-conversation',
    slug: 'english-conversation',
    title: 'English Conversation',
    level: 'Intermediate',
    category: 'Conversation',
    tutor: 'Michael Chen',
    completedLessons: 3,
    totalLessons: 6,
    lastLesson: 'Lesson 3: Describing Experiences',
    nextLesson: 'Lesson 4: At the Workplace',
    enrolledDate: 'Feb 02, 2026',
  },
  {
    id: 'business-english',
    slug: 'business-english',
    title: 'Business English',
    level: 'Upper Intermediate',
    category: 'Business',
    tutor: 'Emily Davis',
    completedLessons: 2,
    totalLessons: 6,
    lastLesson: 'Lesson 2: Writing Professional Emails',
    nextLesson: 'Lesson 3: Workplace Communication',
    enrolledDate: 'Mar 10, 2026',
  },
]