import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { useAuth } from '@/context/AuthContext'

export default function ForgotPasswordPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (authLoading) {
    return (
      <section className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted">Checking authentication...</p>
      </section>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/student" replace />
  }

  const validate = (): boolean => {
    if (!email.trim()) {
      setError('Email is required.')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return false
    }
    setError(undefined)
    return true
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      setSent(true)
    }, 600)
  }

  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your account email and we will simulate sending a reset link."
      footer={
        <p>
          Remembered your password?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-blue-700">
            Sign In
          </Link>
        </p>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <p className="mt-4 font-medium text-secondary">Reset link sent</p>
          <p className="mt-1 text-sm text-muted">
            We&apos;ve simulated sending a password reset link to {email.trim()}.
          </p>
          <p className="mt-1 text-xs text-muted">
            This is a mock flow. No email is actually sent and no backend is involved.
          </p>
          <Link to="/login" className="mt-6 w-full">
            <Button className="w-full">Back to Sign In</Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          <Button type="submit" size="lg" className="w-full" loading={submitting}>
            {submitting ? 'Sending reset link...' : 'Send Reset Link'}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}