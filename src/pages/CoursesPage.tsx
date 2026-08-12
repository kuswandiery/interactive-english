import { useState } from 'react'
import { SearchBar } from '@/components/ui/SearchBar'
import { Filter, type FilterItem } from '@/components/ui/Filter'
import { Select } from '@/components/ui/Select'
import { CourseCard, CourseGridSkeleton } from '@/components/course/CourseCard'
import { Button } from '@/components/ui/Button'
import { useCourseFilters, type SortOption } from '@/hooks/useCourseFilters'
import { courses } from '@/data/courses'
import type { CourseData } from '@/types/card'

const levelOptions = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Elementary', value: 'Elementary' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Upper Intermediate', value: 'Upper Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
]

const categoryOptions = [
  { label: 'General English', value: 'General English' },
  { label: 'Conversation', value: 'Conversation' },
  { label: 'Business', value: 'Business' },
  { label: 'IELTS', value: 'IELTS' },
  { label: 'TOEFL', value: 'TOEFL' },
  { label: 'Kids', value: 'Kids' },
  { label: 'Teens', value: 'Teens' },
  { label: 'Private', value: 'Private' },
]

const priceOptions = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
]

const ratingOptions = [
  { label: '4.0 and above', value: '4' },
  { label: '4.5 and above', value: '4.5' },
]

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
]

export default function CoursesPage() {
  const { filters, filtered, hasActiveFilters, setQuery, setLevel, setCategory, setPrice, setRating, setSort, reset } =
    useCourseFilters(courses)
  const [loading] = useState(false)

  const filterItems: FilterItem[] = [
    { kind: 'level', label: 'Level', options: levelOptions },
    { kind: 'category', label: 'Category', options: categoryOptions },
    { kind: 'price', label: 'Price', options: priceOptions },
    { kind: 'rating', label: 'Rating', options: ratingOptions },
  ]

  const handleFilterChange = (kind: string, value: string) => {
    switch (kind) {
      case 'level':
        setLevel(value)
        break
      case 'category':
        setCategory(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'rating':
        setRating(value)
        break
    }
  }

  return (
    <div>
      <section className="bg-secondary">
        <div className="container-page py-12 sm:py-16">
          <p className="text-sm font-medium text-primary">Courses</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
            Explore our English courses
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Find the perfect program for your level and goals, from beginner foundations to advanced
            professional English.
          </p>
        </div>
      </section>

      <section className="container-page py-8 sm:py-12">
        <div className="flex flex-col gap-4">
          <SearchBar value={filters.query} onChange={setQuery} placeholder="Search courses by title, level, or category..." />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <Filter
              items={filterItems}
              value={{
                level: filters.level,
                category: filters.category,
                price: filters.price,
                rating: filters.rating,
              }}
              onChange={handleFilterChange}
              onClear={reset}
            />
            <div className="w-full lg:w-64">
              <Select
                aria-label="Sort courses"
                label="Sort by"
                value={filters.sort}
                options={sortOptions}
                onChange={(e) => setSort(e.target.value as SortOption)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">
              Showing <span className="font-semibold text-secondary">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'course' : 'courses'}
            </p>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={reset}>
                Reset
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <CourseGridSkeleton count={6} />
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center rounded-md border border-slate-200 bg-white px-6 py-16 text-center">
              <h2 className="font-heading text-xl font-bold text-secondary">No courses found</h2>
              <p className="mt-2 max-w-md text-muted">
                No courses match your current search and filters. Try adjusting your criteria or
                resetting the filters.
              </p>
              <Button variant="outline" className="mt-6" onClick={reset}>
                Clear Filters & Explore
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course) => (
                <CourseCard key={course.id} {...toCardData(course)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function toCardData(course: CourseData) {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    level: course.level,
    shortDescription: course.shortDescription,
    tutor: course.tutor,
    lessons: course.lessons,
    duration: course.duration,
    rating: course.rating,
    reviewCount: course.reviewCount,
    price: course.price,
    originalPrice: course.originalPrice,
    category: course.category,
    popular: course.popular,
  }
}