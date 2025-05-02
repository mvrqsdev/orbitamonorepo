import 'server-only' // <-- ensure this file cannot be imported from the client

import { appRouter, createCallerFactory, createTRPCContext } from '@orbita/trpc'
import { createHydrationHelpers } from '@trpc/react-query/rsc'
import { headers } from 'next/headers'
import { cache } from 'react'

import { makeQueryClient } from './query-client'
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient)
export const getCaller = cache(async () => {
  const hdrs = await headers()

  const ctx = await createTRPCContext({
    headers: hdrs,
    session: null, // <-- opcional, pois o `createTRPCContext` já chama `auth()` se necessário
  })

  return createCallerFactory(appRouter)(ctx)
})

const caller = await getCaller()
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
)
