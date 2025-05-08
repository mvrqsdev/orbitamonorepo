/* eslint-disable @typescript-eslint/no-explicit-any */
import { decodeJwt, jwtVerify, SignJWT } from 'jose'

import { FindPermissionsByUserId } from '../permissions'
import { FindSessionById } from '../session'
import { FindUserById } from '../users'

export interface JWTPayload {
  sessionId: string
  permissions: string[]
  master: boolean
  [key: string]: any
}

const secret = new TextEncoder().encode(
  'KJjFsSX1fCfPEr9xOSCB62g1Cm36yN6++kinZ4IRc0A=',
)

export async function CreateJWT({
  sessionId,
  userId,
}: {
  sessionId: string
  userId: string
}): Promise<{ token: string }> {
  await FindSessionById(sessionId)
  const { user } = await FindUserById(userId)
  const { permissions } = await FindPermissionsByUserId(userId)

  const payload: JWTPayload = {
    sessionId,
    master: user.master,
    permissions: permissions.map((p) => p.slug),
  }

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1m') // 15 minutos
    .sign(secret)

  return { token }
}

export async function DecodeJWT(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify<JWTPayload>(token, secret)

  return {
    sessionId: payload.sessionId,
    master: payload.master,
    permissions: payload.permissions,
  }
}

export async function GetSessionIdByJWT(
  token: string,
): Promise<{ sessionId: string }> {
  const { sessionId } = await decodeJwt<JWTPayload>(token)
  return {
    sessionId,
  }
}
