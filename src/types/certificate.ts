export type CertificateStatus = 'completed' | 'in-progress' | 'locked'

export interface Certificate {
  id: string
  courseSlug: string
  courseTitle: string
  level: string
  category: string
  tutor: string
  studentName: string
  issueDate: string
  certificateId: string
  status: CertificateStatus
  progress: number
}

export interface CertificateStats {
  total: number
  completed: number
  inProgress: number
  locked: number
}