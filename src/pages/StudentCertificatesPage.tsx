import { useEffect, useState } from 'react'
import { Award } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/dashboard/EmptyState'
import {
  CertificateCard,
  CertificatePreview,
  CertificateBadge,
} from '@/components/certificate'
import { useToast } from '@/components/ui/Toast'
import { mockCertificates, getCertificateById } from '@/data/certificates'

const STATUS_LABEL: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  locked: 'Locked',
}

export default function StudentCertificatesPage() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'locked'>('all')
  const [previewId, setPreviewId] = useState<string | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  const completedCount = mockCertificates.filter((c) => c.status === 'completed').length
  const previewCertificate = previewId ? getCertificateById(previewId) : undefined

  const handleDownload = () => {
    toast.success('Certificate download started', 'This is a simulated PDF download.')
  }

  const filtered = filter === 'all' ? mockCertificates : mockCertificates.filter((c) => c.status === filter)

  const filterButtons: Array<{ value: typeof filter; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'locked', label: 'Locked' },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonCard className="h-40 w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-secondary lg:text-3xl">
          <Award className="h-8 w-8 text-accent" />
          Certificates
        </h1>
        <p className="mt-1 text-muted">
          View and download certificates for the courses you've completed.
        </p>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-slate-200 bg-white p-5">
        <div>
          <p className="font-heading text-lg font-semibold text-secondary">Your Certificates</p>
          <p className="text-sm text-muted">
            {completedCount} completed · {mockCertificates.length} total
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter certificates">
          {filterButtons.map((b) => (
            <button
              key={b.value}
              type="button"
              onClick={() => setFilter(b.value)}
              aria-pressed={filter === b.value}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                filter === b.value
                  ? 'bg-primary text-white'
                  : 'bg-surface text-secondary hover:bg-slate-100'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </section>

      {mockCertificates.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No certificates yet"
          description="Complete a course to earn your first certificate."
          actionLabel="Go to My Courses"
          actionTo="/student/courses"
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Award}
          title={`No ${STATUS_LABEL[filter]} certificates`}
          description={`There are no ${STATUS_LABEL[filter].toLowerCase()} certificates in this view.`}
        />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onView={(id) => setPreviewId(id)}
              onDownload={() => handleDownload()}
            />
          ))}
        </section>
      )}

      <Modal
        open={Boolean(previewCertificate)}
        onClose={() => setPreviewId(null)}
        title="Certificate Preview"
        description={previewCertificate ? previewCertificate.courseTitle : undefined}
        size="lg"
      >
        {previewCertificate && (
          <>
            <div className="mb-4 flex items-center gap-2">
              <CertificateBadge status={previewCertificate.status} />
              <span className="text-sm text-muted">{previewCertificate.certificateId}</span>
            </div>
            <CertificatePreview
              certificate={previewCertificate}
              onDownload={() => handleDownload()}
              onClose={() => setPreviewId(null)}
            />
          </>
        )}
      </Modal>
    </div>
  )
}