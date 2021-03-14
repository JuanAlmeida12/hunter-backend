const express = require('express')

module.exports = (server) => {
    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // Dummy route
    require('./dummy')(router)

    // Candidate route
    require('./candidate')(router)
}