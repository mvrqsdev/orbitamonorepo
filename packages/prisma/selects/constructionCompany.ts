import { Prisma } from '../generated/client'
import { CampaignBase } from './campaign'
import { ContactBase } from './contact'
import { ProjectBase } from './project'
import { SourceBase } from './source'

export const ConstructionCompanyBase =
  Prisma.validator<Prisma.ConstructionCompanySelect>()({
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
    _count: true,
  })

export const ConstructionCompanySelect =
  Prisma.validator<Prisma.ConstructionCompanySelect>()({
    ...ConstructionCompanyBase,
    Contacts: {
      select: ContactBase,
    },
    Projects: {
      select: {
        ...ProjectBase,
        Campaigns: {
          select: {
            ...CampaignBase,
            Source: {
              select: SourceBase,
            },
          },
        },
      },
    },
  })
