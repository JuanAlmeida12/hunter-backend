const { candidateDB } = require('@database')
const { join } = require('ramda')
const makeCandidate = require('@models/candidate')
const serialize = require('./serialize')

const list = () => candidateDB.find({}).then(serialize)

const find = (query) => candidateDB.find(query).then(serialize)

const search = (techs, city, experience) => {
  const query = { }
  let toQuery = ''

  if (techs) {
    if (Array.isArray(techs)) {
      toQuery = join(' ', techs || [])
    } else {
      toQuery = techs
    }
  }

  query.$text = { $search: toQuery }

  if (city) {
    if (Array.isArray(city)) {
      query.city = { $in: city }
    } else {
      query.city = city
    }
  }

  if (experience) {
    if (Array.isArray(experience)) {
      query.experience = { $in: experience }
    } else {
      query.experience = experience
    }
  }

  return candidateDB.find(query, '$text' in query && { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .limit(5)
    .then(serialize)
}

const add = async (candidate) => {
  const validCandidate = makeCandidate(candidate)
  const newCandidate = {
    id: validCandidate.getID(),
    city: validCandidate.getCity(),
    experience: validCandidate.getExperience(),
    technologies: validCandidate.getTechnologies(),
  }

  await candidateDB.create(newCandidate)

  return find({ id: validCandidate.getID() })
}

const cities = () => candidateDB.distinct('city')

const experiencies = () => candidateDB.distinct('experience')

const remove = (id) => candidateDB.remove({ id }).then(serialize)

const drop = () => candidateDB.remove({}).then(serialize)

module.exports = {
  list,
  find,
  search,
  add,
  cities,
  experiencies,
  remove,
  drop,
}
