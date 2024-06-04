const {sequelize} = require('../../model')
const jobRepo = require('../../infraestructure/job/job-repo')
const profileRepo = require('../../infraestructure/profile/profile-repo')

const getProfileById = async (id) => {
    const {Profile} = sequelize.models
    const profile = await Profile.findOne({where: {id}})
    return profile
}

const depositBalance = async (userId, amount) => {
    const profile = await profileRepo.getProfileById(userId)
    const unpaidJobs = await jobRepo.getUnpaidJobs(profile.id)
    if (!profile) return {status: 404, error: 'Profile not found'}
    if(profile.id !== parseInt(userId)) return {status: 403, error: 'Forbidden'}
    const totalToPay = unpaidJobs.reduce((total, job) => total + job.price, 0)
    if(amount > totalToPay * 0.25) return {status: 400, error: 'Cannot deposit more than 25% of total jobs to pay'}
    profile.balance += amount
    await Profile.saveProfile(profile)
    return {}
}
module.exports = {getProfileById, depositBalance}