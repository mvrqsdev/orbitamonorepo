import { Prisma } from '../generated/client'

export const ConstructionCompanyBase =
  Prisma.validator<Prisma.ConstructionCompanyDefaultArgs>()({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  })

export type ConstructionCompany = Prisma.ConstructionCompanyGetPayload<
  typeof ConstructionCompanyBase
>
