import { createWalletService, getUsersWalletService, updateBalanceService } from "../service/UsersWalletService.js"


export const createWalletControllers = async (req, res, next) => {
    try {
        const data =  await createWalletService(req.body, req.userId)

        res.status(201).json({data: data})
    } catch (error) {
        next(error)
    }
}

export const getUsersWalletControllers = async (req, res, next) => {
    try {
        const data = await getUsersWalletService(req.userId)

        res.status(200).json({data: data})
    } catch (error) {
        next(error)
    }
}

export const updateBalanceControllers = async (req, res, next) => {
    try {
        const data = await updateBalanceService(req.body, req.userId)

        res.status(200).json({data: data})
    } catch (error) {
        next(error)
    }
}