import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const ComponentsShowcase = lazy(() => import('@/pages/ComponentsShowcase'))
const CoursesPage = lazy(() => import('@/pages/CoursesPage'))
const CourseDetailPage = lazy(() => import('@/pages/CourseDetailPage'))
const Placeholder = lazy(() => import('@/pages/Placeholder'))

const placeholderPaths = ['tutors', 'pricing', 'about', 'blog', 'contact', 'login', 'register']

export function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="showcase" element={<ComponentsShowcase />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:slug" element={<CourseDetailPage />} />
          {placeholderPaths.map((path) => (
            <Route key={path} path={path} element={<Placeholder />} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  )
}