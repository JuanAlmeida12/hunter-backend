/**
 * Sets the base URL to this API
 */
const CANDIDATE_BASE_URL = '/candidate'
const candidateController = require('@controller/candidate')

module.exports = (router) => {
  router.get(CANDIDATE_BASE_URL, (req, res) => {
    const { exp, techs, location } = req.query
    candidateController.search(techs, location, exp).then((candidates) => {
      res.json(candidates)
    })
  })

  router.get(`${CANDIDATE_BASE_URL}/cities`, (req, res) => {
    candidateController.cities().then((cities) => {
      res.json(cities)
    })
  })

  router.get(`${CANDIDATE_BASE_URL}/experiencies`, (req, res) => {
    candidateController.experiencies().then((experiencies) => {
      res.json(experiencies)
    })
  })
}
