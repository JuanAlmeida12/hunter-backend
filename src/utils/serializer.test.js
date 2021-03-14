const serializer = require('./serializer.js')

describe('Test Serializer', () => {
    beforeEach(async () => { })

    it('Serializaer null object', () => {
        const mockSerial = jest.fn(x => x)
        serializer(mockSerial)(null)
        expect(mockSerial.mock.calls.length).toBe(0)
    })

    it('Serializaer single object', () => {
        const mockSerial = jest.fn(x => x)
        serializer(mockSerial)('String')
        expect(mockSerial.mock.calls.length).toBe(1)
    })

    it('Serializaer many object', () => {
        const mockSerial = jest.fn(x => x)
        serializer(mockSerial)(['String', 'String', 'String'])
        expect(mockSerial.mock.calls.length).toBe(3)
    })
})