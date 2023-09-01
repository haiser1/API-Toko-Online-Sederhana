import db from "../config/Database.js"
import { DataTypes } from "sequelize"
import Sellers from "./SellersModels.js"

const Item = db.define('item', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },price: {
        type: DataTypes.STRING(20),
        defaultValue: '0',
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    sold: {
        type: DataTypes.INTEGER(),
        defaultValue: 0,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    id_sellers: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
})

Sellers.hasMany(Item, {foreignKey: 'id_sellers'})
Item.belongsTo(Sellers, {foreignKey: 'id_sellers'})

export default Item