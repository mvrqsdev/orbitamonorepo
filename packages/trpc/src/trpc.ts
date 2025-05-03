import { FindSessionBySessionId } from '@orbita/auth'
import { AppUserBase, prisma, PrismaClient } from '@orbita/prisma'
// Importar o TRPCError ao criar o protectedProcedure
import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import superjson from 'superjson'
import { ZodError } from 'zod'

export interface createTRPCContextResponse {
  user: AppUserBase | null
  prisma: PrismaClient
}
export async function createTRPCContext({
  req,
}: trpcExpress.CreateExpressContextOptions): Promise<createTRPCContextResponse> {
  const sessionId = req.cookies?.sessionId

  console.log('sessionId', sessionId)

  if (!sessionId) {
    return {
      prisma,
      user: null,
    }
  }

  const session = await FindSessionBySessionId({ sessionId })

  if (!session) {
    return {
      prisma,
      user: null,
    }
  }

  return {
    prisma,
    user: {
      ...session.User,
    },
  }
}

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ error, shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const publicProcedure = t.procedure
