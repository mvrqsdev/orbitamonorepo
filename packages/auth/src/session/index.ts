import { type AppSessionSelect, Prisma, prisma } from '@orbita/prisma'
export const sessionWithUserSelect = {
  id: true,
  device: true,
  expires: true,
  revoke: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  User: {
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      master: true,
      chatwootAgentId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  },
} satisfies Prisma.SessionSelect

// define o tipo de retorno com base no select
export type SessionWithUser = Prisma.SessionGetPayload<{
  select: typeof sessionWithUserSelect
}>
export interface FindSessionBySessionIdParams {
  sessionId: string
}

export async function FindSessionBySessionId({
  sessionId,
}: FindSessionBySessionIdParams): Promise<SessionWithUser | null> {
  if (!sessionId) {
    return null
  }
  const session = await prisma.session.findUnique({
    select: {
      id: true,
      device: true,
      expires: true,
      revoke: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      User: {
        select: {
          id: true,
          image: true,
          name: true,
          email: true,
          master: true,
          chatwootAgentId: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    where: {
      id: sessionId,
    },
  })

  if (!session) {
    return null
  }

  return session
}

export { AppSessionSelect as Session }
