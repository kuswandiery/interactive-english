import { Award } from 'lucide-react'
import { cn } from '@/utils'
import type { CertificateStatus } from '@/types/certificate'

const variantStyles: Record<CertificateStatus, string> = {
  completed: 'bg-success/15 text-success',
  'in-progress': 'bg-primary/15 text-primary',
  locked: 'bg-slate-200 text-muted',
}

export function CertificateBadge({ status }: { status: CertificateStatus }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', variantStyles[status])}>
      <Award className="h-3.5 w-3.5" />
      {status === 'completed'
        ? 'Completed'
        : status === 'in-progress'
          ? 'In Progress'
          : 'Locked'}
    </span>
  )
}