import { Button } from '@orbita/ui/components/button'

import { createServerCaller } from '@/trpc/server'
export default async function Page() {
  const caller = await createServerCaller()

  const { name } = await caller.auth.getSecretMessage({ name: 'joao' })
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Button>Clique Aqui {name}</Button>
    </div>
  )
}
