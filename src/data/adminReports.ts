import type {
  AdminDashboardStats,
  AdminActivity,
  ReportData,
} from '@/types/admin'

/**
 * This is mock data and will be replaced in Phase 12.
 */
export const adminDashboardStats: AdminDashboardStats = {
  totalStudents: 12840,
  totalTutors: 6,
  totalCourses: 8,
  totalEnrollments: 18230,
  totalCertificates: 4,
  totalRevenue: 86400,
}

export const adminActivities: AdminActivity[] = [
  { id: 'act-1', title: 'New enrollment', description: 'Maria Lopez enrolled in Business English.', date: '2h ago', type: 'student' },
  { id: 'act-2', title: 'Certificate issued', description: 'EA-2026-0003 issued to Aisha Rahman.', date: '5h ago', type: 'certificate' },
  { id: 'act-3', title: 'New tutor added', description: 'Rachel Green joined the team.', date: '1d ago', type: 'tutor' },
  { id: 'act-4', title: 'Course updated', description: 'IELTS Preparation course was updated.', date: '1d ago', type: 'course' },
  { id: 'act-5', title: 'New enrollment', description: 'James Wilson enrolled in English Conversation.', date: '2d ago', type: 'student' },
  { id: 'act-6', title: 'Course published', description: 'English for Kids is now live.', date: '3d ago', type: 'course' },
]

export const adminEnrollmentOverview: ReportData['enrollment'] = [
  { label: 'Jan', students: 110, courses: 8 },
  { label: 'Feb', students: 140, courses: 8 },
  { label: 'Mar', students: 180, courses: 8 },
  { label: 'Apr', students: 160, courses: 8 },
  { label: 'May', students: 220, courses: 8 },
  { label: 'Jun', students: 250, courses: 8 },
  { label: 'Jul', students: 230, courses: 8 },
  { label: 'Aug', students: 280, courses: 8 },
]

export const adminReports: ReportData = {
  enrollment: adminEnrollmentOverview,
  revenue: [
    { label: 'Jan', students: 9, courses: 8 },
    { label: 'Feb', students: 12, courses: 8 },
    { label: 'Mar', students: 15, courses: 8 },
    { label: 'Apr', students: 13, courses: 8 },
    { label: 'May', students: 18, courses: 8 },
    { label: 'Jun', students: 21, courses: 8 },
    { label: 'Jul', students: 19, courses: 8 },
    { label: 'Aug', students: 24, courses: 8 },
  ],
  studentGrowth: [
    { label: 'Week 1', students: 1000, courses: 8 },
    { label: 'Week 2', students: 1450, courses: 8 },
    { label: 'Week 3', students: 2100, courses: 8 },
    { label: 'Week 4', students: 2950, courses: 8 },
    { label: 'Week 5', students: 3800, courses: 8 },
    { label: 'Week 6', students: 4700, courses: 8 },
    { label: 'Week 7', students: 5500, courses: 8 },
    { label: 'Week 8', students: 6400, courses: 8 },
  ],
  coursePopularity: [
    { title: 'General English', students: 3400 },
    { title: 'English Conversation', students: 2100 },
    { title: 'Business English', students: 1700 },
    { title: 'English for Kids', students: 1300 },
    { title: 'IELTS Preparation', students: 950 },
    { title: 'TOEFL Preparation', students: 780 },
  ],
}