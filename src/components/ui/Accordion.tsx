import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils'

export interface AccordionItemData {
  value: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(items[0]?.value ?? null)

  return (
    <div className={cn('divide-y divide-slate-200 rounded-md border border-slate-200 bg-white', className)}>
      {items.map((item) => {
        const open = openItem === item.value
        const panelId = `accordion-panel-${item.value}`
        const buttonId = `accordion-button-${item.value}`

        return (
          <div key={item.value}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenItem(open ? null : item.value)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-heading font-semibold text-secondary">{item.title}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-muted transition-transform',
                    open && 'rotate-180 text-primary',
                  )}
                />
              </button>
            </h3>
            {open && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-4 text-sm text-muted"
              >
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}