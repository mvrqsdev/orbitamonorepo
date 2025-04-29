import type { Session } from '@orbita/auth'
import { prisma } from '@orbita/prisma'
export const createTRPCContext = async (opts: {
  headers: Headers
  session: Session | null
}) => {
  const session = opts.session
  const source = opts.headers.get('x-trpc-source') ?? 'unknown'

  console.log('>>> tRPC Request from', source, 'by', session?.user)

  return {
    session,
    prisma,
  }
}
