import { Link } from 'react-router-dom'
import { PricingCard } from '@/components/pricing/PricingCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { pricingPlans } from '@/data/pricing'

export default function PricingPage() {
  const toast = useToast()

  const handleCta = (name: string) => {
    toast.info(
      `You selected the ${name} plan.`,
      'Payment and registration are not available yet — please register to get started.',
    )
  }

  return (
    <div>
      <section className="bg-secondary">
        <div className="container-page py-12 sm:py-16">
          <SectionHeader
            align="left"
            eyebrow="Pricing"
            title="Simple, flexible learning plans"
            description="Choose the plan that fits your goals and upgrade anytime as you grow."
            className="text-white [&_p:first-child]:text-primary [&_h2]:text-white [&_p]:text-slate-300"
          />
        </div>
      </section>

      <section className="container-page py-8 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              highlighted={plan.highlighted}
              cta={plan.cta}
              onCta={() => handleCta(plan.name)}
            />
          ))}
        </div>

        <Card className="mt-12 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-xl font-bold text-secondary">Not sure where to start?</h2>
            <p className="mt-1 text-sm text-muted">
              Register for free and explore our courses before you choose a paid plan.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/register">
              <Button>Get Started Free</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Contact Sales</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}