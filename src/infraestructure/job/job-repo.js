const {sequelize} = require('../../model')
const Op = require('sequelize')
const {Job, Contract, Profile} = sequelize.models

const getJobById = async (id) => {
    const job = await Job.findOne({where: {id}})
    return job
}

const updateJob = async (job) => {
    await job.save()
}

const getUnpaidJobs = async () => {
    const jobs = await Job.findAll({where: {paid: false}})
    return jobs
}

const getBestProfession = async (start, end) => {
    const bestProfession = await Job.findAll({
        include: [{
            model: Contract,
            where: {
                status: 'in_progress',
                createdAt: {
                    [Op.between]: [new Date(start), new Date(end)]
                }
            },
            include: [{
                model: Profile,
                as: 'Contractor',
                attributes: ['profession']
            }]
        }],
        group: ['Contract.Contractor.profession'],
        order: [[sequelize.fn('SUM', sequelize.col('price')), 'DESC']],
        limit: 1
    })
    return bestProfession && bestProfession[0] ? bestProfession[0].Contract.Contractor.profession : null
}

const getBestClients = async (start, end, limit) => {
    const bestClients = await Job.findAll({
        include: [{
            model: Contract,
            where: {
                status: 'in_progress',
                /*createdAt: {
                    [Op.between]: [start, end]
                }*/
            }
        }],
        group: ['Contract.ClientId'],
        order: [[sequelize.fn('SUM', sequelize.col('price')), 'DESC']],
        limit: limit
    })
    return bestClients.map(job => ({id: job.Contract.ClientId, paid: sequelize.fn('SUM', job.price)}))
}
module.exports = {getJobById, updateJob, getUnpaidJobs, getBestProfession, getBestClients}