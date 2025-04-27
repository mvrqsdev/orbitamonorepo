import { Prisma } from '../generated/client'
import { CampaignBase } from './campaign'
import { ConstructionCompanyBase } from './constructionCompany'
import { ContactBase } from './contact'
import { CustomerBase } from './customer'
import { LaneBase } from './lane'
import { LeadBase, LeadLostReasonBase } from './lead'
import { ProjectBase } from './project'
import { TagBase } from './tag'
import { UserBase } from './user'

export const SourceBase = Prisma.validator<Prisma.CampaignSourceSelect>()({
  id: true,
  title: true,
  createdAt: true,
  updatedAt: true,
  _count: true,
})

export const SourceSelect = Prisma.validator<Prisma.CampaignSourceSelect>()({
  ...SourceBase,
  Campaigns: {
    select: {
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
      Leads: {
        select: {
          Lead: {
            select: {
              ...LeadBase,
              Broker: {
                select: UserBase,
              },
              Lane: {
                select: LaneBase,
              },
              LostedReason: {
                select: LeadLostReasonBase,
              },
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
            },
          },
        },
      },
    },
  },
})
