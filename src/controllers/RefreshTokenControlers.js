import { refreshTokenSellers, refreshTokenUsers } from "../service/RefreshToken.js"


// refresh token
export const refreshTokenUsersControllers = async (req, res, next) => {
    try {
        const data = await refreshTokenUsers(req.cookies.refreshTokenUser)

        res.status(200).json({token: data})

    } catch (error) {
        next(error)
    }
}

export const refreshTokenSellersControllers = async (req, res, next) => {
    try {
        const data = await refreshTokenSellers(req.cookies.refreshToken)

        res.status(200).json({token: data})

    } catch (error) {
        next(error)
    }
}