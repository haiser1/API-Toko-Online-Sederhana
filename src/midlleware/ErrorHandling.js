import { ResponseError } from "../error/ResponseError.js"

export const urlNotFound = (req, res, next) => {
    res.status(400).json({message: 'Url not found'})
}

export const errorHandling = (err, req, res, next) => {
    if (err instanceof ResponseError){
        return res.status(err.status).json({message: err.message})
    }  else if (err.isJoi) {
        return res.status(400).json({message: err.details[0].message})
    }
    console.log(`Error: ${err.message}`)
    res.status(500).json({message: 'Internal server error'})
}