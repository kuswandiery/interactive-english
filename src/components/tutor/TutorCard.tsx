import { Star, Users, Award } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface TutorCardData {
  name: string
  specialty: string
  experience: number
  rating: number
  students: number
}

export function TutorCard({ name, specialty, experience, rating, students }: TutorCardData) {
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
      <Badge variant="outline" className="mt-2">
        {specialty}
      </Badge>

      <div className="mt-4 flex flex-col items-center gap-1 text-sm text-muted">
        <span className="flex items-center gap-1">
          <Award className="h-4 w-4" /> {experience} years experience
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" /> {students} students
        </span>
      </div>

      <span className="mt-3 flex items-center gap-1 text-sm">
        <Star className="h-4 w-4 fill-accent text-accent" />
        <span className="font-semibold text-secondary">{rating.toFixed(1)}</span>
      </span>

      <Button variant="outline" className="mt-6 w-full">
        View Profile
      </Button>
    </Card>
  )
}