require('module-alias/register')
const { app, server } = require('./app')

if (process.env.NODE_ENV !== 'test') {
  require('@job/db-job')().start()
}

require('./api')(app)

module.exports = server
