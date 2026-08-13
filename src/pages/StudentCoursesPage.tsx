import { useMemo, useState } from 'react'
import { BookX } from 'lucide-react'
import { SearchBar } from '@/components/ui/SearchBar'
import { Filter, type FilterItem } from '@/components/ui/Filter'
import { CurrentCourseCard } from '@/components/dashboard/CurrentCourseCard'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { studentCourses } from '@/data/studentCourses'

const filterItems: FilterItem[] = [
  {
    kind: 'level',
    label: 'Level',
    options: [
      { label: 'Beginner', value: 'Beginner' },
      { label: 'Intermediate', value: 'Intermediate' },
      { label: 'Upper Intermediate', value: 'Upper Intermediate' },
    ],
  },
  {
    kind: 'category',
    label: 'Category',
    options: [
      { label: 'General English', value: 'General English' },
      { label: 'Conversation', value: 'Conversation' },
      { label: 'Business', value: 'Business' },
    ],
  },
]

export default function StudentCoursesPage() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<{ [kind: string]: string }>({
    level: '',
    category: '',
  })

  const setFilter = (kind: string, value: string) =>
    setFilters((f) => ({ ...f, [kind]: value }))

  const handleFilterChange = (kind: string, value: string) => setFilter(kind, value)

  const clearAll = () => {
    setFilters({ level: '', category: '' })
    setQuery('')
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return studentCourses.filter((c) => {
      const matchesQuery =
        !q || c.title.toLowerCase().includes(q) || c.tutor.toLowerCase().includes(q)
      const matchesLevel = !filters.level || c.level === filters.level
      const matchesCategory = !filters.category || c.category === filters.category
      return matchesQuery && matchesLevel && matchesCategory
    })
  }, [query, filters])

  const hasActive =
    query.trim() !== '' || filters.level !== '' || filters.category !== ''

  return (
    <div className="space-y-6">
      <section>
        <h1 className="font-heading text-2xl font-bold text-secondary">My Courses</h1>
        <p className="mt-1 text-muted">Continue where you left off and track your progress.</p>
      </section>

      <section className="flex flex-col items-start gap-3 md:flex-row md:items-end">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search my courses..."
          ariaLabel="Search my courses"
          className="md:w-80"
        />
        <Filter
          items={filterItems}
          value={filters}
          onChange={handleFilterChange}
          onClear={clearAll}
        />
      </section>

      {filtered.length === 0 ? (
        <EmptyState
          icon={BookX}
          title="No courses found"
          description={
            hasActive
              ? 'No enrolled courses match your search or filters.'
              : 'You have not enrolled in any courses yet. Explore our catalog to get started.'
          }
          actionLabel="Browse Courses"
          actionTo="/courses"
        />
      ) : (
        <section
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="My enrolled courses"
        >
          {filtered.map((c) => (
            <CurrentCourseCard
              key={c.id}
              slug={c.slug}
              title={c.title}
              level={c.level}
              category={c.category}
              tutor={c.tutor}
              completedLessons={c.completedLessons}
              totalLessons={c.totalLessons}
              lastLesson={c.lastLesson}
            />
          ))}
        </section>
      )}
    </div>
  )
}