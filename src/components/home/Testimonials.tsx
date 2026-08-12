import { TestimonialCard } from '@/components/testimonial/TestimonialCard'
import { testimonials } from '@/data/testimonials'

export function Testimonials() {
  return (
    <section className="bg-surface">
      <div className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Testimonials</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-secondary">
            Loved by our students
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}