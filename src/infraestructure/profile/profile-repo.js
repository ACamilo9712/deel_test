const {Profile} = require('../../model')

const getProfileById = async (id) => {
    const profile = await Profile.findOne({where: {id}})
    return profile
}

const updateProfile = async (profile) => {
    await profile.save()
}

const saveProfile = async (profile) => {
    return await profile.save()
}

module.exports = {getProfileById, updateProfile, saveProfile}