import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, id, className, ...props },
  ref,
) {
  const textareaId = id ?? (label ? `textarea-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-secondary">
          {label}
          {props.required && <span className="text-error"> *</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
        className={cn(
          'w-full rounded-md border bg-white px-3 py-2 text-sm text-secondary placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
          error ? 'border-error focus:ring-error/40' : 'border-slate-300 focus:border-primary',
          'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="flex items-center gap-1 text-xs text-error">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${textareaId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  )
})