import { Op } from "sequelize"
import { createSellersWalletValidate, updateSellersBalanceValidate } from "../validation/SellersWalletValidation.js"
import { ResponseError } from "../error/ResponseError.js"
import SellersWallet from "../models/SellersWalletModels.js"


export const createSellersWallet = async (request, sellerId) => {
    const result = await createSellersWalletValidate.validateAsync(request)

    const seller = await SellersWallet.findOne({
        where: {
            [Op.or]: [
                {no_wallet: result.no_wallet},
                {id_sellers: sellerId}
            ]
        }
    })

    if (seller){
        throw new ResponseError(400, 'No wallet alerady registered')
    }

    await SellersWallet.create({
        no_wallet: result.no_wallet,
        id_sellers: sellerId
    })

    return result
}

export const getSellersWalletBalance = async (sellerId) => {
    const wallet = await SellersWallet.findOne({
        attributes: ['no_wallet', 'balance'],
        where: {
            id_sellers: sellerId
        }
    })

    if (!wallet){
        throw new ResponseError(404, 'Your not have wallet')
    }

    return wallet
}

export const updateSellersBalance = async (request, sellerId) => {
    const result = await updateSellersBalanceValidate.validateAsync(request)

    const wallet = await SellersWallet.findOne({
        where: {
            id_sellers: sellerId
        }
    })

    if (!wallet){
        throw new ResponseError(404, 'Your not have wallet')
    }

    await SellersWallet.update({
        balance: result.balance
    }, {
        where: {
            id_sellers: sellerId
        }
    })

    return result

}