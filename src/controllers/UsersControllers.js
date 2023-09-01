import {
    changePasswordService,
    getUsersCurrentService,
    loginUsersService,
    logoutUsersService,
    registerUsersService,
    updaetUsersService,
} from "../service/UsersService.js"


export const registerUsersControllers = async (req, res, next) => {
    try {
        const data = await registerUsersService(req.body)
        res.status(201).json({data: data})
    } catch (error) {
        next(error)
    }
}

export const loginUsersControllers = async (req, res, next) => {
    try {
        const data = await loginUsersService(req.body)

        res.cookie('refreshTokenUser', data.refreshToken, {
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 1000
        })

        res.status(200).json({token: data.accessToken})

    } catch (error) {
        next(error)
    }
}



export const getUsersCurrentControllers = async (req, res, next) => {
    try {
        const data = await getUsersCurrentService(req.userId)

        res.status(200).json({data: data})
        
    } catch (error) {
        next(error)
    }
}

export const updateUsersControllers = async (req, res, next) => {
    try {
        const data = await updaetUsersService(req.body, req.userId)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const chnagePasswordControllers = async (req, res, next) => {
    try {
        await changePasswordService(req.body, req.userId)

        res.status(200).json({data: 'Ok'})
    } catch (error) {
        next(error)
    }
}

export const logoutUsersControlers = async (req, res, next) => {
    try {
        await logoutUsersService(req.cookies.refreshTokenUser)

        res.clearCookie('refreshTokenUser')
        res.status(200).json({data: 'Ok'})
    } catch (error) {
        next(error)
    }
}