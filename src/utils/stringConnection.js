const instanceID = require('rand-token').uid

const getConectString = (conectInfo) => {
  let connection = conectInfo.srv ? 'mongodb+srv://' : 'mongodb://'
  if (conectInfo.user) connection += `${conectInfo.user}:${conectInfo.password}@`
  connection += conectInfo.host
  if (conectInfo.port) connection += `:${conectInfo.port}`
  if (process.env.NODE_ENV === 'test') connection += `/${instanceID(6)}`
  else connection += `/${conectInfo.database}`
  return connection
}

module.exports = getConectString
