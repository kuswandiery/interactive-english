import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AlertCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/ui/Toast'

interface LoginErrors {
  email?: string
  password?: string
}

export default function LoginPage() {
  const { login, isAuthenticated, role, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const from = (location.state as { from?: string } | null)?.from

  if (authLoading) {
    return (
      <section className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted">Checking authentication...</p>
      </section>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={role === 'admin' ? '/admin' : '/student'} replace />
  }

  const validate = (): boolean => {
    const next: LoginErrors = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!password) next.password = 'Password is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!validate()) return
    setSubmitting(true)
    try {
      const user = await login(email, password)
      toast.success('Signed in successfully.', `Welcome back, ${user.name}!`)
      const destination = from || (user.role === 'admin' ? '/admin' : '/student')
      navigate(destination, { replace: true })
    } catch {
      setFormError('Invalid email or password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Sign In"
      description="Welcome back. Sign in to continue your English learning journey."
      footer={
        <p>
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            state={{ from }}
            className="font-medium text-primary hover:text-blue-700"
          >
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="rounded-md border border-slate-200 bg-surface p-3 text-xs text-muted">
          <p className="flex items-center gap-1.5 font-medium text-secondary">
            <Info className="h-4 w-4 text-primary" /> Demo accounts
          </p>
          <p className="mt-1">Student: student@example.com / student123</p>
          <p>Admin: admin@example.com / admin123</p>
        </div>

        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            id="remember"
            label="Remember me"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-blue-700">
            Forgot password?
          </Link>
        </div>

        {formError && (
          <p
            role="alert"
            className="flex items-center gap-1.5 rounded-md border border-error/30 bg-error/5 px-3 py-2 text-sm text-error"
          >
            <AlertCircle className="h-4 w-4 shrink-0" /> {formError}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" loading={submitting}>
          {submitting ? 'Signing in...' : 'Sign In'}
        </Button>

        <p className="text-center text-xs text-muted">
          Mock authentication for demonstration only. No real account is created.
        </p>
      </form>
    </AuthLayout>
  )
}