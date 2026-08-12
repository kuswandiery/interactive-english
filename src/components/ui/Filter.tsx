import { X } from 'lucide-react'
import { cn } from '@/utils'

type FilterKind = 'level' | 'category' | 'price' | 'duration' | 'rating'

interface FilterOption {
  label: string
  value: string
}

export interface FilterItem {
  kind: FilterKind
  label: string
  options: FilterOption[]
}

interface FilterValue {
  [kind: string]: string
}

interface FilterProps {
  items: FilterItem[]
  value: FilterValue
  onChange: (kind: string, v: string) => void
  onClear?: () => void
  className?: string
}

export function Filter({ items, value, onChange, onClear, className }: FilterProps) {
  const activeCount = Object.values(value).filter(Boolean).length

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {items.map((item) => {
        const current = value[item.kind]
        return (
          <div key={item.kind}>
            <label htmlFor={`filter-${item.kind}`} className="sr-only">
              {item.label}
            </label>
            <select
              id={`filter-${item.kind}`}
              value={current}
              onChange={(e) => onChange(item.kind, e.target.value)}
              aria-label={item.label}
              className={cn(
                'h-10 rounded-md border border-slate-300 bg-white px-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary',
                current && 'border-primary text-primary',
              )}
            >
              <option value="">{item.label}</option>
              {item.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )
      })}

      {activeCount > 0 && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="flex h-10 items-center gap-1 text-sm font-medium text-muted transition hover:text-secondary"
        >
          <X className="h-4 w-4" />
          Clear ({activeCount})
        </button>
      )}
    </div>
  )
}