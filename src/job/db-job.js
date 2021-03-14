const { CronJob } = require('cron')
const axios = require('axios')
const { forEach } = require('ramda')

const candidateController = require('@controller/candidate')

const job = new CronJob('*/5 * * * *', () => {
  axios.get('https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json').then(({ data }) => {
    const add = (candidate) => {
      candidateController.add(candidate).catch(() => {
        // console.error('Candidato já cadastrado')
      })
    }
    forEach(add, data.candidates)
  })
}, null, true, null, null, true)
job.start()
