import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  PlayCircle,
  FileQuestion,
  BarChart3,
  Award,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/ui/Toast'

interface NavItem {
  label: string
  to?: string
  icon: typeof LayoutDashboard
  soon?: boolean
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/student', icon: LayoutDashboard },
  { label: 'My Courses', to: '/student/courses', icon: BookOpen },
  { label: 'Lessons', to: '/student/lessons', icon: PlayCircle },
  { label: 'Quiz', icon: FileQuestion, soon: true },
  { label: 'Progress', icon: BarChart3, soon: true },
  { label: 'Certificates', icon: Award, soon: true },
  { label: 'Profile', icon: User, soon: true },
  { label: 'Settings', icon: Settings, soon: true },
]

function SidebarContent() {
  const { user, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleSoon = () => {
    toast.info('This section is coming in a later phase.')
  }

  const handleLogout = () => {
    logout()
    toast.info('You have been signed out.')
    navigate('/', { replace: true })
  }

  return (
    <div className="flex h-full flex-col bg-secondary">
      <div className="flex h-16 items-center border-b border-slate-800 px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-heading text-lg font-bold text-white">
            English<span className="text-primary">Academy</span>
          </span>
        </Link>
      </div>

      <nav aria-label="Student dashboard" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) =>
          item.to ? (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/student'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={handleSoon}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.soon && (
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                  Soon
                </span>
              )}
            </button>
          ),
        )}
      </nav>

      {user && (
        <div className="border-t border-slate-800 px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
              {user.name
                .split(' ')
                .map((p) => p[0])
                .slice(0, 2)
                .join('')}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-slate-400">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sign out"
              className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function StudentLayout() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="min-h-screen bg-surface">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-md text-secondary"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/student" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-heading text-base font-bold text-secondary">
              Student<span className="text-primary">Dashboard</span>
            </span>
          </Link>
        </header>

        <main className="container-page py-6 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}