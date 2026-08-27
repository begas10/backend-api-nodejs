const server = require('./config/server')
const sequelize = require('./config/database')

require('./config/routes')(server)

async function start() {

    try {

        await sequelize.authenticate()

        console.log('Database Connected')

        await sequelize.sync()

        console.log('Database synchronized')

    } catch (error) {

        console.error('Database connection error:')
        console.error(error)

        process.exit(1)
    }
}

start()