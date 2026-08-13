import { useEffect, useState } from 'react'
import { Settings as SettingsIcon, Globe, Bell, BookOpen, Award, ShieldCheck } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { SettingSection, SettingToggleRow } from '@/components/settings'
import { useToast } from '@/components/ui/Toast'
import {
  getStoredAdminSettings,
  saveAdminSettings,
} from '@/services/adminSettingsService'
import type { AdminSettings } from '@/types/admin'

export default function AdminSettingsPage() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<AdminSettings>(() => getStoredAdminSettings())

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  const update = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value }
      saveAdminSettings(next)
      return next
    })
    toast.success('Settings saved', 'Your preferences were updated.')
  }

  const saveAll = () => {
    saveAdminSettings(settings)
    toast.success('Settings saved', 'All admin settings were saved.')
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonCard className="h-40 w-full" />
        <SkeletonCard className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-secondary lg:text-3xl">
          <SettingsIcon className="h-8 w-8 text-primary" /> Settings
        </h1>
        <p className="mt-1 text-muted">Platform-wide configuration. Saved to localStorage.</p>
      </section>

      <SettingSection title="General" description="Basic platform settings">
        <div className="grid gap-4 py-4 sm:grid-cols-2">
          <Input
            label="Site name"
            value={settings.siteName}
            onChange={(e) => update('siteName', e.target.value)}
          />
          <Input
            label="Support email"
            type="email"
            value={settings.supportEmail}
            onChange={(e) => update('supportEmail', e.target.value)}
          />
        </div>
        <SettingToggleRow
          icon={ShieldCheck}
          title="Maintenance mode"
          description="Temporarily hide the platform from students."
          checked={settings.maintenanceMode}
          onChange={(v) => update('maintenanceMode', v)}
        />
      </SettingSection>

      <SettingSection title="Notifications" description="System notification preferences">
        <SettingToggleRow
          icon={Bell}
          title="Student enrollment"
          description="Notify admins when a student enrolls."
          checked={settings.notifyStudentEnrollment}
          onChange={(v) => update('notifyStudentEnrollment', v)}
        />
        <SettingToggleRow
          icon={Bell}
          title="New tutor"
          description="Notify admins when a tutor is added."
          checked={settings.notifyNewTutor}
          onChange={(v) => update('notifyNewTutor', v)}
        />
        <SettingToggleRow
          icon={Bell}
          title="New reviews"
          description="Notify admins when a new review is posted."
          checked={settings.notifyNewReviews}
          onChange={(v) => update('notifyNewReviews', v)}
        />
      </SettingSection>

      <SettingSection title="Courses" description="Course creation defaults">
        <SettingToggleRow
          icon={BookOpen}
          title="Auto-approve courses"
          description="Publish new courses without manual review."
          checked={settings.autoApproveCourses}
          onChange={(v) => update('autoApproveCourses', v)}
        />
        <div className="grid gap-4 py-4 sm:grid-cols-2">
          <Select
            label="Default course level"
            value={settings.defaultCourseLevel}
            onChange={(e) => update('defaultCourseLevel', e.target.value)}
            options={[
              { label: 'Beginner', value: 'Beginner' },
              { label: 'Elementary', value: 'Elementary' },
              { label: 'Intermediate', value: 'Intermediate' },
              { label: 'Upper Intermediate', value: 'Upper Intermediate' },
              { label: 'Advanced', value: 'Advanced' },
            ]}
          />
          <Input
            label="Enrollment cap"
            type="number"
            min={0}
            value={String(settings.enrollmentCap)}
            onChange={(e) => update('enrollmentCap', parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </SettingSection>

      <SettingSection title="Certificates" description="Certificate issuing defaults">
        <SettingToggleRow
          icon={Award}
          title="Auto-issue certificates"
          description="Automatically issue a certificate when a course is completed."
          checked={settings.autoIssueCertificates}
          onChange={(v) => update('autoIssueCertificates', v)}
        />
        <div className="py-4">
          <Input
            label="Certificate expiry (days)"
            type="number"
            min={0}
            value={String(settings.certificateExpiryDays)}
            onChange={(e) => update('certificateExpiryDays', parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </SettingSection>

      <div className="flex justify-end">
        <Button onClick={saveAll}>
          <Globe className="h-4 w-4" /> Save All Settings
        </Button>
      </div>
    </div>
  )
}