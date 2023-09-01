import { DataTypes } from "sequelize"
import db from "../config/Database.js"
import Item from "./ItemModels.js"
import Users from "./UsersModels.js"


const Orders = db.define('orders', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
    },
    id_item: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_users: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    total_price: {
        type: DataTypes.STRING(20),
        defaultValue: '0',
        validate: {
            notEmpty: true
        }
    },
    checkOut: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true
})

Item.hasMany(Orders, {foreignKey: 'id_item'})
Orders.belongsTo(Item, {foreignKey: 'id_item'})

Users.hasMany(Orders, {foreignKey: 'id_users'})
Orders.belongsTo(Users, {foreignKey: 'id_users'})

export default Orders