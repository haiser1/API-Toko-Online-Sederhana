import express from 'express'
import { checkTokenUsers } from '../midlleware/CheckTokenUsers.js'
import {
    deleteOrdersControllers,
    getOrdersUsersControlers,
    updateOrdersControllsers,
    usersOrdersControllers,
} from '../controllers/OrdersControllers.js'


export const ordersRoute = express.Router()

ordersRoute.post('/api/users/orders', checkTokenUsers, usersOrdersControllers)
ordersRoute.get('/api/users/current/orders', checkTokenUsers, getOrdersUsersControlers)
ordersRoute.patch('/api/users/orders/:id', checkTokenUsers, updateOrdersControllsers)
ordersRoute.delete('/api/users/orders/:id', checkTokenUsers, deleteOrdersControllers)