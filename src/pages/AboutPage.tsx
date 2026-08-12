import { Target, Eye, HeartHandshake } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { Users, BookOpen, UserRound, BadgeCheck } from 'lucide-react'
import { statistics } from '@/data/statistics'
import { whyChooseUs } from '@/data/whyChooseUs'

const icons = {
  students: Users,
  courses: BookOpen,
  tutors: UserRound,
  rating: BadgeCheck,
} as const

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To make high-quality English learning accessible, structured, and enjoyable for everyone, from complete beginners to advanced professionals.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'To become a trusted global platform where anyone can learn English with confidence and reach their personal and professional goals.',
  },
  {
    icon: HeartHandshake,
    title: 'Our Values',
    text: 'We value supportive teaching, clear progress, integrity, and a learner-first approach in everything we build and do.',
  },
]

const approach = [
  'Level-based, structured curriculum tailored to real goals',
  'Expert tutors with practical, interactive lessons',
  'Quizzes and progress tracking to keep you on the right path',
  'Certificates to celebrate and validate your achievements',
  'Flexible, responsive learning available on any device',
]

export default function AboutPage() {
  return (
    <div>
      <section className="bg-secondary">
        <div className="container-page py-12 sm:py-16">
          <SectionHeader
            align="left"
            eyebrow="About Us"
            title="Empowering confident English speakers"
            description="English Academy is a modern English learning platform built around expert tutors, practical lessons, and clear progress."
            className="text-white [&_p:first-child]:text-primary [&_h2]:text-white [&_p]:text-slate-300"
          />
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <SectionHeader
          eyebrow="Why We Exist"
          title="About English Academy"
          description="We designed English Academy to feel like a real, professional learning experience — not just a collection of videos. Our goal is to help every learner build real confidence in speaking, writing, and understanding English."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} interactive className="flex flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-secondary">{v.title}</h3>
              <p className="mt-2 text-sm text-muted">{v.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container-page grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat) => (
            <StatCard
              key={stat.id}
              icon={icons[stat.id as keyof typeof icons] ?? Users}
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
              trend={stat.trend}
            />
          ))}
        </div>
        <p className="container-page pb-6 text-center text-xs text-muted">
          Figures shown are demonstration data for this project.
        </p>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Our Approach"
              title="How we approach learning"
            />
            <ul className="mt-6 space-y-3">
              {approach.map((item) => (
                <li key={item} className="flex items-start gap-2 text-secondary">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeader
              align="left"
              eyebrow="Why Choose Us"
              title="Reasons to learn with us"
            />
            <div className="mt-6 space-y-5">
              {whyChooseUs.slice(0, 4).map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-secondary">{f.title}</h3>
                    <p className="text-sm text-muted">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-page flex flex-col items-center py-16 text-center">
          <h2 className="max-w-2xl font-heading text-3xl font-bold text-white">
            Ready to start your journey?
          </h2>
          <p className="mt-3 max-w-xl text-slate-300">
            Explore our courses and begin building your confidence in English today.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/courses">
              <Button size="lg">Explore Courses</Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-primary hover:text-white hover:border-primary">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}