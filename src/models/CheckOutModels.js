import { DataTypes } from "sequelize"
import db from "../config/Database.js"
import Orders from "./OrdersModels.js"


const CheckOut = db.define('check_out', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
    },
    id_orders: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_users: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_paid: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

Orders.hasMany(CheckOut, {foreignKey: 'id_orders'})
CheckOut.belongsTo(Orders, {foreignKey: 'id_orders'})

export default CheckOut