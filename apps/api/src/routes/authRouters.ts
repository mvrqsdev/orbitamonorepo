import { Router } from 'express'

import * as AuthController from '../controllers/AuthController'
const authRoutes = Router()

authRoutes.post('/signin', AuthController.signIn)
authRoutes.get('/session', AuthController.session)
authRoutes.post('/signout', AuthController.signout)

export default authRoutes
