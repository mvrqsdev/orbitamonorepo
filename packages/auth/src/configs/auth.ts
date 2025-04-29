import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@orbita/prisma'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null
        const parsedCredentials = SignInWithUserTypeSchema.parse(credentials)
        return validateCredentials(parsedCredentials)
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile }) {

    // },
    async jwt({ token }) {
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
} satisfies NextAuthConfig
