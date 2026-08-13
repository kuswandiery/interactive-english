import type { Role } from '@/types'

export type UserRole = Role

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface AuthUser extends User {}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword?: string
  termsAccepted?: boolean
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  role: UserRole | null
}
