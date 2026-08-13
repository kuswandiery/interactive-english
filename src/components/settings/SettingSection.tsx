import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Toggle } from '@/components/settings/Toggle'

interface SettingRowProps {
  icon?: LucideIcon
  title: string
  description?: string
  children: React.ReactNode
}

export function SettingRow({ icon: Icon, title, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div className="min-w-0">
          <p className="font-medium text-secondary">{title}</p>
          {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

interface SettingToggleRowProps {
  icon?: LucideIcon
  title: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function SettingToggleRow({ icon, title, description, checked, onChange }: SettingToggleRowProps) {
  return (
    <SettingRow icon={icon} title={title} description={description}>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </SettingRow>
  )
}

interface SettingSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function SettingSection({ title, description, children }: SettingSectionProps) {
  return (
    <section>
      <h2 className="font-heading text-lg font-semibold text-secondary">{title}</h2>
      {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
      <Card className="mt-3 px-5 py-1">{children}</Card>
    </section>
  )
}