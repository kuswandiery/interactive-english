import { Card } from '@/components/ui/Card'
import { whyChooseUs } from '@/data/whyChooseUs'

export function WhyChooseUs() {
  return (
    <section className="bg-white">
      <div className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Why Choose Us</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-secondary">
            Why choose English Academy?
          </h2>
          <p className="mt-3 text-muted">
            We combine expert guidance with a structured, flexible learning experience built for
            real results.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((feature) => (
            <Card key={feature.title} interactive className="flex flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-secondary">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}