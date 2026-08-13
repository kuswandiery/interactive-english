import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface QuickActionCardProps {
  icon: LucideIcon
  label: string
  description: string
  to: string
}

export function QuickActionCard({ icon: Icon, label, description, to }: QuickActionCardProps) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-start gap-2 rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
        <Icon className="h-6 w-6" />
      </span>
      <h4 className="mt-1 font-heading font-semibold text-secondary">{label}</h4>
      <p className="text-sm text-muted">{description}</p>
    </Link>
  )
}