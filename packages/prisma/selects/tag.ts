import { Prisma } from '../generated/client'

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
          id: true,
          title: true,
          value: true,
          status: true,
          laneId: true,
          customerId: true,
          lostedLeadReasonId: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          _count: true,
          Broker: {
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
          Customer: {
            select: {
              id: true,
              picture: true,
              name: true,
              email: true,
              phone: true,
              chatwootContactId: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
          LostedReason: {
            select: {
              id: true,
              reason: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
          Lane: {
            select: {
              id: true,
              name: true,
              principal: true,
              sortOrder: true,
              color: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
        },
      },
    },
  },
})
