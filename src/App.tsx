import { AppRouter } from '@/routes'
import { ToastProvider } from '@/components/ui/Toast'
import { AuthProvider } from '@/context/AuthContext'
import { LearningProvider } from '@/context/LearningContext'
import { QuizProvider } from '@/context/QuizContext'
import { ProfileProvider } from '@/context/ProfileContext'
import { SettingsProvider } from '@/context/SettingsContext'

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <LearningProvider>
          <QuizProvider>
            <ProfileProvider>
              <SettingsProvider>
                <AppRouter />
              </SettingsProvider>
            </ProfileProvider>
          </QuizProvider>
        </LearningProvider>
      </AuthProvider>
    </ToastProvider>
  )
}