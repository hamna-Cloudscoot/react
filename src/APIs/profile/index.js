import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const updateProfile = async (data) => {
    return await API.postMethod(ENDPOINT.profile.updateProfile, true, data)
}

const getProfile = async (data) => {
    return await API.getMethod(ENDPOINT.profile.myProfile, true)
}

export default {
    updateProfile,
    getProfile
}