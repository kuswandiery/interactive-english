import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface AuthLayoutProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ title, description, children, footer }: AuthLayoutProps) {
  return (
    <section className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-10 sm:py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <GraduationCap className="h-6 w-6" />
            </span>
            <span className="font-heading text-lg font-bold text-secondary">
              English<span className="text-primary">Academy</span>
            </span>
          </Link>
        </div>

        <Card className="p-6 sm:p-8">
          <h1 className="text-center font-heading text-2xl font-bold text-secondary">{title}</h1>
          <p className="mt-2 text-center text-sm text-muted">{description}</p>
          <div className="mt-6">{children}</div>
        </Card>

        {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
      </div>
    </section>
  )
}