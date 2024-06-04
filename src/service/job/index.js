const {sequelize} = require('../../model')
const jobRepo = require('../../infraestructure/job/job-repo')
const profileRepo = require('../../infraestructure/profile/profile-repo')
const contractRepo = require('../../infraestructure/contract/contract-repo')

const getUnpaidJobs = async () => {
    return await jobRepo.getUnpaidJobs()
}

const payJob = async (jobId) => {
    const job = await jobRepo.getJobById(jobId)
    if(!job) return {status: 404, error: 'Job not found'}
    const profile = await profileRepo.getProfileById(job.ContractId)
    if(profile.balance < job.price) return {status: 400, error: 'Insufficient balance'}
    const transaction = await sequelize.transaction()
    try {
        profile.balance -= job.price
        await profileRepo.updateProfile(profile, {transaction})

        
        profile.balance += job.price
        await profileRepo.updateProfile(profile, {transaction})

        job.paid = true
        await jobRepo.updateJob(job, {transaction})

        await transaction.commit()
        return {}
    } catch (error) {
        await transaction.rollback()
        return {status: 500, error: 'Transaction failed'}
    }
}

module.exports = {payJob}
module.exports = {getUnpaidJobs, payJob}