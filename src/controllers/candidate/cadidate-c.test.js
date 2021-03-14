const candidateController = require('./index')

describe('await candidateController', () => {
    beforeEach(async () => {
        await candidateController.drop();

        const candidateSeed1 = {
            id: 1,
            city: "Some city",
            experience: "1-2 years",
            technologies: [{
                name: "Java",
                is_main_tech: true
            }]
        }
        const candidateSeed2 = {
            id: 2,
            city: "Some city",
            experience: "3-5 years",
            technologies: [{
                name: "Python",
                is_main_tech: true
            }]
        }
        await candidateController.add(candidateSeed1)
        await candidateController.add(candidateSeed2)
    })

    it('drops database', async () => {
        await await candidateController.drop()
        const candidates = await candidateController.list()
        expect(candidates).toEqual([])
    })

    it('lists candidates', async () => {
        const input = await candidateController.list()
        const actual = 2
        expect(input.length).toEqual(actual)
    })

    it('find single candidate by id', async () => {
        const candidates = await candidateController.list()
        const id = candidates[0].id

        const candidate = await candidateController.find({ id })
        const output = candidate[0].id
        expect(output).toEqual(id)
    })

    it('inserts a candidate', async () => {
        const newCandidate = {
            id: 4,
            city: "Some city",
            experience: "15+ years",
            technologies: [{
                name: "Python",
                is_main_tech: true
            }]
        }

        const output = await candidateController.add(newCandidate)

        expect(output[0]).toEqual(newCandidate)
    })

    it('deletes a candidate', async () => {
        const candidates = await candidateController.list()
        const id = candidates[0].id
        await candidateController.remove(id)

        const newCandidates = await candidateController.list()

        expect(newCandidates.length).not.toEqual(candidates.length)
        expect(newCandidates.length).toBeLessThan(candidates.length)
    })

})