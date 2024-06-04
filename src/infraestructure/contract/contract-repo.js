const {sequelize, Op} = require('../../model')

const getContract = async (id) => {
    const {Contract} = sequelize.models
    const contract = await Contract.findOne({where: {id}})
    return contract
}

const getContracts = async (profileId) => {
    const {Contract} = sequelize.models
    const contracts = await Contract.findAll({where: {status: {[Op.ne]: 'terminated'}, [Op.or]: [{ContractorId: profileId}, {ClientId: profileId}]}})
    return contracts
}

const getContractByJobId = async (jobId) => {
    const {Contract} = sequelize.models
    const contract = await Contract.findOne({where: {id: jobId}})
    return contract
}

module.exports = {getContract, getContracts, getContractByJobId}