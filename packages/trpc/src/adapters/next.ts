import { FindSessionBySessionId } from '@orbita/auth'
import { AppUserBase, prisma, PrismaClient } from '@orbita/prisma'
import { cookies } from 'next/headers'

export interface createTRPCContextResponse {
  user: AppUserBase | null
  prisma: PrismaClient
}

export async function createTRPCContext(): Promise<createTRPCContextResponse> {
  const cookieStore = await cookies()

  // 2) então chame get()
  const sessionId = cookieStore.get('sessionId')?.value
  console.log('sessionId', sessionId)

  if (!sessionId) {
    return {
      prisma,
      user: null,
    }
  }

  const session = await FindSessionBySessionId({ sessionId })

  if (!session) {
    return {
      prisma,
      user: null,
    }
  }

  return {
    prisma,
    user: {
      ...session.User,
    },
  }
}
