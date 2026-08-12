import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

const columns = [
  {
    title: 'Courses',
    links: [
      { label: 'General English', to: '/courses' },
      { label: 'Conversation', to: '/courses' },
      { label: 'Business English', to: '/courses' },
      { label: 'IELTS', to: '/courses' },
      { label: 'TOEFL', to: '/courses' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Tutors', to: '/tutors' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Courses', to: '/courses' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-secondary text-slate-300">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-heading text-lg font-bold text-white">
              English <span className="text-primary">Academy</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Learn English with expert tutors, practical lessons, and a learning experience designed
            for your goals.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-semibold text-white">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-sm text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} English Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}