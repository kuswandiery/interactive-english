import { useEffect, useState, type FormEvent } from 'react'
import { User, Save } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { useToast } from '@/components/ui/Toast'
import { useProfile } from '@/context/ProfileContext'
import { learningGoals, preferredLanguages } from '@/services/profileService'
import type { StudentProfile } from '@/types/profile'

interface FormErrors {
  name?: string
  email?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function StudentProfilePage() {
  const { profile, updateProfile } = useProfile()
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<StudentProfile>(profile)
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  const goalLabel =
    learningGoals.find((g) => g.value === profile.goal)?.label ?? profile.goal
  const langLabel =
    preferredLanguages.find((l) => l.value === profile.preferredLanguage)?.label ??
    profile.preferredLanguage

  const handleChange = (
    field: keyof StudentProfile,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email address.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const next: StudentProfile = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      avatar: form.name
        .trim()
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase(),
    }
    updateProfile(next)
    toast.success('Profile updated', 'Your profile changes have been saved.')
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonCard className="h-40 w-full" />
        <SkeletonCard className="h-80 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-secondary lg:text-3xl">
          <User className="h-8 w-8 text-primary" />
          Profile
        </h1>
        <p className="mt-1 text-muted">Manage your personal information and learning preferences.</p>
      </section>

      <section>
        <Card className="flex flex-col items-center gap-4 p-6 sm:flex-row">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
            {profile.avatar}
          </span>
          <div className="text-center sm:text-left">
            <h2 className="font-heading text-xl font-bold text-secondary">{profile.name}</h2>
            <p className="text-sm text-muted">{profile.email}</p>
            <p className="mt-1 text-sm text-muted">
              Goal: <span className="font-medium text-secondary">{goalLabel}</span> · Language:{' '}
              <span className="font-medium text-secondary">{langLabel}</span>
            </p>
          </div>
        </Card>
      </section>

      <section>
        <form onSubmit={handleSubmit} noValidate>
          <Card className="space-y-5">
            <h2 className="font-heading text-lg font-semibold text-secondary">Update Profile</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Name"
                required
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                autoComplete="name"
              />
              <Input
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={errors.email}
                autoComplete="email"
              />
            </div>

            <Textarea
              label="Biography"
              value={form.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              hint="A short introduction about yourself."
              rows={4}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Select
                label="Learning Goal"
                value={form.goal}
                onChange={(e) => handleChange('goal', e.target.value)}
                options={learningGoals}
              />
              <Select
                label="Preferred Language"
                value={form.preferredLanguage}
                onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                options={preferredLanguages}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </Card>
        </form>
      </section>
    </div>
  )
}