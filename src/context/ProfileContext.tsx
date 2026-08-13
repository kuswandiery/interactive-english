import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { StudentProfile } from '@/types/profile'
import { getStoredProfile, saveProfile } from '@/services/profileService'

interface ProfileContextValue {
  profile: StudentProfile
  updateProfile: (profile: StudentProfile) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile>(() => getStoredProfile())

  const updateProfile = useCallback((next: StudentProfile) => {
    saveProfile(next)
    setProfile(next)
  }, [])

  const value = useMemo<ProfileContextValue>(
    () => ({ profile, updateProfile }),
    [profile, updateProfile],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within a ProfileProvider')
  return ctx
}