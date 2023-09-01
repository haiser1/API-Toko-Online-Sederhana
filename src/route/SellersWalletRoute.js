import express from 'express'
import { checkTokenSellers } from '../midlleware/CheckTokenSellers.js'
import {
    createSellersWalletControllers,
    getWalletBalanceControllers,
    updateSellersBalanceControllers
} from '../controllers/SellersWalletControllers.js'


export const sellersWalletRoute = express.Router()

sellersWalletRoute.post('/api/sellers/wallet', checkTokenSellers, createSellersWalletControllers)
sellersWalletRoute.get('/api/sellers/wallet', checkTokenSellers, getWalletBalanceControllers)
sellersWalletRoute.patch('/api/sellers/wallet', checkTokenSellers, updateSellersBalanceControllers)
