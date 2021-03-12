const request = require('supertest')
const app = require('../../index')

describe('API /api/dummy', function () {
    const api = request(app)

    it('GET /api/dummy', done => {
        api.get('/api/dummy')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    afterAll(done => {
        return app.close(done)
    })
})