import { Link } from 'react-router-dom'
import { CourseCard, CourseGridSkeleton } from '@/components/course/CourseCard'
import { Button } from '@/components/ui/Button'
import { courseCategories } from '@/data/navigations'

export function PopularCourses({ loading = false }: { loading?: boolean }) {
  const courses = courseCategories.slice(0, 6)

  return (
    <section className="bg-surface">
      <div className="container-page py-16">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-primary">Popular Courses</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-secondary">
              Start your English journey
            </h2>
          </div>
          <Link to="/courses">
            <Button variant="outline">View All Courses</Button>
          </Link>
        </div>

        {loading ? (
          <CourseGridSkeleton count={3} />
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}