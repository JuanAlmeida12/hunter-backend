const { app, server } = require('./app')

require('./api')(app)

module.exports = server