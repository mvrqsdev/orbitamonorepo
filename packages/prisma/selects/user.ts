import { Prisma, UserStatus } from '../generated/client'

export const UserBase = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    image: true,
    name: true,
    email: true,
    master: true,
    chatwootAgentId: true,
    status: true,
    lastActiveAt: true,
    online: true,
    createdAt: true,
    updatedAt: true,
  },
})

export type User = Prisma.UserGetPayload<typeof UserBase>
export type { UserStatus }
