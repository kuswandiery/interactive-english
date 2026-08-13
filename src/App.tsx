import { AppRouter } from '@/routes'
import { ToastProvider } from '@/components/ui/Toast'
import { AuthProvider } from '@/context/AuthContext'
import { LearningProvider } from '@/context/LearningContext'
import { QuizProvider } from '@/context/QuizContext'

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <LearningProvider>
          <QuizProvider>
            <AppRouter />
          </QuizProvider>
        </LearningProvider>
      </AuthProvider>
    </ToastProvider>
  )
}