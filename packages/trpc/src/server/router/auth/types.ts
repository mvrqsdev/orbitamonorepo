import type {
  IApiErrorResponse,
  IApiSuccessResponse,
} from '@orbita/features/api/types'
import type { Session, User } from '@orbita/prisma'
import { z } from 'zod'

export interface ISessionPayload {
  session: Session
  user: User
  permissions: string[]
}
export interface ISessionResponse extends IApiSuccessResponse {
  data: ISessionPayload
}

export type TSessionResponse = ISessionResponse | IApiErrorResponse

export interface ISignInResponse extends IApiSuccessResponse {
  data: {
    session: Session
  }
}

export interface ISignOutResponse extends IApiSuccessResponse {
  data: {
    session: Session
  }
}

export type TSignOutResponse = ISignOutResponse | IApiErrorResponse
export type TSignInResponse = ISignInResponse | IApiErrorResponse

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type TSignInSchema = z.infer<typeof SignInSchema>

export const SessionIdSchema = z.object({
  sessionId: z.string().cuid(),
})

export type TSessionIdSchema = z.infer<typeof SessionIdSchema>
