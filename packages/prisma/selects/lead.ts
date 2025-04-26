import { Prisma } from '../generated/client'
import { UserBase } from './user'

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

export const Lead = Prisma.validator<Prisma.LeadSelect>()({
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
    },
  },
  LostedReason: {
    select: {
      id: true,
      reason: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  Broker: {
    select: UserBase,
  },
  Documents: {
    select: {
      name: true,
      path: true,
      createdAt: true,
      updatedAt: true,
      User: {
        select: UserBase,
      },
    },
  },
  Comments: {
    select: {
      id: true,
      content: true,
      deleted: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      User: {
        select: UserBase,
      },
    },
  },
  Metadata: {
    select: {
      id: true,
      key: true,
      value: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  Chats: {
    select: {
      conversationId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  Campaigns: {
    select: {
      Campaign: {
        select: {
          id: true,
          title: true,
          createdAt: true,
          updatedAt: true,
          Source: {
            select: {
              id: true,
              title: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          Project: {
            select: {
              id: true,
              title: true,
              url: true,
              createdAt: true,
              updatedAt: true,
              ConstructionCompany: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  createdAt: true,
                  updatedAt: true,
                  Contacts: {
                    select: {
                      id: true,
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
          _count: true,
        },
      },
    },
  },
  Lane: {
    select: {
      id: true,
      color: true,
      name: true,
      principal: true,
      sortOrder: true,
      createdAt: true,
      updatedAt: true,
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
      date: true,
      address: true,
      nextNotificationAt: true,
      status: true,
      createdAt: true,
      updatedAt: true,
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
      _count: true,
    },
  },
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
