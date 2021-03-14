const makeCandidate = require('./index')

const connection = require('@database/connection')

describe('makeCandidate', () => {
    it('throws error if invalid payload', () => {
        expect(() => makeCandidate({
            city: 1,
            experience: 1,
            technologies: 1,
        })).toThrowError('ID must have valid number')

        expect(() => makeCandidate({
            id: 'a',
            city: 1,
            experience: 1,
            technologies: 1,
        })).toThrowError('ID must have valid number')

        expect(() => makeCandidate({
            id: 1,
            city: 1,
            experience: 1,
            technologies: 1,
        })).toThrowError('City must be a string')

        expect(() => makeCandidate({
            id: 1,
            city: 'Some city',
            experience: 1,
            technologies: 1,
        })).toThrowError('Experience must be a string')

        expect(() => makeCandidate({
            id: 1,
            city: 'Some city',
            experience: '1-2 years',
            technologies: 1,
        })).toThrowError('\"technologies\" must be an array')

        expect(() => makeCandidate({
            id: 1,
            city: 'Some city',
            experience: '1-2 years',
            technologies: [{
                name: 1,
                is_main_tech: 'string',
            }],
        })).toThrowError('Name must be a string')

        expect(() => makeCandidate({
            id: 1,
            city: 'Some city',
            experience: '1-2 years',
            technologies: [{
                name: 'Name',
                is_main_tech: 'string',
            }],
        })).toThrowError('Main Tech must be a bool')
    })

    it('Must return all attr correctly', () => {
        const cadidateInput = {
            id: 1,
            city: 'Some city',
            experience: '1-2 years',
            technologies: [{
                name: 'Name',
                is_main_tech: true,
            }],
        }
        const Candidate = makeCandidate(cadidateInput)

        expect(Candidate.getID()).toEqual(cadidateInput.id)
        expect(Candidate.getExperience()).toEqual(cadidateInput.experience)
        expect(Candidate.getCity()).toEqual(cadidateInput.city)
        expect(Candidate.getTechnologies()).toEqual(cadidateInput.technologies)
    })

    afterAll(async () => {

        await connection.connection.dropDatabase()

        await connection.connection.close()
    })
})
