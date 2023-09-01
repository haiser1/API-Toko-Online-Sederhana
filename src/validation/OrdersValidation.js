import Joi from "joi"


export const usersOrderValidate = Joi.object({
    item: Joi.number().required(),
    qty: Joi.number().required(),
})


export const updateOrdersUsersValidate = Joi.object({
    qty: Joi.number().optional(),
})