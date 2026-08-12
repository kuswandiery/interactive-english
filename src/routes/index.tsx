import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const ComponentsShowcase = lazy(() => import('@/pages/ComponentsShowcase'))
const CoursesPage = lazy(() => import('@/pages/CoursesPage'))
const CourseDetailPage = lazy(() => import('@/pages/CourseDetailPage'))
const TutorsPage = lazy(() => import('@/pages/TutorsPage'))
const TutorDetailPage = lazy(() => import('@/pages/TutorDetailPage'))
const PricingPage = lazy(() => import('@/pages/PricingPage'))
const FaqPage = lazy(() => import('@/pages/FaqPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage'))
const Placeholder = lazy(() => import('@/pages/Placeholder'))

const placeholderPaths = ['login', 'register']

export function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="showcase" element={<ComponentsShowcase />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:slug" element={<CourseDetailPage />} />
          <Route path="tutors" element={<TutorsPage />} />
          <Route path="tutors/:id" element={<TutorDetailPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          {placeholderPaths.map((path) => (
            <Route key={path} path={path} element={<Placeholder />} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  )
}