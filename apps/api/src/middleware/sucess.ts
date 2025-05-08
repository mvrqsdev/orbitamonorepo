/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

export function successMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const originalJson = res.json

  res.json = function (data: any) {
    // Se já está no formato padronizado, apenas retorna
    if (data?.success !== undefined) {
      return originalJson.call(this, data)
    }

    const wrapped = {
      success: true,
      data,
    }

    return originalJson.call(this, wrapped)
  }

  next()
}
