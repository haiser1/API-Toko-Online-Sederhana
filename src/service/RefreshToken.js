import jwt from 'jsonwebtoken'
import { ResponseError } from '../error/ResponseError.js'
import Users from '../models/UsersModels.js'
import Sellers from '../models/SellersModels.js'
import fs from 'fs/promises'

const privateKey = await fs.readFile(process.env.PRIVATE_KEY_PATH, 'utf-8')
const publicKey = await fs.readFile(process.env.PUBLIC_KEY_PATH, 'utf-8')

export const refreshTokenUsers = async (token) => {
    

    if (!token){
        throw new ResponseError(401, 'Unauthorized')
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, {algorithms: ['RS256']}, (err, decoded) => {
            if (err){
                reject(new ResponseError(401, 'Token error'))
                return;
            }

            const {id, name, role} = decoded
            const accessToken = jwt.sign({id, name, role}, privateKey, {
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

    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, {algorithms: ['RS256']}, (err, decoded) => {
            if (err){
                reject(new ResponseError(401, 'Token error'));
                return
            }

            const {id, name, role} = decoded
            const accessToken = jwt.sign({id, name, role}, privateKey, {
                expiresIn: '60s',
                algorithm: 'RS256'
            })
            resolve(accessToken);
        })
    })
}