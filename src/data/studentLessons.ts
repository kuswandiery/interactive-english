import type { StudentLesson } from '@/types/student'

/**
 * MOCK LESSON DATA
 *
 * This is mock data and will be replaced in Phase 12.
 *
 * Flat list of lessons for the demo student, with a status per lesson.
 * Statuses drive the learning progress calculation:
 *   progress = completedLessons / totalLessons × 100
 * Video is a placeholder until Phase 12.
 */
export const studentLessons: StudentLesson[] = [
  // ── General English ────────────────────────────────────────────────
  {
    id: 'ge-l1',
    courseId: 'general-english',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    moduleTitle: 'Module 1 — English Foundations',
    title: 'Lesson 1: Introductions & Greetings',
    duration: '12 min',
    description:
      'Learn how to introduce yourself, greet others, and make a friendly first impression in English.',
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
    description:
      'Practice the English alphabet, letter sounds, and common pronunciation patterns used in everyday speech.',
    status: 'completed',
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
    description:
      'Understand subject-verb-object order and build clear, correct basic sentences.',
    status: 'completed',
    order: 3,
  },
  {
    id: 'ge-l4',
    courseId: 'general-english',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    moduleTitle: 'Module 2 — Daily Conversation',
    title: 'Lesson 4: Introducing Yourself',
    duration: '15 min',
    description:
      'Practice introducing yourself confidently in social and professional settings.',
    status: 'completed',
    order: 4,
  },
  {
    id: 'ge-l5',
    courseId: 'general-english',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    moduleTitle: 'Module 2 — Daily Conversation',
    title: 'Lesson 5: Talking About Your Day',
    duration: '13 min',
    description:
      'Describe your daily routine and talk about your day using common time expressions.',
    status: 'completed',
    order: 5,
  },
  {
    id: 'ge-l6',
    courseId: 'general-english',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    moduleTitle: 'Module 2 — Daily Conversation',
    title: 'Lesson 6: Ordering Food & Asking Directions',
    duration: '17 min',
    description:
      'Learn useful phrases for ordering food and asking for and giving directions.',
    status: 'in-progress',
    order: 6,
  },
  {
    id: 'ge-l7',
    courseId: 'general-english',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    moduleTitle: 'Module 3 — Practical English',
    title: 'Lesson 7: Shopping & Numbers',
    duration: '12 min',
    description:
      'Build vocabulary for shopping, prices, and working with numbers in English.',
    status: 'locked',
    order: 7,
  },
  {
    id: 'ge-l8',
    courseId: 'general-english',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    moduleTitle: 'Module 3 — Practical English',
    title: 'Lesson 8: Making Plans with Friends',
    duration: '14 min',
    description:
      'Practice making, accepting, and declining plans with friends using natural English.',
    status: 'locked',
    order: 8,
  },

  // ── English Conversation ───────────────────────────────────────────
  {
    id: 'ec-l1',
    courseId: 'english-conversation',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    moduleTitle: 'Module 1 — Everyday Topics',
    title: 'Lesson 1: Small Talk',
    duration: '10 min',
    description:
      'Learn to start and keep light conversation about everyday topics.',
    status: 'completed',
    order: 9,
  },
  {
    id: 'ec-l2',
    courseId: 'english-conversation',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    moduleTitle: 'Module 1 — Everyday Topics',
    title: 'Lesson 2: Sharing Opinions',
    duration: '12 min',
    description:
      'Express and support your opinions while staying polite and clear.',
    status: 'completed',
    order: 10,
  },
  {
    id: 'ec-l3',
    courseId: 'english-conversation',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    moduleTitle: 'Module 1 — Everyday Topics',
    title: 'Lesson 3: Describing Experiences',
    duration: '15 min',
    description:
      'Describe past experiences and events using a range of useful language.',
    status: 'completed',
    order: 11,
  },
  {
    id: 'ec-l4',
    courseId: 'english-conversation',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    moduleTitle: 'Module 2 — Real-Life Situations',
    title: 'Lesson 4: At the Workplace',
    duration: '13 min',
    description:
      'Handle common workplace conversations and professional small talk.',
    status: 'in-progress',
    order: 12,
  },
  {
    id: 'ec-l5',
    courseId: 'english-conversation',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    moduleTitle: 'Module 2 — Real-Life Situations',
    title: 'Lesson 5: Travel Conversations',
    duration: '14 min',
    description:
      'Use practical English for travel: checking in, booking, and asking for help.',
    status: 'locked',
    order: 13,
  },
  {
    id: 'ec-l6',
    courseId: 'english-conversation',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    moduleTitle: 'Module 2 — Real-Life Situations',
    title: 'Lesson 6: Social Gatherings',
    duration: '12 min',
    description:
      'Join social gatherings and mix with other speakers more naturally.',
    status: 'locked',
    order: 14,
  },

  // ── Business English ───────────────────────────────────────────────
  {
    id: 'be-l1',
    courseId: 'business-english',
    courseSlug: 'business-english',
    courseTitle: 'Business English',
    moduleTitle: 'Module 1 — Professional Fundamentals',
    title: 'Lesson 1: Business Vocabulary',
    duration: '16 min',
    description:
      'Build core professional vocabulary used in meetings, emails, and reports.',
    status: 'completed',
    order: 15,
  },
  {
    id: 'be-l2',
    courseId: 'business-english',
    courseSlug: 'business-english',
    courseTitle: 'Business English',
    moduleTitle: 'Module 1 — Professional Fundamentals',
    title: 'Lesson 2: Writing Professional Emails',
    duration: '18 min',
    description:
      'Write clear, concise, and professional emails for common business situations.',
    status: 'completed',
    order: 16,
  },
  {
    id: 'be-l3',
    courseId: 'business-english',
    courseSlug: 'business-english',
    courseTitle: 'Business English',
    moduleTitle: 'Module 1 — Professional Fundamentals',
    title: 'Lesson 3: Workplace Communication',
    duration: '15 min',
    description:
      'Communicate effectively with colleagues, clients, and stakeholders.',
    status: 'in-progress',
    order: 17,
  },
  {
    id: 'be-l4',
    courseId: 'business-english',
    courseSlug: 'business-english',
    courseTitle: 'Business English',
    moduleTitle: 'Module 2 — Meetings & Presentations',
    title: 'Lesson 4: Leading a Meeting',
    duration: '17 min',
    description:
      'Lead and participate in meetings with clear, professional language.',
    status: 'locked',
    order: 18,
  },
  {
    id: 'be-l5',
    courseId: 'business-english',
    courseSlug: 'business-english',
    courseTitle: 'Business English',
    moduleTitle: 'Module 2 — Meetings & Presentations',
    title: 'Lesson 5: Delivering a Presentation',
    duration: '19 min',
    description:
      'Structure and deliver confident presentations in a business context.',
    status: 'locked',
    order: 19,
  },
  {
    id: 'be-l6',
    courseId: 'business-english',
    courseSlug: 'business-english',
    courseTitle: 'Business English',
    moduleTitle: 'Module 2 — Meetings & Presentations',
    title: 'Lesson 6: Handling Q&A',
    duration: '14 min',
    description:
      'Handle questions and answers confidently during and after a presentation.',
    status: 'locked',
    order: 20,
  },
]