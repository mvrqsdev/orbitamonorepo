'use client'
import { AppRouter } from '@orbita/trpc/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import cookies from 'js-cookie'
import { ReactNode, useState } from 'react'
import superjson from 'superjson'

import { makeQueryClient } from './query-client'

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>()

function getUrl() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://192.168.15.2:3001'
  return `${base}/trpc`
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

interface ITRPCProvider {
  children: ReactNode
}

export function TRPCCLient({ children }: ITRPCProvider) {
  const [queryClient] = useState(getQueryClient())
  const [trpcClient] = useState(() => {
    return createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
          async headers() {
            const headers = new Headers()
            headers.set('x-trpc-source', 'nextjs-react')

            const sessionId = cookies.get('sessionId')

            if (sessionId) {
              headers.set('sessionId', sessionId)
            }

            return headers
          },
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            })
          },
        }),
      ],
    })
  })
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
