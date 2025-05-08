import { getClientIp, rateLimiter as rateLimit } from '@orbita/features/lib'
import { FindSessionById } from '@orbita/features/session'
import type { PrismaClient, Session, User } from '@orbita/prisma'
import { prisma } from '@orbita/prisma'
// Importar o TRPCError ao criar o protectedProcedure
import { initTRPC, TRPCError } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import superjson from 'superjson'

import { errorFormatter } from './errorFormatter'
import { ISessionResponse } from './router/auth/types'

export class AuthError extends Error {
  public readonly statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export interface SessionResponse {
  session: Session
  user: User
  permissions: string[]
}
export interface ApiErrorResponse {
  message: string
}

export interface createTRPCContextResponse {
  user: User | null
  session: Session | null
  permissions: string[]
  prisma: PrismaClient
  ip: string
}

export async function createTRPCContext({
  req,
}: trpcExpress.CreateExpressContextOptions): Promise<createTRPCContextResponse> {
  const sessionId = req.cookies?.sessionId
  const ip = getClientIp(req)

  if (!sessionId) {
    return { prisma, user: null, session: null, permissions: [], ip }
  }

  const request = await fetch(`${process.env.BACKEND_URL}/auth/session`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${sessionId}`,
    },
  })

  const {
    data: { permissions, session, user },
  }: ISessionResponse = await request.json()

  return {
    user,
    prisma,
    session,
    permissions,
    ip,
  }
}

export const t = initTRPC
  .context<typeof createTRPCContext>()
  .meta<{ name: string }>()
  .create({
    transformer: superjson,
    errorFormatter,
  })

export const middleware = t.middleware
export const isAuthenticated = middleware(
  async ({ ctx: { session, user }, next }) => {
    if (!session || !user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'É necessário fazer login para realizar esta ação.',
      })
    }

    return next()
  },
)

export const rateLimiter = middleware(async ({ ctx: { ip }, next, meta }) => {
  const procedureName = meta?.name.replaceAll(' ', '-')
  const { remaining, success } = await rateLimit(
    `${ip}-${procedureName ?? 'unnamed'}`,
  )

  if (!success) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: `Aguarde ${remaining} antes de tentar novamente.`,
    })
  }

  return next()
})
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const publicProcedure = t.procedure.use(rateLimiter)
export const protectedProcedure = publicProcedure.use(isAuthenticated)

interface IHasPermissions {
  permissions: string[]
  has: 'some' | 'every'
}
export const protectedWithPermissions = (opts: IHasPermissions) =>
  publicProcedure.use(hasPermissions(opts))

export function hasPermissions({ has, permissions }: IHasPermissions) {
  return middleware(async ({ ctx, next }) => {
    const { user, permissions: userPermissions } = ctx

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'É necessário fazer login para realizar esta ação.',
      })
    }
    let hasPermission: boolean = false
    if (has === 'every') {
      hasPermission = permissions.every((permission) =>
        userPermissions.includes(permission),
      )
    }

    if (has === 'some') {
      hasPermission = permissions.some((permission) =>
        userPermissions.includes(permission),
      )
    }

    if (!hasPermission) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: `Permissão insuficiente. É necessário possuir ${
          has === 'every' ? 'todas' : 'pelo menos uma'
        } das seguintes permissões: ${permissions.join(', ')}`,
      })
    }

    return next()
  })
}
