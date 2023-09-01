import Joi from "joi"

export const checkOutValidate = Joi.object({
    id_orders: Joi.number().required()
})


export const searchHistoryvalidate = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
})