import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  GraduationCap,
  BookOpen,
  UserPlus,
  Award,
  DollarSign,
  Eye,
  UserPen,
  PlusCircle,
  BarChart3,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { AdminStatCard, AdminBarChart, PopularityList } from '@/components/admin'
import { adminDashboardStats, adminActivities, adminReports } from '@/data/adminReports'

const activityIcon = {
  student: 'bg-success/15 text-success',
  tutor: 'bg-primary/10 text-primary',
  course: 'bg-accent/15 text-accent',
  certificate: 'bg-error/15 text-error',
  revenue: 'bg-accent/15 text-accent',
} as const

const quickActions = [
  { icon: UserPlus, label: 'Add Student', to: '/admin/students', description: 'Manage student records.' },
  { icon: UserPen, label: 'Manage Tutors', to: '/admin/tutors', description: 'Add or edit tutors.' },
  { icon: PlusCircle, label: 'Add Course', to: '/admin/courses', description: 'Create a new course.' },
  { icon: BarChart3, label: 'View Reports', to: '/admin/reports', description: 'See platform analytics.' },
]

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    )
  }

  const stats = adminDashboardStats

  return (
    <div className="space-y-6">
      <section>
        <h1 className="font-heading text-2xl font-bold text-secondary lg:text-3xl">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-muted">Monitor platform performance and manage operations.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Platform statistics">
        <AdminStatCard icon={Users} label="Total Students" value={stats.totalStudents} trend={8} />
        <AdminStatCard icon={GraduationCap} label="Total Tutors" value={stats.totalTutors} />
        <AdminStatCard icon={BookOpen} label="Total Courses" value={stats.totalCourses} trend={3} />
        <AdminStatCard icon={UserPlus} label="Total Enrollments" value={stats.totalEnrollments} trend={12} />
        <AdminStatCard icon={Award} label="Total Certificates" value={stats.totalCertificates} />
        <AdminStatCard
          icon={DollarSign}
          label="Total Revenue"
          value={stats.totalRevenue}
          prefix="$"
          format={(n) => n.toLocaleString()}
          trend={15}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3" aria-label="Analytics overview">
        <div className="lg:col-span-2">
          <AdminBarChart
            title="Enrollment Overview"
            description="New enrollments over the past 8 months"
            icon={UserPlus}
            data={adminReports.enrollment.map((d) => ({ label: d.label, value: d.students }))}
          />
        </div>
        <PopularityList
          title="Course Popularity"
          description="Students per course"
          icon={BookOpen}
          items={adminReports.coursePopularity.map((c) => ({ title: c.title, value: c.students }))}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-heading text-lg font-semibold text-secondary">Recent Activity</h2>
          <ul className="mt-4 space-y-3">
            {adminActivities.map((a) => (
              <li key={a.id}>
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${activityIcon[a.type]}`}>
                    <Eye className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-secondary">{a.title}</p>
                    <p className="truncate text-sm text-muted">{a.description}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted">{a.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <div>
          <h2 className="font-heading text-lg font-semibold text-secondary">Quick Actions</h2>
          <div className="mt-4 grid gap-3">
            {quickActions.map(({ icon: Icon, label, description, to }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-secondary">{label}</p>
                  <p className="text-sm text-muted">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}