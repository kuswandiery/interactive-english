import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function FinalCta() {
  return (
    <section className="bg-secondary">
      <div className="container-page flex flex-col items-center py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
          <GraduationCap className="h-7 w-7" />
        </span>
        <h2 className="mt-6 max-w-2xl font-heading text-3xl font-bold text-white sm:text-4xl">
          Start Your English Learning Journey Today
        </h2>
        <p className="mt-3 max-w-xl text-slate-300">
          Join thousands of learners building their confidence with expert tutors and practical
          lessons.
        </p>
        <Link to="/register" className="mt-8">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </section>
  )
}