import { Prisma } from '../generated/client'
import { ConstructionCompanyBase } from './constructionCompany'

export const ContactBase = Prisma.validator<Prisma.ContactSelect>()({
  id: true,
  constructionCompanyId: true,
  name: true,
  email: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
})

export const ContactSelect = Prisma.validator<Prisma.ContactSelect>()({
  ...ContactBase,
  ConstructionCompany: {
    select: ConstructionCompanyBase,
  },
})
