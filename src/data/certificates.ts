import type { Certificate } from '@/types/certificate'

/**
 * MOCK CERTIFICATE DATA
 *
 * This is mock data and will be replaced in Phase 12.
 * Certificate availability follows the student's course progress.
 */
export const mockCertificates: Certificate[] = [
  {
    id: 'cert-general-english',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    level: 'Beginner',
    category: 'General English',
    tutor: 'Sarah Johnson',
    studentName: 'Alex Student',
    issueDate: 'Jul 10, 2026',
    certificateId: 'EA-2026-0001',
    status: 'completed',
    progress: 100,
  },
  {
    id: 'cert-conversation',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    level: 'Intermediate',
    category: 'Conversation',
    tutor: 'Michael Chen',
    studentName: 'Alex Student',
    issueDate: '',
    certificateId: '',
    status: 'in-progress',
    progress: 60,
  },
  {
    id: 'cert-business',
    courseSlug: 'business-english',
    courseTitle: 'Business English',
    level: 'Upper Intermediate',
    category: 'Business',
    tutor: 'Emily Davis',
    studentName: 'Alex Student',
    issueDate: '',
    certificateId: '',
    status: 'in-progress',
    progress: 40,
  },
  {
    id: 'cert-ielts',
    courseSlug: 'ielts-preparation',
    courseTitle: 'IELTS Preparation',
    level: 'Advanced',
    category: 'Test Preparation',
    tutor: 'David Lee',
    studentName: 'Alex Student',
    issueDate: '',
    certificateId: '',
    status: 'locked',
    progress: 0,
  },
  {
    id: 'cert-toefl',
    courseSlug: 'toefl-preparation',
    courseTitle: 'TOEFL Preparation',
    level: 'Advanced',
    category: 'Test Preparation',
    tutor: 'Amanda Roberts',
    studentName: 'Alex Student',
    issueDate: '',
    certificateId: '',
    status: 'locked',
    progress: 0,
  },
  {
    id: 'cert-kids',
    courseSlug: 'english-for-kids',
    courseTitle: 'English for Kids',
    level: 'Beginner',
    category: 'Young Learners',
    tutor: 'Laura Martinez',
    studentName: 'Alex Student',
    issueDate: '',
    certificateId: '',
    status: 'locked',
    progress: 0,
  },
]

export function getCertificateById(id: string): Certificate | undefined {
  return mockCertificates.find((c) => c.id === id)
}