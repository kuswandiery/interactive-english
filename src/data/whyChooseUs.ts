import type { LucideIcon } from 'lucide-react'
import { UserRound, CalendarClock, BookOpenCheck, LineChart, Award } from 'lucide-react'

export interface FeatureItem {
  icon: LucideIcon
  title: string
  description: string
}

export const whyChooseUs: FeatureItem[] = [
  {
    icon: UserRound,
    title: 'Expert Tutors',
    description: 'Learn from experienced, certified tutors who guide you at every step.',
  },
  {
    icon: CalendarClock,
    title: 'Flexible Learning',
    description: 'Study at your own pace with lessons available on any device.',
  },
  {
    icon: BookOpenCheck,
    title: 'Structured Curriculum',
    description: 'Follow a clear, level-based curriculum designed for steady progress.',
  },
  {
    icon: LineChart,
    title: 'Progress Tracking',
    description: 'See your improvement with real-time progress and quiz results.',
  },
  {
    icon: Award,
    title: 'Certificates',
    description: 'Earn recognized certificates for every course you complete.',
  },
]