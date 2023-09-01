import Joi from "joi";


export const createSellersWalletValidate = Joi.object({
    no_wallet: Joi.string().max(20).required()
})

export const updateSellersBalanceValidate = Joi.object({
    balance: Joi.string().max(20).optional()
})