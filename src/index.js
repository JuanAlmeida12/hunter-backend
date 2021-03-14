const { app, server } = require('./app')
require('@job/db-job')

require('./api')(app)

module.exports = server