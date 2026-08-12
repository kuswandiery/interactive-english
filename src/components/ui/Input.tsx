import { forwardRef, type InputHTMLAttributes } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className, ...props },
  ref,
) {
  const inputId = id ?? (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-secondary">
          {label}
          {props.required && <span className="text-error"> *</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={cn(
          'h-10 w-full rounded-md border bg-white px-3 text-sm text-secondary placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
          error ? 'border-error focus:ring-error/40' : 'border-slate-300 focus:border-primary',
          'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="flex items-center gap-1 text-xs text-error">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  )
})