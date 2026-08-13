import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function AdminDashboard() {
  return (
    <section className="container-page flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ShieldCheck className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-heading text-3xl font-bold text-secondary">Admin Dashboard</h1>

      <Card className="mt-8 w-full max-w-md p-6">
        <h2 className="font-heading text-lg font-semibold text-secondary">Coming soon</h2>
        <p className="mt-1 text-sm text-muted">
          The full admin dashboard will be available in Phase 11.
        </p>
      </Card>

      <div className="mt-8 flex gap-3">
        <Link to="/courses">
          <Button variant="outline">View Courses</Button>
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