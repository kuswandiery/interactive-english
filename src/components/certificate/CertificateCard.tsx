import { Award, Download, Eye, Lock, Clock3 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils'
import type { Certificate } from '@/types/certificate'

const statusConfig = {
  completed: { label: 'Completed', variant: 'success' as const, icon: Award },
  'in-progress': { label: 'In Progress', variant: 'warning' as const, icon: Clock3 },
  locked: { label: 'Locked', variant: 'muted' as const, icon: Lock },
}

interface CertificateCardProps {
  certificate: Certificate
  onView: (id: string) => void
  onDownload: (id: string) => void
}

export function CertificateCard({ certificate, onView, onDownload }: CertificateCardProps) {
  const { label, variant, icon: StatusIcon } = statusConfig[certificate.status]
  const isCompleted = certificate.status === 'completed'

  return (
    <Card className={cn('flex h-full flex-col', certificate.status === 'locked' && 'opacity-75')}>
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-md',
            isCompleted ? 'bg-accent/15 text-accent' : 'bg-slate-100 text-muted',
          )}
        >
          <StatusIcon className="h-6 w-6" />
        </span>
        <Badge variant={variant}>{label}</Badge>
      </div>

      <h3 className="mt-3 font-heading text-lg font-semibold text-secondary">
        {certificate.courseTitle}
      </h3>
      <p className="text-sm text-muted">{certificate.level} · {certificate.category}</p>
      <p className="mt-1 text-sm text-muted">Instructor: {certificate.tutor}</p>

      {isCompleted ? (
        <div className="mt-3 space-y-1 rounded-md bg-surface px-3 py-2 text-xs text-muted">
          <p>
            Issued: <span className="font-medium text-secondary">{certificate.issueDate}</span>
          </p>
          <p>
            ID: <span className="font-medium text-secondary">{certificate.certificateId}</span>
          </p>
        </div>
      ) : (
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">{certificate.status === 'locked' ? 'Not started' : 'Course progress'}</span>
            <span className="font-bold text-primary">{certificate.progress}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${certificate.progress}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted">
            {certificate.status === 'locked'
              ? 'Complete the course to earn this certificate.'
              : 'Keep learning to earn your certificate.'}
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row">
        <Button
          size="sm"
          className="flex-1"
          disabled={!isCompleted}
          onClick={() => onView(certificate.id)}
        >
          <Eye className="h-4 w-4" /> View Certificate
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          disabled={!isCompleted}
          onClick={() => onDownload(certificate.id)}
        >
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>
    </Card>
  )
}