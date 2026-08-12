import { Star, Quote } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface TestimonialCardData {
  name: string
  role: string
  rating: number
  quote: string
}

export function TestimonialCard({ name, role, rating, quote }: TestimonialCardData) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

  return (
    <Card interactive className="flex h-full flex-col p-6">
      <Quote className="h-8 w-8 text-primary/30" />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary">{quote}</p>

      <div className="mt-5 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-accent text-accent' : 'text-slate-300'}`}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-secondary">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-secondary">{name}</p>
          <p className="text-xs text-muted">{role}</p>
        </div>
      </div>
    </Card>
  )
}