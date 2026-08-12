import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Rss } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SearchBar } from '@/components/ui/SearchBar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { BlogCard } from '@/components/blog/BlogCard'
import { blogPosts, blogCategories } from '@/data/blog'

export default function BlogPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  const featured = blogPosts.find((p) => p.featured)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return blogPosts.filter((p) => {
      if (featured && p.id === featured.id) return true
      if (category && p.category !== category) return false
      if (q && !(p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))) return false
      return true
    })
  }, [query, category, featured])

  const hasActive = query !== '' || category !== ''

  return (
    <div>
      <section className="bg-secondary">
        <div className="container-page py-12 sm:py-16">
          <SectionHeader
            align="left"
            eyebrow="Blog"
            title="English learning insights"
            description="Practical tips, guides, and study strategies to help you improve your English."
            className="text-white [&_p:first-child]:text-primary [&_h2]:text-white [&_p]:text-slate-300"
          />
        </div>
      </section>

      <section className="container-page py-8 sm:py-12">
        {featured && (
          <FeaturedArticle post={featured} />
        )}

        <div className="mt-10">
          <SearchBar value={query} onChange={setQuery} placeholder="Search articles by title, excerpt, or category..." />

          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
            <CategoryChip active={category === ''} onClick={() => setCategory('')}>
              All
            </CategoryChip>
            {blogCategories.map((c) => (
              <CategoryChip key={c.value} active={category === c.value} onClick={() => setCategory(c.value)}>
                {c.label}
              </CategoryChip>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center rounded-md border border-slate-200 bg-white px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Rss className="h-7 w-7" />
              </span>
              <h2 className="mt-4 font-heading text-xl font-bold text-secondary">No articles found</h2>
              <p className="mt-2 max-w-md text-muted">
                No articles match your search. Try a different keyword or category.
              </p>
              {hasActive && (
                <Button variant="outline" className="mt-6" onClick={() => { setQuery(''); setCategory('') }}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <BlogCard
                  key={post.id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  author={post.author}
                  date={post.date}
                  readTime={post.readTime}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? 'bg-primary text-white' : 'bg-white text-secondary hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  )
}

function FeaturedArticle({
  post,
}: {
  post: (typeof blogPosts)[number]
}) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <Card interactive className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="flex min-h-[200px] items-center justify-center bg-primary/10 text-5xl font-bold text-primary">
            {post.title.charAt(0)}
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <Badge variant="accent">Featured</Badge>
              <Badge variant="outline">{post.category}</Badge>
            </div>
            <h2 className="mt-4 font-heading text-2xl font-bold text-secondary transition-colors group-hover:text-primary">
              {post.title}
            </h2>
            <p className="mt-3 text-muted">{post.excerpt}</p>
            <p className="mt-4 text-sm text-muted">
              {post.author} · {post.readTime} · {post.date}
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read Article
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}