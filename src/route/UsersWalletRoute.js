import express from 'express'
import { checkTokenUsers } from '../midlleware/CheckTokenUsers.js'
import { createWalletControllers, getUsersWalletControllers, updateBalanceControllers } from '../controllers/UsersWalletControllers.js'


export const UsersWalletRoute = express.Router()

UsersWalletRoute.post('/api/users/wallet', checkTokenUsers, createWalletControllers)
UsersWalletRoute.get('/api/users/wallet', checkTokenUsers, getUsersWalletControllers)
UsersWalletRoute.patch('/api/users/wallet', checkTokenUsers, updateBalanceControllers)