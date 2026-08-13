import { useEffect, useState } from 'react'
import { BarChart3, DollarSign, TrendingUp, BookOpen } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'
import { AdminBarChart, AdminStatCard, PopularityList } from '@/components/admin'
import { adminReports, adminDashboardStats } from '@/data/adminReports'

export default function AdminReportsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    )
  }

  const revenueTotal = adminReports.revenue.reduce((s, d) => s + d.students, 0)

  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-secondary lg:text-3xl">
          <BarChart3 className="h-8 w-8 text-primary" /> Reports
        </h1>
        <p className="mt-1 text-muted">Analytics and performance reports (frontend charts · mock data).</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Report highlights">
        <AdminStatCard icon={BookOpen} label="Total Enrollments" value={adminDashboardStats.totalEnrollments} />
        <AdminStatCard
          icon={DollarSign}
          label="Revenue (Demo)"
          value={revenueTotal}
          prefix="$"
          format={(n) => `${n}k`}
        />
        <AdminStatCard icon={TrendingUp} label="New Students" value={adminDashboardStats.totalStudents} trend={12} />
        <AdminStatCard icon={BookOpen} label="Active Courses" value={adminDashboardStats.totalCourses} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2" aria-label="Charts">
        <AdminBarChart
          title="Enrollment Report"
          description="New enrollments by month"
          icon={BookOpen}
          data={adminReports.enrollment.map((d) => ({ label: d.label, value: d.students }))}
        />
        <AdminBarChart
          title="Revenue Report"
          description="Revenue in thousands ($k) by month"
          icon={DollarSign}
          valueFormatter={(v) => `$${v}k`}
          data={adminReports.revenue.map((d) => ({ label: d.label, value: d.students }))}
        />
        <AdminBarChart
          title="Student Growth"
          description="Total active students by week"
          icon={TrendingUp}
          valueFormatter={(v) => v.toLocaleString()}
          data={adminReports.studentGrowth.map((d) => ({ label: d.label, value: d.students }))}
        />
        <PopularityList
          title="Course Popularity"
          description="Students enrolled per course"
          icon={BookOpen}
          items={adminReports.coursePopularity.map((c) => ({ title: c.title, value: c.students }))}
        />
      </section>
    </div>
  )
}