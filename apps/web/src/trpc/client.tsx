'use client'
import { useSession } from '@orbita/auth/client'
import type { AppRouter } from '@orbita/trpc'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useState } from 'react'
import superjson from 'superjson'

import { makeQueryClient } from './query-client'
export const trpc = createTRPCReact<AppRouter>()
let clientQueryClientSingleton: QueryClient
function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  }
  return (clientQueryClientSingleton ??= makeQueryClient())
}
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return ''
    console.log({ appURL: process.env.APP_URL })
    if (process.env.APP_URL) return `https://${process.env.APP_URL}`
    return 'http://localhost:3000'
  })()
  return `${base}/api/trpc`
}
export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode
  }>,
) {
  const { data: session } = useSession()
  const token = session?.user.accessToken
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
          async headers() {
            const headers = new Headers()
            headers.set('x-trpc-source', 'nextjs-react')
            if (token) {
              headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
          },
        }),
      ],
    })
  })
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
