import type { IApiErrorResponse } from '@orbita/features/api/types'
import type { PrismaClient, Session, User } from '@orbita/prisma'
import { prisma } from '@orbita/prisma'
import { TRPCError } from '@trpc/server'
import { cookies, headers as nextHeaders } from 'next/headers'

import type { ISessionResponse } from '../server/router/auth/types'

export interface createTRPCContextResponse {
  user: User | null
  session: Session | null
  permissions: string[]
  prisma: PrismaClient
  ip: string
}

export async function createTRPCContext(): Promise<createTRPCContextResponse> {
  const cookieStore = await cookies()
  const headers = await nextHeaders()
  const sessionId = cookieStore.get('sessionId')?.value as string

  const forwardedFor = headers.get('x-forwarded-for')
  const ip = (forwardedFor?.split(',')[0]?.trim() || '127.0.0.1').replace(
    /^::ffff:/,
    '',
  )

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

  if (!request.ok) {
    const {
      error: { statusCode, message },
    }: IApiErrorResponse = await request.json()
    throw new TRPCError({
      code: statusCode,
      message,
    })
  }

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
