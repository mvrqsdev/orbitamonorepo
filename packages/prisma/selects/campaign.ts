import { Prisma } from '@prisma/client'

export const CampaignBase = Prisma.validator<Prisma.CampaignSelect>()({
  id: true,
  projectId: true,
  sourceId: true,
  title: true,
  createdAt: true,
  updatedAt: true,
  _count: true,
})

export const CampaignSelect = Prisma.validator<Prisma.CampaignSelect>()({
  ...CampaignBase,
  Project: {
    select: {
      id: true,
      constructionId: true,
      title: true,
      url: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
      ConstructionCompany: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          _count: true,
          Contacts: {
            select: {
              id: true,
              constructionCompanyId: true,
              name: true,
              email: true,
              phone: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  },
  Source: {
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
    },
  },
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
