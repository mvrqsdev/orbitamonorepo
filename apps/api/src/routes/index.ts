import { Router } from 'express'

import authRoutes from './authRouters'

const routes = Router()

routes.use('/auth', authRoutes)

export default routes
