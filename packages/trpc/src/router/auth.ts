import type { TRPCRouterRecord } from '@trpc/server'
import z from 'zod'

import { publicProcedure } from '../trpc'

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.user
  }),
  getSecretMessage: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return input
    }),
} satisfies TRPCRouterRecord
