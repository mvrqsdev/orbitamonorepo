'use client'

import { Button } from '@orbita/ui/components/button'
import { useState } from 'react'

import { trpc } from '@/trpc/client'
export default function Page() {
  const [status, setStatus] = useState<number>(1)
  const mutation = trpc.auth.getSecretMessage.useMutation()

  const handleTeste = async () => {
    setStatus((prev) => prev + 1)
    const name = `status: ${status}`
    mutation.mutate({ name })
  }
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Button onClick={handleTeste}>Clique Aqui {status}</Button>
    </div>
  )
}
