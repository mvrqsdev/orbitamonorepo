import 'server-only'

import { createTRPCContext } from '@orbita/trpc/next' // atualizado
import { appRouter, createCallerFactory } from '@orbita/trpc/server'
import { createHydrationHelpers } from '@trpc/react-query/rsc'
import { cache } from 'react'

import { makeQueryClient } from './query-client'

export const getQueryClient = cache(makeQueryClient)

export async function createServerCaller() {
  const ctx = await createTRPCContext()
  return createCallerFactory(appRouter)(ctx)
}

const caller = await createServerCaller()

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
)
