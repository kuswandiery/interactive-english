import type { LucideIcon } from 'lucide-react'
import { MousePointerClick, UserRound, ClipboardList, LineChart, Award } from 'lucide-react'

export interface ProcessStep {
  icon: LucideIcon
  title: string
  description: string
}

export const learningProcess: ProcessStep[] = [
  {
    icon: MousePointerClick,
    title: 'Choose Your Course',
    description: 'Browse programs and pick the one that matches your goals and level.',
  },
  {
    icon: UserRound,
    title: 'Learn with Expert Tutors',
    description: 'Follow interactive lessons guided by experienced English tutors.',
  },
  {
    icon: ClipboardList,
    title: 'Practice & Take Quizzes',
    description: 'Reinforce your skills with practice exercises and quizzes.',
  },
  {
    icon: LineChart,
    title: 'Track Your Progress',
    description: 'Monitor your learning journey with clear progress tracking.',
  },
  {
    icon: Award,
    title: 'Earn Your Certificate',
    description: 'Complete your course and receive a certificate of achievement.',
  },
]