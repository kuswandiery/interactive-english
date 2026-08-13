import type { Settings } from '@/types/settings'

const SETTINGS_KEY = 'english_academy_settings'

export function getDefaultSettings(): Settings {
  return {
    notifications: true,
    emailUpdates: true,
    courseReminders: true,

    theme: 'system',

    autoPlayLessons: true,
    videoQuality: 'auto',
    learningReminders: true,

    publicProfile: false,
    shareAchievements: true,
  }
}

export function getStoredSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return getDefaultSettings()
    return { ...getDefaultSettings(), ...(JSON.parse(raw) as Partial<Settings>) }
  } catch {
    return getDefaultSettings()
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}