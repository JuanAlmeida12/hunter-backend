const connection = require('@database/connection')
const job = require('@job/db-job')

describe('API /api/candidate', () => {

    it('job should start', async done => {
        const success = jest.fn(() => {
            expect(1).toEqual(1)
            scheduledJob.stop()
            done()
        })
        const scheduledJob = job(success)
        scheduledJob.start()
    })
    
    afterAll(async () => {

        await connection.connection.dropDatabase()

        await connection.connection.close()

    })
})
