/**
 * MOCK CURRICULUM DATA
 *
 * This is mock data and will be replaced in Phase 12.
 *
 * Defines the ordered module/section structure for each enrolled course.
 * The lesson sidebar groups lessons by module using these definitions.
 */
export interface CurriculumModule {
  id: string
  title: string
  lessonIds: string[]
}

export const courseCurriculum: Record<string, CurriculumModule[]> = {
  'general-english': [
    {
      id: 'ge-m1',
      title: 'Module 1 — English Foundations',
      lessonIds: ['ge-l1', 'ge-l2', 'ge-l3'],
    },
    {
      id: 'ge-m2',
      title: 'Module 2 — Daily Conversation',
      lessonIds: ['ge-l4', 'ge-l5', 'ge-l6'],
    },
    {
      id: 'ge-m3',
      title: 'Module 3 — Practical English',
      lessonIds: ['ge-l7', 'ge-l8'],
    },
  ],
  'english-conversation': [
    {
      id: 'ec-m1',
      title: 'Module 1 — Everyday Topics',
      lessonIds: ['ec-l1', 'ec-l2', 'ec-l3'],
    },
    {
      id: 'ec-m2',
      title: 'Module 2 — Real-Life Situations',
      lessonIds: ['ec-l4', 'ec-l5', 'ec-l6'],
    },
  ],
  'business-english': [
    {
      id: 'be-m1',
      title: 'Module 1 — Professional Fundamentals',
      lessonIds: ['be-l1', 'be-l2', 'be-l3'],
    },
    {
      id: 'be-m2',
      title: 'Module 2 — Meetings & Presentations',
      lessonIds: ['be-l4', 'be-l5', 'be-l6'],
    },
  ],
}