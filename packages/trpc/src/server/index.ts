import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import type { AppRouter } from './root'
import { appRouter } from './root'
export { createCallerFactory, createTRPCContext } from './trpc'

type RouterInputs = inferRouterInputs<AppRouter>

type RouterOutputs = inferRouterOutputs<AppRouter>

export { appRouter }
export type { AppRouter, RouterInputs, RouterOutputs }
