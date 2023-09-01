import express from 'express'
import { checkTokenSellers } from '../midlleware/CheckTokenSellers.js'
import {
    changePasswordControllers,
    getSellersCurrentControllers,
    logoutSellersControllers,
    updateSellersControllers
} from '../controllers/SellersControlers.js'


export const sellersRoute = express.Router()

sellersRoute.get('/api/sellers/current', checkTokenSellers, getSellersCurrentControllers)
sellersRoute.patch('/api/sellers/current', checkTokenSellers, updateSellersControllers)
sellersRoute.post('/api/sellers/change-password', checkTokenSellers, changePasswordControllers)
sellersRoute.delete('/api/sellers/logout', logoutSellersControllers)