import express from 'express'
import { checkTokenUsers } from '../midlleware/CheckTokenUsers.js'
import {
    chnagePasswordControllers,
    getUsersCurrentControllers,
    logoutUsersControlers,
    updateUsersControllers
} from '../controllers/UsersControllers.js'

export const userRoute = express.Router()

userRoute.get('/api/users/current', checkTokenUsers, getUsersCurrentControllers)
userRoute.patch('/api/users/current', checkTokenUsers, updateUsersControllers)
userRoute.post('/api/users/change-password', checkTokenUsers, chnagePasswordControllers)
userRoute.delete('/api/users/logout', logoutUsersControlers)