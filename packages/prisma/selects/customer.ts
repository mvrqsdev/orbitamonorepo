import { Prisma } from '../generated/client'
import { LaneBase } from './lane'
import { LeadBase, LeadLostReasonBase } from './lead'
import { TagBase } from './tag'
import { UserBase } from './user'

export const CustomerBase = Prisma.validator<Prisma.CustomerSelect>()({
  id: true,
  picture: true,
  name: true,
  email: true,
  phone: true,
  chatwootContactId: true,
  createdAt: true,
  updatedAt: true,
  _count: true,
})

export const CustomerSelect = Prisma.validator<Prisma.CustomerSelect>()({
  ...CustomerBase,
  Leads: {
    select: {
      ...LeadBase,
      Broker: {
        select: UserBase,
      },
      Tags: {
        select: {
          Tag: {
            select: TagBase,
          },
        },
      },
      Lane: {
        select: LaneBase,
      },
      LostedReason: {
        select: LeadLostReasonBase,
      },
    },
  },
})
