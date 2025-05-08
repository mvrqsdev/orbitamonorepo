import { Prisma } from '../generated/client'

export const CampaignBase = Prisma.validator<Prisma.CampaignDefaultArgs>()({
  select: {
    id: true,
    projectId: true,
    sourceId: true,
    title: true,
    createdAt: true,
    updatedAt: true,
  },
})

export type Campaign = Prisma.CampaignGetPayload<typeof CampaignBase>
