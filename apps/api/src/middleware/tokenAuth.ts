import prisma from '@orbita/prisma'
import { NextFunction, Request, Response } from 'express'

export const tokenAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer', '')
    const apiTokens = await prisma.tokens.findFirst({ where: { token } })
  } catch (err) {
    throw new Error('Acesso não permitido')
  }
}
