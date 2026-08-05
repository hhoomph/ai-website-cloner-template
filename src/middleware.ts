import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/better-auth'

type BetterAuthSession = {
  user: {
    id: string
    email: string
    name?: string
    image?: string | null
    emailVerified: boolean
    role?: string
  }
  session: {
    id: string
    userId: string
    expiresAt: Date
  }
}

export async function middleware(request: NextRequest) {
  const session = (await auth.api.getSession({
    headers: request.headers,
  })) as BetterAuthSession | null

  const isAuth = !!session
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth') || 
                     request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register')

  const role = session?.user?.role ?? null

  // Redirect authenticated users away from auth pages
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Only allow admin users
    if (role !== 'ADMIN' && role !== 'SUPERADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Protect API admin routes
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (role !== 'ADMIN' && role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  // Optional: Attach user info to headers for server components
  if (isAuth) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', session.user.id)
    requestHeaders.set('x-user-role', String(role))
    requestHeaders.set('x-user-email', session.user.email)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api/auth (Better Auth routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)',
  ],
}