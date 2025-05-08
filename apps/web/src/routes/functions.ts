import type { ISessionPayload } from '@orbita/trpc/procedures/auth/types'
import { NextRequest, NextResponse } from 'next/server'

import { REDIRECT_WHEN_NOT_AUTHENTICATED } from './index'
import type {
  IMenuCategory,
  IMenuCollapsible,
  IPrivateRoute,
  IPublicRoute,
  TMenuContent,
  TMenuItem,
} from './interface'

export function RouteRedirect(request: NextRequest, redirect: string) {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = redirect
  return NextResponse.redirect(redirectUrl)
}

export function GetRoutesFromType({
  routesCategories,
  type,
}: {
  routesCategories: IMenuCategory[]
  type: 'private' | 'public'
}): TMenuItem[] {
  const routes: TMenuItem[] = []

  for (const category of routesCategories) {
    if (category.type !== type) continue

    for (const item of category.content) {
      if ('path' in item) {
        routes.push(item)
      }

      if ('submenus' in item) {
        routes.push(...item.submenus)
      }
    }
  }

  return routes
}

export function VerifyRouteAccess({
  type,
  route,
  request,
  authenticated,
}: {
  type: 'public' | 'private'
  route: TMenuItem
  request: NextRequest
  authenticated: ISessionPayload | null
}) {
  // Se não estiver autenticado e for rota privada, redireciona
  if (type === 'private' && !authenticated) {
    return RouteRedirect(request, REDIRECT_WHEN_NOT_AUTHENTICATED)
  }

  // Se for rota pública e o usuário não está autenticado, permite acesso
  if (type === 'public' && !authenticated) {
    return NextResponse.next()
  }

  const { permissions } = authenticated!

  // Se for rota pública e exigir redirecionamento quando autenticado
  if (
    type === 'public' &&
    (route as IPublicRoute).whenAuthenticated === 'redirect'
  ) {
    return RouteRedirect(request, route.redirect!)
  }

  // Verifica se o usuário tem acesso
  if (!hasAccessToRoute(route, permissions)) {
    return RouteRedirect(request, route.redirect!)
  }

  return NextResponse.next()
}

export function hasAccessToRoute(
  route: TMenuItem,
  permissions: string[],
): boolean {
  const requiredPermissions = route.permissions ?? []
  const checkType = route.has

  if (requiredPermissions.length === 0 || !checkType) return true

  return checkType === 'every'
    ? requiredPermissions.every((p) => permissions.includes(p))
    : requiredPermissions.some((p) => permissions.includes(p))
}

export function isPrivateRoute(item: TMenuItem): item is IPrivateRoute {
  return (
    (item as IPrivateRoute).sortOrder !== undefined &&
    (item as IPrivateRoute).hiddenMenu !== undefined
  )
}

export function isCollapsible(item: TMenuContent): item is IMenuCollapsible {
  return 'submenus' in item
}

export function getSortedPrivateMenu(
  categories: IMenuCategory[],
  userPermissions: string[],
): IMenuCategory[] {
  return categories
    .filter((category) => category.type === 'private')
    .sort((a, b) => (a.sortCategory ?? 0) - (b.sortCategory ?? 0))
    .map((category) => {
      const sortedContent: TMenuContent[] = category.content
        .map((item): TMenuContent | null => {
          if (isCollapsible(item)) {
            const submenus: IPrivateRoute[] = item.submenus
              .reduce<IPrivateRoute[]>((acc, submenu) => {
                if (
                  isPrivateRoute(submenu) &&
                  !submenu.hiddenMenu &&
                  hasAccessToRoute(submenu, userPermissions)
                ) {
                  acc.push(submenu)
                }
                return acc
              }, [])
              .sort((a, b) => a.sortOrder - b.sortOrder)

            if (submenus.length === 0) return null

            return {
              ...item,
              submenus,
            }
          }

          return isPrivateRoute(item) &&
            !item.hiddenMenu &&
            hasAccessToRoute(item, userPermissions)
            ? item
            : null
        })
        .filter((item): item is TMenuContent => item !== null)
        .sort((a, b) => {
          const sortA = isCollapsible(a)
            ? a.sortOrder
            : isPrivateRoute(a)
              ? a.sortOrder
              : 0
          const sortB = isCollapsible(b)
            ? b.sortOrder
            : isPrivateRoute(b)
              ? b.sortOrder
              : 0
          return sortA - sortB
        })

      return {
        ...category,
        content: sortedContent,
      }
    })
    .filter((category) => category.content.length > 0)
}
