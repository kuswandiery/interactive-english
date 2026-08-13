import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Skeleton } from '@/components/ui/Skeleton'
import { useToast } from '@/components/ui/Toast'
import { AdminTable, ConfirmDialog, AdminPageToolbar, type Column } from '@/components/admin'
import {
  adminCourses,
  adminCourseCategories,
  adminCourseLevels,
} from '@/data/adminCourses'
import type { AdminCourse, AdminCourseStatus } from '@/types/admin'

const statusBadge: Record<AdminCourseStatus, 'primary' | 'muted'> = {
  published: 'primary',
  draft: 'muted',
}

interface CourseForm {
  title: string
  category: string
  level: string
  lessons: string
  students: string
  price: string
  status: AdminCourseStatus
}

const emptyForm: CourseForm = {
  title: '',
  category: '',
  level: '',
  lessons: '',
  students: '',
  price: '',
  status: 'draft',
}

interface CourseFormErrors {
  title?: string
  category?: string
  level?: string
}

export default function AdminCoursesPage() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<AdminCourse[]>(adminCourses)
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<AdminCourse | null>(null)
  const [deleting, setDeleting] = useState<AdminCourse | null>(null)

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
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        const matchesLevel = !levelFilter || c.level === levelFilter
        return matchesSearch && matchesLevel
      }),
    [rows, search, levelFilter],
  )

  const openAdd = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (c: AdminCourse) => {
    setEditing(c)
    setModalOpen(true)
  }

  const handleSave = (form: CourseForm) => {
    const lessons = parseInt(form.lessons, 10) || 0
    const students = parseInt(form.students, 10) || 0
    const price = parseFloat(form.price) || 0
    if (editing) {
      setRows((prev) =>
        prev.map((c) =>
          c.id === editing.id ? { ...c, ...form, lessons, students, price } as AdminCourse : c,
        ),
      )
      toast.success('Course updated', `${form.title} was updated.`)
    } else {
      const newCourse: AdminCourse = {
        id: `course-${Date.now()}`,
        title: form.title,
        category: form.category,
        level: form.level,
        lessons,
        students,
        price,
        status: form.status,
      }
      setRows((prev) => [newCourse, ...prev])
      toast.success('Course added', `${form.title} was created.`)
    }
    setModalOpen(false)
  }

  const handleDelete = () => {
    if (!deleting) return
    setRows((prev) => prev.filter((c) => c.id !== deleting.id))
    toast.success('Course deleted', `${deleting.title} was removed (simulated).`)
    setDeleting(null)
  }

  const columns: Column<AdminCourse>[] = [
    {
      key: 'title',
      header: 'Title',
      render: (c) => (
        <div>
          <p className="font-medium text-secondary">{c.title}</p>
          <p className="text-xs text-muted">{c.category}</p>
        </div>
      ),
    },
    { key: 'level', header: 'Level', render: (c) => <span className="text-slate-700">{c.level}</span> },
    { key: 'lessons', header: 'Lessons', render: (c) => <span className="text-slate-700">{c.lessons}</span> },
    { key: 'students', header: 'Students', render: (c) => <span className="text-slate-700">{c.students.toLocaleString()}</span> },
    { key: 'price', header: 'Price', render: (c) => <span className="font-medium text-secondary">${c.price}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (c) => <Badge variant={statusBadge[c.status]}>{c.status === 'published' ? 'Published' : 'Draft'}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (c) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => openEdit(c)}>
            <Pencil className="h-4 w-4" /> Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => setDeleting(c)}>
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
          <BookOpen className="h-8 w-8 text-primary" /> Course Management
        </h1>
        <p className="mt-1 text-muted">Create, edit, and manage courses.</p>
      </section>

      <AdminPageToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search courses..."
        filterValue={levelFilter}
        onFilter={setLevelFilter}
        filterLabel="Level"
        filterOptions={adminCourseLevels}
        action={
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Course
          </Button>
        }
      />

      <AdminTable
        columns={columns}
        data={filtered}
        rowKey={(c) => c.id}
        emptyIcon={BookOpen}
        emptyTitle="No courses found"
        emptyDescription="Try adjusting your search or filter, or add a new course."
      />

      <CourseFormModal
        open={modalOpen}
        course={editing}
        onCancel={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        title="Delete course?"
        description={
          deleting
            ? `Are you sure you want to delete "${deleting.title}"?`
            : 'Deleting this course will remove it permanently.'
        }
        confirmLabel="Delete"
      />
    </div>
  )
}

function CourseFormModal({
  open,
  course,
  onCancel,
  onSave,
}: {
  open: boolean
  course: AdminCourse | null
  onCancel: () => void
  onSave: (form: CourseForm) => void
}) {
  const [form, setForm] = useState<CourseForm>(emptyForm)
  const [errors, setErrors] = useState<CourseFormErrors>({})

  useEffect(() => {
    if (open) {
      setForm(
        course
          ? {
              title: course.title,
              category: course.category,
              level: course.level,
              lessons: String(course.lessons),
              students: String(course.students),
              price: String(course.price),
              status: course.status,
            }
          : emptyForm,
      )
      setErrors({})
    }
  }, [open, course])

  const validate = (): boolean => {
    const next: CourseFormErrors = {}
    if (!form.title.trim()) next.title = 'Title is required.'
    if (!form.category) next.category = 'Category is required.'
    if (!form.level) next.level = 'Level is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSave({ ...form, title: form.title.trim() })
  }

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={course ? 'Edit Course' : 'Add Course'}
      description={course ? `Update "${course.title}".` : 'Create a new course.'}
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{course ? 'Save Changes' : 'Add Course'}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          error={errors.title}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Category"
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Select category"
            options={adminCourseCategories}
            error={errors.category}
          />
          <Select
            label="Level"
            required
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
            placeholder="Select level"
            options={adminCourseLevels}
            error={errors.level}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Lessons"
            type="number"
            min={0}
            value={form.lessons}
            onChange={(e) => setForm({ ...form, lessons: e.target.value })}
          />
          <Input
            label="Students"
            type="number"
            min={0}
            value={form.students}
            onChange={(e) => setForm({ ...form, students: e.target.value })}
          />
          <Input
            label="Price ($)"
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <Select
          label="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as AdminCourseStatus })}
          options={[
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
          ]}
        />
      </div>
    </Modal>
  )
}