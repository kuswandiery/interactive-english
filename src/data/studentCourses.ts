import type { StudentCourse } from '@/types/student'

/**
 * MOCK STUDENT DATA
 *
 * Courses the demo student has enrolled in, with progress derived from
 * completed lessons. Used only for the Phase 7 frontend prototype.
 * Real enrollment data comes from the backend in Phase 12.
 */
export const studentCourses: StudentCourse[] = [
  {
    id: 'general-english',
    slug: 'general-english',
    title: 'General English',
    level: 'Beginner',
    category: 'General English',
    tutor: 'Sarah Johnson',
    completedLessons: 14,
    totalLessons: 24,
    lastLesson: 'Lesson 14: Using Time Expressions',
    nextLesson: 'Lesson 15: Asking for Directions',
    enrolledDate: 'Jan 12, 2026',
  },
  {
    id: 'english-conversation',
    slug: 'english-conversation',
    title: 'English Conversation',
    level: 'Intermediate',
    category: 'Conversation',
    tutor: 'Michael Chen',
    completedLessons: 9,
    totalLessons: 18,
    lastLesson: 'Lesson 9: Group Discussion',
    nextLesson: 'Lesson 10: Extended Speaking',
    enrolledDate: 'Feb 02, 2026',
  },
  {
    id: 'business-english',
    slug: 'business-english',
    title: 'Business English',
    level: 'Upper Intermediate',
    category: 'Business',
    tutor: 'Emily Davis',
    completedLessons: 6,
    totalLessons: 30,
    lastLesson: 'Lesson 6: Handling Q&A',
    nextLesson: 'Lesson 7: Negotiation Skills',
    enrolledDate: 'Mar 10, 2026',
  },
]