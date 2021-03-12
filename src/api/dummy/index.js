/**
 * Sets the base URL to this API
 */
const DUMMY_BASE_URL = '/dummy'

module.exports = (router) => {
    router.get(DUMMY_BASE_URL, (req, res) => {
        res.status(200).json({ message: 'Dummy' })
    })
}