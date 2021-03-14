const request = require('supertest')
const app = require('../../index')

describe('API /api/candidate', function () {
    const api = request(app)

    it('GET /api/candidate', done => {
        api.get('/api/candidate')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    afterAll(done => {
        return app.close(done)
    })
})