import { Prisma } from '../generated/client'
import { CustomerBase } from './customer'
import { LaneBase } from './lane'
import { LeadBase } from './lead'
import { TagBase } from './tag'
import { UserBase } from './user'

export const ScheduleBase = Prisma.validator<Prisma.ScheduleSelect>()({
  id: true,
  userId: true,
  leadId: true,
  date: true,
  status: true,
  address: true,
  nextNotificationAt: true,
  createdAt: true,
  updatedAt: true,
  _count: true,
})

export const ScheduleSelect = Prisma.validator<Prisma.ScheduleSelect>()({
  ...ScheduleBase,
  User: {
    select: UserBase,
  },
  Participants: {
    select: {
      Participant: {
        select: UserBase,
      },
    },
  },
  Lead: {
    select: {
      ...LeadBase,
      Broker: {
        select: UserBase,
      },
      Customer: {
        select: CustomerBase,
      },
      Lane: {
        select: LaneBase,
      },
      Tags: {
        select: {
          Tag: {
            select: TagBase,
          },
        },
      },
    },
  },
})
