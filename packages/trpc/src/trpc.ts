import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

import { createTRPCContext } from './createContext'
import { errorFormatter } from './errorFormatter'

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter,
})

export const createCallerFactory = t.createCallerFactory
export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})
