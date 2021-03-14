const mongoose = require('mongoose')
const config = require('config')

const getConectString = require('@utils/stringConnection')

mongoose.Promise = global.Promise

const mongoConfig = config.get('db_config')

mongoose.connect(getConectString(mongoConfig),
  { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose
