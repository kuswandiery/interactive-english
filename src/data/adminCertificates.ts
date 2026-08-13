import type { AdminCertificate } from '@/types/admin'

/**
 * This is mock data and will be replaced in Phase 12.
 */
export const adminCertificates: AdminCertificate[] = [
  { id: 'cert-1', studentName: 'Alex Student', courseTitle: 'General English', status: 'completed', issueDate: 'Jul 10, 2026', certificateId: 'EA-2026-0001' },
  { id: 'cert-2', studentName: 'Sofia Rossi', courseTitle: 'General English', status: 'completed', issueDate: 'Jun 08, 2026', certificateId: 'EA-2026-0002' },
  { id: 'cert-3', studentName: 'Maria Lopez', courseTitle: 'Business English', status: 'pending', issueDate: '', certificateId: '' },
  { id: 'cert-4', studentName: 'Aisha Rahman', courseTitle: 'IELTS Preparation', status: 'completed', issueDate: 'May 15, 2026', certificateId: 'EA-2026-0003' },
  { id: 'cert-5', studentName: 'Tom Okafor', courseTitle: 'Business English', status: 'pending', issueDate: '', certificateId: '' },
  { id: 'cert-6', studentName: 'James Wilson', courseTitle: 'English Conversation', status: 'revoked', issueDate: 'Apr 02, 2026', certificateId: 'EA-2026-0004' },
]

export const adminCertificateStatusOptions = [
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Revoked', value: 'revoked' },
]