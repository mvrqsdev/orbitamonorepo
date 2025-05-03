import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface TokenPayload {
  id: string
  status: 'Invited' | 'Active' | 'Inactive'
  master: boolean
  permissions: string[]
  iat: number
  exp: number
}

export const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error('ERR_SESSION_EXPIRED')
  }

  const [, token] = authHeader.split(' ')
  try {
    const decoded = verify(token as string, 'secret')
    const { id, master, status, permissions } = decoded as TokenPayload
    req.user = {
      id,
      master,
      status,
      permissions,
    }
  } catch (err) {
    throw new Error('Deu erro')
  }

  return next()
}
