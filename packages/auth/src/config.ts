import { skipCSRFCheck } from '@auth/core'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@orbita/prisma'
import type {
  DefaultSession,
  NextAuthConfig,
  Session as NextAuthSession,
} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      accessToken?: string
    } & DefaultSession['user']
  }
}

const adapter = PrismaAdapter(prisma)

export const isSecureContext = process.env.NODE_ENV !== 'development'

export const authConfig = {
  adapter,
  ...(!isSecureContext
    ? {
        skipCSRFCheck,
        trustHost: true,
      }
    : {}),
  secret: process.env.AUTH_SECRET,
  providers: [Credentials],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Aqui você deve definir o accessToken no token JWT
        token.accessToken = account.accessToken // Ajuste conforme o nome da propriedade do token
      }
      return token
    },
    session: (opts) => {
      if (!('user' in opts)) {
        throw new Error('unreachable with session strategy')
      }
      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
        accessToken: opts.token?.accessToken, // Incluindo o accessToken na sessão
      }
    },
  },
} satisfies NextAuthConfig

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice('Bearer '.length)
  const session = await adapter.getSessionAndUser?.(sessionToken)
  return session
    ? {
        user: {
          ...session.user,
        },
        expires: session.session.expires.toISOString(),
      }
    : null
}

export const invalidateSessionToken = async (token: string) => {
  const sessionToken = token.slice('Bearer '.length)
  await adapter.deleteSession?.(sessionToken)
}
