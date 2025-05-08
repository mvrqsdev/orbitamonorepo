'use client'
import { IApiErrorResponse } from '@orbita/features/api/types'
import { ISessionResponse } from '@orbita/trpc/procedures/auth/types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useTRPCClient } from '@/trpc/client'

export interface ISessionProvider {
  children: ReactNode
}

export function SessionProvider({ children }: ISessionProvider) {
  const trpc = useTRPCClient()
  const router = useRouter()
  const sessionId = cookies.get('sessionId')
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      toast.error(`Você precisa estar autenticado. Redirecionando...`)
      router.push('/login')
    }
  }, [sessionId, router])

  const { data: sessionData } = useQuery({
    queryKey: ['FIND_SESSION_PROVIDER', sessionId],
    queryFn: async () => {
      return await trpc.auth.session.query({ sessionId: sessionId! })
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    staleTime: 0,
    enabled: !!sessionId,
  })

  useEffect(() => {
    console.log('rodou')
    const fetch = async () => {
      if (sessionData && sessionData.success) {
        const {
          data: { user, permissions, session },
        } = sessionData as ISessionResponse

        if (session.revoke) {
          cookies.remove('sessionId')
          toast.error(
            `Sua sessão foi revogada, redirecionando você para o Login.`,
            {
              description: 'Redirecionando...',
              duration: 1500,
              position: 'bottom-center',
            },
          )
          await new Promise((resolve) => setTimeout(resolve, 1500))
          router.push('/login')
          return
        }

        setUser(user.name)
        console.log(user, session, permissions)
      }

      if (sessionData && !sessionData.success) {
        const {
          error: { message },
        } = sessionData as IApiErrorResponse

        toast.error(`Não foi possível validar sua sessão.`, {
          description: message,
          duration: 1500,
          position: 'bottom-center',
        })
        await new Promise((resolve) => setTimeout(resolve, 1500))
        router.push('/login')
      }
    }
    fetch()
  }, [sessionData, router])

  if (!sessionId || !sessionData) {
    return <>{children}</>
  }

  return <>{children}</>
}
