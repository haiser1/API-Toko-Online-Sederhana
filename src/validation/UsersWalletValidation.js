import Joi from "joi";


export const createUsersWalletValidate = Joi.object({
    no_wallet: Joi.string().max(20).required()
})

export const updateUsersBalanceValidate = Joi.object({
    balance: Joi.string().max(20).optional()
})