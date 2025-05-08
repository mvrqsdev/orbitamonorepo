'use client'
import type { IApiErrorResponse } from '@orbita/features/api/types'
import type { ISignInResponse } from '@orbita/trpc/procedures/auth/types'
import { Button } from '@orbita/ui/components/button'
import { useMutation } from '@tanstack/react-query'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useTRPC } from '@/trpc/client'

export default function Page() {
  const trpc = useTRPC()
  const router = useRouter()

  const { data: response, mutate } = useMutation(
    trpc.auth.signIn.mutationOptions(),
  )

  async function handleSignIn() {
    await mutate({ email: 'mvrqs.dev@gmail.com', password: 'Meoc@160702' })
  }

  useEffect(() => {
    const fetch = async () => {
      if (response && response.success) {
        const {
          data: { session },
        } = response as ISignInResponse
        const expires = new Date(session.expires)

        toast.success(`🎉 Login Realizado com Sucesso.`, {
          description: `Bem-vindo ao nosso sistema.`,
          duration: 1500,
          position: 'bottom-center',
        })

        cookies.set('sessionId', session.id, {
          path: '/',
          expires,
          sameSite: 'Lax',
        })

        // Espera 1500ms antes de redirecionar
        await new Promise((resolve) => setTimeout(resolve, 1500))
        router.push('/dashboard')
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
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Button onClick={handleSignIn}>Clique para fazer Login</Button>
    </div>
  )
}
