import { useEffect, useMemo, useState } from 'react'
import { Users, Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Skeleton } from '@/components/ui/Skeleton'
import { useToast } from '@/components/ui/Toast'
import { AdminTable, ConfirmDialog, AdminPageToolbar, type Column } from '@/components/admin'
import { adminStudents } from '@/data/adminStudents'
import type { AdminStudent, StudentStatus } from '@/types/admin'

const statusBadge: Record<StudentStatus, 'success' | 'muted'> = {
  active: 'success',
  inactive: 'muted',
}

function ProgressCell({ value }: { value: number }) {
  return (
    <div className="w-24">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-secondary">{value}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  )
}

export default function AdminStudentsPage() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<AdminStudent[]>(adminStudents)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [viewing, setViewing] = useState<AdminStudent | null>(null)
  const [editing, setEditing] = useState<AdminStudent | null>(null)
  const [deleting, setDeleting] = useState<AdminStudent | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(
    () =>
      rows.filter((s) => {
        const q = search.trim().toLowerCase()
        const matchesSearch =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q)
        const matchesStatus = !statusFilter || s.status === statusFilter
        return matchesSearch && matchesStatus
      }),
    [rows, search, statusFilter],
  )

  const handleDelete = () => {
    if (!deleting) return
    setRows((prev) => prev.filter((s) => s.id !== deleting.id))
    toast.success('Student deleted', `${deleting.name} was removed (simulated).`)
    setDeleting(null)
  }

  const handleSave = (updated: AdminStudent) => {
    setRows((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
    toast.success('Student updated', `${updated.name}'s record was saved.`)
    setEditing(null)
  }

  const columns: Column<AdminStudent>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (s) => (
        <div>
          <p className="font-medium text-secondary">{s.name}</p>
          <p className="text-xs text-muted">{s.email}</p>
        </div>
      ),
    },
    { key: 'course', header: 'Course', render: (s) => <span className="text-slate-700">{s.course}</span> },
    { key: 'progress', header: 'Progress', render: (s) => <ProgressCell value={s.progress} /> },
    { key: 'enrolledDate', header: 'Enrollment Date', render: (s) => <span className="text-muted">{s.enrolledDate}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (s) => <Badge variant={statusBadge[s.status]}>{s.status === 'active' ? 'Active' : 'Inactive'}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (s) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => setViewing(s)}>
            <Eye className="h-4 w-4" /> View
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(s)}>
            <Pencil className="h-4 w-4" /> Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => setDeleting(s)}>
            <Trash2 className="h-4 w-4" />
          </Button>
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
          <Users className="h-8 w-8 text-primary" /> Student Management
        </h1>
        <p className="mt-1 text-muted">Manage student records, progress, and enrollment.</p>
      </section>

      <AdminPageToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search students..."
        filterValue={statusFilter}
        onFilter={setStatusFilter}
        filterLabel="Status"
        filterOptions={[
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ]}
      />

      <AdminTable
        columns={columns}
        data={filtered}
        rowKey={(s) => s.id}
        emptyIcon={Users}
        emptyTitle="No students found"
        emptyDescription="Try adjusting your search or filter."
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        title="Delete student?"
        description={
          deleting
            ? `Are you sure you want to delete ${deleting.name}'s record?`
            : 'Deleting this student will remove their record.'
        }
        confirmLabel="Delete"
      />

      <Modal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        title="Student Details"
        size="md"
      >
        {viewing && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {viewing.name
                  .split(' ')
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join('')}
              </span>
              <div>
                <p className="font-heading text-lg font-semibold text-secondary">{viewing.name}</p>
                <p className="text-sm text-muted">{viewing.email}</p>
              </div>
            </div>
            <dl className="space-y-2 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Course</dt>
                <dd className="font-medium text-secondary">{viewing.course}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Progress</dt>
                <dd className="font-medium text-secondary">{viewing.progress}%</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Enrollment Date</dt>
                <dd className="font-medium text-secondary">{viewing.enrolledDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Status</dt>
                <dd className="font-medium text-secondary">
                  {viewing.status === 'active' ? 'Active' : 'Inactive'}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </Modal>

      <StudentEditModal student={editing} onCancel={() => setEditing(null)} onSave={handleSave} />
    </div>
  )
}

function StudentEditModal({
  student,
  onCancel,
  onSave,
}: {
  student: AdminStudent | null
  onCancel: () => void
  onSave: (s: AdminStudent) => void
}) {
  const [form, setForm] = useState<AdminStudent | null>(student)

  useEffect(() => {
    setForm(student)
  }, [student])

  if (!student || !form) return null

  return (
    <Modal
      open={Boolean(student)}
      onClose={onCancel}
      title="Edit Student"
      description={`Update ${student.name}'s record.`}
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSave({
                ...form,
                name: form.name.trim(),
                email: form.email.trim(),
                course: form.course.trim(),
              })
            }
          >
            Save Changes
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
        />
        <Select
          label="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as StudentStatus })}
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]}
        />
      </div>
    </Modal>
  )
}