import type {
  ISessionPayload,
  ISessionResponse,
} from '@orbita/trpc/procedures/auth/types'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { REDIRECT_WHEN_NOT_AUTHENTICATED, routesCategories } from './routes'
import {
  GetRoutesFromType,
  RouteRedirect,
  VerifyRouteAccess,
} from './routes/functions'

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const redirectUrl = request.nextUrl.clone()
  const cookieStore = await cookies()
  const token = cookieStore.get('sessionId')?.value

  // Define se é uma rota publica ou privada
  const publicRoute = GetRoutesFromType({
    routesCategories,
    type: 'public',
  }).find((route) => pathname.startsWith(route.path))
  const privateRoute = GetRoutesFromType({
    routesCategories,
    type: 'private',
  }).find((route) => pathname.startsWith(route.path))

  if (pathname === '/') {
    return NextResponse.next()
  }

  let authenticated: ISessionPayload | null = null
  // valida se o usuário esta autenticado
  if (token) {
    try {
      const request = await fetch(`${process.env.BACKEND_URL}/auth/session`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `sessionId=${token}`,
        },
      })

      if (!request.ok) {
        cookieStore.delete('sessionId')
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED
        return NextResponse.redirect(redirectUrl)
      }

      const {
        data: { session, user, permissions },
        success,
      }: ISessionResponse = await request.json()

      if (success) {
        authenticated = {
          session,
          user,
          permissions,
        }
      }
    } catch (error) {
      cookieStore.delete('sessionId')
      return RouteRedirect(request, REDIRECT_WHEN_NOT_AUTHENTICATED)
    }
  }

  if (publicRoute) {
    // return verifyPublicRoute({ request, publicRoute, authenticated })
    return VerifyRouteAccess({
      type: 'public',
      request,
      route: publicRoute,
      authenticated,
    })
  }

  if (privateRoute) {
    // return verifyPrivateRoute({ request, privateRoute, authenticated })
    return VerifyRouteAccess({
      type: 'private',
      request,
      route: privateRoute,
      authenticated,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
