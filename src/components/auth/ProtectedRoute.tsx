import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { UserRole } from '@/types/auth'
import { useAuth } from '@/context/AuthContext'
import { Spinner } from '@/components/ui/Spinner'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo,
}: ProtectedRouteProps) {
  const { isAuthenticated, role, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Spinner size="lg" label="Checking authentication..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    const state = redirectTo ? undefined : { from: location.pathname }
    return <Navigate to="/login" replace state={state} />
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />
    }
    return <Navigate to="/access-denied" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}