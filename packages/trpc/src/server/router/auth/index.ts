import { type TRPCRouterRecord } from '@trpc/server'

import { protectedProcedure, publicProcedure } from '../../trpc'
import type {
  TSessionResponse,
  TSignInResponse,
  TSignOutResponse,
} from './types'
import { SessionIdSchema, SignInSchema } from './types'

export const authRouter = {
  signIn: publicProcedure
    .input(SignInSchema)
    .mutation(
      async ({ input: { email, password } }): Promise<TSignInResponse> => {
        const request = await fetch(`${process.env.BACKEND_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        const response: TSignInResponse = await request.json()
        return response
      },
    ),
  session: publicProcedure
    .input(SessionIdSchema)
    .query(async ({ input: { sessionId } }): Promise<TSessionResponse> => {
      const request = await fetch(`${process.env.BACKEND_URL}/auth/session`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `sessionId=${sessionId}`,
        },
      })

      const response: TSessionResponse = await request.json()
      return response
    }),
  logout: protectedProcedure
    .input(SessionIdSchema)
    .mutation(async ({ input: { sessionId } }): Promise<TSignOutResponse> => {
      const request = await fetch(`${process.env.BACKEND_URL}/auth/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `sessionId=${sessionId}`,
        },
      })
      console.log('aqui executou ate 2')

      const response: TSignOutResponse = await request.json()
      console.log('aqui executou ate 3')
      return response
    }),
} satisfies TRPCRouterRecord
