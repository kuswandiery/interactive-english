import { useEffect, useMemo, useState } from 'react'
import { Award, ShieldCheck, ShieldOff, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Skeleton } from '@/components/ui/Skeleton'
import { useToast } from '@/components/ui/Toast'
import { AdminTable, ConfirmDialog, AdminPageToolbar, type Column } from '@/components/admin'
import { adminCertificates } from '@/data/adminCertificates'
import type { AdminCertificate, AdminCertificateStatus } from '@/types/admin'

const statusBadge: Record<AdminCertificateStatus, 'success' | 'warning' | 'error'> = {
  completed: 'success',
  pending: 'warning',
  revoked: 'error',
}

export default function AdminCertificatesPage() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<AdminCertificate[]>(adminCertificates)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [viewing, setViewing] = useState<AdminCertificate | null>(null)
  const [revoking, setRevoking] = useState<AdminCertificate | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(
    () =>
      rows.filter((c) => {
        const q = search.trim().toLowerCase()
        const matchesSearch =
          !q ||
          c.studentName.toLowerCase().includes(q) ||
          c.courseTitle.toLowerCase().includes(q) ||
          c.certificateId.toLowerCase().includes(q)
        const matchesStatus = !statusFilter || c.status === statusFilter
        return matchesSearch && matchesStatus
      }),
    [rows, search, statusFilter],
  )

  const handleIssue = (c: AdminCertificate) => {
    const existing = rows.find((r) => r.id === c.id)
    if (existing && existing.status === 'completed') {
      toast.warning('Certificate already issued', `${c.studentName}'s certificate is active.`)
      return
    }
    const certificateId = `EA-2026-${String(Date.now()).slice(-4)}`
    const issueDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    setRows((prev) =>
      prev.map((r) => (r.id === c.id ? { ...r, status: 'completed', certificateId, issueDate } : r)),
    )
    toast.success('Certificate issued', `Certificate ${certificateId} issued to ${c.studentName}.`)
  }

  const handleRevoke = () => {
    if (!revoking) return
    setRows((prev) => prev.map((r) => (r.id === revoking.id ? { ...r, status: 'revoked' } : r)))
    toast.success('Certificate revoked', `${revoking.studentName}'s certificate was revoked.`)
    setRevoking(null)
  }

  const columns: Column<AdminCertificate>[] = [
    {
      key: 'student',
      header: 'Student',
      render: (c) => (
        <div>
          <p className="font-medium text-secondary">{c.studentName}</p>
          <p className="text-xs text-muted">{c.courseTitle}</p>
        </div>
      ),
    },
    {
      key: 'id',
      header: 'Certificate ID',
      render: (c) =>
        c.certificateId ? (
          <span className="font-mono text-xs text-slate-700">{c.certificateId}</span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: 'issued',
      header: 'Issue Date',
      render: (c) =>
        c.issueDate ? <span className="text-slate-700">{c.issueDate}</span> : <span className="text-muted">—</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (c) => (
        <Badge variant={statusBadge[c.status]}>
          {c.status === 'completed' ? 'Completed' : c.status === 'pending' ? 'Pending' : 'Revoked'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (c) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => setViewing(c)}>
            <Eye className="h-4 w-4" /> View
          </Button>
          {c.status !== 'completed' ? (
            <Button size="sm" variant="outline" onClick={() => handleIssue(c)}>
              <ShieldCheck className="h-4 w-4" /> Issue
            </Button>
          ) : (
            <Button size="sm" variant="danger" onClick={() => setRevoking(c)}>
              <ShieldOff className="h-4 w-4" /> Revoke
            </Button>
          )}
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-secondary lg:text-3xl">
          <Award className="h-8 w-8 text-accent" /> Certificate Management
        </h1>
        <p className="mt-1 text-muted">Issue, revoke, and manage student certificates.</p>
      </section>

      <AdminPageToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search certificates..."
        filterValue={statusFilter}
        onFilter={setStatusFilter}
        filterLabel="Status"
        filterOptions={[
          { label: 'Completed', value: 'completed' },
          { label: 'Pending', value: 'pending' },
          { label: 'Revoked', value: 'revoked' },
        ]}
      />

      <AdminTable
        columns={columns}
        data={filtered}
        rowKey={(c) => c.id}
        emptyIcon={Award}
        emptyTitle="No certificates found"
        emptyDescription="Certificates issued to students will appear here."
      />

      <ConfirmDialog
        open={Boolean(revoking)}
        onConfirm={handleRevoke}
        onCancel={() => setRevoking(null)}
        title="Revoke certificate?"
        description={
          revoking
            ? `Revoke ${revoking.studentName}'s certificate for ${revoking.courseTitle}?`
            : 'This certificate will be marked as revoked.'
        }
        confirmLabel="Revoke"
      />

      <Modal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        title="Certificate Details"
        size="md"
      >
        {viewing && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-md bg-slate-50 p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Award className="h-6 w-6" />
              </span>
              <div>
                <p className="font-heading text-lg font-semibold text-secondary">{viewing.studentName}</p>
                <p className="text-sm text-muted">{viewing.courseTitle}</p>
              </div>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Certificate ID</dt>
                <dd className="font-mono font-medium text-secondary">{viewing.certificateId || '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Issue Date</dt>
                <dd className="font-medium text-secondary">{viewing.issueDate || '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Status</dt>
                <dd>
                  <Badge variant={statusBadge[viewing.status]}>
                    {viewing.status === 'completed'
                      ? 'Completed'
                      : viewing.status === 'pending'
                        ? 'Pending'
                        : 'Revoked'}
                  </Badge>
                </dd>
              </div>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  )
}