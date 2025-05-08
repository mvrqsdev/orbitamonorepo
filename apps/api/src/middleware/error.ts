/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

import { APIError } from '../helpers/error'
export async function errorMiddleware(
  error: Error & Partial<APIError>,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = error.statusCode ?? 'INTERNAL_SERVER_ERROR'
  const message = error.statusCode
    ? error.message
    : 'Ocorreu um erro interno não identificado.'

  res.status(200).json({
    success: false,
    error: {
      statusCode,
      message,
    },
  })
}
