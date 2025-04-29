import { signIn as customerSignIn } from '@orbita/auth'
import type { TRPCRouterRecord } from '@trpc/server'
import { AuthError } from 'next-auth'
import z from 'zod'

import { protectedProcedure, publicProcedure } from '../trpc'

const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const authRouter = {
  customerSignIn: publicProcedure
    .input(SignInSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input

      return false
      try {
        const user = await validateCredentials({
          email,
          password,
          userType: 'customer',
        })
        if (!user) throw new Error('Invalid email or password.')
        await customerSignIn('credentials', {
          email,
          password,
          userType: 'customer',
          redirectTo: '/',
        })
      } catch (err) {
        if (err instanceof AuthError && err.type === 'CredentialsSignin') {
          throw new Error('Invalid email or password.')
        }
        throw err
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @acme/auth package
    return 'you can see this secret message!'
  }),
} satisfies TRPCRouterRecord
