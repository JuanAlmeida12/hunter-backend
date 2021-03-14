const buildMakeCandidate = require('./candidate')
const candidateSchema = require('./candidate-vs')
const validatorCandidate = require('@utils/validator')(candidateSchema)

module.exports = buildMakeCandidate(validatorCandidate)