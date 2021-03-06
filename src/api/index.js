const express = require('express')

module.exports = (server) => {
  // API Routes
  const router = express.Router()
  server.use('/api', router)

  // Candidate route
  require('./candidate')(router)
}
