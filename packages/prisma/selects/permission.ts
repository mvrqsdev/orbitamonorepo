import { Prisma } from '../generated/client'
import { UserBase } from './user'

export const PermissionBase = Prisma.validator<Prisma.PermissionSelect>()({
  id: true,
  description: true,
  slug: true,
  _count: true,
})

export const PermissionSelect = Prisma.validator<Prisma.PermissionSelect>()({
  ...PermissionBase,
  Users: {
    select: {
      User: {
        select: {
          ...UserBase,
        },
      },
    },
  },
})
