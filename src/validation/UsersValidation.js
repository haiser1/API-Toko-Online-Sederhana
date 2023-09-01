import Joi from 'joi'



export const registerUsersValidate = Joi.object({
    name: Joi.string().max(100).min(3).required(),
    email: Joi.string().max(100).email().required(),
    password: Joi.string().max(255).required(),
    confirm_password: Joi.string().max(255).valid(Joi.ref('password')).required(),
    no_hp: Joi.string().max(20).allow(''),
    address: Joi.string().max(255).required()
})

export const loginUsersValidate = Joi.object({
    email: Joi.string().max(100).email().required(),
    password: Joi.string().max(255).required()
})

export const updateUsersValidate = Joi.object({
    name: Joi.string().max(100).optional(),
    no_hp: Joi.string().max(20).optional(),
    address: Joi.string().max(255).optional()
})

export const changePasswordValidate = Joi.object({
    password: Joi.string().max(255).required(),
    new_password: Joi.string().max(255).required(),
    confirm_password: Joi.string().max(255).valid(Joi.ref('new_password')).required()
})