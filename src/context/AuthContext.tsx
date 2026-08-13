import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser, RegisterData, UserRole } from '@/types/auth'
import {
  clearStoredAuth,
  getStoredAuth,
  mockLogin,
  mockRegister,
  setStoredAuth,
} from '@/services/auth'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  role: UserRole | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<AuthUser>
  register: (data: RegisterData) => Promise<AuthUser>
  logout: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function toAuthState(user: AuthUser | null): AuthUser | null {
  return user
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = getStoredAuth()
    setUser(stored ? toAuthState(stored) : null)
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<AuthUser> => {
    setError(null)
    try {
      const authed = await new Promise<AuthUser>((resolve) => {
        window.setTimeout(() => resolve(mockLogin(email, password)), 600)
      })
      setStoredAuth(authed)
      setUser(authed)
      return authed
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in. Please try again.')
      throw err
    }
  }, [])

  const register = useCallback(async (data: RegisterData): Promise<AuthUser> => {
    setError(null)
    try {
      const created = await new Promise<AuthUser>((resolve) => {
        window.setTimeout(() => resolve(mockRegister(data)), 700)
      })
      setStoredAuth(created)
      setUser(created)
      return created
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account. Please try again.')
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    clearStoredAuth()
    setUser(null)
    setError(null)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      role: user?.role ?? null,
      loading,
      error,
      login,
      register,
      logout,
      clearError,
    }),
    [user, loading, error, login, register, logout, clearError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
