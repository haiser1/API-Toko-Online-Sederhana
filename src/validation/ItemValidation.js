import Joi from "joi";


export const createItemValidate = Joi.object({
    name: Joi.string().max(100).required(),
    price: Joi.string().pattern(/^\d+$/).max(20).required(),
    stock: Joi.number().required(),
    description: Joi.string().max(1000).required()
})

export const updateItemValidate = Joi.object({
    name: Joi.string().max(100).optional(),
    price: Joi.string().pattern(/^\d+$/).max(20).optional(),
    stock: Joi.number().optional(),
    description: Joi.string().max(1000).optional().allow('')
})

export const seacrhItemValidate = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
    price: Joi.string().optional(),
    stock: Joi.number().optional(),
    sold: Joi.number().optional(),
    description: Joi.string().optional()
})