import { createItemService, deleteItemService, getItemById, searchDataItemByUsersService, searchDataItemService, updateItemService } from "../service/ItemService.js"


export const createItemControllers = async (req, res, next) => {
    try {
        const data = await createItemService(req.body, req.sellerId)

        res.status(201).json({data: data})
    } catch (error) {
        next(error)
    }
}

export const getItembyIdControllers = async (req, res, next) => {
    try {
        const data = await getItemById(req.params.itemId)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const updateItemControllers = async (req, res, next) => {
    try {
        const data = await updateItemService(req.params.itemId, req.body)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const searchDataItemControllers = async (req, res, next) => {
    try {
        const request = {
            name: req.query.name,
            price: req.query.price,
            stock: req.query.stock,
            sold: req.query.sold,
            description: req.query.description,
            page: req.query.page,
            size: req.query.size
        }

        const data = await searchDataItemService(request, req.sellerId)

        res.status(200).json({
            data: data.data,
            pagging: data.pagging
        })
    } catch (error) {
        next(error)
    }
}

export const searchDataItemByUsers = async (req, res, next) => {
    try {
        const request = {
            name: req.query.name,
            price: req.query.price,
            stock: req.query.stock,
            description: req.query.description,
            page: req.query.page,
            size: req.query.size
        }

        const data = await searchDataItemByUsersService(request)

        res.status(200).json({
            data: data.data,
            pagging: data.pagging
        })
    } catch (error) {
        next(error)
    }
}

export const deleteItemControllers = async (req, res, next) => {
    try {
        await deleteItemService(req.params.itemId, req.sellerId)

        res.status(200).json({data: 'Ok'})

    } catch (error) {
        next(error)
    }
}