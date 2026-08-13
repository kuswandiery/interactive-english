import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Star,
  Clock,
  BookOpen,
  PlayCircle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Users,
  Award,
  FileText,
} from 'lucide-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'
import { CourseCard } from '@/components/course/CourseCard'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/context/AuthContext'
import { courses } from '@/data/courses'

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const toast = useToast()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [enrolled, setEnrolled] = useState(false)

  const course = courses.find((c) => c.slug === slug)

  const relatedCourses = useMemo(() => {
    if (!course) return []
    return courses
      .filter((c) => c.slug !== course.slug && (c.category === course.category || c.level === course.level))
      .slice(0, 3)
  }, [course])

  if (!course) {
    return (
      <section className="container-page flex flex-col items-center py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FileText className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-heading text-3xl font-bold text-secondary">Course Not Found</h1>
        <p className="mt-3 max-w-md text-muted">
          We could not find the course you are looking for. It may have been moved or removed.
        </p>
        <Link to="/courses" className="mt-8">
          <Button>Back to Courses</Button>
        </Link>
      </section>
    )
  }

  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Courses', to: '/courses' },
    { label: course.title },
  ]

  const curriculumItems = course.curriculum.map((module, i) => ({
    value: `module-${i}`,
    title: module.title,
    content: (
      <ul className="space-y-2">
        {module.lessons.map((lesson) => (
          <li key={lesson} className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm text-secondary">{lesson}</span>
          </li>
        ))}
      </ul>
    ),
  }))

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.info('Please sign in to enroll in this course.')
      navigate('/login', { state: { from: `/courses/${course.slug}` } })
      return
    }
    if (!enrolled) {
      setEnrolled(true)
      toast.success('Course added to My Courses.')
    } else {
      toast.info('You are already enrolled in this course.')
    }
  }

  const discount =
    course.originalPrice && course.originalPrice > course.price
      ? Math.round((1 - course.price / course.originalPrice) * 100)
      : 0

  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </section>

      <section className="container-page py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{course.level}</Badge>
              <Badge variant="muted">{course.category}</Badge>
              {course.popular && <Badge variant="accent">Popular</Badge>}
            </div>

            <h1 className="mt-4 font-heading text-3xl font-bold text-secondary sm:text-4xl">
              {course.title}
            </h1>

            <p className="mt-3 text-muted">{course.description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-accent text-accent" /> {course.rating.toFixed(1)}
                <span>({course.reviewCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {course.students} students
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> {course.lessons} lessons
              </span>
            </div>

            <div className="mt-8 overflow-hidden rounded-md bg-primary/10">
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                  <PlayCircle className="h-8 w-8" />
                </span>
                <span className="absolute bottom-4 left-4 rounded-full bg-secondary/80 px-3 py-1 text-xs font-medium text-white">
                  Course preview video
                </span>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-6">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-bold text-secondary">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
                {course.originalPrice && course.originalPrice > course.price && (
                  <span className="text-muted line-through">${course.originalPrice}</span>
                )}
                {discount > 0 && (
                  <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
                    {discount}% off
                  </span>
                )}
              </div>

              <Button onClick={handleEnroll} className="mt-5 w-full" size="lg">
                {enrolled ? 'Enrolled ✓' : 'Enroll Now'}
              </Button>

              <ul className="mt-6 space-y-3">
                {course.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-secondary">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </section>

      <section className="container-page grid gap-10 pb-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <div>
            <h2 className="font-heading text-2xl font-bold text-secondary">Course Overview</h2>
            <p className="mt-3 text-muted">{course.description}</p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-secondary">Learning Outcomes</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.learningOutcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2 text-sm text-secondary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-secondary">Course Curriculum</h2>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <BarChart3 className="h-4 w-4" />
              {course.curriculum.length} modules · {course.lessons} lessons
            </div>
            <Accordion items={curriculumItems} className="mt-4" />
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-secondary">Requirements</h2>
            <ul className="mt-4 space-y-2">
              {course.requirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-muted">
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-secondary">About Your Tutor</h2>
            <Card className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                {course.tutor
                  .split(' ')
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join('')}
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-secondary">{course.tutor}</h3>
                <p className="text-sm text-muted">{course.tutorRole}</p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" /> {course.rating.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {course.students} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-4 w-4" /> {course.curriculum.length} modules
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {relatedCourses.length > 0 && (
        <section className="border-t border-slate-200 bg-surface">
          <div className="container-page py-12">
            <h2 className="font-heading text-2xl font-bold text-secondary">Related Courses</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCourses.map((c) => (
                <CourseCard
                  key={c.id}
                  id={c.id}
                  slug={c.slug}
                  title={c.title}
                  level={c.level}
                  shortDescription={c.shortDescription}
                  tutor={c.tutor}
                  lessons={c.lessons}
                  duration={c.duration}
                  rating={c.rating}
                  reviewCount={c.reviewCount}
                  price={c.price}
                  originalPrice={c.originalPrice}
                  category={c.category}
                  popular={c.popular}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}