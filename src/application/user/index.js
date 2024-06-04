
const userService = require('../../service/user/index')

const getBestProfession = async (start, end) => {
return await userService.getBestProfession(start, end)
}

const getBestClients = async (start, end, limit) => {
return await userService.getBestClients(start, end, limit)
}

module.exports = { getBestProfession, getBestClients};