import { Prisma } from '../generated/client'

export const LeadBase = Prisma.validator<Prisma.LeadSelect>()({
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
})

export const LeadDocumentBase = Prisma.validator<Prisma.LeadDocumentSelect>()({
  leadId: true,
  userId: true,
  name: true,
  path: true,
  createdAt: true,
  updatedAt: true,
})

export const LeadCommentBase = Prisma.validator<Prisma.LeadCommentSelect>()({
  id: true,
  leadId: true,
  content: true,
  userId: true,
  deleted: true,
  createdAt: true,
  updatedAt: true,
})

export const LeadMetadataBase = Prisma.validator<Prisma.LeadMetadataSelect>()({
  id: true,
  leadId: true,
  key: true,
  value: true,
  createdAt: true,
  updatedAt: true,
})

export const LeadLostReasonBase =
  Prisma.validator<Prisma.LeadLostReasonSelect>()({
    id: true,
    reason: true,
    createdAt: true,
    updatedAt: true,
    _count: true,
  })

export const LeadChatBase = Prisma.validator<Prisma.LeadChatSelect>()({
  leadId: true,
  conversationId: true,
  status: true,
  createdAt: true,
  updatedAt: true,
})

export const LeadSelect = Prisma.validator<Prisma.LeadSelect>()({
  ...LeadBase,
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
    select: LeadLostReasonBase,
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
  Documents: {
    select: {
      ...LeadDocumentBase,
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
  Comments: {
    select: {
      ...LeadCommentBase,
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
  Metadata: {
    select: LeadMetadataBase,
  },
  Chats: {
    select: LeadChatBase,
  },
  Campaigns: {
    select: {
      Campaign: {
        select: {
          id: true,
          projectId: true,
          sourceId: true,
          title: true,
          createdAt: true,
          updatedAt: true,
          _count: true,
          Source: {
            select: {
              id: true,
              title: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
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
    },
  },
})
