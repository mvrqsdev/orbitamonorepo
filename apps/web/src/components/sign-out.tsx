'use client'

import type { IApiErrorResponse } from '@orbita/features/api/types'
import type { ISignOutResponse } from '@orbita/trpc/procedures/auth/types'
import { Slot } from '@radix-ui/react-slot'
import { useMutation } from '@tanstack/react-query'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { toast } from 'sonner'

import { useTRPC } from '@/trpc/client'
interface SignOutProps {
  children: ReactNode
  asChild?: boolean
}

export function SignOut({ children, asChild = false }: SignOutProps) {
  const router = useRouter()
  const Comp = asChild ? Slot : 'button'

  const trpc = useTRPC()
  const { data: response, mutate: logout } = useMutation(
    trpc.auth.logout.mutationOptions(),
  )

  async function handleSignOut() {
    const sessionId = cookies.get('sessionId')
    if (sessionId) {
      await logout({ sessionId })
    }
  }

  useEffect(() => {
    const fetch = async () => {
      if (response && response.success) {
        const {
          data: {
            session: { revoke },
          },
        } = response as ISignOutResponse

        if (revoke) {
          cookies.remove('sessionId')
          toast.loading(`🚪 Saindo do sistema ? Até a próxima :D`, {
            id: 'sign-out-toast',
            description: `Você será deslogado em breve...`,
            position: 'bottom-center',
          })
          await new Promise((resolve) => setTimeout(resolve, 1500))
          toast.dismiss('sign-out-toast')
          router.push('/login')
        }
      }

      if (response && !response?.success) {
        const {
          error: { statusCode, message },
        } = response as IApiErrorResponse
        toast.error(`❌ ${statusCode}`, {
          description: message,
          duration: 1500,
          position: 'bottom-center',
        })
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
    }

    fetch()
  }, [response, router])

  return <Comp onClick={handleSignOut}>{children}</Comp>
}
