const contractRepo = require('../../infraestructure/contract/contract-repo')

const getContract = async (id) => { return await contractRepo.getContract(id) }

const getContracts = async (profileId) => { return await contractRepo.getContracts(profileId)}

module.exports = {
    getContract,
    getContracts
}