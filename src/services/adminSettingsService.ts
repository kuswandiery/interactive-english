import type { AdminSettings } from '@/types/admin'

const ADMIN_SETTINGS_KEY = 'english_academy_admin_settings'

export function getDefaultAdminSettings(): AdminSettings {
  return {
    siteName: 'English Academy',
    supportEmail: 'support@englishacademy.com',
    maintenanceMode: false,

    notifyStudentEnrollment: true,
    notifyNewTutor: true,
    notifyNewReviews: true,

    autoApproveCourses: false,
    defaultCourseLevel: 'Beginner',
    enrollmentCap: 5000,

    autoIssueCertificates: true,
    certificateExpiryDays: 365,
  }
}

export function getStoredAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(ADMIN_SETTINGS_KEY)
    if (!raw) return getDefaultAdminSettings()
    return { ...getDefaultAdminSettings(), ...(JSON.parse(raw) as Partial<AdminSettings>) }
  } catch {
    return getDefaultAdminSettings()
  }
}

export function saveAdminSettings(settings: AdminSettings): void {
  localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(settings))
}