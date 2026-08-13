import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Settings } from '@/types/settings'
import { getStoredSettings, saveSettings } from '@/services/settingsService'

interface SettingsContextValue {
  settings: Settings
  updateSettings: (settings: Settings) => void
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => getStoredSettings())

  const updateSettings = useCallback((next: Settings) => {
    saveSettings(next)
    setSettings(next)
  }, [])

  const setSetting = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value }
        saveSettings(next)
        return next
      })
    },
    [],
  )

  const value = useMemo<SettingsContextValue>(
    () => ({ settings, updateSettings, setSetting }),
    [settings, updateSettings, setSetting],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider')
  return ctx
}