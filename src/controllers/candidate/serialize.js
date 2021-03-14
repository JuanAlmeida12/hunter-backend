const { map } = require('ramda')
const serializer = require('@utils/serializer')

const serializeSingle = (candidate) => ({
  id: candidate.id,
  city: candidate.city,
  experience: candidate.experience,
  technologies: map((tech) => ({
    name: tech.name,
    is_main_tech: tech.is_main_tech,
  }), candidate.technologies || []),
})

module.exports = serializer(serializeSingle)
