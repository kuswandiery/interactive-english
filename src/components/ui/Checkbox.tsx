import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, error, id, className, ...props },
  ref,
) {
  const inputId = id ?? (label ? `checkbox-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-2.5">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          className={cn(
            'mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-primary accent-primary focus:ring-2 focus:ring-primary focus:outline-none',
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
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  )
})