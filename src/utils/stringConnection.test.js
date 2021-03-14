const getConectString = require('./stringConnection')

describe('Test String Connection', () => {
    const OLD_ENV = process.env.NODE_ENV

    it('Get Connection String', () => {
        process.env.NODE_ENV = 'dev'
        const returned = getConectString({
            host: 'someHost',
            database: 'hunterTest',
            user: 'admin',
            port: '2020',
            password: 'admin',
            srv: true
        })

        expect(returned).toMatch(/mongodb\+srv:\/\/admin:admin\@someHost:[0-9]+\/hunterTest/)
    })

    it('Get Connection String without srv', () => {
        process.env.NODE_ENV = 'dev'
        const returned = getConectString({
            host: 'someHost',
            database: 'hunterTest',
            user: 'admin',
            port: '2020',
            password: 'admin'
        })

        expect(returned).toMatch(/mongodb:\/\/admin:admin\@someHost:[0-9]+\/hunterTest/)
    })

    it('Get Connection Stringm in test env', () => {
        const returned = getConectString({
            host: 'someHost',
            database: 'hunterTest',
            user: 'admin',
            port: '2020',
            password: 'admin',
            srv: true
        })

        expect(returned).toMatch(/mongodb\+srv:\/\/admin:admin\@someHost:[0-9]+\/([a-zA-Z]|[0-9]){6}/)
    })

    afterEach(() => {
        process.env.NODE_ENV = OLD_ENV
    })
})