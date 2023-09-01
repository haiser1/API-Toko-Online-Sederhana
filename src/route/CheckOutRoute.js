import express from 'express'
import { checkTokenUsers } from '../midlleware/CheckTokenUsers.js'
import { checkOutControllers, historyCheckOutControllers } from '../controllers/CheckOutControllers.js'


export const checkOutRoute = express.Router()

checkOutRoute.post('/api/users/orders/check-out', checkTokenUsers, checkOutControllers)
checkOutRoute.get('/api/users/orders/check-out', checkTokenUsers, historyCheckOutControllers)