const {sequelize} = require('../../model')
const jobService = require('../../service/job/index')

const getUnpaidJobs = async () => {
    const jobs = await jobService.getUnpaidJobs()
    return jobs
}

const payJob = async (jobId) => {
    const job = await jobService.payJob(jobId)
    return job
}

module.exports = {getUnpaidJobs, payJob};   