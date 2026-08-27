const express = require('express')

module.exports = function (server) {

    const protectedApi = express.Router()

    server.use('/api', protectedApi)

    server.use('/status', (req, res) => {
        res.send('BACKEND is runner.')
    })

    const recommendation =
        require('../api/recommendation/recommendationService')

    const register =
        require('../api/register/registerService')

    protectedApi.use('/recommendation', recommendation)

    protectedApi.use('/register', register)

    server.use(
        express.static(
            require('path').join(__dirname, '../public')
        )
    )
}