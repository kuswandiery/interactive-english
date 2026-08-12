import type { Statistic } from '@/types/card'

export const statistics: Statistic[] = [
  { id: 'students', label: 'Active Students', value: 12000, trend: 12 },
  { id: 'courses', label: 'Course Programs', value: 48, trend: 8 },
  { id: 'tutors', label: 'Expert Tutors', value: 120, trend: 15 },
  { id: 'rating', label: 'Success Rate', value: 98, unit: '%', trend: 3 },
]