export type StudentStatus = 'active' | 'inactive'

export interface AdminStudent {
  id: string
  name: string
  email: string
  course: string
  progress: number
  enrolledDate: string
  status: StudentStatus
}

export type AdminTutorStatus = 'active' | 'inactive'

export interface AdminTutor {
  id: string
  name: string
  email: string
  specialization: string
  experience: number
  rating: number
  status: AdminTutorStatus
}

export type AdminCourseStatus = 'published' | 'draft'

export interface AdminCourse {
  id: string
  title: string
  category: string
  level: string
  lessons: number
  students: number
  price: number
  status: AdminCourseStatus
}

export type AdminCertificateStatus = 'completed' | 'pending' | 'revoked'

export interface AdminCertificate {
  id: string
  studentName: string
  courseTitle: string
  status: AdminCertificateStatus
  issueDate: string
  certificateId: string
}

export interface AdminDashboardStats {
  totalStudents: number
  totalTutors: number
  totalCourses: number
  totalEnrollments: number
  totalCertificates: number
  totalRevenue: number
}

export interface AdminActivity {
  id: string
  title: string
  description: string
  date: string
  type: 'student' | 'tutor' | 'course' | 'certificate' | 'revenue'
}export interface EnrollmentOverviewPoint {
  label: string
  students: number
  courses: number
}

export interface CoursePopularity {
  title: string
  students: number
}

export interface ReportData {
  enrollment: EnrollmentOverviewPoint[]
  revenue: EnrollmentOverviewPoint[]
  studentGrowth: EnrollmentOverviewPoint[]
  coursePopularity: CoursePopularity[]
}

export interface AdminSettings {
  siteName: string
  supportEmail: string
  maintenanceMode: boolean

  notifyStudentEnrollment: boolean
  notifyNewTutor: boolean
  notifyNewReviews: boolean

  autoApproveCourses: boolean
  defaultCourseLevel: string
  enrollmentCap: number

  autoIssueCertificates: boolean
  certificateExpiryDays: number
}