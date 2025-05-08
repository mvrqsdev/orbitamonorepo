import { Prisma } from '../generated/client'

export const ContactBase = Prisma.validator<Prisma.ContactDefaultArgs>()({
  select: {
    id: true,
    constructionCompanyId: true,
    name: true,
    email: true,
    phone: true,
    createdAt: true,
    updatedAt: true,
  },
})

export type Contact = Prisma.ContactGetPayload<typeof ContactBase>
