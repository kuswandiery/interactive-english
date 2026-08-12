import { BookOpen, Star, Clock } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export interface CourseCardData {
  title: string
  level: string
  description: string
  tutor: string
  lessons: number
  duration: string
  rating: number
  price: number
  category: string
}

export function CourseCard({
  title,
  level,
  description,
  tutor,
  lessons,
  duration,
  rating,
  price,
  category,
}: CourseCardData) {
  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      <div className="flex h-28 items-center justify-center bg-primary/10 text-3xl font-bold text-primary">
        {title.charAt(0)}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Badge variant="accent">{level}</Badge>
          <Badge variant="muted">{category}</Badge>
        </div>

        <h3 className="mt-3 font-heading text-lg font-semibold text-secondary">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{description}</p>

        <p className="mt-3 text-sm font-medium text-secondary">
          Tutor: <span className="font-normal text-muted">{tutor}</span>
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> {lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" /> {rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-heading text-lg font-bold text-secondary">
            {price === 0 ? 'Free' : `$${price}`}
          </span>
          <Button variant="outline">View Course</Button>
        </div>
      </div>
    </Card>
  )
}

export function CourseGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-md border border-slate-200 bg-white p-0 shadow-sm">
          <div className="h-28 w-full animate-pulse bg-slate-200" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-1/3 animate-pulse rounded-md bg-slate-200" />
            <div className="h-5 w-3/4 animate-pulse rounded-md bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded-md bg-slate-200" />
            <div className="h-10 w-full animate-pulse rounded-md bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  )
}