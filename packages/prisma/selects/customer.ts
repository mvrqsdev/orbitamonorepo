import { Prisma } from '@prisma/client'

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
