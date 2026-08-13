import { AppRouter } from '@/routes'
import { ToastProvider } from '@/components/ui/Toast'
import { AuthProvider } from '@/context/AuthContext'
import { LearningProvider } from '@/context/LearningContext'

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <LearningProvider>
          <AppRouter />
        </LearningProvider>
      </AuthProvider>
    </ToastProvider>
  )
}