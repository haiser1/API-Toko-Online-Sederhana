import { ResponseError } from "../error/ResponseError.js"
import Users from "../models/UsersModels.js"
import {
    changePasswordValidate,
    loginUsersValidate,
    registerUsersValidate,
    updateUsersValidate,
} from "../validation/UsersValidation.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import fs from 'fs'


const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf-8')

export const registerUsersService = async (request) => {
    const result = await registerUsersValidate.validateAsync(request)

    const user = await Users.findOne({
        where: {
            email: result.email
        }
    })

    if (user){
        throw new ResponseError(400, 'Email already resgistered')
    }
    const hashPassword =  await bcrypt.hash(result.password, 10)
    await Users.create({
        name: result.name,
        email: result.email,
        password: hashPassword,
        no_hp: result.no_hp,
        address: result.address
    })

    const {name, email, no_hp, address} = result

    return {name, email, no_hp, address}
}

export const loginUsersService = async (request) => {
    const result = await loginUsersValidate.validateAsync(request)

    const user = await Users.findOne({
        where: {
            email: result.email
        }
    })
    if (!user){
        throw new ResponseError(400, 'Email or password wrong')
    }

    const match = await bcrypt.compare(result.password, user.password)

    if (!match){
        throw new ResponseError(400, 'Email or password wrong')
    }


    const userId = user.id
    const userName = user.name
    const { role } = user
    const accessToken = jwt.sign({userId, userName, role}, privateKey, {
        expiresIn: '60s',
        algorithm: 'RS256'
    })
    const refreshToken = jwt.sign({userId, userName, role}, privateKey, {
        expiresIn: '12h',
        algorithm: 'RS256'
    })

    await Users.update({
        refresh_token: refreshToken
    }, {
        where: {
            id: userId
        }
    })

    return {accessToken, refreshToken}

}

export const getUsersCurrentService = async (userId) => {
    const user = await Users.findOne({
        attributes: ['name', 'email', 'no_hp', 'address'],
        where: {
            id: userId
        }
    })

    if (!user){
        throw new ResponseError(404, 'User not found')
    }

    return user

}

export const updaetUsersService = async (request, userId) => {
    const result = await updateUsersValidate.validateAsync(request)

    const user = await Users.findOne({
        where: {
            id: userId
        }
    })

    if (!user){
        throw new ResponseError(404, 'User not found')
    }

    await Users.update({
        name: result.name,
        no_hp: result.no_hp,
        address: result.address
    }, {
        where: {
            id: userId
        }
    })

    return result
}

export const changePasswordService = async (request, userId) => {
    const result = await changePasswordValidate.validateAsync(request)

    const user = await Users.findOne({
        where: {
            id: userId
        }
    })

    if (!user){
        throw new ResponseError(404, 'User not found')
    }

    const match = await bcrypt.compare(result.password, user.password)

    if (!match){
        throw new ResponseError(400, 'Password wrong')
    }

    const hashPassword = await bcrypt.hash(result.new_password, 10)

    await Users.update({
        password: hashPassword
    }, {
        where: {
            id: userId
        }
    })
}

export const logoutUsersService = async (request) => {
    const token = request

    if (!token){
        throw new ResponseError(401, 'Unauthorized')
    }

    const user = await Users.findOne({
        where: {
            refresh_token: token
        }
    })

    if (!user){
    throw new ResponseError(401, 'Unauthorized')
    }

    await Users.update({
        refresh_token: null
    }, {
        where: {
            id: user.id
        }
    })
}

