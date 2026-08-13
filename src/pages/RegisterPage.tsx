import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/ui/Toast'

interface RegisterErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  terms?: string
}

export default function RegisterPage() {
  const { register, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
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
    const next: RegisterErrors = {}
    if (!name.trim()) next.name = 'Full name is required.'
    else if (name.trim().length < 2) next.name = 'Full name must be at least 2 characters.'
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!password) next.password = 'Password is required.'
    else if (password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (!confirmPassword) next.confirmPassword = 'Please confirm your password.'
    else if (confirmPassword !== password) next.confirmPassword = 'Passwords do not match.'
    if (!terms) next.terms = 'You must accept the terms to create an account.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!validate()) return
    setSubmitting(true)
    try {
      const user = await register({ name, email, password })
      toast.success('Account created successfully.', `Welcome to English Academy, ${user.name}!`)
      navigate('/student', { replace: true })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Unable to create account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create Your Account"
      description="Join English Academy and start learning with expert tutors."
      footer={
        <p>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-blue-700">
            Sign In
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          id="fullName"
          type="text"
          label="Full Name"
          placeholder="Jane Doe"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

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
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />

        <Checkbox
          id="terms"
          label="I agree to the Terms of Service and Privacy Policy"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          error={errors.terms}
        />

        {formError && (
          <p
            role="alert"
            className="flex items-center gap-1.5 rounded-md border border-error/30 bg-error/5 px-3 py-2 text-sm text-error"
          >
            <AlertCircle className="h-4 w-4 shrink-0" /> {formError}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" loading={submitting}>
          {submitting ? 'Creating account...' : 'Create Account'}
        </Button>

        <p className="text-center text-xs text-muted">
          Mock registration for demonstration only. No real account or database is used.
        </p>
      </form>
    </AuthLayout>
  )
}