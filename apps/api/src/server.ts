import * as trpcExpress from '@orbita/trpc/express'
import { appRouter, createTRPCContext } from '@orbita/trpc/server'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import { errorMiddleware } from './middleware/error'
import { successMiddleware } from './middleware/sucess'
import routes from './routes'
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: 'http://192.168.15.2:3000', // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Permite todos os métodos
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-trpc-source', // Adicione o cabeçalho personalizado aqui
      'sessionId',
    ],
    preflightContinue: false, // Adiciona resposta preflight automática
    optionsSuccessStatus: 204,
    credentials: true,
  }),
)

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  }),
)
app.use(successMiddleware)
app.use(routes)
app.use(errorMiddleware)

app.listen(3001, () => console.log('Server running at port 3001'))
