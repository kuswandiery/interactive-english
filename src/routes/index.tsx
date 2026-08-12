import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const ComponentsShowcase = lazy(() => import('@/pages/ComponentsShowcase'))
const Placeholder = lazy(() => import('@/pages/Placeholder'))

const placeholderPaths = [
  'courses',
  'tutors',
  'pricing',
  'about',
  'blog',
  'contact',
  'login',
  'register',
]

export function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="showcase" element={<ComponentsShowcase />} />
          {placeholderPaths.map((path) => (
            <Route key={path} path={path} element={<Placeholder />} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  )
}