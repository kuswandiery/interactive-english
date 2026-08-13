import type { AdminCourse } from '@/types/admin'

/**
 * This is mock data and will be replaced in Phase 12.
 */
export const adminCourses: AdminCourse[] = [
  { id: 'course-1', title: 'General English', category: 'General English', level: 'Beginner', lessons: 24, students: 3400, price: 89, status: 'published' },
  { id: 'course-2', title: 'English Conversation', category: 'Conversation', level: 'Intermediate', lessons: 18, students: 2100, price: 99, status: 'published' },
  { id: 'course-3', title: 'Business English', category: 'Business', level: 'Upper Intermediate', lessons: 16, students: 1700, price: 119, status: 'published' },
  { id: 'course-4', title: 'IELTS Preparation', category: 'Test Preparation', level: 'Advanced', lessons: 30, students: 950, price: 149, status: 'published' },
  { id: 'course-5', title: 'TOEFL Preparation', category: 'Test Preparation', level: 'Advanced', lessons: 28, students: 780, price: 149, status: 'draft' },
  { id: 'course-6', title: 'English for Kids', category: 'Young Learners', level: 'Beginner', lessons: 20, students: 1300, price: 69, status: 'published' },
]

export const adminCourseCategories = [
  { label: 'General English', value: 'General English' },
  { label: 'Conversation', value: 'Conversation' },
  { label: 'Business', value: 'Business' },
  { label: 'Test Preparation', value: 'Test Preparation' },
  { label: 'Young Learners', value: 'Young Learners' },
]

export const adminCourseLevels = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Elementary', value: 'Elementary' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Upper Intermediate', value: 'Upper Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
]