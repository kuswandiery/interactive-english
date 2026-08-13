export type ThemePreference = 'light' | 'dark' | 'system'

export type VideoQuality = 'auto' | '360p' | '720p' | '1080p'

export interface Settings {
  notifications: boolean
  emailUpdates: boolean
  courseReminders: boolean

  theme: ThemePreference

  autoPlayLessons: boolean
  videoQuality: VideoQuality
  learningReminders: boolean

  publicProfile: boolean
  shareAchievements: boolean
}

export interface SettingsCategory {
  key: keyof Settings
  type: 'toggle' | 'theme' | 'select'
}