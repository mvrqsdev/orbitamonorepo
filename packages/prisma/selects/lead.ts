import { Prisma } from '../generated/client'
import { CampaignBase } from './campaign'
import { ConstructionCompanyBase } from './constructionCompany'
import { ContactBase } from './contact'
import { CustomerBase } from './customer'
import { LaneBase } from './lane'
import { ProjectBase } from './project'
import { ScheduleBase } from './schedule'
import { SourceBase } from './source'
import { TagBase } from './tag'
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
    select: CustomerBase,
  },
  LostedReason: {
    select: LeadLostReasonBase,
  },
  Broker: {
    select: UserBase,
  },
  Documents: {
    select: {
      ...LeadDocumentBase,
      User: {
        select: UserBase,
      },
    },
  },
  Comments: {
    select: {
      ...LeadCommentBase,
      User: {
        select: UserBase,
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
          ...CampaignBase,
          Source: {
            select: SourceBase,
          },
          Project: {
            select: {
              ...ProjectBase,
              ConstructionCompany: {
                select: {
                  ...ConstructionCompanyBase,
                  Contacts: {
                    select: ContactBase,
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
    select: LaneBase,
  },
  Tags: {
    select: {
      Tag: {
        select: TagBase,
      },
    },
  },
  Schedules: {
    select: {
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
    },
  },
})
