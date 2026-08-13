import type { StudentLesson } from '@/types/student'

/**
 * MOCK LESSON DATA
 *
 * Flat list of lessons for the demo student, with a status per lesson.
 * Video is a placeholder until Phase 12. Real lesson data comes from the
 * backend in Phase 12.
 */
export const studentLessons: StudentLesson[] = [
  {
    id: 'ge-l1',
    courseId: 'general-english',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    moduleTitle: 'Module 1 — English Foundations',
    title: 'Lesson 1: Introductions & Greetings',
    duration: '12 min',
    status: 'completed',
    order: 1,
  },
  {
    id: 'ge-l2',
    courseId: 'general-english',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    moduleTitle: 'Module 1 — English Foundations',
    title: 'Lesson 2: The Alphabet & Pronunciation',
    duration: '14 min',
    status: 'in-progress',
    order: 2,
  },
  {
    id: 'ge-l3',
    courseId: 'general-english',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    moduleTitle: 'Module 1 — English Foundations',
    title: 'Lesson 3: Basic Sentence Structure',
    duration: '16 min',
    status: 'locked',
    order: 3,
  },
  {
    id: 'ec-l1',
    courseId: 'english-conversation',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    moduleTitle: 'Module 1 — Everyday Topics',
    title: 'Lesson 1: Small Talk',
    duration: '10 min',
    status: 'completed',
    order: 4,
  },
  {
    id: 'ec-l2',
    courseId: 'english-conversation',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    moduleTitle: 'Module 1 — Everyday Topics',
    title: 'Lesson 2: Sharing Opinions',
    duration: '12 min',
    status: 'completed',
    order: 5,
  },
  {
    id: 'ec-l3',
    courseId: 'english-conversation',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    moduleTitle: 'Module 1 — Everyday Topics',
    title: 'Lesson 3: Describing Experiences',
    duration: '15 min',
    status: 'in-progress',
    order: 6,
  },
]