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

export type Session = Prisma.SessionGetPayload<typeof SessionBase>
