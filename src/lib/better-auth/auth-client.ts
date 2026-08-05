import { createAuthClient } from 'better-auth/client'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
})

// Export the client for API calls
export default authClient

// Export type for session data
export interface Session {
  user: {
    id: string
    email: string
    name?: string
    image?: string | null
    emailVerified: boolean
  }
  session: {
    id: string
    userId: string
    expiresAt: Date
  }
}
