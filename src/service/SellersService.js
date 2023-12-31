import Sellers from '../models/SellersModels.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import fs from 'fs/promises'
import { loginSellersValidate, registerSellersValidate, updateSellersValidate } from '../validation/SellersValidation.js'
import { ResponseError } from '../error/ResponseError.js'
import { changePasswordValidate } from '../validation/UsersValidation.js'

const privateKey = await fs.readFile(process.env.PRIVATE_KEY_PATH, 'utf-8')
const publicKey = await fs.readFile(process.env.PUBLIC_KEY_PATH, 'utf-8')

export const registerSellersService = async (request) => {
    const result = await registerSellersValidate.validateAsync(request)

    const seller = await Sellers.findOne({
        where: {
            email: result.email
        }
    })

    if (seller){
        throw new ResponseError(400, 'Email already registered')
    }

    const hashPassword = await bcrypt.hash(result.password, 10)
    await Sellers.create({
        name: result.name,
        email: result.email,
        password: hashPassword,
        no_hp: result.no_hp,
        address: result.address
    })

    const {name, email, no_hp, address} = result

    return {name, email, no_hp, address}
}

export const loginSellersService = async (request) => {
    const result = await loginSellersValidate.validateAsync(request)

    const seller = await Sellers.findOne({
        where: {
            email: result.email
        }
    })

    if (!seller){
        throw new ResponseError(400, 'Email or password wrong')
    }

    const match = await bcrypt.compare(result.password, seller.password)

    if (!match){
        throw new ResponseError(400, 'Email or password wrong')
    }

    const {id, name, role} = seller
    const accessToken = jwt.sign({id, name, role}, privateKey, {
        expiresIn: '60s',
        algorithm: 'RS256'
    })
    const refreshToken = jwt.sign({id, name, role}, privateKey, {
        expiresIn: '12h',
        algorithm: 'RS256'
    })

    return {accessToken, refreshToken}
}

export const getSellersCurrentService = async (sellerId) => {
    const seller = await Sellers.findOne({
        attributes: ['name', 'email', 'no_hp', 'address'],
        where: {
            id: sellerId
        }
    })

    if (!seller){
        throw new ResponseError(404, 'Seller not found')
    }

    return seller
}

export const updateSellersService = async (request, sellerId) => {
    const result = await updateSellersValidate.validateAsync(request)

    const seller = await Sellers.findOne({
        where: {
            id: sellerId
        }
    })

    if (!seller){
        throw new ResponseError(404, 'Seller not found')
    }

    await Sellers.update({
        name: result.name,
        no_hp: seller.no_hp,
        address: result.address
    }, {
        where: {
            id: sellerId
        }
    })

    return result
}

export const changePasswordService = async (request, sellerId) => {
    const result = await changePasswordValidate.validateAsync(request)

    const seller = await Sellers.findOne({
        where: {
            id: sellerId
        }
    })

    if (!seller){
        throw new ResponseError(404, 'Seller not found')
    }

    const match = await bcrypt.compare(result.password, seller.password)

    if (!match){
        throw new ResponseError(400, 'Password wrong')
    }

    const hashPassword = await bcrypt.hash(result.new_password, 10)

    await Sellers.update({
        password: hashPassword
    }, {
        where: {
            id: sellerId
        }
    })
}

export const logoutSellersService = async (token) => {
    if (!token){
        throw new ResponseError(401, 'Unauthorized')
    }

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err){
            throw new ResponseError(401, 'Token error')
        }
        return
    })

}