/**
 * This is a validation class schema
 */

const Joi = require('joi')

const technologie = Joi.object().keys({
  name: Joi.string().error(() => new Error('Name must be a string')),
  is_main_tech: Joi.boolean().error(() => new Error('Main Tech must be a bool')),
})

module.exports = Joi.object().keys({
  id: Joi.number().required().error(() => new Error('ID must have valid number')),
  city: Joi.string().error(() => new Error('City must be a string')),
  experience: Joi.string().error(() => new Error('Experience must be a string')),
  technologies: Joi.array().items(technologie),
})
