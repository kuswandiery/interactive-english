import { PricingCard } from '@/components/pricing/PricingCard'
import { pricingPlans } from '@/data/pricing'

export function PricingSection() {
  return (
    <section className="bg-white">
      <div className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Pricing</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-secondary">
            Simple, flexible learning plans
          </h2>
          <p className="mt-3 text-muted">
            Choose the plan that fits your goals. Upgrade anytime as you grow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  )
}