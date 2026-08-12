export interface CourseModule {
  title: string
  lessons: string[]
}

export interface CourseData {
  id: string
  slug: string
  title: string
  description: string
  shortDescription: string
  image?: string
  level: string
  category: string
  tutor: string
  tutorRole?: string
  rating: number
  reviewCount: number
  duration: string
  lessons: number
  price: number
  originalPrice?: number
  popular?: boolean
  students?: number
  features: string[]
  learningOutcomes: string[]
  requirements: string[]
  curriculum: CourseModule[]
}

export interface TutorData {
  id: string
  name: string
  role: string
  photo?: string
  bio: string
  specialization: string
  experience: number
  rating: number
  reviewCount: number
  languages: string[]
  availability: string
  courses: string[]
}

export interface TestimonialData {
  id: string
  name: string
  role: string
  rating: number
  quote: string
  photo?: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export interface FaqItem {
  id: string
  category: string
  question: string
  answer: string
}

export interface Statistic {
  id: string
  label: string
  value: number
  trend?: number
  unit?: string
}

export interface ProgressData {
  id: string
  course: string
  progress: number
  completedLessons: number
  totalLessons: number
}