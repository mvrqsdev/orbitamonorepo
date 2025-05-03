import { Prisma } from '../generated/client'

export const SessionBase = Prisma.validator<Prisma.SessionDefaultArgs>()({
  select: {
    id: true,
    device: true,
    expires: true,
    revoke: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  },
})

export const SessionSelect = Prisma.validator<Prisma.SessionDefaultArgs>()({
  select: {
    ...SessionBase,
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
})

export type AppSessionBase = Prisma.SessionGetPayload<typeof SessionBase>
export type AppSessionSelect = Prisma.SessionGetPayload<typeof SessionSelect>
