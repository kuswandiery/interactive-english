import type { HTMLAttributes } from 'react'
import { cn } from '@/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

export function Card({ interactive = false, padding = 'md', className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-slate-200 bg-white shadow-sm',
        paddings[padding],
        interactive && 'transition hover:-translate-y-1 hover:shadow-md',
        className,
      )}
      {...props}
    />
  )
}