import { Prisma } from '../generated/client'

export const ProjectBase = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  select: {
    id: true,
    constructionId: true,
    title: true,
    url: true,
    createdAt: true,
    updatedAt: true,
  },
})

export type Project = Prisma.ProjectGetPayload<typeof ProjectBase>
