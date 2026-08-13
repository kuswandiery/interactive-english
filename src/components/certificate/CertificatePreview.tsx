import { GraduationCap, Award, Download } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Certificate } from '@/types/certificate'

interface CertificatePreviewProps {
  certificate: Certificate
  onDownload: () => void
  onClose: () => void
}

export function CertificatePreview({ certificate, onDownload, onClose }: CertificatePreviewProps) {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg border-4 border-double border-primary/60 bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center sm:p-8">
        <span className="pointer-events-none absolute -right-8 -top-8 text-primary/10" aria-hidden="true">
          <Award className="h-40 w-40" />
        </span>

        <div className="mx-auto flex w-max items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-heading text-lg font-bold text-secondary">
            English<span className="text-primary">Academy</span>
          </span>
        </div>

        <p className="mt-6 font-heading text-sm font-semibold uppercase tracking-widest text-primary">
          Certificate of Completion
        </p>

        <h2 className="mt-2 font-heading text-xl font-bold text-secondary sm:text-2xl">
          {certificate.courseTitle}
        </h2>

        <p className="mt-4 text-sm text-muted">This certifies that</p>
        <p className="mt-1 font-heading text-2xl font-bold text-secondary">{certificate.studentName}</p>
        <p className="mt-1 text-sm text-muted">
          has successfully completed the {certificate.level} course requirements
        </p>

        <div className="mt-8 flex flex-wrap items-end justify-center gap-8 text-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Issue Date</p>
            <p className="mt-0.5 font-semibold text-secondary">{certificate.issueDate}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Certificate ID</p>
            <p className="mt-0.5 font-semibold text-secondary">{certificate.certificateId}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Instructor</p>
            <p className="mt-0.5 font-semibold text-secondary">{certificate.tutor}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Badge variant="success">Verified</Badge>
        <span className="text-xs text-muted">Preview only · issued by English Academy</span>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
        <Button onClick={onDownload}>
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>
    </div>
  )
}