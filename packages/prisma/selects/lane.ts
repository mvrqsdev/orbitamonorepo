import { Prisma } from '../generated/client'
import { CustomerBase } from './customer'
import { LeadBase, LeadLostReasonBase } from './lead'
import { ScheduleBase } from './schedule'
import { TagBase } from './tag'
import { UserBase } from './user'

export const LaneBase = Prisma.validator<Prisma.LaneSelect>()({
  id: true,
  name: true,
  principal: true,
  sortOrder: true,
  color: true,
  createdAt: true,
  updatedAt: true,
  _count: true,
})

export const LaneSelect = Prisma.validator<Prisma.LaneSelect>()({
  ...LaneBase,
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
      Schedules: {
        select: ScheduleBase,
      },
      Customer: {
        select: CustomerBase,
      },
      LostedReason: {
        select: LeadLostReasonBase,
      },
    },
  },
})
