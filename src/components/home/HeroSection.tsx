import { GraduationCap, PlayCircle, Star, Users, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

const quickStats = [
  { icon: Users, label: '12K+ students' },
  { icon: Star, label: '4.8 avg rating' },
  { icon: Trophy, label: '98% success rate' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <GraduationCap className="h-4 w-4" />
            Modern English Learning Platform
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-secondary sm:text-5xl">
            Speak English With Confidence
          </h1>

          <p className="mt-4 max-w-xl text-lg text-muted">
            Learn English with expert tutors, practical lessons, and a learning experience designed
            for your goals.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Learning
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Courses
              </Button>
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {quickStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="h-5 w-5 text-primary" />
                <dt className="text-sm font-semibold text-secondary">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-gradient-to-br from-primary/15 to-primary/5 p-10 ring-1 ring-slate-100">
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                <PlayCircle className="h-8 w-8" />
              </span>
              <p className="mt-4 font-heading font-semibold text-secondary">Interactive Lessons</p>
              <p className="text-sm text-muted">Video & practice coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}