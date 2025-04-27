import { Prisma } from '../generated/client'
import { CampaignBase } from './campaign'
import { ConstructionCompanyBase } from './constructionCompany'
import { ContactBase } from './contact'
import { CustomerBase } from './customer'
import { LeadBase, LeadLostReasonBase } from './lead'
import { SourceBase } from './source'
import { TagBase } from './tag'
import { UserBase } from './user'

export const ProjectBase = Prisma.validator<Prisma.ProjectSelect>()({
  id: true,
  constructionId: true,
  title: true,
  url: true,
  createdAt: true,
  updatedAt: true,
  _count: true,
})

export const ProjectSelect = Prisma.validator<Prisma.ProjectSelect>()({
  ...ProjectBase,
  Campaigns: {
    select: {
      ...CampaignBase,
      Leads: {
        select: {
          Lead: {
            select: {
              ...LeadBase,
              Broker: {
                select: UserBase,
              },
              Customer: {
                select: CustomerBase,
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
            },
          },
        },
      },
      Project: {
        select: ProjectBase,
      },
      Source: {
        select: SourceBase,
      },
    },
  },
  ConstructionCompany: {
    select: {
      ...ConstructionCompanyBase,
      Contacts: {
        select: ContactBase,
      },
    },
  },
})
