let validatorCandidate = require('@utils/validator')
const buildMakeCandidate = require('./candidate')
const candidateSchema = require('./candidate-vs')

validatorCandidate = validatorCandidate(candidateSchema)

module.exports = buildMakeCandidate(validatorCandidate)
