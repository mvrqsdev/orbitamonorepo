import { invalidateSessionToken } from '@orbita/auth'
import type { TRPCRouterRecord } from '@trpc/server'
import z from 'zod'

import { protectedProcedure, publicProcedure } from '../trpc'

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  getSecretMessage: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      console.log(input)
      return input
    }),
  signOut: protectedProcedure.mutation(async (opts) => {
    if (!opts.ctx.token) {
      return { success: false }
    }
    await invalidateSessionToken(opts.ctx.token)
    return { success: true }
  }),
} satisfies TRPCRouterRecord
