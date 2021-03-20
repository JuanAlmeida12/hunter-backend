const request = require('supertest')
const app = require('../../index')
const connection = require('@database/connection')
const candidateController = require('@controller/candidate')

describe('API /api/candidate', () => {
    let API
    beforeAll(async done => {
        API = await request(app)
        await candidateController.add({
            id: 1,
            city: 'Some city',
            experience: '3-5 years',
            technologies: [{
                name: 'Python',
                is_main_tech: true,
            }],
        })
        await candidateController.add({
            id: 2,
            city: 'Some city',
            experience: '3-5 years',
            technologies: [{
                name: 'Python',
                is_main_tech: true,
            }],
        })
        done()
    })

    it('GET /api/candidate', (done) => {
        API.get('/api/candidate?techs=Java&techs=Python&techs=Ruby')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('GET /api/candidate/cities', (done) => {
        API.get('/api/candidate/cities')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('GET /api/candidate/experiencies', (done) => {
        API.get('/api/candidate/experiencies')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    afterAll(async done => {

        await connection.connection.dropDatabase()

        await connection.connection.close()

        return app.close(done)
    })
})
