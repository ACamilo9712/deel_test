const contractService = require('../../service/contract/index')

const getContract = async (id) => {
    return await contractService.getContract(id)
}

const getContracts = async (profileId) => {
    return await contractService.getContracts(profileId)
}

module.exports = {getContract, getContracts}