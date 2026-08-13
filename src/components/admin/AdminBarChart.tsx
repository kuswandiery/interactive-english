import { Card } from '@/components/ui/Card'
import type { LucideIcon } from 'lucide-react'

export interface BarChartDatum {
  label: string
  value: number
}

interface AdminBarChartProps {
  title: string
  description?: string
  data: BarChartDatum[]
  valueFormatter?: (v: number) => string
  icon?: LucideIcon
}

export function AdminBarChart({
  title,
  description,
  data,
  valueFormatter,
  icon: Icon,
}: AdminBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <Card className="h-full">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <h3 className="font-heading text-lg font-semibold text-secondary">{title}</h3>
      </div>
      {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}

      <div className="mt-6 flex h-48 items-end gap-2">
        {data.map((d) => {
          const height = Math.max(Math.round((d.value / max) * 100), 6)
          return (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-40 w-full items-end">
                <div
                  className="w-full rounded-t-md bg-primary/50 transition-all hover:bg-primary"
                  style={{ height: `${height}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-[10px] text-muted">{d.label}</span>
            </div>
          )
        })}
      </div>

      <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/50" aria-hidden="true" />
          <dt className="text-muted">Average</dt>
          <dd className="font-semibold text-secondary">
            {valueFormatter
              ? valueFormatter(Math.round(data.reduce((s, d) => s + d.value, 0) / data.length))
              : Math.round(data.reduce((s, d) => s + d.value, 0) / data.length)}
          </dd>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
          <dt className="text-muted">Peak</dt>
          <dd className="font-semibold text-secondary">
            {valueFormatter ? valueFormatter(max) : max}
          </dd>
        </div>
      </dl>
    </Card>
  )
}