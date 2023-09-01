import express from 'express'
import { loginUsersControllers, registerUsersControllers } from '../controllers/UsersControllers.js'
import { loginSellersControllers, registerSellersControllers } from '../controllers/SellersControlers.js'

export const publicRoute = express.Router()

publicRoute.post('/api/users/register', registerUsersControllers)
publicRoute.post('/api/users/login', loginUsersControllers)
publicRoute.post('/api/sellers/register', registerSellersControllers)
publicRoute.post('/api/sellers/login', loginSellersControllers)