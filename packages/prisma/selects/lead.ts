import { Prisma } from '../generated/client'

export const Lead = Prisma.validator<Prisma.LeadSelect>()({
  id: true
})