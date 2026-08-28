const { DataTypes } = require('sequelize')
const sequelize = require('../../config/database')

const Recommendation = sequelize.define('Recommendation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(500),
        allowNull: true
    },

    situation: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendente'
    },

    stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1],
                msg: 'A classificação mínima é 1 estrela.'
            },
            max: {
                args: [5],
                msg: 'A classificação máxima é 5 estrelas.'
            }
        }
    },

    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

}, {
    tableName: 'recommendations',
    timestamps: true
})

module.exports = Recommendation