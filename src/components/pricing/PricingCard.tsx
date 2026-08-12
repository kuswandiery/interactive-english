import { Check } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface PricingCardData {
  plan: string
  price: number
  billing: string
  features: string[]
  popular?: boolean
}

export function PricingCard({ plan, price, billing, features, popular = false }: PricingCardData) {
  return (
    <Card
      interactive
      className={`flex h-full flex-col p-6 ${popular ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-secondary">{plan}</h3>
        {popular && <Badge variant="primary">Popular</Badge>}
      </div>

      <div className="mt-4 flex items-end gap-1">
        <span className="font-heading text-4xl font-bold text-secondary">
          {price === 0 ? 'Free' : `$${price}`}
        </span>
        {price > 0 && <span className="pb-1 text-sm text-muted">/{billing}</span>}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-secondary">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            {feature}
          </li>
        ))}
      </ul>

      <Button variant={popular ? 'primary' : 'outline'} className="mt-6 w-full">
        {popular ? 'Get Started' : 'Join Now'}
      </Button>
    </Card>
  )
}