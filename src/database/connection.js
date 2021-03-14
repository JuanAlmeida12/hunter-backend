const mongoose = require('mongoose')
const config = require('config')

mongoose.Promise = global.Promise

const mongo_config = config.get("db_config")

const getConectString = config => {
    let connection = config.srv === true ? 'mongodb+srv://' : 'mongodb://'
    if (config.user) connection += `${config.user}:${config.password}@`
    connection += config.host
    if (config.port) connection += `:${config.port}`
    connection += `/${config.database}`
    return connection
}

mongoose.connect(getConectString(mongo_config),
    { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose