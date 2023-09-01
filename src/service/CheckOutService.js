import { Op } from "sequelize"
import db from "../config/Database.js"
import { ResponseError } from "../error/ResponseError.js"
import CheckOut from "../models/CheckOutModels.js"
import Item from "../models/ItemModels.js"
import Orders from "../models/OrdersModels.js"
import Sellers from "../models/SellersModels.js"
import UsersWallet from "../models/UsersWalletModels.js"
import { checkOutValidate, searchHistoryvalidate } from "../validation/CheckOutValidation.js"
import SellersWallet from "../models/SellersWalletModels.js"


export const checkOutService = async (request, userId) => {
    const result = await checkOutValidate.validateAsync(request)

    const order = await Orders.findOne({
        where: {
            id: result.id_orders,
            id_users: userId
        }
    })

    if (!order){
        throw new ResponseError(404, 'Orders not found')
    }

    if (order.checkOut !== false){
        throw new ResponseError(400, 'This order has already been check out, please order again')
    }

    const userWallet = await UsersWallet.findOne({
        where: {
            id_users: userId
        }
    })

    if (!userWallet){
        throw new ResponseError(400, 'Please register your wallet before check out')
    }

    const balance = Number(userWallet.balance)
    const total_price = Number(order.total_price)

    if (balance < total_price){
        const min = Number(order.total_price) - Number(userWallet.balance)
        throw new ResponseError(400, `Your balance min ${min}` )
    }

    const item = await Item.findOne({
        where: {
            id: order.id_item
        }
    })

    if (!item){
        throw new ResponseError(404, 'Item not found')
    }

    if (order.qty > item.stock){
        throw new ResponseError(400, 'Stock not available')
    }

    const sellersWallet = await SellersWallet.findOne({
        where: {
            id_sellers: item.id_sellers
        }
    })

    if (!sellersWallet){
        throw new ResponseError(404, 'Sellers wallet not found')
    }

    const sellersBalance = Number(sellersWallet.balance)

    const t = await db.transaction()
    try {
        // update status chekout
        await Orders.update({
            checkOut: true
        }, {
            where: {
                id: order.id
            }
        }, {transaction: t})

        // update balance users
        await UsersWallet.update({
            balance: balance - total_price
        }, {
            where: {
                id_users: userId
            }
        }, {transaction: t})

        // update balance sellers
        await SellersWallet.update({
            balance: sellersBalance + total_price
        }, {
            where: {
                id_sellers: sellersWallet.id_sellers
            }
        }, {transaction: t})

        // update stock and sold from item
        await Item.update({
            stock: item.stock - order.qty,
            sold: item.sold + order.qty
        }, {
            where: {
                id: order.id_item
            }
        }, {transaction: t})

        const checkOut = await CheckOut.create({
            id_orders: result.id_orders,
            id_users: userId,
            total_paid: order.total_price
        }, {transaction: t})

        await t.commit()
        const detailCheckOut = await CheckOut.findOne({
            attributes: ['uuid', 'total_paid'],
            include: [{
                model: Orders,
                attributes: ['qty', 'total_price'],
                include: [{
                    model: Item,
                    attributes: ['name', 'price'],
                    include: [{
                        model: Sellers,
                        attributes: ['name', 'email', 'no_hp', 'address']
                    }]
                }]
            }],
            where: {
                id: checkOut.id,
                id_users: checkOut.id_users
            }
        })

        return detailCheckOut

    } catch (error) {
        await t.rollback()
        console.log(`Error: ${error}`)
        throw new ResponseError(500, 'Internal server error')
    }
    
}


export const searchHIstoryService = async (request, userId) => {
    const result = await searchHistoryvalidate.validateAsync(request)

    const filters = [{
        model: Item,
        attributes: ['name', 'price'],
        include: [{
            model: Sellers,
            attributes: ['name', 'email', 'no_hp', 'address']
        }]
    }]

    if (result.name){
        filters[0] = {
        model: Item,
        attributes: ['name', 'price'],
        where: {
            name: {[Op.like]: `%${result.name}%`}
        },
        include: [{
            model: Sellers,
            attributes: ['name', 'email', 'no_hp', 'address']
        }]
    }}
    const {rows, count} = await Orders.findAndCountAll({
        attributes: ['uuid', 'total_price', 'qty'],
        include: filters,
        where: {
            id_users: userId,
            checkOut: true
        },
        limit: result.size,
        offset: (result.page - 1) * result.size
    })

    const totalPages = Math.ceil(count / result.size)

    return {
        data: rows,
        pagging: {
            page: result.page,
            total_page: totalPages,
            total_item: count,
            
        }
    }
}