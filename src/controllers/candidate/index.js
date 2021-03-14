const { candidateDB } = require('@database')
const { join } = require('ramda')
const serialize = require('./serialize')
const makeCandidate = require('@models/candidate')

const list = () => {
    return candidateDB.find({}).then(serialize)
}

const find = query => {
    return candidateDB.find(query).then(serialize)
}

const search = (techs, city, experience) => {
    let query = { $text: { $search: join(' ', techs) } }

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

    return candidateDB.find(query, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: 'textScore' } })
        .limit(5)
        .then(serialize)
}

const add = async candidate => {
    const validCandidate = makeCandidate(candidate)
    const newCandidate = {
        id: validCandidate.getID(),
        city: validCandidate.getCity(),
        experience: validCandidate.getExperience(),
        technologies: validCandidate.getTechnologies(),
    }

    await candidateDB.create(newCandidate).then(serialize)

    return find({ id: validCandidate.getID() })
}

const remove = id => {
    return candidateDB.remove({ id }).then(serialize)
}


const drop = () => {
    return candidateDB.remove({}).then(serialize)
}

module.exports = {
    list,
    find,
    search,
    add,
    remove,
    drop
}