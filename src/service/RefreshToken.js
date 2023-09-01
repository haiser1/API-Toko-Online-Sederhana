import jwt from 'jsonwebtoken'
import { ResponseError } from '../error/ResponseError.js'
import Users from '../models/UsersModels.js'
import Sellers from '../models/SellersModels.js'
import fs from 'fs'

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf-8')
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf-8')

export const refreshTokenUsers = async (request) => {
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

    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, {algorithms: ['RS256']}, (err, decoded) => {
            if (err){
                reject(new ResponseError(401, 'Token error'))
                return;
            }

            const userId = decoded.userId
            const userName = decoded.userName
            const role = decoded.role
            const accessToken = jwt.sign({userId, userName, role}, privateKey, {
                expiresIn: '60s',
                algorithm: 'RS256'
            })
            resolve(accessToken)
        });
    });
}

export const refreshTokenSellers = async (request) => {
    const token = request

    if (!token){
        throw new ResponseError(401, 'Unauthorized')
    }

    const seller = await Sellers.findOne({
        where: {
            refresh_token: token
        }
    })

    if (!seller){
        throw new ResponseError(401, 'Unauthorized')
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, {algorithms: ['RS256']}, (err, decoded) => {
            if (err){
                reject(new ResponseError(401, 'Token error'));
                return
            }

            const sellerId = decoded.sellerId
            const sellerName = decoded.name
            const role = decoded.role
            const accessToken = jwt.sign({sellerId, sellerName, role}, privateKey, {
                expiresIn: '60s',
                algorithm: 'RS256'
            })
            resolve(accessToken);
        })
    })
}