import { Prisma } from '../generated/client'

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
  Participants: {
    select: {
      Participant: {
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
    },
  },
})
