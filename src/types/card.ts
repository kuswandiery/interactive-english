export interface CourseData {
  id: string
  title: string
  level: string
  description: string
  tutor: string
  rating: number
  duration: string
  lessons: number
  price: number
  category: string
  image?: string
}

export interface TutorData {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  students: number
  photo?: string
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
  plan: string
  price: number
  billing: string
  features: string[]
  popular?: boolean
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