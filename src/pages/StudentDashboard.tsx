import { Link } from 'react-router-dom'
import { GraduationCap, LayoutDashboard, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useAuth } from '@/context/AuthContext'

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <section className="container-page flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <GraduationCap className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-heading text-3xl font-bold text-secondary">
        Welcome back, {user?.name?.split(' ')[0] ?? 'Student'}!
      </h1>
      <p className="mt-3 max-w-md text-muted">Student Dashboard</p>

      <Card className="mt-8 w-full max-w-md p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <LayoutDashboard className="h-6 w-6" />
          </span>
          <div className="text-left">
            <h2 className="font-heading text-lg font-semibold text-secondary">Coming soon</h2>
            <p className="text-sm text-muted">
              Your full student dashboard will be available in Phase 7.
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-8 flex gap-3">
        <Link to="/courses">
          <Button variant="outline">Explore Courses</Button>
        </Link>
        <Link to="/">
          <Button>
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </section>
  )
}