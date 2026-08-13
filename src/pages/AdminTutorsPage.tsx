import { useEffect, useMemo, useState } from 'react'
import { GraduationCap, Plus, Pencil, Trash2, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Skeleton } from '@/components/ui/Skeleton'
import { useToast } from '@/components/ui/Toast'
import { AdminTable, ConfirmDialog, AdminPageToolbar, type Column } from '@/components/admin'
import { adminTutors, adminTutorSpecializations } from '@/data/adminTutors'
import type { AdminTutor, AdminTutorStatus } from '@/types/admin'

const statusBadge: Record<AdminTutorStatus, 'success' | 'muted'> = {
  active: 'success',
  inactive: 'muted',
}

interface TutorForm {
  name: string
  email: string
  specialization: string
  experience: string
  status: AdminTutorStatus
}

const emptyForm: TutorForm = { name: '', email: '', specialization: '', experience: '', status: 'active' }

interface TutorFormErrors {
  name?: string
  email?: string
  specialization?: string
}

export default function AdminTutorsPage() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<AdminTutor[]>(adminTutors)
  const [search, setSearch] = useState('')
  const [specFilter, setSpecFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<AdminTutor | null>(null)
  const [deleting, setDeleting] = useState<AdminTutor | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(
    () =>
      rows.filter((t) => {
        const q = search.trim().toLowerCase()
        const matchesSearch =
          !q ||
          t.name.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          t.specialization.toLowerCase().includes(q)
        const matchesSpec = !specFilter || t.specialization === specFilter
        return matchesSearch && matchesSpec
      }),
    [rows, search, specFilter],
  )

  const openAdd = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (t: AdminTutor) => {
    setEditing(t)
    setModalOpen(true)
  }

  const handleSave = (form: TutorForm) => {
    const experience = parseInt(form.experience, 10) || 0
    if (editing) {
      setRows((prev) =>
        prev.map((t) =>
          t.id === editing.id ? { ...t, ...form, experience } as AdminTutor : t,
        ),
      )
      toast.success('Tutor updated', `${form.name}'s details were saved.`)
    } else {
      const newTutor: AdminTutor = {
        id: `tut-${Date.now()}`,
        name: form.name,
        email: form.email,
        specialization: form.specialization,
        experience,
        rating: 0,
        status: form.status,
      }
      setRows((prev) => [newTutor, ...prev])
      toast.success('Tutor added', `${form.name} was added to the team.`)
    }
    setModalOpen(false)
  }

  const handleDelete = () => {
    if (!deleting) return
    setRows((prev) => prev.filter((t) => t.id !== deleting.id))
    toast.success('Tutor deleted', `${deleting.name} was removed (simulated).`)
    setDeleting(null)
  }

  const columns: Column<AdminTutor>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (t) => (
        <div>
          <p className="font-medium text-secondary">{t.name}</p>
          <p className="text-xs text-muted">{t.email}</p>
        </div>
      ),
    },
    {
      key: 'specialization',
      header: 'Specialization',
      render: (t) => <span className="text-slate-700">{t.specialization}</span>,
    },
    {
      key: 'experience',
      header: 'Experience',
      render: (t) => <span className="text-slate-700">{t.experience} yrs</span>,
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (t) =>
        t.rating ? (
          <span className="flex items-center gap-1 font-medium text-secondary">
            <Star className="h-4 w-4 text-accent" /> {t.rating.toFixed(1)}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => <Badge variant={statusBadge[t.status]}>{t.status === 'active' ? 'Active' : 'Inactive'}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (t) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => openEdit(t)}>
            <Pencil className="h-4 w-4" /> Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => setDeleting(t)}>
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
          <GraduationCap className="h-8 w-8 text-primary" /> Tutor Management
        </h1>
        <p className="mt-1 text-muted">Add, edit, and manage your teaching staff.</p>
      </section>

      <AdminPageToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search tutors..."
        filterValue={specFilter}
        onFilter={setSpecFilter}
        filterLabel="Specialization"
        filterOptions={adminTutorSpecializations}
        action={
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Tutor
          </Button>
        }
      />

      <AdminTable
        columns={columns}
        data={filtered}
        rowKey={(t) => t.id}
        emptyIcon={GraduationCap}
        emptyTitle="No tutors found"
        emptyDescription="Try adjusting your search or filter, or add a new tutor."
      />

      <TutorFormModal
        open={modalOpen}
        tutor={editing}
        onCancel={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        title="Delete tutor?"
        description={
          deleting
            ? `Are you sure you want to delete ${deleting.name}?`
            : 'Deleting this tutor will remove their record.'
        }
        confirmLabel="Delete"
      />
    </div>
  )
}

function TutorFormModal({
  open,
  tutor,
  onCancel,
  onSave,
}: {
  open: boolean
  tutor: AdminTutor | null
  onCancel: () => void
  onSave: (form: TutorForm) => void
}) {
  const [form, setForm] = useState<TutorForm>(emptyForm)
  const [errors, setErrors] = useState<TutorFormErrors>({})

  useEffect(() => {
    if (open) {
      setForm(
        tutor
          ? {
              name: tutor.name,
              email: tutor.email,
              specialization: tutor.specialization,
              experience: String(tutor.experience),
              status: tutor.status,
            }
          : emptyForm,
      )
      setErrors({})
    }
  }, [open, tutor])

  const validate = (): boolean => {
    const next: TutorFormErrors = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email.'
    if (!form.specialization) next.specialization = 'Specialization is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSave({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
    })
  }

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={tutor ? 'Edit Tutor' : 'Add Tutor'}
      description={tutor ? `Update ${tutor.name}'s information.` : 'Create a new tutor account.'}
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{tutor ? 'Save Changes' : 'Add Tutor'}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <Select
          label="Specialization"
          required
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          placeholder="Select specialization"
          options={adminTutorSpecializations}
          error={errors.specialization}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Experience (years)"
            type="number"
            min={0}
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
          />
          <Select
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as AdminTutorStatus })}
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ]}
          />
        </div>
      </div>
    </Modal>
  )
}