'use client'

import type { AppRouter } from '@orbita/trpc'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import cookies from 'js-cookie'
import { useState } from 'react'
import superjson from 'superjson'

import { makeQueryClient } from './query-client'

export const trpc = createTRPCReact<AppRouter>()

let clientQueryClientSingleton: QueryClient

// Função para retornar o QueryClient (utilizando singleton)
function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  }
  return (clientQueryClientSingleton ??= makeQueryClient())
}

// Função para configurar a URL dependendo do ambiente (SSR ou Client)
function getUrl() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://192.168.15.2:3001'
  return `${base}/trpc`
}

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode
  }>,
) {
  const queryClient = getQueryClient()

  // Inicializando o cliente TRPC
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
          async headers() {
            const headers = new Headers()
            headers.set('x-trpc-source', 'nextjs-react')

            // const sessionId = cookies.get('sessionId')
            cookies.set('sessionId', 'valorDoSessionId', {
              path: '/',
              secure: false,
              sameSite: 'Lax',
            })

            headers.set('sessionId', 'valorDoSessionId')

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
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
