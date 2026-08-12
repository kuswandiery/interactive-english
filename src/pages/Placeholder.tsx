import { Link, useLocation } from 'react-router-dom'
import { Construction } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Placeholder() {
  const { pathname } = useLocation()
  const title = pathname
    .split('/')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ') || 'Home'

  return (
    <section className="container-page flex flex-col items-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Construction className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-heading text-3xl font-bold text-secondary">{title}</h1>
      <p className="mt-3 max-w-md text-muted">
        This page is coming soon. We are building it as part of the English Academy roadmap.
      </p>
      <Link to="/" className="mt-8">
        <Button>Back to Home</Button>
      </Link>
    </section>
  )
}