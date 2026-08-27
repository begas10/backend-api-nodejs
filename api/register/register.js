const { DataTypes } = require('sequelize')
const sequelize = require('../../config/database')

const Register = sequelize.define('Register', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Informe um e-mail válido.'
            }
        }
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false
    },

    number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    complement: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'registers',
    timestamps: true
})

module.exports = Register