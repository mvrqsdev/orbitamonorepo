import dayjs from '@orbita/dayjs'
import { getDeviceInfo } from '@orbita/features/lib'
import { FindPermissionsByUserId } from '@orbita/features/permissions'
import {
  CreateSession,
  FindSessionById,
  UpdateSession,
} from '@orbita/features/session'
import { FindUserById } from '@orbita/features/users'
import { prisma } from '@orbita/prisma'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

import { APIError } from '../helpers/error'

const SESSION_COOKIE_NAME = 'sessionId'
const RENEW_THRESHOLD_HOURS = 24 // Limite para renovação do cookie (24 horas antes de expirar)

interface SignInData {
  email?: string
  password?: string
}

export async function signIn(request: Request, response: Response) {
  const { email, password } = request.body as SignInData
  const device = getDeviceInfo(request.headers['user-agent']!)
  if (!email || !password) {
    throw new APIError({
      message:
        'E-mail ou senha inválidos, verifique o email e senha e tente novamente.',
      statusCode: 'UNAUTHORIZED',
    })
  }
  const findUserByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (
    !findUserByEmail ||
    !findUserByEmail.password ||
    findUserByEmail.status !== 'Active'
  ) {
    throw new APIError({
      message:
        'E-mail ou senha inválidos, verifique o email e senha e tente novamente.',
      statusCode: 'UNAUTHORIZED',
    })
  }

  const isSamePassword = await bcrypt.compare(
    password,
    findUserByEmail.password,
  )

  if (!isSamePassword) {
    throw new APIError({
      message:
        'E-mail ou senha inválidos, verifique o email e senha e tente novamente.',
      statusCode: 'UNAUTHORIZED',
    })
  }

  const { session } = await CreateSession({
    session: {
      device,
      userId: findUserByEmail.id,
    },
  })

  response.status(200).json({
    session,
  })
}

export async function session(request: Request, response: Response) {
  const sessionId: string = request.cookies?.[SESSION_COOKIE_NAME]

  if (!sessionId) {
    throw new APIError({
      message: 'SessionId inválido, tente novamente.',
      statusCode: 'UNAUTHORIZED',
    })
  }

  let { session } = await FindSessionById(sessionId)

  // Precisa validar se a sessão esta expirada, pensei em utilizar o dayjs
  const expires = session.expires
  const isSessionExpired = dayjs().isAfter(dayjs(expires))

  if (isSessionExpired) {
    await UpdateSession({ id: sessionId, revoke: true })
    throw new APIError({
      message: 'Sessão expirada, faça login novamente.',
      statusCode: 'UNAUTHORIZED',
    })
  }

  const hoursToExpire = dayjs(expires).diff(dayjs(), 'hour')

  if (hoursToExpire <= RENEW_THRESHOLD_HOURS) {
    const newExpires = dayjs().add(7, 'days').toDate()
    const { session: newSession } = await UpdateSession({
      id: sessionId,
      expires: newExpires,
    })
    session = newSession
  }

  const { user } = await FindUserById(session.userId)
  if (!user) {
    throw new APIError({
      message: 'Sessão expirada, faça login novamente.',
      statusCode: 'UNAUTHORIZED',
    })
  }

  const { permissions } = await FindPermissionsByUserId(user.id)

  response.status(200).json({
    session,
    user,
    permissions: Array.from(
      new Set(permissions.map((permission) => permission.slug)),
    ),
  })
}

export async function signout(request: Request, response: Response) {
  console.log('aqui 1')
  const sessionId: string = request.cookies?.[SESSION_COOKIE_NAME]

  if (!sessionId) {
    throw new APIError({
      message: 'Nenhuma sessão encontrada.',
      statusCode: 'UNAUTHORIZED',
    })
  }
  console.log('2')

  const { session } = await UpdateSession({ id: sessionId, revoke: true })
  console.log('3')

  response.status(200).json({ session })
}
