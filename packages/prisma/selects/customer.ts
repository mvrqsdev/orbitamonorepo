import { Prisma } from '../generated/client'

export const CustomerBase = Prisma.validator<Prisma.CustomerDefaultArgs>()({
  select: {
    id: true,
    email: true,
    image: true,
    name: true,
    phone: true,
    chatwootContactId: true,
    createdAt: true,
    updatedAt: true,
  },
})

export type Customer = Prisma.CustomerGetPayload<typeof CustomerBase>
