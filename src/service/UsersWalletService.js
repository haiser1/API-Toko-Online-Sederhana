import { Op } from "sequelize"
import { ResponseError } from "../error/ResponseError.js"
import UsersWallet from "../models/UsersWalletModels.js"
import { createUsersWalletValidate, updateUsersBalanceValidate } from "../validation/UsersWalletValidation.js"


export const createWalletService = async (request, userId) => {
    const result = await createUsersWalletValidate.validateAsync(request)

    const wallet = await UsersWallet.findOne({
        where: {
            [Op.or]: [
                {no_wallet: result.no_wallet},
                {id_users: userId}
            ]
        }
    })
    if (wallet){
        throw new ResponseError(400, 'No wallet alerady registered')
    }

    await UsersWallet.create({
        no_wallet: result.no_wallet,
        id_users: userId
    })
    return result.no_wallet
}

export const getUsersWalletService = async (userId) => {
    const wallet = await UsersWallet.findOne({
        attributes: ['no_wallet', 'balance'],
        where: {
            id_users: userId
        }
    })

    if (!wallet){
        throw new ResponseError(404, 'Your wallet has not been registered')
    }

    return wallet

}

export const updateBalanceService = async (request, userId) => {
    const result = await updateUsersBalanceValidate.validateAsync(request)
    const wallet = await UsersWallet.findOne({
        id_users: userId
    })

    if (!wallet){
        throw new ResponseError(404, 'Your wallet has not been registered')
    }

    await UsersWallet.update({
        balance: result.balance
    }, {
        where: {
            id_users: userId
        }
    })

    return result

}