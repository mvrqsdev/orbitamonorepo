import { Prisma } from '@prisma/client'

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
          id: true,
          image: true,
          name: true,
          email: true,
          master: true,
          chatwootAgentId: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          _count: true,
        },
      },
    },
  },
})
