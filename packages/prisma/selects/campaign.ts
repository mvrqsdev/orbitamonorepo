import { Prisma } from '../generated/client'
import { ConstructionCompanyBase } from './constructionCompany'
import { ContactBase } from './contact'
import { CustomerBase } from './customer'
import { LaneBase } from './lane'
import { LeadBase, LeadLostReasonBase } from './lead'
import { ProjectBase } from './project'
import { SourceBase } from './source'
import { TagBase } from './tag'
import { UserBase } from './user'

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
  Source: {
    select: SourceBase,
  },
  Leads: {
    select: {
      Lead: {
        select: {
          ...LeadBase,
          Tags: {
            select: {
              Tag: {
                select: TagBase,
              },
            },
          },
          Customer: {
            select: CustomerBase,
          },
          LostedReason: {
            select: LeadLostReasonBase,
          },
          Broker: {
            select: UserBase,
          },
          Lane: {
            select: LaneBase,
          },
        },
      },
    },
  },
})
