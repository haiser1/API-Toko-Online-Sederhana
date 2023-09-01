import { checkOutService, searchHIstoryService } from "../service/CheckOutService.js"


export const checkOutControllers = async (req, res, next) => {
    try {
        const data = await checkOutService(req.body, req.userId)

        res.status(201).json({data: data})       

    } catch (error) {
        next(error)
    }
}

export const historyCheckOutControllers = async (req, res, next) => {
    try {
        const data = await searchHIstoryService(req.query, req.userId)

        res.status(200).json({
            data: data.data,
            pagging: data.pagging
        })
    } catch (error) {
        next(error)
    }
}