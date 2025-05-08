import { Prisma } from '../generated/client'

export const TagBase = Prisma.validator<Prisma.TagDefaultArgs>()({
  select: {
    id: true,
    name: true,
    description: true,
    color: true,
    createdAt: true,
    updatedAt: true,
  },
})

export type Tag = Prisma.TagGetPayload<typeof TagBase>
