import type { StudentActivity } from '@/types/student'

/**
 * MOCK ACTIVITY DATA
 *
 * Recent activity feed for the demo student dashboard.
 * Real activity data comes from the backend in Phase 12.
 */
export const studentActivities: StudentActivity[] = [
  {
    id: 'act-1',
    title: 'Completed a lesson',
    description: 'Lesson 14: Using Time Expressions · General English',
    date: 'Today · 9:20 AM',
    type: 'lesson',
  },
  {
    id: 'act-2',
    title: 'Started a lesson',
    description: 'Lesson 2: The Alphabet & Pronunciation · General English',
    date: 'Yesterday · 4:05 PM',
    type: 'lesson',
  },
  {
    id: 'act-3',
    title: 'Quiz result posted',
    description: 'Vocabulary Quiz · Score 85%',
    date: 'Aug 10, 2026',
    type: 'quiz',
  },
  {
    id: 'act-4',
    title: 'Enrolled in a course',
    description: 'Business English',
    date: 'Mar 10, 2026',
    type: 'course',
  },
  {
    id: 'act-5',
    title: 'Earned a certificate',
    description: 'Introduction to Pronunciation · Basic Certificate',
    date: 'Feb 18, 2026',
    type: 'certificate',
  },
]