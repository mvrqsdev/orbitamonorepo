import { Prisma } from '../generated/client'

export const PermissionBase = Prisma.validator<Prisma.PermissionDefaultArgs>()({
  select: {
    id: true,
    description: true,
    slug: true,
  },
})

export type Permission = Prisma.PermissionGetPayload<typeof PermissionBase>
