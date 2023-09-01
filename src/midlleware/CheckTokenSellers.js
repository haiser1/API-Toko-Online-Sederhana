import jwt from 'jsonwebtoken'
import fs from 'fs'

const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf-8')

export const checkTokenSellers = (req, res, next) => {
    const authHeader = req.headers['authorization']
    
    if (!authHeader) return res.status(401).json({message: 'Unauthorized'})

    const token = authHeader.split(' ')[1]

    if (!token) return res.status(401).json({message: 'Unauthorized'})

    jwt.verify(token, publicKey, {algorithms: ['RS256']}, (err, decoded) => {
        if (err) return res.status(401).json({message: 'Token error'})

        req.sellerId = decoded.sellerId
        req.sellerName = decoded.sellerName
        req.role = decoded.role

        if (req.role !== 'seller') return res.status(403).json({message: 'Access denied'})

        next()
    })
}