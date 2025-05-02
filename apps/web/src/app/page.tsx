import { prisma } from '@orbita/prisma'
import { Button } from '@orbita/ui/components/button'

export default async function Home() {
  const teste = await prisma.user.findFirst()
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Button>{teste ? teste.name : ''}</Button>
    </div>
  )
}
