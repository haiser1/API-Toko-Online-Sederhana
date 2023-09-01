import db from "../config/Database.js"
import { DataTypes } from "sequelize"
import Users from "./UsersModels.js"

const UsersWallet = db.define('users_wallet', {
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
    id_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
})

Users.hasOne(UsersWallet, {foreignKey: 'id_users'})
UsersWallet.belongsTo(Users, {foreignKey: 'id_users'})

export default UsersWallet