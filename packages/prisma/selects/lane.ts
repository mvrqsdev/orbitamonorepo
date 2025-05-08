import { Prisma } from '../generated/client'

export const LaneBase = Prisma.validator<Prisma.LaneDefaultArgs>()({
  select: {
    id: true,
    name: true,
    principal: true,
    sortOrder: true,
    color: true,
    createdAt: true,
    updatedAt: true,
  },
})

export type Lane = Prisma.LaneGetPayload<typeof LaneBase>
