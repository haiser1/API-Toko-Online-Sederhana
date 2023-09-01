import { ResponseError } from "../error/ResponseError.js"
import Item from "../models/ItemModels.js"
import Orders from "../models/OrdersModels.js"
import Sellers from "../models/SellersModels.js"
import { updateOrdersUsersValidate, usersOrderValidate } from "../validation/OrdersValidation.js"


export const usersOrdersService = async (request, userId) => {
    const result = await usersOrderValidate.validateAsync(request)

    const item = await Item.findOne({
        where: {
            id: result.item
        },
    })

    if (!item){
        throw new ResponseError(404, 'Item not Found')
    }

    if (result.qty > item.stock){
        throw new ResponseError(400, 'Stock not available')
    }

    const total_price = result.qty * Number(item.price)
    const createOrders = await Orders.create({
        id_item: result.item,
        id_users: userId,
        qty: result.qty,
        total_price: total_price
    })

    const usersOrder = await Orders.findOne({
        attributes: ['qty', 'total_price'],
        include: [{
            model: Item,
            attributes: ['name', 'price']
        }],
        where: {
            id: createOrders.id,
            id_users: createOrders.id_users,
            checkOut: false
        }
    })
    return usersOrder
}

export const getOrdersUsersCurrent = async (userId) => {
    const order = await Orders.findAll({
        attributes: ['id', 'uuid', 'qty', 'total_price'],
        include: [{
            model: Item,
            attributes: ['name', 'price', 'stock', 'description'],
            include: [{
                model: Sellers,
                attributes: ['name', 'email', 'address',]
            }]
        }],
        where: {
            id_users: userId,
            checkOut: false
        }
    })

    return order
}

export const updateOrdersUsersService = async (request, params, userId) => {
    const result = await updateOrdersUsersValidate.validateAsync(request)

    const order = await Orders.findOne({
        where: {
            uuid: params,
            id_users: userId
        }
    })

    if (!order){
        throw new ResponseError(404, 'Orders not found')
    }

    const item = await Item.findOne({
        where: {
            id: order.id_item
        }
    })

    if (result.qty > item.stock){
        throw new ResponseError(404, 'Stock not available')
    }
    const total_price = Number(item.price) * result.qty
    await Orders.update({
        qty: result.qty,
        total_price: total_price
    }, { 
        where: { 
            id: order.id 
        }
    })

    const usersOrder = await Orders.findOne({
        attributes: ['qty', 'total_price'],
        include: [{
            model: Item,
            attributes: ['name', 'price']
        }],
        where: {
            id: order.id,
            id_users: userId,
            checkOut: false
        }
    })
    return usersOrder    
}

export const deleteOrdersService = async (params, userId) => {
    const order = await Orders.findOne({
        where: {
            uuid: params,
            id_users: userId
        }
    })

    if (!order){
        throw new ResponseError(404, 'Orders not found')
    }

    await Orders.destroy({
        where: {
            uuid: params,
            id_users: userId
        }
    })
}
