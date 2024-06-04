const profileService = require('../../service/profile/index')

const depositBalance = async (userId, amount) => {
   return profileService.depositBalance(userId, amount);
}

module.exports = {depositBalance};