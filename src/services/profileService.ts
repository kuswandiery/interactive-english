import type { LearningGoal, StudentProfile } from '@/types/profile'

const PROFILE_KEY = 'english_academy_profile'

export const learningGoals: LearningGoal[] = [
  { value: 'conversation', label: 'Conversational fluency' },
  { value: 'career', label: 'Career & business' },
  { value: 'travel', label: 'Travel' },
  { value: 'exam', label: 'Exam preparation' },
  { value: 'academic', label: 'Academic study' },
  { value: 'personal', label: 'Personal growth' },
]

export const preferredLanguages = [
  { value: 'english', label: 'English' },
  { value: 'indonesian', label: 'Indonesian' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'mandarin', label: 'Mandarin' },
]

export function getDefaultProfile(): StudentProfile {
  return {
    name: 'Alex Student',
    email: 'alex@example.com',
    bio: 'Passionate English learner working towards conversational fluency.',
    goal: 'conversation',
    preferredLanguage: 'english',
    avatar: 'AS',
  }
}

export function getStoredProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return getDefaultProfile()
    return { ...getDefaultProfile(), ...(JSON.parse(raw) as Partial<StudentProfile>) }
  } catch {
    return getDefaultProfile()
  }
}

export function saveProfile(profile: StudentProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}