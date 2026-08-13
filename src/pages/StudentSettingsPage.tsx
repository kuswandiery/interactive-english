import { useEffect, useState } from 'react'
import { Settings as SettingsIcon, ShieldCheck, Palette, Play, Bell, Monitor } from 'lucide-react'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { Select } from '@/components/ui/Select'
import { SettingSection, SettingToggleRow } from '@/components/settings'
import { useToast } from '@/components/ui/Toast'
import { useSettings } from '@/context/SettingsContext'

const videoQualityOptions = [
  { value: 'auto', label: 'Auto' },
  { value: '1080p', label: '1080p (HD)' },
  { value: '720p', label: '720p' },
  { value: '360p', label: '360p' },
]

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

export default function StudentSettingsPage() {
  const { settings, setSetting } = useSettings()
  const toast = useToast()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  const showSaved = () => toast.success('Settings saved', 'Your preferences have been updated.')

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
          <SettingsIcon className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="mt-1 text-muted">Manage notifications, appearance, learning, and privacy.</p>
      </section>

      <SettingSection
        title="Account"
        description="Control how we contact you."
      >
        <SettingToggleRow
          icon={Bell}
          title="Notifications"
          description="Receive in-app notifications for activity."
          checked={settings.notifications}
          onChange={(v) => { setSetting('notifications', v); showSaved() }}
        />
        <SettingToggleRow
          icon={Bell}
          title="Email updates"
          description="Get news and updates by email."
          checked={settings.emailUpdates}
          onChange={(v) => { setSetting('emailUpdates', v); showSaved() }}
        />
        <SettingToggleRow
          icon={Bell}
          title="Course reminders"
          description="Reminders for upcoming lessons and deadlines."
          checked={settings.courseReminders}
          onChange={(v) => { setSetting('courseReminders', v); showSaved() }}
        />
      </SettingSection>

      <SettingSection
        title="Appearance"
        description="Choose your display theme."
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Palette className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-medium text-secondary">Appearance</p>
              <p className="mt-0.5 text-sm text-muted">Theme for the application.</p>
            </div>
          </div>
          <div className="w-36 shrink-0">
            <Select
              aria-label="Theme"
              value={settings.theme}
              onChange={(e) => { setSetting('theme', e.target.value as typeof settings.theme); showSaved() }}
              options={themeOptions}
            />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Learning"
        description="Customize your learning experience."
      >
        <SettingToggleRow
          icon={Play}
          title="Auto-play lessons"
          description="Automatically play the next lesson."
          checked={settings.autoPlayLessons}
          onChange={(v) => { setSetting('autoPlayLessons', v); showSaved() }}
        />
        <SettingToggleRow
          icon={Play}
          title="Learning reminders"
          description="Nudge you to keep your streak alive."
          checked={settings.learningReminders}
          onChange={(v) => { setSetting('learningReminders', v); showSaved() }}
        />
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Monitor className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-medium text-secondary">Video quality</p>
              <p className="mt-0.5 text-sm text-muted">Preferred playback quality.</p>
            </div>
          </div>
          <div className="w-36 shrink-0">
            <Select
              aria-label="Video quality"
              value={settings.videoQuality}
              onChange={(e) => { setSetting('videoQuality', e.target.value as typeof settings.videoQuality); showSaved() }}
              options={videoQualityOptions}
            />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Privacy"
        description="Control what others can see."
      >
        <SettingToggleRow
          icon={ShieldCheck}
          title="Public profile"
          description="Allow others to view your public learning profile."
          checked={settings.publicProfile}
          onChange={(v) => { setSetting('publicProfile', v); showSaved() }}
        />
        <SettingToggleRow
          icon={ShieldCheck}
          title="Share achievements"
          description="Share your badges and certificates."
          checked={settings.shareAchievements}
          onChange={(v) => { setSetting('shareAchievements', v); showSaved() }}
        />
      </SettingSection>
    </div>
  )
}