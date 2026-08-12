import { Link, useParams } from 'react-router-dom'
import { Star, Users, Award, Globe, CalendarCheck, BookOpen } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { tutors } from '@/data/tutors'
import { courses } from '@/data/courses'

export default function TutorDetailPage() {
  const { id } = useParams<{ id: string }>()
  const tutor = tutors.find((t) => t.id === id)

  if (!tutor) {
    return (
      <section className="container-page flex flex-col items-center py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Users className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-heading text-3xl font-bold text-secondary">Tutor Not Found</h1>
        <p className="mt-3 max-w-md text-muted">
          We could not find the tutor you are looking for.
        </p>
        <Link to="/tutors" className="mt-8">
          <Button>Back to Tutors</Button>
        </Link>
      </section>
    )
  }

  const tutorCourses = courses.filter((c) => tutor.courses.includes(c.title))
  const initials = tutor.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

  const breadcrumb = [
    { label: 'Home', to: '/' },
    { label: 'Tutors', to: '/tutors' },
    { label: tutor.name },
  ]

  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-8">
          <Breadcrumb items={breadcrumb} />
        </div>
      </section>

      <section className="container-page py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <span className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary">
              {initials}
            </span>
            <div>
              <h1 className="font-heading text-3xl font-bold text-secondary">{tutor.name}</h1>
              <p className="mt-1 text-muted">{tutor.role}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-accent text-accent" /> {tutor.rating.toFixed(1)}
                  <span>({tutor.reviewCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> {tutor.reviewCount + tutor.experience * 100} students
                </span>
                <Badge variant="outline">{tutor.specialization}</Badge>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="space-y-3 p-6">
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Award className="h-5 w-5 text-primary" />
                {tutor.experience} years experience
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Globe className="h-5 w-5 text-primary" />
                {tutor.languages.join(', ')}
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <CalendarCheck className="h-5 w-5 text-primary" />
                Available: {tutor.availability}
              </div>
              <Link to="/courses" className="mt-2 block">
                <Button className="w-full">View Courses</Button>
              </Link>
            </Card>
          </aside>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="max-w-3xl space-y-10">
          <div>
            <h2 className="font-heading text-2xl font-bold text-secondary">About {tutor.name}</h2>
            <p className="mt-3 text-muted">{tutor.bio}</p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-secondary">Specialization</h2>
            <div className="mt-3">
              <Badge variant="outline">{tutor.specialization}</Badge>
            </div>
          </div>
        </div>
      </section>

      {tutorCourses.length > 0 && (
        <section className="border-t border-slate-200 bg-surface">
          <div className="container-page py-12">
            <SectionHeader
              align="left"
              eyebrow="Courses"
              title={`Courses taught by ${tutor.name.split(' ')[0]}`}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tutorCourses.map((c) => (
                <Card key={c.id} interactive className="flex items-start justify-between gap-3 p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <BookOpen className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold text-secondary">{c.title}</h3>
                      <p className="text-sm text-muted">
                        {c.level} · {c.duration} · {c.lessons} lessons
                      </p>
                    </div>
                  </div>
                  <Link to={`/courses/${c.slug}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}