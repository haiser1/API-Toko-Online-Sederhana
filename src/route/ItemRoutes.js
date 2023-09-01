import express from 'express'
import { checkTokenSellers } from '../midlleware/CheckTokenSellers.js'
import {
    createItemControllers,
    deleteItemControllers,
    getItembyIdControllers,
    searchDataItemByUsers,
    searchDataItemControllers,
    updateItemControllers
} from '../controllers/ItemControllers.js'
import { checkTokenUsers } from '../midlleware/CheckTokenUsers.js'


export const itemRoute = express.Router()

itemRoute.post('/api/sellers/item', checkTokenSellers, createItemControllers)
itemRoute.get('/api/sellers/item/:itemId', checkTokenSellers, getItembyIdControllers)
itemRoute.patch('/api/sellers/item/:itemId', checkTokenSellers, updateItemControllers)
itemRoute.get('/api/sellers/items/search', checkTokenSellers, searchDataItemControllers)
itemRoute.get('/api/users/item/search', checkTokenUsers, searchDataItemByUsers)
itemRoute.delete('/api/seller/item/:itemId', checkTokenSellers, deleteItemControllers)