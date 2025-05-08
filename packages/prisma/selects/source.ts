import { Prisma } from '../generated/client'

export const SourceBase = Prisma.validator<Prisma.CampaignSourceDefaultArgs>()({
  select: {
    id: true,
    title: true,
    createdAt: true,
    updatedAt: true,
  },
})

export type Source = Prisma.CampaignSourceGetPayload<typeof SourceBase>
