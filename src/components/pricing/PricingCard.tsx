import { Check } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export interface PricingCardData {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  cta,
  onCta,
}: PricingCardData & { onCta?: () => void }) {
  return (
    <Card
      interactive
      className={`flex h-full flex-col p-6 ${highlighted ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-secondary">{name}</h3>
        {highlighted && <Badge variant="primary">Most Popular</Badge>}
      </div>

      <p className="mt-2 text-sm text-muted">{description}</p>

      <div className="mt-4 flex items-end gap-1">
        <span className="font-heading text-4xl font-bold text-secondary">
          {price === 0 ? 'Free' : `$${price}`}
        </span>
        {price > 0 && (
          <span className="pb-1 text-sm text-muted">/{period === 'one-time' ? 'once' : period}</span>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-secondary">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            {feature}
          </li>
        ))}
      </ul>

      <Button variant={highlighted ? 'primary' : 'outline'} className="mt-6 w-full" onClick={onCta}>
        {cta}
      </Button>
    </Card>
  )
}