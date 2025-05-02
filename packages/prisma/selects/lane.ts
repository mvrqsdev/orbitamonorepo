import { Prisma } from '@prisma/client'

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
      Tags: {
        select: {
          Tag: {
            select: {
              id: true,
              name: true,
              description: true,
              color: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
        },
      },
      Schedules: {
        select: {
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
    },
  },
})
