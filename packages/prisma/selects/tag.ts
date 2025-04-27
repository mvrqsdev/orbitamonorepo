import { Prisma } from '../generated/client'
import { CustomerBase } from './customer'
import { LaneBase } from './lane'
import { LeadBase, LeadLostReasonBase } from './lead'
import { UserBase } from './user'

export const TagBase = Prisma.validator<Prisma.TagSelect>()({
  id: true,
  name: true,
  description: true,
  color: true,
  createdAt: true,
  updatedAt: true,
  _count: true,
})

export const TagSelect = Prisma.validator<Prisma.TagSelect>()({
  ...TagBase,
  Leads: {
    select: {
      Lead: {
        select: {
          ...LeadBase,
          Broker: {
            select: UserBase,
          },
          Customer: {
            select: CustomerBase,
          },
          LostedReason: {
            select: LeadLostReasonBase,
          },
          Lane: {
            select: LaneBase,
          },
        },
      },
    },
  },
})
