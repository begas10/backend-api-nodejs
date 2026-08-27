const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'banco_dados',
    'root',
    '',
    {
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mariadb',
        logging: false
    }
)

module.exports = sequelize