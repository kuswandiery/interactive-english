import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { StudentLayout } from '@/layouts/StudentLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

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
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'))
const StudentDashboard = lazy(() => import('@/pages/StudentDashboard'))
const StudentCoursesPage = lazy(() => import('@/pages/StudentCoursesPage'))
const StudentLessonsPage = lazy(() => import('@/pages/StudentLessonsPage'))
const LearningPlayerPage = lazy(() => import('@/pages/LearningPlayerPage'))
const StudentQuizPage = lazy(() => import('@/pages/StudentQuizPage'))
const QuizPlayerPage = lazy(() => import('@/pages/QuizPlayerPage'))
const QuizResultPage = lazy(() => import('@/pages/QuizResultPage'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
const AccessDeniedPage = lazy(() => import('@/pages/AccessDeniedPage'))

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
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="access-denied" element={<AccessDeniedPage />} />

          <Route
            path="student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCoursesPage />} />
            <Route path="lessons" element={<StudentLessonsPage />} />
            <Route path="learn/:courseSlug/:lessonId" element={<LearningPlayerPage />} />
            <Route path="quiz" element={<StudentQuizPage />} />
            <Route path="quiz/:quizId" element={<QuizPlayerPage />} />
            <Route path="quiz/:quizId/result" element={<QuizResultPage />} />
          </Route>
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  )
}