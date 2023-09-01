import db from "../config/Database.js"
import Sellers from "./SellersModels.js"
import { DataTypes } from "sequelize"


const SellersWallet = db.define('sellers_wallet', {
    no_wallet: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    balance: {
        type: DataTypes.STRING(15),
        defaultValue: '0'
    },
    id_sellers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
})

Sellers.hasOne(SellersWallet, {foreignKey: 'id_sellers'})
SellersWallet.belongsTo(Sellers, {foreignKey: 'id_sellers'})

export default SellersWallet