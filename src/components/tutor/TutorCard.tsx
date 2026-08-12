import { Link } from 'react-router-dom'
import { Star, Award, Globe } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export interface TutorCardData {
  id?: string
  name: string
  role: string
  specialization: string
  experience: number
  rating: number
  reviewCount: number
  languages?: string[]
  students?: number
}

export function TutorCard({
  id,
  name,
  role,
  specialization,
  experience,
  rating,
  languages,
}: TutorCardData) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

  return (
    <Card interactive className="flex h-full flex-col items-center p-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
        {initials}
      </div>

      <h3 className="mt-4 font-heading text-lg font-semibold text-secondary">{name}</h3>
      <p className="text-sm text-muted">{role}</p>
      <Badge variant="outline" className="mt-2">
        {specialization}
      </Badge>

      <div className="mt-4 flex flex-col items-center gap-1 text-sm text-muted">
        <span className="flex items-center gap-1">
          <Award className="h-4 w-4" /> {experience} years experience
        </span>
        {languages && languages.length > 0 && (
          <span className="flex items-center gap-1">
            <Globe className="h-4 w-4" /> {languages.length} languages
          </span>
        )}
      </div>

      <span className="mt-3 flex items-center gap-1 text-sm">
        <Star className="h-4 w-4 fill-accent text-accent" />
        <span className="font-semibold text-secondary">{rating.toFixed(1)}</span>
      </span>

      <Link to={id ? `/tutors/${id}` : '/tutors'} className="mt-6 w-full">
        <Button variant="outline" className="w-full">
          View Profile
        </Button>
      </Link>
    </Card>
  )
}