import type { AuthUser, RegisterData } from '@/types/auth'
import { mockUsers } from '@/data/users'

const STORAGE_KEY = 'english_academy_auth'

/**
 * MOCK AUTHENTICATION SERVICE
 *
 * This service simulates authentication entirely in the browser.
 * There is NO server, database, or real security involved.
 *
 * A persisted session in localStorage is only for the frontend prototype
 * so the login state survives a browser refresh. Passwords are never stored.
 *
 * Real authentication moves to the backend in Phase 12.
 */

export function getStoredAuth(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthUser
    if (!parsed || !parsed.id || !parsed.email) return null
    return parsed
  } catch {
    return null
  }
}

export function setStoredAuth(user: AuthUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearStoredAuth(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function mockLogin(email: string, password: string): AuthUser {
  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
  )
  if (!user) {
    throw new Error('Invalid email or password.')
  }
  const { password: _ignored, ...safeUser } = user
  return safeUser
}

export function mockRegister(data: RegisterData): AuthUser {
  const email = data.email.trim().toLowerCase()
  const exists = mockUsers.some((u) => u.email.toLowerCase() === email)
  if (exists) {
    throw new Error('An account with this email already exists.')
  }

  const user: AuthUser = {
    id: `u-${Date.now()}`,
    name: data.name.trim(),
    email,
    role: 'student',
  }
  mockUsers.push({ ...user, password: data.password })
  return user
}

export { STORAGE_KEY }
