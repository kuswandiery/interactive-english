import { cn } from '@/utils'

type Variant = 'primary' | 'outline' | 'accent' | 'success' | 'warning' | 'error' | 'muted'
type Size = 'sm' | 'md'

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white',
  outline: 'bg-primary/10 text-primary',
  accent: 'bg-accent/15 text-accent',
  success: 'bg-success/15 text-success',
  warning: 'bg-amber-100 text-amber-700',
  error: 'bg-error/15 text-error',
  muted: 'bg-slate-100 text-slate-600',
}

const sizes: Record<Size, string> = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function Badge({ children, variant = 'primary', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex w-max items-center gap-1 rounded-full font-semibold',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  )
}