import express from 'express'
import cookieParser from 'cookie-parser'
import { configDotenv } from 'dotenv'
import db from './config/Database.js'
import { errorHandling, urlNotFound } from './midlleware/ErrorHandling.js'
import { publicRoute } from './route/PublicRoute.js'
import { userRoute } from './route/UsersRoute.js'
import { UsersWalletRoute } from './route/UsersWalletRoute.js'
import { sellersRoute } from './route/SellersRoute.js'
import { refreshTokenRoute } from './route/RefreshTokenRoute.js'
import { itemRoute } from './route/ItemRoutes.js'
import { ordersRoute } from './route/OrdersRoute.js'
import { checkOutRoute } from './route/CheckOutRoute.js'
import { sellersWalletRoute } from './route/SellersWalletRoute.js'

configDotenv()

const app = express()

try {
    await db.authenticate()
    // await SellersWallet.sync()
    console.log('Success connect to database')
} catch (error) {
    console.error(`failed connect to databases, error: ${error}`)
}

app.use(express.json())
app.use(cookieParser())
app.use(publicRoute)
app.use(refreshTokenRoute)
app.use(userRoute)
app.use(sellersRoute)
app.use(UsersWalletRoute)
app.use(sellersWalletRoute)
app.use(itemRoute)
app.use(ordersRoute)
app.use(checkOutRoute)

app.use(errorHandling)
app.use(urlNotFound)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server run on port: ${port}`))

