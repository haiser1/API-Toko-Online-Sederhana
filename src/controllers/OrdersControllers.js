import { deleteOrdersService, getOrdersUsersCurrent, updateOrdersUsersService, usersOrdersService } from "../service/OrdersService.js"


export const usersOrdersControllers = async (req, res, next) => {
    try {
        const data = await usersOrdersService(req.body, req.userId)

        res.status(201).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const getOrdersUsersControlers = async (req, res, next) => {
    try {
        const data = await getOrdersUsersCurrent(req.userId)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const updateOrdersControllsers = async (req, res, next) => {
    try {
        const data = await updateOrdersUsersService(req.body, req.params.id, req.userId)

        res.status(200).json({data:data})

    } catch (error) {
        next(error)
    }
}

export const deleteOrdersControllers = async (req, res, next) => {
    try {
        await deleteOrdersService(req.params.id, req.userId)

        res.status(200).json({data: 'Ok'})
        
    } catch (error) {
        next(error)
    }
}