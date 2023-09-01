import express from 'express'
import { refreshTokenSellersControllers, refreshTokenUsersControllers } from '../controllers/RefreshTokenControlers.js'

export const refreshTokenRoute = express.Router()

refreshTokenRoute.get('/api/users/refresh-token', refreshTokenUsersControllers)
refreshTokenRoute.get('/api/sellers/refresh-token', refreshTokenSellersControllers)