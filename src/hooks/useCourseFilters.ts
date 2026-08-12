import { useMemo, useState } from 'react'
import type { CourseData } from '@/types/card'

export type SortOption = 'popular' | 'rating' | 'price-asc' | 'price-desc'

export interface CourseFiltersState {
  query: string
  level: string
  category: string
  price: string
  rating: string
  sort: SortOption
}

const initialFilters: CourseFiltersState = {
  query: '',
  level: '',
  category: '',
  price: '',
  rating: '',
  sort: 'popular',
}

export function useCourseFilters(courses: CourseData[]) {
  const [filters, setFilters] = useState<CourseFiltersState>(initialFilters)

  const setQuery = (query: string) => setFilters((f) => ({ ...f, query }))
  const setLevel = (level: string) => setFilters((f) => ({ ...f, level }))
  const setCategory = (category: string) => setFilters((f) => ({ ...f, category }))
  const setPrice = (price: string) => setFilters((f) => ({ ...f, price }))
  const setRating = (rating: string) => setFilters((f) => ({ ...f, rating }))
  const setSort = (sort: SortOption) => setFilters((f) => ({ ...f, sort }))
  const reset = () => setFilters(initialFilters)

  const filtered = useMemo(() => {
    let result = [...courses]

    const q = filters.query.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.level.toLowerCase().includes(q),
      )
    }

    if (filters.level) result = result.filter((c) => c.level === filters.level)
    if (filters.category) result = result.filter((c) => c.category === filters.category)

    if (filters.price === 'free') result = result.filter((c) => c.price === 0)
    if (filters.price === 'paid') result = result.filter((c) => c.price > 0)

    if (filters.rating === '4') result = result.filter((c) => c.rating >= 4)
    if (filters.rating === '4.5') result = result.filter((c) => c.rating >= 4.5)

    switch (filters.sort) {
      case 'popular':
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.reviewCount - a.reviewCount)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
    }

    return result
  }, [courses, filters])

  const hasActiveFilters = Object.values(filters).some((v) => typeof v === 'string' && v !== '')

  return {
    filters,
    filtered,
    hasActiveFilters,
    setQuery,
    setLevel,
    setCategory,
    setPrice,
    setRating,
    setSort,
    reset,
  }
}