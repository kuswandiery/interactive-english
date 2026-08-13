import type { AdminTutor } from '@/types/admin'

/**
 * This is mock data and will be replaced in Phase 12.
 */
export const adminTutors: AdminTutor[] = [
  { id: 'tut-1', name: 'Sarah Johnson', email: 'sarah@englishacademy.com', specialization: 'General English', experience: 8, rating: 4.9, status: 'active' },
  { id: 'tut-2', name: 'Michael Chen', email: 'michael@englishacademy.com', specialization: 'English Conversation', experience: 6, rating: 4.8, status: 'active' },
  { id: 'tut-3', name: 'Emily Davis', email: 'emily@englishacademy.com', specialization: 'Business English', experience: 10, rating: 4.9, status: 'active' },
  { id: 'tut-4', name: 'David Miller', email: 'david@englishacademy.com', specialization: 'IELTS', experience: 7, rating: 4.7, status: 'active' },
  { id: 'tut-5', name: 'Sophia Lee', email: 'sophia@englishacademy.com', specialization: 'TOEFL', experience: 9, rating: 4.7, status: 'active' },
  { id: 'tut-6', name: 'Rachel Green', email: 'rachel@englishacademy.com', specialization: 'Kids', experience: 5, rating: 4.9, status: 'inactive' },
]

export const adminTutorSpecializations = [
  { label: 'General English', value: 'General English' },
  { label: 'English Conversation', value: 'English Conversation' },
  { label: 'Business English', value: 'Business English' },
  { label: 'IELTS', value: 'IELTS' },
  { label: 'TOEFL', value: 'TOEFL' },
  { label: 'Kids', value: 'Kids' },
  { label: 'Teens', value: 'Teens' },
]