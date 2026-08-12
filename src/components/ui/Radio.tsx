import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils'

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, id, className, ...props },
  ref,
) {
  const inputId = id ?? (label ? `radio-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

  return (
    <div className="flex items-start gap-2.5">
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0 border-slate-300 text-primary accent-primary focus:ring-2 focus:ring-primary focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-60',
          className,
        )}
        {...props}
      />
      {label && (
        <div className="flex flex-col">
          <label htmlFor={inputId} className="text-sm text-secondary">
            {label}
          </label>
          {description && <span className="text-xs text-muted">{description}</span>}
        </div>
      )}
    </div>
  )
})