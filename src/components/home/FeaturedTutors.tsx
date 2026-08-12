import { Link } from 'react-router-dom'
import { TutorCard } from '@/components/tutor/TutorCard'
import { Button } from '@/components/ui/Button'
import { tutors } from '@/data/tutors'

export function FeaturedTutors() {
  return (
    <section className="bg-white">
      <div className="container-page py-16">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-primary">Expert Tutors</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-secondary">
              Learn from the best
            </h2>
          </div>
          <Link to="/tutors">
            <Button variant="outline">Meet Our Tutors</Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} {...tutor} />
          ))}
        </div>
      </div>
    </section>
  )
}