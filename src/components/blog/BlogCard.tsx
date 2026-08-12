import { Link } from 'react-router-dom'
import { Clock, UserRound } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface BlogCardData {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
}

function formatDate(date: string) {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function BlogCard({ slug, title, excerpt, category, author, date, readTime }: BlogCardData) {
  return (
    <Link to={`/blog/${slug}`} className="group block h-full">
      <Card interactive className="flex h-full flex-col overflow-hidden">
        <div className="relative flex h-40 items-center justify-center bg-primary/10 text-3xl font-bold text-primary">
          <span className="absolute left-3 top-3">
            <Badge variant="outline">{category}</Badge>
          </span>
          {title.charAt(0)}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-heading text-lg font-semibold text-secondary transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{excerpt}</p>

          <div className="mt-4 flex items-center gap-x-4 gap-y-1 text-xs text-muted">
            <span className="flex items-center gap-1">
              <UserRound className="h-3.5 w-3.5" /> {author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {readTime}
            </span>
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}