const { CronJob } = require('cron')
const axios = require('axios')
const { forEach } = require('ramda')

const candidateController = require('@controller/candidate')

const job = (success, fail) => new CronJob('*/5 * * * *', () => {
  axios.get('https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json').then(({ data }) => {
    const add = (candidate) => {
      candidateController.add(candidate).then(success).catch(fail)
    }
    forEach(add, data.candidates)
  })
}, null, true, null, null, true)

module.exports = job
