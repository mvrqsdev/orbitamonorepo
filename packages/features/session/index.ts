import dayjs from '@orbita/dayjs'
import type { Session } from '@orbita/prisma'
import { prisma, SessionBase } from '@orbita/prisma'

import { FindUserById } from '../users'

export async function FindSessionById(
  id: string,
): Promise<{ session: Session }> {
  const session = await prisma.session.findUnique({
    where: {
      id,
    },
  })

  if (!session) {
    throw new Error('Não foi possível encontrar a sessão solicitada.')
  }

  return {
    session,
  }
}

export async function CreateSession({
  session,
}: {
  session: Omit<
    Session,
    'id' | 'createdAt' | 'updatedAt' | 'expires' | 'revoke'
  >
}): Promise<{ session: Session }> {
  await FindUserById(session.userId)

  const expires = dayjs().add(7, 'day').toDate()
  const createSession = await prisma.session.create({
    data: {
      ...session,
      expires,
    },
  })

  return {
    session: createSession,
  }
}

export async function UpdateSession({
  id,
  expires,
  revoke = false,
}: {
  id: string
  expires?: Date
  revoke?: boolean
}): Promise<{ session: Session }> {
  await FindSessionById(id)

  const newExpires = revoke ? undefined : expires
  const session = await prisma.session.update({
    ...SessionBase,
    where: {
      id,
    },
    data: {
      revoke,
      expires: newExpires,
    },
  })

  return {
    session,
  }
}

export async function FindSessionsByUserId({
  userId,
  revoked = false,
}: {
  userId: string
  revoked: boolean | 'all'
}): Promise<{ sessions: Session[] }> {
  await FindUserById(userId)

  const sessions = await prisma.session.findMany({
    ...SessionBase,
    where: {
      userId,
      revoke: revoked === 'all' ? undefined : !!revoked,
    },
  })

  return {
    sessions,
  }
}
