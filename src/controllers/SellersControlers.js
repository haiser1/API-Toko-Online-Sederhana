import { changePasswordService, getSellersCurrentService, loginSellersService, logoutSellersService, registerSellersService, updateSellersService } from "../service/SellersService.js"



export const registerSellersControllers = async (req, res, next) => {
    try {
        const data = await registerSellersService(req.body)

        res.status(201).json({data: data})
    } catch (error) {
        next(error)
    }
}

export const loginSellersControllers = async (req, res, next) => {
    try {
        const data = await loginSellersService(req.body)

        res.cookie('refreshToken', data.refreshToken, {
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 1000
        })
        res.status(200).json({token: data.accessToken})
    } catch (error) {
        next(error)
    }
}

export const getSellersCurrentControllers = async (req, res, next) => {
    try {
        const data = await getSellersCurrentService(req.sellerId)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const updateSellersControllers = async (req, res, next) => {
    try {
        const data = await updateSellersService(req.body, req.sellerId)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const changePasswordControllers = async (req, res, next) => {
    try {
        await changePasswordService(req.body, req.sellerId)

        res.status(200).json({data: 'Ok'})

    } catch (error) {
        next(error)
    }
}

export const logoutSellersControllers = async (req, res, next) => {
    try {
        await logoutSellersService(req.cookies.refreshToken)

        res.clearCookie('refreshToken')
        res.status(200).json({data: 'Ok'})
    } catch (error) {
        next(error)
    }
}