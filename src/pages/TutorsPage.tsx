import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users } from 'lucide-react'
import { TutorCard } from '@/components/tutor/TutorCard'
import { SearchBar } from '@/components/ui/SearchBar'
import { Filter, type FilterItem } from '@/components/ui/Filter'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { tutors, tutorSpecializations } from '@/data/tutors'

const experienceBands = [
  { key: '1-3y', label: '1–3 years', min: 1, max: 3 },
  { key: '4-7y', label: '4–7 years', min: 4, max: 7 },
  { key: '8-99y', label: '8+ years', min: 8, max: 99 },
]

export default function TutorsPage() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('')
  const [experience, setExperience] = useState('')
  const [rating, setRating] = useState('')

  const filtered = useMemo(() => {
    let result = tutors
    const q = query.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.specialization.toLowerCase().includes(q) ||
          t.bio.toLowerCase().includes(q) ||
          t.role.toLowerCase().includes(q),
      )
    }
    if (level) result = result.filter((t) => t.specialization === level)
    if (experience) {
      const band = experienceBands.find((b) => b.key === experience)
      if (band) result = result.filter((t) => t.experience >= band.min && t.experience <= band.max)
    }
    if (rating === '4') result = result.filter((t) => t.rating >= 4)
    if (rating === '4.5') result = result.filter((t) => t.rating >= 4.5)
    return result
  }, [query, level, experience, rating])

  const filterItems: FilterItem[] = [
    { kind: 'category', label: 'Specialization', options: tutorSpecializations },
    {
      kind: 'duration',
      label: 'Experience',
      options: [
        { label: '1–3 years', value: '1-3y' },
        { label: '4–7 years', value: '4-7y' },
        { label: '8+ years', value: '8-99y' },
      ],
    },
    {
      kind: 'rating',
      label: 'Rating',
      options: [
        { label: '4.0 and above', value: '4' },
        { label: '4.5 and above', value: '4.5' },
      ],
    },
  ]
  const filterValue = { category: level, duration: experience, rating }
  const hasActive = query !== '' || level !== '' || experience !== '' || rating !== ''

  const reset = () => {
    setQuery('')
    setLevel('')
    setExperience('')
    setRating('')
  }

  return (
    <div>
      <section className="bg-secondary">
        <div className="container-page py-12 sm:py-16">
          <SectionHeader
            align="left"
            eyebrow="Expert Tutors"
            title="Meet our English tutors"
            description="Learn from experienced, friendly tutors who specialize in every area of English learning."
            className="text-white [&_p:first-child]:text-primary [&_h2]:text-white [&_p]:text-slate-300"
          />
        </div>
      </section>

      <section className="container-page py-8 sm:py-12">
        <SearchBar value={query} onChange={setQuery} placeholder="Search tutors by name, role, or specialty..." className="w-full" />

        <div className="mt-4">
          <Filter items={filterItems} value={filterValue} onChange={(kind, v) => {
            if (kind === 'category') setLevel(v)
            if (kind === 'duration') setExperience(v)
            if (kind === 'rating') setRating(v)
          }} onClear={reset} />
        </div>

        <p className="mt-4 text-sm text-muted">
          Showing <span className="font-semibold text-secondary">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'tutor' : 'tutors'}
          {hasActive && (
            <button onClick={reset} className="ml-2 text-sm font-medium text-primary hover:underline">
              Reset
            </button>
          )}
        </p>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <EmptyState onReset={reset} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tutor) => (
                <TutorCard key={tutor.id} {...tutor} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center rounded-md border border-slate-200 bg-white px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Users className="h-7 w-7" />
      </span>
      <h2 className="mt-4 font-heading text-xl font-bold text-secondary">No tutors found</h2>
      <p className="mt-2 max-w-md text-muted">
        No tutors match your current search and filters. Try adjusting your criteria.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" onClick={onReset}>
          Clear Filters
        </Button>
        <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
      </div>
    </div>
  )
}