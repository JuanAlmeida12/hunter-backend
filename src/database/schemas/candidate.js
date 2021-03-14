const mongoose = require('@database/connection')

const Schema = mongoose.Schema

const TecnolgieSchema = new Schema({
    name: { type: String },
    is_main_tech: { type: Boolean },
})

TecnolgieSchema.index({ name: 'text' }, { name: 'Technologie Index', weights: { name: 10 } })

const CandidateSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    city: { type: String },
    experience: { type: String },
    technologies: [TecnolgieSchema],
})

const Candidate = mongoose.model('Candidate', CandidateSchema)

module.exports = Candidate