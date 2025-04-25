import type { Prisma } from './generated/client'
import { PrismaClient } from './generated/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
export { PrismaClient, prisma }
export type { Prisma }
export * from './selects'
