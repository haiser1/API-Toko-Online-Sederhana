import { DataTypes } from "sequelize"
import db from "../config/Database.js"


const Users = db.define('users', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    no_hp: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.STRING(10),
        defaultValue: 'user'
    },
    otp_code: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    otp_code_expired: {
        type: DataTypes.DATE,
        allowNull: true
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    freezeTableName: true
})

export default Users