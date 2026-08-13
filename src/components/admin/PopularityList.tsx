import { Card } from '@/components/ui/Card'
import type { LucideIcon } from 'lucide-react'

interface PopularityItem {
  title: string
  value: number
}

interface PopularityListProps {
  title: string
  description?: string
  items: PopularityItem[]
  icon?: LucideIcon
  valueFormatter?: (v: number) => string
}

export function PopularityList({
  title,
  description,
  items,
  icon: Icon,
  valueFormatter,
}: PopularityListProps) {
  const max = Math.max(...items.map((i) => i.value), 1)

  return (
    <Card className="h-full">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <h3 className="font-heading text-lg font-semibold text-secondary">{title}</h3>
      </div>
      {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.title}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-secondary">{item.title}</span>
              <span className="text-muted">
                {valueFormatter ? valueFormatter(item.value) : item.value.toLocaleString()}
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}