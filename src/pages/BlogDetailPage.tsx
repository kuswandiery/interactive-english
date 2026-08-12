import { Link, useParams } from 'react-router-dom'
import { UserRound, Clock, CalendarDays, FileQuestion } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BlogCard } from '@/components/blog/BlogCard'
import { blogPosts } from '@/data/blog'

function formatDate(date: string) {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className="container-page flex flex-col items-center py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FileQuestion className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-heading text-3xl font-bold text-secondary">Article Not Found</h1>
        <p className="mt-3 max-w-md text-muted">
          We could not find the article you are looking for. It may have been moved or removed.
        </p>
        <Link to="/blog" className="mt-8">
          <Button>Back to Blog</Button>
        </Link>
      </section>
    )
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
  const fallbackRelated = related.length > 0 ? related : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const breadcrumb = [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: post.category },
  ]

  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page max-w-3xl py-8">
          <Breadcrumb items={breadcrumb} />
        </div>
      </section>

      <article className="container-page max-w-3xl py-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{post.category}</Badge>
          {post.featured && <Badge variant="accent">Featured</Badge>}
        </div>

        <h1 className="mt-4 font-heading text-3xl font-bold text-secondary sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <UserRound className="h-4 w-4" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" /> {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {post.readTime} read
          </span>
        </div>

        <div className="mt-8 flex h-56 items-center justify-center rounded-md bg-gradient-to-br from-primary/15 to-primary/5 text-6xl font-bold text-primary">
          {post.title.charAt(0)}
        </div>

        <div className="mt-8 space-y-4">
          {post.content.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {fallbackRelated.length > 0 && (
        <section className="border-t border-slate-200 bg-surface">
          <div className="container-page py-12">
            <SectionHeader align="left" eyebrow="Keep Reading" title="Related articles" />
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fallbackRelated.map((p) => (
                <BlogCard
                  key={p.id}
                  slug={p.slug}
                  title={p.title}
                  excerpt={p.excerpt}
                  category={p.category}
                  author={p.author}
                  date={p.date}
                  readTime={p.readTime}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}