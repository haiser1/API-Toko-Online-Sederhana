import { createSellersWallet, getSellersWalletBalance, updateSellersBalance } from "../service/SellersWalletService.js"


export const createSellersWalletControllers = async (req, res, next) => {
    try {
        const data = await createSellersWallet(req.body, req.sellerId)

        res.status(201).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const getWalletBalanceControllers = async (req, res, next) => {
    try {
        const data = await getSellersWalletBalance(req.sellerId)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const updateSellersBalanceControllers = async (req, res, next) => {
    try {
        const data = await updateSellersBalance(req.body, req.sellerId)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}