import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'

export default function AccessDeniedPage() {
  const { role } = useAuth()
  const dashboard = role === 'admin' ? '/admin' : '/student'

  return (
    <section className="container-page flex flex-col items-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error">
        <ShieldAlert className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-heading text-3xl font-bold text-secondary">Access Denied</h1>
      <p className="mt-3 max-w-md text-muted">
        You don&apos;t have permission to access this page.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to={dashboard}>
          <Button>Go to Dashboard</Button>
        </Link>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </section>
  )
}