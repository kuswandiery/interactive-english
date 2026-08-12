import { Loader2 } from 'lucide-react'
import { cn } from '@/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' }

export function Spinner({ size = 'md', className, label }: SpinnerProps) {
  return (
    <span role="status" className={cn('inline-flex items-center gap-2', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizes[size])} aria-hidden="true" />
      {label && <span className="text-sm text-muted">{label}</span>}
      <span className="sr-only">{label ?? 'Loading'}</span>
    </span>
  )
}