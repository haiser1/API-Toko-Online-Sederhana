import { Op } from "sequelize"
import { ResponseError } from "../error/ResponseError.js"
import Item from "../models/ItemModels.js"
import { createItemValidate, seacrhItemValidate, updateItemValidate } from "../validation/ItemValidation.js"
import Sellers from "../models/SellersModels.js"


export const createItemService = async (request, sellerId) => {
    const result = await createItemValidate.validateAsync(request)

    await Item.create({
        name: result.name,
        price: result.price,
        stock: result.stock,
        description: result.description,
        id_sellers: sellerId
    })

    return result
}

export const getItemById = async (request, sellerId) => {
    const item = await Item.findOne({
        attributes: ['uuid' ,'name', 'price', 'stock', 'sold', 'description'],
        where: {
            uuid: request
        }
    })

    if (!item){
        throw new ResponseError(404, 'Item not found')
    }

    return item

}

export const updateItemService = async (uuid, request) => {
    const result = await updateItemValidate.validateAsync(request)

    const item = await Item.findOne({
        attributes: ['uuid' ,'name', 'price', 'stock', 'description'],
        where: {
            uuid: uuid
        }
    })

    if (!item){
        throw new ResponseError(404, 'Item not found')
    }

    const price = result.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    await Item.update({
        name: result.name,
        price: price,
        stock: result.stock,
        description: result.description
    }, {
        where: {
            uuid: uuid
        }
    })

    return result
}

export const searchDataItemService = async (request, sellerId) => {
    const result = await seacrhItemValidate.validateAsync(request)
    const filters = []

    filters.push({
        id_sellers: sellerId
    })

    if (result.name){
        filters.push({name: { [Op.like]: `%${result.name}%` }})
    }

    if (result.price){
        filters.push({price: { [Op.like]: `%${result.price}%` }})
    }

    if (result.stock){
        filters.push({stock: { [Op.like]: `%${result.stock}%` }})
    }

    if (result.sold){
        filters.push({sold: { [Op.like]: `%${result.sold}%` }})
    }

    if (result.description){
        filters.push({description: { [Op.like]: `%${result.description}%` }})
    }

    const { rows, count } = await Item.findAndCountAll({
        attributes: ['uuid', 'name', 'price', 'stock', 'sold', 'description'], 
        where: {
            [Op.and]: filters
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

export const searchDataItemByUsersService = async (request) => {
    const result = await seacrhItemValidate.validateAsync(request)

    const filters = []

    if (result.name){
        filters.push({name: { [Op.like]: `%${result.name}%` }})
    }

    if (result.price){
        filters.push({price: { [Op.like]: `%${result.price}%` }})
    }

    if (result.stock){
        filters.push({stock: { [Op.like]: `%${result.stock}%` }})
    }

    if (result.description){
        filters.push({description: { [Op.like]: `%${result.description}%` }})
    }

    const { rows, count } = await Item.findAndCountAll({
        attributes: ['id', 'uuid', 'name', 'price', 'stock', 'sold', 'description'],
        include: [
            {
                model: Sellers,
                attributes: ['name', 'no_hp', 'address'],
        }
    ],
        where: {
            [Op.and]: filters,
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

export const deleteItemService = async (uuid, sellerId) => {
    const item = await Item.findOne({
        where: {
            uuid: uuid,
            id_sellers: sellerId
        }
    })

    if (!item){
        throw new ResponseError(404, 'Item not found')
    }

    await Item.destroy({
        where: {
            uuid: uuid,
            id_sellers: sellerId
        }
    })

}