import type { AuthUser } from '@/types/auth'

interface MockUser extends AuthUser {
  password: string
}

/**
 * MOCK AUTHENTICATION DATA
 *
 * These credentials are ONLY for frontend demonstration and development.
 * They are simulated in the browser and are NOT secure for production use.
 *
 * Passwords are stored in plain text in this mock data file and are used
 * only to simulate login for the Phase 6 frontend prototype.
 *
 * Production authentication (server-side credentials, password hashing,
 * JWT, and database) is implemented in Phase 12.
 */
export const mockUsers: MockUser[] = [
  {
    id: 'u-student',
    name: 'Demo Student',
    email: 'student@example.com',
    password: 'student123',
    role: 'student',
  },
  {
    id: 'u-admin',
    name: 'Demo Admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
]
