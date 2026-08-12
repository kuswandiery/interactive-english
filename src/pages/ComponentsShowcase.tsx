import { useState } from 'react'
import { Users, BookOpen } from 'lucide-react'
import {
  Button,
  Badge,
  Card,
  Input,
  Select,
  Textarea,
  Checkbox,
  Radio,
  Modal,
  useToast,
  Spinner,
  SkeletonCard,
  SearchBar,
  Filter,
  CourseCard,
  CourseGridSkeleton,
  TutorCard,
  TestimonialCard,
  PricingCard,
  ProgressCard,
  StatCard,
} from '@/components'
import { courseCategories } from '@/data/navigations'
import { tutors } from '@/data/tutors'
import { testimonials } from '@/data/testimonials'
import { pricingPlans } from '@/data/pricing'
import { statistics } from '@/data/statistics'
import type { CourseCardData } from '@/components/course/CourseCard'

const filterItems = [
  {
    kind: 'level' as const,
    label: 'Level',
    options: [
      { label: 'Beginner', value: 'Beginner' },
      { label: 'Intermediate', value: 'Intermediate' },
    ],
  },
  {
    kind: 'category' as const,
    label: 'Category',
    options: [
      { label: 'General English', value: 'General English' },
      { label: 'Business English', value: 'Business English' },
    ],
  },
]

const demoCourse: CourseCardData = {
  title: 'General English',
  level: 'Beginner',
  description: 'Build a strong foundation in everyday English with practical lessons.',
  tutor: 'Sarah Johnson',
  lessons: 24,
  duration: '8 weeks',
  rating: 4.8,
  price: 89,
  category: 'General English',
}

export default function ComponentsShowcase() {
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const toast = useToast()

  return (
    <div className="container-page space-y-16 py-12">
      <section>
        <h1 className="font-heading text-2xl font-bold text-secondary">
          Design System & Components Showcase
        </h1>
        <p className="mt-1 text-muted">Phase 2 — Reusable UI foundation for English Academy.</p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">Button & Badge</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Primary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="accent">Beginner</Badge>
          <Badge variant="success">Passed</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="muted">Muted</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">Card</h2>
        <Card className="max-w-md">
          <h3 className="font-semibold text-secondary">Basic Card</h3>
          <p className="mt-1 text-sm text-muted">
            A reusable card with consistent border, radius, shadow, and padding.
          </p>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">Form Components</h2>
        <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
          <Input label="Full Name" placeholder="John Doe" required />
          <Input label="Email" type="email" placeholder="you@example.com" error="Invalid email" />
          <Select
            label="Level"
            placeholder="Select level"
            options={[
              { label: 'Beginner', value: 'Beginner' },
              { label: 'Intermediate', value: 'Intermediate' },
            ]}
          />
          <Textarea label="Message" placeholder="Your message..." rows={3} />
          <Checkbox label="Subscribe to newsletter" description="Get updates on new courses." />
          <Radio label="Weekly" name="plan" />
          <Radio label="Monthly" name="plan" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">Modal, Toast, Search</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="outline" onClick={() => toast.success('Course enrolled successfully.')}>
            Success Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error('Something went wrong.', 'Please try again.')
            }
          >
            Error Toast
          </Button>
        </div>
        <SearchBar value={search} onChange={setSearch} placeholder="Search courses..." className="max-w-sm" />
        <Filter items={filterItems} value={filters} onChange={(k, v) => setFilters((f) => ({ ...f, [k]: v }))} onClear={() => setFilters({})} />
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">Loading</h2>
        <div className="flex items-center gap-4">
          <Spinner />
          <Spinner size="lg" label="Loading courses..." />
          <div className="max-w-xs flex-1">
            <SkeletonCard />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">CourseCard</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCard {...demoCourse} />
          {courseCategories.slice(1).map((c) => (
            <CourseCard key={c.id} {...c} />
          ))}
        </div>
        <CourseGridSkeleton count={3} />
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">TutorCard</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tutors.map((t) => (
            <TutorCard key={t.id} {...t} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">TestimonialCard</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">PricingCard</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {pricingPlans.map((p) => (
            <PricingCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">Dashboard Cards</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((s) => (
            <StatCard key={s.id} icon={s.id === 'students' ? Users : BookOpen} {...s} />
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProgressCard course="General English" progress={50} completedLessons={12} totalLessons={24} />
          <ProgressCard course="Business English" progress={75} completedLessons={22} totalLessons={30} />
        </div>
      </section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Enroll in this course?"
        description="You are about to enroll in General English. Confirm to add it to My Courses."
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>Confirm Enroll</Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          You will get access to all lessons, quizzes, and progress tracking after confirmation.
        </p>
      </Modal>
    </div>
  )
}