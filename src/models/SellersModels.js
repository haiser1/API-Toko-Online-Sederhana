import db from "../config/Database.js"
import { DataTypes } from "sequelize"


const Sellers = db.define('sellers', {
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
        }
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
        defaultValue: 'seller'
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
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



export default Sellers